/* TEKNO calculator engine.
 * A calculator is a plain object (see calculators.js). The engine builds the
 * form, validates inputs, calls the calculation, and renders the result.
 * It never shows a number when any input is invalid.
 */
(function () {
  "use strict";

  var TEKNO = window.TEKNO;
  var t = TEKNO.t;
  var registry = {};
  var instances = [];

  TEKNO.registerCalc = function (def) {
    registry[def.id] = def;
  };

  // ---------- Input parsing and validation ----------

  // Accepts ASCII and Arabic-Indic digits. A comma is rejected so that "2,5"
  // is never silently read as 25. Returns null for empty, NaN for invalid.
  function parseNumber(raw) {
    var s = String(raw == null ? "" : raw).trim();
    if (s === "") return null;
    s = s.replace(/[٠-٩]/g, function (c) {
      return String.fromCharCode(c.charCodeAt(0) - 0x0660 + 48);
    }).replace(/٫/g, ".");
    if (!/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(s)) return NaN;
    return Number(s);
  }

  function validateNumber(f, raw) {
    var v = parseNumber(raw);
    if (v === null) {
      if (f.optional) return { value: f.default };
      return { error: "err_required" };
    }
    if (!isFinite(v)) return { error: "err_number" };
    if (f.gt != null && !(v > f.gt)) return { error: "err_gt", n: f.gt };
    if (f.ge != null && !(v >= f.ge)) return { error: "err_ge", n: f.ge };
    if (f.le != null && !(v <= f.le)) return { error: "err_le", n: f.le };
    return { value: v };
  }

  // ---------- Number formatting ----------

  function fmt(x) {
    if (typeof x !== "number" || !isFinite(x)) return "—";
    if (x === 0) return "0";
    var a = Math.abs(x);
    if (a >= 1e9 || a < 1e-4) return x.toExponential(4);
    var digits = a >= 100 ? 2 : a >= 1 ? 4 : 6;
    return x.toLocaleString("en-US", { maximumFractionDigits: digits });
  }

  function valueText(v) {
    if (v && typeof v === "object" && v.i18n) return t(v.i18n);
    return fmt(v);
  }

  // ---------- DOM helpers ----------

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(function (c) {
      if (c) node.appendChild(c);
    });
    return node;
  }

  function fieldKey(def, variant, id) {
    return def.id + "-" + variant + "-" + id;
  }

  function selectEl(id, options, current) {
    var s = el("select", { id: id, name: id });
    options.forEach(function (o) {
      var opt = el("option", { value: o[0], text: o[1] });
      if (o[0] === current) opt.selected = true;
      s.appendChild(opt);
    });
    return s;
  }

  // ---------- Instance (one calculator on a page) ----------

  function Instance(root, def) {
    this.root = root;
    this.def = def;
    this.variant = Object.keys(def.variants)[0];
    this.raw = {};
    this.errors = {};
    this.result = null;
    this.resultError = null;
    this.copyState = "";
    this.resetRaw();
  }

  Instance.prototype.variantDef = function () {
    return this.def.variants[this.variant];
  };

  Instance.prototype.resetRaw = function () {
    var self = this;
    var fields = this.variantDef().fields;
    this.raw = {};
    fields.forEach(function (f) {
      if (f.type === "select") self.raw[f.id] = f.default;
      else {
        self.raw[f.id] = f.initial != null ? String(f.initial) : "";
        if (f.unit) {
          if (Array.isArray(f.unit)) {
            self.raw[f.id + "_unit"] = f.unit[0][0];
          } else {
            self.raw[f.unit.id] = f.unit.default;
          }
        }
      }
    });
  };

  Instance.prototype.clear = function () {
    this.errors = {};
    this.result = null;
    this.resultError = null;
    this.copyState = "";
    this.resetRaw();
    this.render();
  };

  Instance.prototype.calculate = function () {
    var self = this;
    var vd = this.variantDef();
    var values = {};
    var hasError = false;
    this.errors = {};
    vd.fields.forEach(function (f) {
      if (f.type === "select") {
        values[f.id] = self.raw[f.id];
        return;
      }
      var r = validateNumber(f, self.raw[f.id]);
      if (r.error) {
        self.errors[f.id] = { key: r.error, n: r.n };
        hasError = true;
      } else {
        values[f.id] = r.value;
      }
      if (f.unit) {
        if (Array.isArray(f.unit)) {
          values[f.id + "_unit"] = self.raw[f.id + "_unit"];
        } else {
          values[f.unit.id] = self.raw[f.unit.id];
        }
      }
    });

    this.result = null;
    this.resultError = null;
    this.copyState = "";
    if (hasError) {
      this.resultError = "calc_fix";
      this.render();
      return;
    }
    var out = vd.compute(values);
    if (out.error) {
      this.resultError = out.error;
      this.lastValues = null;
    } else {
      this.result = out;
      this.lastValues = values;
    }
    this.render();
  };

  Instance.prototype.copyText = function () {
    var r = this.result;
    var lines = [t(r.main.label) + ": " + valueText(r.main.value) + " " + (r.main.unit || "")];
    (r.others || []).forEach(function (o) {
      lines.push(t(o.label) + ": " + valueText(o.value) + " " + (o.unit || ""));
    });
    return lines.join("\n").replace(/ +\n/g, "\n").trim();
  };

  Instance.prototype.copy = function () {
    var self = this;
    var text = this.copyText();
    var done = function () { self.copyState = "ok"; self.render(); };
    var fail = function () { self.copyState = "fail"; self.render(); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
    function fallback() {
      try {
        var ta = el("textarea", { readonly: "readonly" });
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) done(); else fail();
      } catch (e) { fail(); }
    }
  };

  Instance.prototype.buildInputs = function () {
    var self = this;
    var def = this.def;
    var wrap = el("div", { class: "panel" });
    wrap.appendChild(el("h2", { text: t("calc_input_title") }));

    if (Object.keys(def.variants).length > 1) {
      var vid = fieldKey(def, "x", "variant");
      var opts = Object.keys(def.variants).map(function (k) {
        return [k, t(def.variants[k].label)];
      });
      var vsel = selectEl(vid, opts, this.variant);
      vsel.addEventListener("change", function () {
        self.variant = vsel.value;
        self.errors = {};
        self.result = null;
        self.resultError = null;
        self.copyState = "";
        self.resetRaw();
        self.render();
      });
      wrap.appendChild(el("div", { class: "field" }, [
        el("label", { for: vid, text: t("calc_variant") }),
        vsel
      ]));
    }

    this.variantDef().fields.forEach(function (f) {
      var id = fieldKey(def, self.variant, f.id);
      var fieldWrap = el("div", { class: "field" });
      var label = el("label", { for: id, text: t(f.label) });
      fieldWrap.appendChild(label);

      if (f.type === "select") {
        var sel = selectEl(id, f.options.map(function (o) { return [o[0], t(o[1])]; }), self.raw[f.id]);
        sel.setAttribute("data-field", f.id);
        sel.addEventListener("change", function () { self.raw[f.id] = sel.value; });
        fieldWrap.appendChild(sel);
      } else {
        var input = el("input", {
          type: "text", inputmode: "decimal", autocomplete: "off",
          id: id, name: id, value: self.raw[f.id] || "",
          "data-field": f.id, "aria-describedby": id + "-err"
        });
        input.addEventListener("input", function () { self.raw[f.id] = input.value; });
        var row = el("div", { class: "field-row" }, [input]);
        if (f.unit) {
          var uid, opts, defId, defaultId;
          // f.unit may be an object: { id: "unit", options: [...], default: "m" }
          // or an array of pairs: [["kPa","kPa"],["Pa","Pa"]]
          if (Array.isArray(f.unit)) {
            defId = f.unit[0][0]; defaultId = f.unit[0][0];
            opts = f.unit.map(function (pair) { return [pair[0], t(pair[1])]; });
          } else {
            defId = f.unit.id; defaultId = f.unit.default || f.unit.id;
            opts = f.unit.options.map(function (pair) { return [pair[0], t(pair[1])]; });
          }
          var unitKey = f.id + "_unit";
          var uid = fieldKey(def, self.variant, unitKey);
          var usel = selectEl(uid, opts, self.raw[unitKey]);
          usel.setAttribute("data-field", unitKey);
          usel.setAttribute("aria-label", t("calc_unit"));
          usel.addEventListener("change", function () { self.raw[unitKey] = usel.value; });
          row.appendChild(usel);
        }
        fieldWrap.appendChild(row);
        if (f.hint) fieldWrap.appendChild(el("small", { text: t(f.hint) }));
        var err = self.errors[f.id];
        var msg = err ? t(err.key, { n: err.n }) : "";
        fieldWrap.appendChild(el("div", {
          class: "error" + (err ? " show" : ""), id: id + "-err", text: msg, role: "alert"
        }));
        if (err) input.classList.add("invalid");
      }
      wrap.appendChild(fieldWrap);
    });

    var calcBtn = el("button", { type: "button", class: "btn", "data-action": "calculate", text: t("calc_calculate") });
    var clearBtn = el("button", { type: "button", class: "btn btn-secondary", "data-action": "clear", text: t("calc_clear") });
    wrap.appendChild(el("div", { class: "btn-row" }, [calcBtn, clearBtn]));
    return wrap;
  };

  Instance.prototype.buildOutput = function () {
    var self = this;
    var panel = el("div", { class: "panel", "aria-live": "polite" });
    panel.appendChild(el("h2", { text: t("calc_output_title") }));

    if (this.resultError) {
      panel.appendChild(el("p", { class: "msg-error", text: t(this.resultError) }));
      return panel;
    }
    if (!this.result) {
      panel.appendChild(el("p", { class: "result-placeholder", text: t("calc_placeholder") }));
      return panel;
    }

    var r = this.result;
    var box = el("div", { class: "result" });
    box.appendChild(el("div", { class: "label", text: t(r.main.label) }));
    box.appendChild(el("div", { class: "value", text: valueText(r.main.value) + (r.main.unit ? " " + r.main.unit : "") }));

    if (r.others && r.others.length) {
      box.appendChild(el("div", { class: "label", text: t("calc_other"), style: "margin-top:.8rem" }));
      var ul = el("ul", { class: "assumptions", style: "list-style:none;padding:0;margin:0" });
      r.others.forEach(function (o) {
        ul.appendChild(el("li", { text: t(o.label) + ": " + valueText(o.value) + (o.unit ? " " + o.unit : "") }));
      });
      box.appendChild(ul);
    }

    var copyRow = el("div", { class: "btn-row", style: "margin-top:.8rem" });
    var copyBtn = el("button", { type: "button", class: "btn btn-secondary", "data-action": "copy", text: t("calc_copy") });
    copyRow.appendChild(copyBtn);
    if (this.copyState) {
      copyRow.appendChild(el("span", {
        class: "copy-status",
        text: t(this.copyState === "ok" ? "calc_copied" : "calc_copy_fail"),
        style: this.copyState === "ok" ? "" : "color:var(--err)"
      }));
    }
    box.appendChild(copyRow);
    panel.appendChild(box);

    var details = el("div", { class: "details" });
    details.appendChild(el("h3", { text: t("calc_formula") }));
    details.appendChild(el("div", { class: "formula", text: r.formula }));
    details.appendChild(el("h3", { text: t("calc_steps") }));
    details.appendChild(el("div", { class: "steps", text: (r.steps || []).join("\n") }));
    if (r.assumptions && r.assumptions.length) {
      details.appendChild(el("h3", { text: t("calc_assumptions") }));
      var al = el("ul", { class: "assumptions" });
      r.assumptions.forEach(function (k) { al.appendChild(el("li", { text: t(k) })); });
      details.appendChild(al);
    }
    panel.appendChild(details);
    return panel;
  };

  Instance.prototype.render = function () {
    var self = this;
    // Recompute the stored result so formulas and steps follow the current language.
    if (this.result && this.lastValues) {
      var fresh = this.variantDef().compute(this.lastValues);
      if (fresh && !fresh.error) this.result = fresh;
    }
    this.root.innerHTML = "";
    this.root.className = "calc-wrap";
    this.root.appendChild(this.buildInputs());
    this.root.appendChild(this.buildOutput());
    // Keep event handling on the root so it survives re-renders.
  };

  // Editing an input removes the old result, so a stale number is never shown.
  // Only the output panel is replaced; the inputs keep focus and values.
  Instance.prototype.invalidate = function () {
    if (!this.result && !this.resultError) return;
    this.result = null;
    this.resultError = null;
    this.lastValues = null;
    this.copyState = "";
    var old = this.root.querySelector('[aria-live="polite"]');
    var fresh = this.buildOutput();
    if (old && old.parentNode) old.parentNode.replaceChild(fresh, old);
  };

  // ---------- Wiring ----------

  function onRootClick(inst, e) {
    var btn = e.target.closest ? e.target.closest("button[data-action]") : null;
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    if (action === "calculate") inst.calculate();
    else if (action === "clear") inst.clear();
    else if (action === "copy") inst.copy();
  }

  function mountAll() {
    var roots = document.querySelectorAll("[data-calc]");
    Array.prototype.forEach.call(roots, function (root) {
      var def = registry[root.getAttribute("data-calc")];
      if (!def) return;
      var inst = new Instance(root, def);
      instances.push(inst);
      root.addEventListener("click", function (e) { onRootClick(inst, e); });
      ["input", "change"].forEach(function (type) {
        root.addEventListener(type, function (e) {
          if (!e.target || !e.target.hasAttribute || !e.target.hasAttribute("data-field")) return;
          // Text inputs already clear on every "input" event. Their "change" fires on Enter,
          // after the calculation, so it must not clear the new result.
          if (type === "change" && e.target.tagName === "INPUT") return;
          inst.invalidate();
        });
      });
      // Pressing Enter in an input runs the calculation, like a form submit.
      root.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.target && e.target.tagName === "INPUT") {
          e.preventDefault();
          inst.calculate();
        }
      });
      inst.render();
    });
  }

  // Re-render every calculator when the language changes. Entered values and the
  // last result are kept, so only the wording and digit layout change.
  window.addEventListener("tekno:langchange", function () {
    instances.forEach(function (inst) { inst.render(); });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAll);
  } else {
    mountAll();
  }

  TEKNO.parseNumber = parseNumber;
  TEKNO.fmt = fmt;
})();
