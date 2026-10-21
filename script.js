
/* ========================================
   ANKIT.DEV — Main JavaScript
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------
  // 1. Mobile Navigation Menu
  // --------------------------------------

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
      });
    });

    // Close menu when switching to desktop width
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      }
    });
  }

  // --------------------------------------
  // 2. Dark / Light Theme Toggle
  // --------------------------------------

  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  function applyTheme(theme) {
    const isLight = theme === "light";

    body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
      themeToggle.textContent = isLight ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.title = isLight
        ? "Switch to dark theme"
        : "Switch to light theme";
    }
  }

  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("ankit-dev-theme");
  } catch (error) {
    // Theme still works if browser storage is unavailable.
  }

  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = body.classList.contains("light-theme")
        ? "dark"
        : "light";

      applyTheme(nextTheme);

      try {
        localStorage.setItem("ankit-dev-theme", nextTheme);
      } catch (error) {
        // Theme changes for the current page even without storage.
      }
    });
  }

  // --------------------------------------
  // 3. Typing Animation
  // --------------------------------------

  const typingElement = document.getElementById("typing-text");

  if (typingElement) {
    const words = [
      "Web Developer",
      "Frontend Developer",
      "BCA Student",
      "Freelance Developer"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeText() {
      const currentWord = words[wordIndex];

      if (!deleting) {
        characterIndex++;
        typingElement.textContent = currentWord.slice(0, characterIndex);

        if (characterIndex >= currentWord.length) {
          deleting = true;
          setTimeout(typeText, 1400);
          return;
        }

        setTimeout(typeText, 100);
      } else {
        characterIndex--;
        typingElement.textContent = currentWord.slice(0, characterIndex);

        if (characterIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeText, 350);
          return;
        }

        setTimeout(typeText, 45);
      }
    }

    typingElement.textContent = "";
    typeText();
  }

  // --------------------------------------
  // 4. Automatically Update Footer Year
  // --------------------------------------

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------
  // 5. Highlight Current Navigation Page
  // --------------------------------------

  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  const pageName = currentPage || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (!linkPage || linkPage.startsWith("#")) {
      return;
    }

    const normalizedLink = linkPage.split("/").pop().toLowerCase();

    if (normalizedLink === pageName) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  // --------------------------------------
  // 6. Profile Photo Fallback
  // --------------------------------------

  const profilePhoto = document.querySelector(".profile-photo");
  const photoFallback = document.getElementById("photo-fallback");

  if (profilePhoto && photoFallback) {
    function showPhotoFallback() {
      profilePhoto.style.display = "none";
      photoFallback.style.display = "flex";
    }

    profilePhoto.addEventListener("error", showPhotoFallback);

    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
      showPhotoFallback();
    }
  }

  // --------------------------------------
  // 7. Current Year for All Footer Elements
  // --------------------------------------

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  console.log("ANKIT.DEV website JavaScript loaded successfully.");
});
