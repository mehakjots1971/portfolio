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

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active Link Highlighting based on scroll position
  const sections = document.querySelectorAll("section");

  function highlightNavLink() {
    let scrollY = window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Account for fixed navbar
      const sectionId = current.getAttribute("id");
      const navLink = document.querySelector(
        `.nav-links a[href*=${sectionId}]`,
      );

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          // Remove active class from all links
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active");
          });
          // Add active class to current section link
          navLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // Initial highlight check on load
  highlightNavLink();

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

  // Scroll Animations using Intersection Observer
  const animatedElements = document.querySelectorAll(
    ".project-card, .timeline-item, .skills-grid, .about-description",
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // Trigger when 15% of the element is visible
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add staggered animation by slightly delaying based on index could be done via CSS,
        // but simple opacity/transform works well here.
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Set initial state for animated elements
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    scrollObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
