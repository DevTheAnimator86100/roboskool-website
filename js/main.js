document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1. NAVBAR SCROLL EFFECT (GLASSMORPHISM)
  // =========================================================
  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
      }
    });
  }

  // =========================================================
  // 2. MOBILE MENU TOGGLE
  // =========================================================
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  let isMenuOpen = false;

  if (mobileBtn && mobileMenu && menuIcon) {
    mobileBtn.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        // Show menu
        mobileMenu.classList.remove("hidden");
        // Change hamburger icon to an 'X'
        menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
      } else {
        // Hide menu
        mobileMenu.classList.add("hidden");
        // Change 'X' icon back to hamburger
        menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
      }
    });
  }

  // =========================================================
  // 3. COURSES TAB SWITCHING LOGIC
  // =========================================================
  const tabBtns = document.querySelectorAll(".course-tab-btn");
  const tracks = document.querySelectorAll(".course-track");

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        // Hide all tracks
        tracks.forEach((track) => {
          track.classList.remove("active");
          track.classList.add("hidden");
        });

        // Show target track
        const targetId = btn.getAttribute("data-target");
        const targetTrack = document.getElementById(targetId);

        if (targetTrack) {
          targetTrack.classList.remove("hidden");
          // Small timeout to allow display:block to apply before animating opacity
          setTimeout(() => {
            targetTrack.classList.add("active");
          }, 10);
        }
      });
    });
  }

  // =========================================================
  // 4. DYNAMIC FOOTER YEAR
  // =========================================================
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // =========================================================
  // 5. LIVE MONGODB CONTACT FORM SUBMISSION
  // =========================================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop the page from reloading

      // Grab the button to show a loading state
      const btn = contactForm.querySelector('button[type="submit"]');
      const btnText = btn.querySelector("span");
      const originalText = btnText.textContent;

      // Show UI working state
      btnText.textContent = "Securing Data...";
      btn.disabled = true;

      // Gather the data from your HTML inputs
      const inputs = contactForm.querySelectorAll(".premium-input");
      const formData = {
        name: inputs[0] ? inputs[0].value : "",
        email: inputs[1] ? inputs[1].value : "",
        subject: inputs[2] ? inputs[2].value : "",
        message: inputs[3] ? inputs[3].value : "",
      };

      try {
        // Send the data to your 24/7 Netlify backend
        const response = await fetch("/.netlify/functions/submitContact", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });

        // Handle Success or Failure
        if (response.ok) {
          btnText.textContent = "Message Secured!";
          contactForm.reset(); // Clear the form fields
        } else {
          btnText.textContent = "Error Sending";
        }
      } catch (error) {
        console.error("Network Error:", error);
        btnText.textContent = "Connection Failed";
      }

      // Reset the button back to normal after 3 seconds
      setTimeout(() => {
        btnText.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    });
  }
});
