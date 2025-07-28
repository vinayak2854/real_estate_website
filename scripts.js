// Custom JavaScript for Call Us Real Estate Website

// Declare AOS and bootstrap variables
const AOS = window.AOS;
const bootstrap = window.bootstrap;

// Only declare navbar once at the top
const navbar = document.querySelector(".navbar");

// Global variables for projects functionality
let allProjects = [];
let filteredProjects = [];
let currentPage = 1;
const projectsPerPage = 6;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Smooth scrolling for navbar links
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white", "shadow");
    } else {
      navbar.classList.remove("bg-white", "shadow");
    }
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Live counter for stats section
  function animateLiveStats() {
    const stats = document.querySelectorAll(".live-stat");
    stats.forEach((stat) => {
      const target = +stat.getAttribute("data-target");
      let count = 0;
      const increment = Math.ceil(target / 100);
      function update() {
        if (count < target) {
          count += increment;
          if (count > target) count = target;
          stat.textContent = count + (target < 100 ? "+" : "+");
          setTimeout(update, 20);
        } else {
          stat.textContent = target + "+";
        }
      }
      update();
    });
  }
  // Trigger animation when stats section is visible
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateLiveStats();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(statsSection);
  }

  // Form submission handling
  const forms = document.querySelectorAll('form[action*="formspree"]');
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const phoneInput = this.querySelector('input[name="phone"]');
      if (phoneInput) {
        const phoneValue = phoneInput.value.trim();
        if (!/^\d{10}$/.test(phoneValue)) {
          e.preventDefault();
          showNotification(
            "Please enter a valid 10-digit phone number.",
            "danger"
          );
          phoneInput.focus();
          return;
        }
      }
      e.preventDefault();

      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual Formspree endpoint)
      setTimeout(() => {
        // Show success message
        showNotification(
          "Message sent successfully! We will get back to you soon.",
          "success"
        );

        // Reset form
        this.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Close modal if exists
        const modal = bootstrap.Modal.getInstance(
          document.querySelector(".modal.show")
        );
        if (modal) {
          modal.hide();
        }
      }, 2000);
    });
  });

  // Project enquiry modal handling
  const enquiryModal = document.getElementById("enquiryModal");
  if (enquiryModal) {
    enquiryModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const projectName = button.getAttribute("data-project");
      const projectInput = enquiryModal.querySelector("#projectName");
      if (projectInput && projectName) {
        projectInput.value = projectName;
      }
    });
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText =
      "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("loading");
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Navbar animation on scroll
  function handleNavbarVisibility() {
    if (window.scrollY > 10) {
      navbar.classList.add("visible");
    } else {
      navbar.classList.add("visible"); // Always visible on load
    }
  }
  handleNavbarVisibility();
  window.addEventListener("scroll", handleNavbarVisibility);

  // Hero Section Image Slider (with unique content)
  const heroSlider = document.getElementById("hero-slider");
  const heroContent = [
    {
      imgDesktop: "images/project-name-slide1.webp",
      imgMobile: "images/project-name-slide1-mobile.webp",
      headline:
        "FIND YOUR DREAMS <br><span class='text-warning'>HOUSE BY US</span>",
      subtext:
        "Your trusted partner in real estate. We help you find your perfect home with hassle-free experience.",
      buttons: [
        {
          text: "View Projects",
          href: "projects.html",
          class: "btn btn-warning btn-lg px-4",
        },
        {
          text: "Contact Us",
          href: "contact.html",
          class: "btn btn-outline-light btn-lg px-4",
        },
      ],
    },
    {
      imgDesktop: "images/project-name-slide2.webp",
      imgMobile: "images/project-name-slide2-mobile.webp",
      headline: "EXCLUSIVE <br><span class='text-warning'>PROPERTIES</span>",
      subtext:
        "Discover premium properties in Thane, Mumbai, and beyond. Expert guidance for every step.",
      buttons: [
        {
          text: "Explore Now",
          href: "projects.html",
          class: "btn btn-warning btn-lg px-4",
        },
      ],
    },
    {
      imgDesktop: "images/project-name-slide3.webp",
      imgMobile: "images/project-name-slide3-mobile.webp",
      headline:
        "TRUSTED <br><span class='text-warning'>REAL ESTATE PARTNER</span>",
      subtext:
        "10+ years of experience, 500+ projects, 950+ happy clients. Your satisfaction is our priority.",
      buttons: [
        {
          text: "Testimonials",
          href: "testimonials.html",
          class: "btn btn-outline-light btn-lg px-4",
        },
      ],
    },
    {
      imgDesktop: "images/project-name-slide4.webp",
      imgMobile: "images/project-name-slide4-mobile.webp",
      headline: "BOOK A <br><span class='text-warning'>SITE VISIT</span>",
      subtext:
        "Schedule a visit, get a brochure, or talk to our experts. We are here to help you!",
      buttons: [
        {
          text: "Book Now",
          href: "contact.html",
          class: "btn btn-warning btn-lg px-4",
        },
      ],
    },
  ];
  if (heroSlider) {
    function getHeroContent() {
      if (window.innerWidth <= 768) {
        return heroContent.map((c) => ({ ...c, img: c.imgMobile }));
      } else {
        return heroContent.map((c) => ({ ...c, img: c.imgDesktop }));
      }
    }
    function setupSlider() {
      heroSlider.innerHTML = "";
      const slides = getHeroContent();
      slides.forEach((slide, idx) => {
        const img = document.createElement("img");
        img.src = slide.img;
        img.alt = `Hero Slide ${idx + 1}`;
        img.className =
          (window.innerWidth <= 768 ? "mobile" : "desktop") +
          (idx === 0 ? " active" : "");
        heroSlider.appendChild(img);
      });
      // Set up content
      const heroContainer = document.querySelector(
        ".hero-section .container .row.align-items-center"
      );
      if (heroContainer) {
        heroContainer.innerHTML = `
          <div class="col-12 col-lg-8 mx-auto text-center text-lg-start" data-aos="fade-right">
            <h1 class="display-3 fw-bold text-white mb-4 hero-headline"></h1>
            <p class="lead text-white mb-4 hero-subtext"></p>
            <div class="d-flex flex-wrap gap-3 mb-4 hero-buttons justify-content-center justify-content-lg-start"></div>
          </div>
        `;
      }
    }
    let current = 0;
    function updateHeroContent(idx) {
      const slides = getHeroContent();
      const slide = slides[idx];
      const headline = document.querySelector(".hero-headline");
      const subtext = document.querySelector(".hero-subtext");
      const buttons = document.querySelector(".hero-buttons");
      if (headline) headline.innerHTML = slide.headline;
      if (subtext) subtext.textContent = slide.subtext;
      if (buttons) {
        buttons.innerHTML = "";
        slide.buttons.forEach((btn) => {
          const a = document.createElement("a");
          a.href = btn.href;
          a.className = btn.class;
          a.innerHTML = btn.text;
          buttons.appendChild(a);
        });
      }
    }
    setupSlider();
    updateHeroContent(0);
    let images = heroSlider.querySelectorAll("img");
    setInterval(() => {
      images = heroSlider.querySelectorAll("img");
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
      updateHeroContent(current);
    }, 2000); // Faster: 2s per slide
    window.addEventListener("resize", () => {
      setupSlider();
      current = 0;
      images = heroSlider.querySelectorAll("img");
      updateHeroContent(current);
    });
  }

  // Search functionality (if needed)
  const searchInput = document.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const cards = document.querySelectorAll(".project-card, .blog-card");

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Initialize floating contact buttons
  initializeFloatingContactButtons();

  // Back to top button
  if (!document.getElementById("backToTopBtn")) {
    const backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTopBtn";
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = "btn btn-primary position-fixed back-to-top-btn";
    backToTopBtn.style.cssText =
      "bottom: 20px; right: 20px; z-index: 999; border-radius: 50%; width: 56px; height: 56px; opacity: 0; visibility: hidden; pointer-events: none; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);";
    backToTopBtn.onclick = () =>
      window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(backToTopBtn);

    // Scroll-based visibility for back to top button
    const scrollThreshold = 300;
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.visibility = "visible";
        backToTopBtn.style.pointerEvents = "auto";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
        backToTopBtn.style.pointerEvents = "none";
      }
    });
  }

  // Loading animation for page elements
  const loadingElements = document.querySelectorAll(".loading");
  loadingElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("loaded");
    }, index * 100);
  });

  // Mobile menu close on link click
  const mobileNavLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Preloader (optional)
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    });
  }

  // Initialize tooltips and popovers
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  popoverTriggerList.map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  // Testimonial Slider Functionality
  function initTestimonialSlider() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const leftBtn = document.querySelector(".testimonial-arrow-left");
    const rightBtn = document.querySelector(".testimonial-arrow-right");
    const dotsContainer = document.querySelector(".testimonial-dots");
    let current = 0;
    let autoSlideInterval;
    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === idx);
        if (dotsContainer) {
          const dot = dotsContainer.children[i];
          if (dot) dot.classList.toggle("active", i === idx);
        }
      });
      current = idx;
    }
    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, 2000);
    }
    function stopAutoSlide() {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    }
    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.className = "testimonial-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => {
          showSlide(i);
          startAutoSlide();
        });
        dotsContainer.appendChild(dot);
      });
      showSlide(0); // Ensure first dot is active
    }
    // Arrow events
    if (leftBtn) {
      leftBtn.onclick = () => {
        showSlide((current - 1 + slides.length) % slides.length);
        startAutoSlide();
      };
    }
    if (rightBtn) {
      rightBtn.onclick = () => {
        showSlide((current + 1) % slides.length);
        startAutoSlide();
      };
    }
    // Swipe for mobile (fix: use touchmove)
    let startX = null;
    let moveX = null;
    const slider = document.querySelector(".testimonial-slider");
    if (slider) {
      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        moveX = null;
      });
      slider.addEventListener("touchmove", (e) => {
        moveX = e.touches[0].clientX;
      });
      slider.addEventListener("touchend", (e) => {
        if (startX === null || moveX === null) return;
        const diff = moveX - startX;
        if (diff > 40) leftBtn.click();
        else if (diff < -40) rightBtn.click();
        startX = null;
        moveX = null;
      });
    }
    // Auto-slide every 4s
    startAutoSlide();
  }
  document.addEventListener("DOMContentLoaded", initTestimonialSlider);
  window.addEventListener("load", initTestimonialSlider);

  // Off-canvas mobile drawer menu logic
  const drawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerHamburger = document.getElementById("drawerHamburger");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");

  function openDrawer() {
    drawer.classList.add("open");
    drawerOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    if (drawerHamburger) drawerHamburger.style.display = "none";
    if (drawerCloseBtn) drawerCloseBtn.style.display = "flex";
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
    document.body.style.overflow = "";
    if (drawerHamburger) drawerHamburger.style.display = "flex";
    if (drawerCloseBtn) drawerCloseBtn.style.display = "none";
  }
  if (drawerHamburger) {
    drawerHamburger.addEventListener("click", openDrawer);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", closeDrawer);
  }
  // Close drawer on nav link click (for SPA feel)
  document.querySelectorAll(".drawer-nav a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Initialize projects functionality if on projects page
  if (document.getElementById("projectsContainer")) {
    initializeProjects();
  }

  // Initialize enquiry modal functionality for projects
  initializeEnquiryModal();

  // --- Our Brands logos continuous scroll fix ---
  const logosTrack = document.querySelector(".brand-logos-scroll .logos-track");
  if (logosTrack) {
    // Remove any previous clones to avoid compounding
    const logos = Array.from(logosTrack.children).slice(0); // Only original 5
    // Remove all children
    while (logosTrack.firstChild) logosTrack.removeChild(logosTrack.firstChild);
    // Append original logos
    logos.forEach((logo) => logosTrack.appendChild(logo.cloneNode(true)));
    // Append one full duplicate set for seamless loop
    logos.forEach((logo) => logosTrack.appendChild(logo.cloneNode(true)));
    // Calculate width of one set
    setTimeout(() => {
      const setWidth = Array.from(logosTrack.children)
        .slice(0, 5)
        .reduce((acc, el) => acc + el.offsetWidth, 0);
      logosTrack.style.width = setWidth * 2 + "px";
      logosTrack.style.display = "flex";
      // Set animation
      logosTrack.style.animation = `scroll-logos-js 15s linear infinite`;
      // Inject keyframes for exact width
      const styleId = "brand-logos-scroll-keyframes";
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = `@keyframes scroll-logos-js { 0% { transform: translateX(0); } 100% { transform: translateX(-${setWidth}px); } }`;
    }, 100); // Wait for DOM to render
  }

  // Console log for debugging
  console.log("Call Us Real Estate Website - Scripts Loaded Successfully!");
});

// ===== PROJECTS FUNCTIONALITY =====

// API function to fetch projects data
async function fetchProjectsData() {
  try {
    const response = await fetch("./projects-data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Initialize projects functionality
async function initializeProjects() {
  try {
    // Show loading spinner
    showLoadingSpinner();

    // Fetch projects data
    allProjects = await fetchProjectsData();
    filteredProjects = [...allProjects];

    // Hide loading spinner
    hideLoadingSpinner();

    // Render projects
    renderProjects();

    // Initialize filters
    initializeFilters();

    // Update results count
    updateResultsCount();
  } catch (error) {
    console.error("Error initializing projects:", error);
    hideLoadingSpinner();
    showNoResults();
  }
}

// Show loading spinner
function showLoadingSpinner() {
  const loadingSpinner = document.getElementById("loadingSpinner");
  const projectsContainer = document.getElementById("projectsContainer");
  const noResultsMessage = document.getElementById("noResultsMessage");

  if (loadingSpinner) loadingSpinner.style.display = "block";
  if (projectsContainer) projectsContainer.style.display = "none";
  if (noResultsMessage) noResultsMessage.style.display = "none";
}

// Hide loading spinner
function hideLoadingSpinner() {
  const loadingSpinner = document.getElementById("loadingSpinner");
  if (loadingSpinner) loadingSpinner.style.display = "none";
}

// Render projects
function renderProjects() {
  const projectsContainer = document.getElementById("projectsContainer");
  const noResultsMessage = document.getElementById("noResultsMessage");

  if (!projectsContainer) return;

  // Clear existing projects
  projectsContainer.innerHTML = "";

  if (filteredProjects.length === 0) {
    projectsContainer.style.display = "none";
    noResultsMessage.style.display = "block";
    return;
  }

  // Show projects container
  projectsContainer.style.display = "flex";
  noResultsMessage.style.display = "none";

  // Calculate pagination
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projectsToShow = filteredProjects.slice(startIndex, endIndex);

  // Render project cards
  projectsToShow.forEach((project, index) => {
    const projectCard = createProjectCard(project, startIndex + index);
    projectsContainer.appendChild(projectCard);
  });

  // Update pagination
  updatePagination();

  // Refresh AOS
  AOS.refresh();
}

// Create project card HTML
function createProjectCard(project, index) {
  const col = document.createElement("div");
  col.className = "col-lg-4 col-md-6";
  col.setAttribute("data-aos", "fade-up");
  col.setAttribute("data-aos-delay", (index % 6) * 100 + 100);

  // Get badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Under Construction":
        return "bg-warning text-dark";
      case "Ready to Move":
        return "bg-success text-white";
      case "Upcoming":
        return "bg-info text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  col.innerHTML = `
    <div class="project-card bg-white rounded-3 shadow-sm overflow-hidden h-100">
      <div class="position-relative">
        <img
          src="${project.image}"
          alt="${project.name}"
          class="img-fluid"
          style="height: 250px; object-fit: cover; width: 100%;"
        />
        <span class="badge ${getStatusBadgeClass(
          project.status
        )} position-absolute fw-bold px-2 py-1" 
              style="top: 12px; right: 12px; font-size: 0.75rem; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          ${project.status}
        </span>
      </div>
      <div class="p-4">
        <h5 class="fw-bold">${project.name}</h5>
        <p class="text-muted small mb-2">
          <i class="fas fa-map-marker-alt me-1"></i>
          ${project.location}
        </p>
        <p class="text-muted small mb-2">By: ${project.builder}</p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-primary">${project.bhk}</span>
          <span class="fw-bold text-success">${project.priceRange}</span>
        </div>
        <div class="d-flex gap-2">
          <button
            class="btn btn-primary flex-fill enquire-btn"
            data-project="${project.name}"
          >
            Enquire Now
          </button>
          <a
            href="${project.detailsUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary flex-fill text-decoration-none"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  `;

  return col;
}

// Initialize filters
function initializeFilters() {
  const statusFilter = document.getElementById("statusFilter");
  const propertyTypeFilter = document.getElementById("propertyTypeFilter");
  const groupFilter = document.getElementById("groupFilter");
  const cityFilter = document.getElementById("cityFilter");
  const clearFiltersBtn = document.getElementById("clearFilters");

  // Add event listeners
  if (statusFilter) statusFilter.addEventListener("change", applyFilters);
  if (propertyTypeFilter)
    propertyTypeFilter.addEventListener("change", applyFilters);
  if (groupFilter) groupFilter.addEventListener("change", applyFilters);
  if (cityFilter) cityFilter.addEventListener("change", applyFilters);
  if (clearFiltersBtn) clearFiltersBtn.addEventListener("click", clearFilters);
}

// Apply filters
function applyFilters() {
  const statusFilter = document.getElementById("statusFilter");
  const propertyTypeFilter = document.getElementById("propertyTypeFilter");
  const groupFilter = document.getElementById("groupFilter");
  const cityFilter = document.getElementById("cityFilter");

  const filters = {
    status: statusFilter ? statusFilter.value : "",
    propertyType: propertyTypeFilter ? propertyTypeFilter.value : "",
    group: groupFilter ? groupFilter.value : "",
    city: cityFilter ? cityFilter.value : "",
  };

  filteredProjects = allProjects.filter((project) => {
    return (
      (filters.status === "" || project.status === filters.status) &&
      (filters.propertyType === "" ||
        project.propertyType === filters.propertyType) &&
      (filters.group === "" || project.group === filters.group) &&
      (filters.city === "" || project.city === filters.city)
    );
  });

  // Reset to first page
  currentPage = 1;

  // Re-render projects
  renderProjects();

  // Update results count
  updateResultsCount();
}

// Clear filters
function clearFilters() {
  const statusFilter = document.getElementById("statusFilter");
  const propertyTypeFilter = document.getElementById("propertyTypeFilter");
  const groupFilter = document.getElementById("groupFilter");
  const cityFilter = document.getElementById("cityFilter");

  if (statusFilter) statusFilter.value = "";
  if (propertyTypeFilter) propertyTypeFilter.value = "";
  if (groupFilter) groupFilter.value = "";
  if (cityFilter) cityFilter.value = "";

  filteredProjects = [...allProjects];
  currentPage = 1;

  renderProjects();
  updateResultsCount();
}

// Update results count
function updateResultsCount() {
  const resultsCount = document.getElementById("resultsCount");
  if (resultsCount) {
    const totalResults = filteredProjects.length;
    const startIndex = (currentPage - 1) * projectsPerPage + 1;
    const endIndex = Math.min(currentPage * projectsPerPage, totalResults);

    if (totalResults > 0) {
      resultsCount.textContent = `Showing ${startIndex}-${endIndex} of ${totalResults} projects`;
    } else {
      resultsCount.textContent = "No projects found";
    }
  }
}

// Show no results message
function showNoResults() {
  const projectsContainer = document.getElementById("projectsContainer");
  const noResultsMessage = document.getElementById("noResultsMessage");

  if (projectsContainer) projectsContainer.style.display = "none";
  if (noResultsMessage) noResultsMessage.style.display = "block";
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginationContainer = document.querySelector(".pagination");

  if (!paginationContainer || totalPages <= 1) {
    if (paginationContainer)
      paginationContainer.parentElement.style.display = "none";
    return;
  }

  paginationContainer.parentElement.style.display = "block";
  paginationContainer.innerHTML = "";

  // Previous button
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderProjects();
    }
  });
  paginationContainer.appendChild(prevLi);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageLi = document.createElement("li");
    pageLi.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageLi.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderProjects();
    });
    paginationContainer.appendChild(pageLi);
  }

  // Next button
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
  nextLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderProjects();
    }
  });
  paginationContainer.appendChild(nextLi);
}

// Initialize enquiry modal functionality
function initializeEnquiryModal() {
  // Handle enquiry modal for dynamically created buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("enquire-btn")) {
      const projectName = e.target.getAttribute("data-project");
      const projectNameInput = document.getElementById("projectName");

      if (projectNameInput) {
        projectNameInput.value = projectName;
      }

      // Show modal
      const modal = new bootstrap.Modal(
        document.getElementById("enquiryModal")
      );
      modal.show();
    }
  });
}

// Search functionality for projects
function searchProjects(query) {
  if (!query.trim()) {
    filteredProjects = [...allProjects];
  } else {
    filteredProjects = allProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.location.toLowerCase().includes(query.toLowerCase()) ||
        project.builder.toLowerCase().includes(query.toLowerCase())
    );
  }

  currentPage = 1;
  renderProjects();
  updateResultsCount();
}

// Initialize search if search input exists
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchProjects");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchProjects(this.value);
    });
  }
});

// Utility functions
const utils = {
  // Debounce function
  debounce: (func, wait, immediate) => {
    let timeout;
    return function executedFunction() {
      const args = arguments;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  },

  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;

      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Format currency
  formatCurrency: (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount),

  // Validate email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate phone
  validatePhone: (phone) => {
    const re = /^[+]?[\d\s\-()]{10,}$/;
    return re.test(phone);
  },
};

// Export utils for use in other scripts
window.utils = utils;

// Blog Detail functionality
async function initializeBlogDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    if (!blogId) {
      showBlogNotFound();
      return;
    }

    const blogsData = await fetchBlogsData();
    const blog = blogsData.blogs.find((b) => b.id === blogId);

    if (!blog) {
      showBlogNotFound();
      return;
    }

    renderBlogDetail(blog);
    setupSocialSharing(blog);
    renderRelatedArticles(blogsData.blogs, blogId);
  } catch (error) {
    console.error("Error initializing blog detail:", error);
    showBlogNotFound();
  }
}

// Fetch blogs data from JSON
async function fetchBlogsData() {
  try {
    const response = await fetch("blogs-data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch blogs data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs data:", error);
    throw error;
  }
}

// Render blog detail content
function renderBlogDetail(blog) {
  // Update page title and meta
  document.title = `${blog.title} - Call Us Real Estate`;
  document.getElementById("blog-title").textContent = blog.title;
  document
    .getElementById("blog-description")
    .setAttribute("content", blog.excerpt);

  // Update header content
  // document.getElementById("breadcrumb-title").textContent = blog.title;
  document.getElementById("page-title").textContent = blog.title;
  document.getElementById("publish-date").textContent = blog.publishDate;
  document.getElementById("read-time").textContent = blog.readTime;
  document.getElementById("view-count").textContent = blog.viewCount;

  // Update featured image
  const featuredImage = document.getElementById("featured-image");
  featuredImage.src = blog.image;
  featuredImage.alt = blog.title;

  // Update blog content
  document.getElementById("blog-article-content").innerHTML = blog.content;
}

// Setup social sharing
function setupSocialSharing(blog) {
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(blog.title);
  const encodedDescription = encodeURIComponent(blog.excerpt);

  // Facebook sharing
  document.getElementById(
    "share-facebook"
  ).href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  // Twitter sharing
  document.getElementById(
    "share-twitter"
  ).href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  // LinkedIn sharing
  document.getElementById(
    "share-linkedin"
  ).href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  // WhatsApp sharing
  document.getElementById(
    "share-whatsapp"
  ).href = `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;

  // Add click handlers to open in new window
  document.querySelectorAll('[id^="share-"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = this.href;
      window.open(
        url,
        "social-share",
        "width=600,height=400,scrollbars=yes,resizable=yes"
      );
    });
  });
}

// Render related articles
function renderRelatedArticles(allBlogs, currentBlogId) {
  const relatedArticlesContainer = document.getElementById("related-articles");
  const relatedBlogs = allBlogs
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, 3);

  relatedArticlesContainer.innerHTML = relatedBlogs
    .map(
      (blog) => `
    <div class="col-lg-4 col-md-6" data-aos="fade-up">
      <div class="blog-card bg-white rounded-3 shadow-sm overflow-hidden h-100">
        <img src="${blog.image}" alt="${blog.title}" class="img-fluid" style="height: 200px; object-fit: cover;">
        <div class="p-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-primary">${blog.publishDate}</span>
            <span class="text-muted small">
              <i class="fas fa-clock me-1"></i>
              ${blog.readTime}
            </span>
          </div>
          <h5 class="fw-bold mb-3">${blog.title}</h5>
          <p class="text-muted">${blog.excerpt}</p>
          <div class="d-flex justify-content-between align-items-center">
            <a href="blog-detail.html?id=${blog.id}" class="btn btn-primary btn-sm">Read More</a>
            <div class="text-muted small">
              <i class="fas fa-eye me-1"></i>
              ${blog.viewCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Show blog not found message
function showBlogNotFound() {
  document.getElementById("blogNotFound").style.display = "block";
}

// Initialize blog detail on page load
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on blog detail page
  if (window.location.pathname.includes("blog-detail.html")) {
    initializeBlogDetail();
  }
});

console.log("Scripts loaded successfully!");

// Initialize floating contact buttons
function initializeFloatingContactButtons() {
  const floatingButtons = document.querySelector(".floating-contact-buttons");

  if (!floatingButtons) {
    console.log("Floating buttons container not found");
    return;
  }

  console.log("Initializing floating contact buttons");

  // Scroll-based visibility
  let lastScrollTop = 0;
  const scrollThreshold = 100; // Show after scrolling 100px

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
      floatingButtons.classList.add("visible");
    } else {
      floatingButtons.classList.remove("visible");
    }

    lastScrollTop = scrollTop;
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // FAB toggle functionality for mobile
  const fabMain = floatingButtons.querySelector(".fab-main");
  console.log("FAB main button found:", !!fabMain);
  console.log("Window width:", window.innerWidth);

  if (fabMain) {
    fabMain.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("FAB main clicked");

      floatingButtons.classList.toggle("expanded");

      // Change icon based on state
      const icon = this.querySelector(".icon i");
      if (floatingButtons.classList.contains("expanded")) {
        icon.className = "fas fa-times";
        console.log("FAB expanded");
      } else {
        icon.className = "fas fa-phone";
        console.log("FAB collapsed");
      }
    });

    // Close FAB when clicking outside
    document.addEventListener("click", function (e) {
      if (!floatingButtons.contains(e.target)) {
        floatingButtons.classList.remove("expanded");
        const icon = fabMain.querySelector(".icon i");
        if (icon) icon.className = "fas fa-phone";
      }
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    console.log("Window resized to:", window.innerWidth);
    if (window.innerWidth > 768) {
      floatingButtons.classList.remove("expanded");
      const icon = fabMain?.querySelector(".icon i");
      if (icon) icon.className = "fas fa-phone";
    }
  });

  // Initial check for mobile
  if (window.innerWidth <= 768) {
    console.log("Mobile detected, FAB should be active");
  }
}
