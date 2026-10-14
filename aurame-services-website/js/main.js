/* ==========================================================================
   Aurame Services Pvt. Ltd. - main.js
   Author: Web Development Intern
   Purpose: Small, beginner-friendly JS features used across all pages.
   1) Auto-close mobile navbar after clicking a link
   2) Smooth scrolling for same-page anchor links
   3) Contact form validation (contact.html)
   4) Scroll-to-top button
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ------------------------------------------------------------------
     1) MOBILE NAVBAR: close the collapsed menu automatically
        after the user taps a nav link (nicer experience on phones)
  ------------------------------------------------------------------ */
  var navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  var navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse.classList.contains("show")) {
        // Use Bootstrap's Collapse component to hide the menu
        var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true,
        });
      }
    });
  });

  /* ------------------------------------------------------------------
     2) SMOOTH SCROLL for links that point to an on-page section
        Example: <a href="#services">Services</a>
  ------------------------------------------------------------------ */
  var anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      var targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ------------------------------------------------------------------
     3) CONTACT FORM VALIDATION
        Runs only on contact.html where the form with id="contactForm"
        exists. Checks that required fields are filled correctly
        before "sending" the message.
  ------------------------------------------------------------------ */
  var contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // stop actual submission since there is no backend

      var isValid = true;

      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var message = document.getElementById("message");

      // Reset previous validation states
      [name, email, phone, message].forEach(function (field) {
        field.classList.remove("is-invalid");
      });

      // Name check - must not be empty
      if (name.value.trim() === "") {
        name.classList.add("is-invalid");
        isValid = false;
      }

      // Email check - simple pattern match
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add("is-invalid");
        isValid = false;
      }

      // Phone check - digits only, 10 to 15 characters
      var phonePattern = /^[0-9]{10,15}$/;
      if (!phonePattern.test(phone.value.trim())) {
        phone.classList.add("is-invalid");
        isValid = false;
      }

      // Message check - must not be empty
      if (message.value.trim() === "") {
        message.classList.add("is-invalid");
        isValid = false;
      }

      var successBox = document.getElementById("formSuccessMsg");

      if (isValid) {
        // No backend/API is connected, so we just show a success message
        successBox.classList.remove("d-none");
        contactForm.reset();

        // Hide the message again after a few seconds
        setTimeout(function () {
          successBox.classList.add("d-none");
        }, 5000);
      } else {
        successBox.classList.add("d-none");
      }
    });
  }

  /* ------------------------------------------------------------------
     4) SCROLL TO TOP BUTTON
        Shows the button after scrolling down 300px, hides it near
        the top of the page again.
  ------------------------------------------------------------------ */
  var scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

});
