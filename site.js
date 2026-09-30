// ErideCommerce shared behaviour: mobile menu, header shadow, reveal-on-scroll, forms.
(function () {
  // Where enquiry and audit forms are sent. Swap for a Formspree/CRM endpoint when ready.
  var CONTACT_EMAIL = "ahmadhaidertariq@gmail.com";

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".navlinks a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Highlight the current page in the navigation.
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(function (link) {
    if (link.getAttribute("href") === here) link.setAttribute("aria-current", "page");
  });

  // Reveal-on-scroll.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Forms open a pre-filled email so every enquiry actually reaches the team.
  document.querySelectorAll("form[data-mail]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      var lines = [];
      form.querySelectorAll("input, select, textarea").forEach(function (field) {
        if (!field.name || !field.value) return;
        lines.push(field.name + ": " + field.value);
      });
      var subject = form.getAttribute("data-mail") + " - " + (form.elements.brand && form.elements.brand.value || form.elements.name.value);
      location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      var status = form.querySelector(".form-status");
      if (status) {
        status.className = "form-status ok";
        status.textContent = "Your email app should open with the details filled in. Just press send.";
      }
    });
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
