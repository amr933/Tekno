/* TEKNO site behaviour: shared header/footer, language switch, homepage,
 * tools directory with search and category filter. */
(function () {
  "use strict";

  var TEKNO = window.TEKNO;
  var t = TEKNO.t;

  // Tool catalogue. file is relative to /tools/. keywords are English so that
  // search also works from the Arabic interface.
  var TOOLS = TEKNO.registry;
  var CATEGORIES = TEKNO.disciplines;

  function keyOf(id, suffix) {
    return "calc_" + id.replace(/-/g, "_") + "_" + suffix;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function root() {
    return document.body.getAttribute("data-root") || "";
  }

  // ---------- Shared chrome ----------

  function renderChrome() {
    var r = root();
    var page = document.body.getAttribute("data-page") || "";

    var header = document.getElementById("site-header");
    if (header) {
      var homeLink = el("a", { href: r + "index.html", "data-key": "nav_home" });
      var toolsLink = el("a", { href: r + "tools.html", "data-key": "nav_tools" });
      if (page === "home") homeLink.setAttribute("aria-current", "page");
      if (page === "tools" || page === "calc") toolsLink.setAttribute("aria-current", "page");
      var nav = el("nav", { class: "nav", "aria-label": "Main" }, [
        homeLink,
        toolsLink,
        el("button", { type: "button", class: "lang-switch", id: "lang-toggle", "data-key": "lang_btn" })
      ]);
      header.innerHTML = "";
      header.appendChild(el("header", { class: "site-header" }, [
        el("div", { class: "container header-inner" }, [
          el("a", { class: "logo", href: r + "index.html", "aria-label": "TEKNO home" }, [
            document.createTextNode("TEKNO"),
            el("span", { "data-key": "tagline" })
          ]),
          nav
        ])
      ]));
    }

    var footer = document.getElementById("site-footer");
    if (footer) {
      var roadmap = el("ul", { class: "pill-list", style: "margin-top:.4rem" }, [
        el("li", { "data-key": "roadmap_1" }),
        el("li", { "data-key": "roadmap_2" }),
        el("li", { "data-key": "roadmap_3" })
      ]);
      footer.innerHTML = "";
      footer.appendChild(el("footer", { class: "site-footer" }, [
        el("div", { class: "container" }, [
          el("div", { class: "grid", style: "grid-template-columns: 2fr 1.4fr" }, [
            el("div", null, [
              el("div", { class: "logo", text: "TEKNO" }),
              el("p", { class: "muted", "data-key": "footer_about", style: "margin-top:.5rem" })
            ]),
            el("div", null, [
              el("h3", { "data-key": "footer_roadmap_heading", style: "font-size:1rem" }),
              roadmap,
              el("p", { class: "muted", "data-key": "roadmap_note", style: "margin-top:.6rem;font-size:.85rem" })
            ])
          ]),
          el("p", { class: "muted", "data-key": "footer_disclaimer", style: "margin-top:1.5rem;font-size:.85rem" }),
          el("p", { class: "muted", "data-key": "footer_copy", style: "font-size:.85rem" })
        ])
      ]));
    }

    var toggle = document.getElementById("lang-toggle");
    if (!toggle) toggle = document.querySelector(".lang-switch");
    if (toggle) toggle.addEventListener("click", function () {
      setLang(TEKNO.lang === "ar" ? "en" : "ar");
    });
  }

  // ---------- Language ----------

  function setLang(lang) {
    TEKNO.lang = lang;
    try { localStorage.setItem("tekno-lang", lang); } catch (e) { /* ignore */ }
    applyLang();
    window.dispatchEvent(new Event("tekno:langchange"));
  }
  TEKNO.setLang = setLang;

  function applyLang() {
    var lang = TEKNO.lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n],[data-key]"), function (node) {
      var key = node.getAttribute("data-i18n") || node.getAttribute("data-key");
      if (key && TEKNO.keys[key]) node.textContent = t(key);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-attr]"), function (node) {
      // Format: attr:key
      var parts = node.getAttribute("data-i18n-attr").split(":");
      node.setAttribute(parts[0], t(parts[1]));
    });

    var titleKey = document.body.getAttribute("data-title-key");
    if (titleKey) document.title = t(titleKey) + " | TEKNO";
    var descKey = document.body.getAttribute("data-desc-key");
    var meta = document.querySelector('meta[name="description"]');
    if (descKey && meta) meta.setAttribute("content", t(descKey));

    var toggle = document.getElementById("lang-toggle") || document.querySelector(".lang-switch");
    if (toggle) toggle.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");

    renderDynamic();
  }

  // ---------- Cards ----------

  function toolCard(tool) {
    var r = root();
    return el("a", { class: "card", href: r + "tools/" + tool.file }, [
      el("span", { class: "tag", text: t("cat_" + tool.cat) }),
      el("h3", { text: t(keyOf(tool.id, "title")) }),
      el("p", { text: t(keyOf(tool.id, "desc")) })
    ]);
  }

  function clearAndFill(node, items) {
    if (!node) return;
    node.innerHTML = "";
    items.forEach(function (i) { node.appendChild(i); });
  }

  function countIn(cat) {
    return TOOLS.filter(function (x) { return x.cat === cat; }).length;
  }

  // ---------- Home ----------

  function renderHome() {
    var r = root();
    var disc = document.getElementById("discipline-grid");
    clearAndFill(disc, CATEGORIES.map(function (c) {
      return el("a", { class: "card", href: r + "tools.html?cat=" + c }, [
        el("h3", { text: t("cat_" + c) }),
        el("p", { text: t("results_count", { n: countIn(c) }) })
      ]);
    }));

    var popular = TOOLS.filter(function (x) { return x.popular; });
    clearAndFill(document.getElementById("popular-grid"), popular.map(toolCard));

    var recent = TOOLS.slice().sort(function (a, b) { return a.added < b.added ? 1 : -1; }).slice(0, 4);
    clearAndFill(document.getElementById("recent-grid"), recent.map(toolCard));
  }

  function bindHomeSearch() {
    var form = document.getElementById("home-search");
    if (!form || form.__bound) return;
    form.__bound = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = document.getElementById("home-q").value.trim();
      window.location.href = root() + "tools.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }

  // ---------- Tools directory ----------

  var dirState = { q: "", cat: "" };

  function matches(tool, q) {
    if (!q) return true;
    var hay = (t(keyOf(tool.id, "title")) + " " + t(keyOf(tool.id, "desc")) + " " +
      t("cat_" + tool.cat) + " " + tool.keywords + " " + tool.id).toLowerCase();
    return q.toLowerCase().split(/\s+/).every(function (word) {
      return hay.indexOf(word) !== -1;
    });
  }

  function renderTools() {
    var grid = document.getElementById("tools-grid");
    if (!grid) return;
    var list = TOOLS.filter(function (tool) {
      return (!dirState.cat || tool.cat === dirState.cat) && matches(tool, dirState.q);
    });
    clearAndFill(grid, list.map(toolCard));

    var empty = document.getElementById("tools-empty");
    if (empty) empty.hidden = list.length > 0;
    var count = document.getElementById("tools-count");
    if (count) count.textContent = t("results_count", { n: list.length });

    var chips = document.getElementById("tools-chips");
    if (chips && !chips.getAttribute("data-built")) {
      chips.setAttribute("data-built", "1");
      var all = [""].concat(CATEGORIES);
      chips.innerHTML = "";
      all.forEach(function (c) {
        var b = el("button", { type: "button", class: "chip", "data-cat": c,
          "aria-pressed": "false" });
        b.textContent = c ? t("cat_" + c) : t("filter_all");
        b.addEventListener("click", function () {
          dirState.cat = c;
          renderTools();
        });
        chips.appendChild(b);
      });
    }
    if (chips) {
      Array.prototype.forEach.call(chips.querySelectorAll(".chip"), function (b) {
        var c = b.getAttribute("data-cat");
        b.setAttribute("aria-pressed", String(c === dirState.cat));
        b.textContent = c ? t("cat_" + c) : t("filter_all");
      });
    }
  }

  function bindToolsSearch() {
    var input = document.getElementById("tools-q");
    if (!input || input.__bound) return;
    input.__bound = true;
    input.addEventListener("input", function () {
      dirState.q = input.value.trim();
      renderTools();
    });
  }

  function readToolsParams() {
    var params = new URLSearchParams(window.location.search);
    dirState.q = (params.get("q") || "").trim();
    var cat = params.get("cat") || "";
    dirState.cat = CATEGORIES.indexOf(cat) !== -1 ? cat : "";
    var input = document.getElementById("tools-q");
    if (input) input.value = dirState.q;
  }

  // Re-render dynamic lists whenever wording changes.
  function renderDynamic() {
    if (document.getElementById("discipline-grid")) renderHome();
    if (document.getElementById("tools-grid")) renderTools();
  }

  // ---------- Start ----------

  function init() {
    renderChrome();
    bindHomeSearch();
    bindToolsSearch();
    readToolsParams();
    applyLang();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
