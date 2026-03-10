document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when a nav link is clicked
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  });

  // Navbar Style Effect (Always applied for Single Page Layout)
  const navbar = document.getElementById("navbar");
  navbar.classList.add("scrolled"); // Force background for better contrast

  // Single Page Navigation Logic
  const sections = document.querySelectorAll("section");
  const allLinks = document.querySelectorAll('a[href^="#"]');

  function showSection(sectionId) {
    // Handle '#' edge cases
    if (sectionId === "#") sectionId = "#home";

    // Remove active class from all sections
    sections.forEach((sec) => {
      sec.classList.remove("active-page");
      sec.scrollTop = 0; // Reset scroll position when hiding
    });

    // Add active class to target section
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
      targetSection.classList.add("active-page");

      // Trigger animations on elements inside newly visible section
      const animatedElements = targetSection.querySelectorAll(
        ".project-card, .timeline-item, .skills-grid, .about-description, .hero-content",
      );
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 100); // Stagger animations
      });
    }

    // Update Navigation Links
    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === sectionId) {
        link.classList.add("active");
      }
    });
  }

  // Handle initial load based on URL hash
  window.addEventListener("load", () => {
    const hash = window.location.hash || "#home";
    showSection(hash);
  });

  // Handle manual clicks on any hash link (nav or buttons)
  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId =
        document.activeElement.getAttribute("href") ||
        link.getAttribute("href");

      // Update URL hash without causing a page jump
      history.pushState(null, null, targetId);

      // Show corresponding section
      showSection(targetId);
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    const hash = window.location.hash || "#home";
    showSection(hash);
  });

  // Contact Form Submission Mock
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic visual feedback
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        'Sending... <i class="fas fa-spinner fa-spin" style="margin-left: 5px;"></i>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.8";

      // Mock network request (simulate 1.5s delay)
      setTimeout(() => {
        submitBtn.innerHTML =
          'Message Sent! <i class="fas fa-check" style="margin-left: 5px;"></i>';
        submitBtn.style.backgroundColor = "#10b981"; // Success green
        submitBtn.style.borderColor = "#10b981";
        submitBtn.style.color = "#fff";
        this.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.borderColor = "";
          submitBtn.style.color = "";
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }, 3000);
      }, 1500);
    });
  }

  // Theme Toggle Logic
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn.querySelector("i");

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;

  if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-moon"; // Moon icon to switch back to dark
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-sun"; // Sun icon to switch to light
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.className = "fas fa-sun";
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.className = "fas fa-moon";
      localStorage.setItem("portfolio-theme", "light");
    }
  });

  // Set initial state for animated elements, they will be animated by showSection()
  const allAnimatedElements = document.querySelectorAll(
    ".project-card, .timeline-item, .skills-grid, .about-description, .hero-content",
  );
  allAnimatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  });
});
