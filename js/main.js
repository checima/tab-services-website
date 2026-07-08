/* TAB Services Company — interactions
   Sticky header · mobile menu · scroll reveals · stat count-up */
(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    // close on any link tap
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero reveals (fire ASAP — never wait on the heavy video) ---------- */
  function revealHero() {
    var heroBits = document.querySelectorAll(".hero .reveal");
    heroBits.forEach(function (el, i) {
      el.style.transitionDelay = (0.15 + i * 0.16) + "s";
      el.classList.add("in");
    });
  }
  if (document.readyState !== "loading") requestAnimationFrame(revealHero);
  else document.addEventListener("DOMContentLoaded", revealHero);

  /* ---------- Scroll-triggered reveals ---------- */
  var revealEls = document.querySelectorAll(".reveal:not(.hero .reveal)");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger items within a shared grid
        var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .reveal") : [el];
        var idx = Array.prototype.indexOf.call(siblings, el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx, 6) * 0.08 : 0) + "s";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Stat count-up ---------- */
  function animateCount(el) {
    if (el.dataset.plain === "true" || reduceMotion) { return; }
    var target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    var suffix = el.dataset.suffix || "";
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var statNums = document.querySelectorAll(".stat__num[data-count]");
  if ("IntersectionObserver" in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); statIO.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statIO.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var answer = item.querySelector(".faq__a");
      var isOpen = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(isOpen));
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });
  // initialize any item marked open by default
  document.querySelectorAll(".faq__item.open .faq__a").forEach(function (a) {
    a.style.maxHeight = a.scrollHeight + "px";
    var q = a.closest(".faq__item").querySelector(".faq__q");
    if (q) q.setAttribute("aria-expanded", "true");
  });
  // keep open answers sized correctly on resize
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq__item.open .faq__a").forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + "px";
    });
  });

  /* ---------- File upload label ---------- */
  document.querySelectorAll(".upload input[type=file]").forEach(function (input) {
    input.addEventListener("change", function () {
      var out = input.closest(".upload").querySelector(".upload__file");
      if (!out) return;
      out.textContent = input.files && input.files.length ? input.files[0].name : "";
    });
  });

  /* ---------- Secure form submit (Quote + Contact via Netlify function) ---------- */
  document.querySelectorAll("form[data-web3form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector("[type=submit]");
    var successMsg = form.getAttribute("data-success") || "Thank you! Your message has been sent.";
    var endpoint = form.getAttribute("action") || "/.netlify/functions/contact";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var original = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setStatus("", "");

      // Send multipart (preserves file uploads) when a file is attached; JSON otherwise.
      var fileInput = form.querySelector("input[type=file]");
      var hasFile = fileInput && fileInput.files && fileInput.files.length > 0;
      var opts;
      if (hasFile) {
        opts = { method: "POST", body: new FormData(form) };
      } else {
        var payload = {};
        new FormData(form).forEach(function (value, key) { payload[key] = value; });
        opts = {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        };
      }

      fetch(endpoint, opts)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.success) {
            setStatus("success", successMsg);
            form.reset();
            var f = form.querySelector(".upload__file"); if (f) f.textContent = "";
          } else {
            setStatus("error", (data && data.message) || "Something went wrong. Please email us directly.");
          }
        })
        .catch(function () {
          setStatus("error", "Network error. Please email us directly at estimating@tabservicescolorado.com.");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = original; }
        });
    });

    function setStatus(type, msg) {
      if (!status) return;
      status.className = "form-status" + (type ? " show " + type : "");
      status.textContent = msg;
    }
  });
})();
