// ================================
// === HEADER + SIDEBAR CONTROL ===
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("close-sidebar");
  const overlayBg = document.getElementById("overlay-bg");

  if (menuToggle && sidebar && closeSidebar && overlayBg) {
    // Open Sidebar
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("open");
      overlayBg.classList.add("active");
    });

    // Close Sidebar (X)
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlayBg.classList.remove("active");
    });

    // Close Sidebar (Background Click)
    overlayBg.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlayBg.classList.remove("active");
    });
  }

  // Highlight current active sidebar link
  const sidebarLinks = document.querySelectorAll(".sidebar-links a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
});

// ================================
// === SERVICE DETAIL OVERLAY ===
// ================================

// Elements
const detail = document.getElementById("service-detail");
const closeDetail = document.getElementById("close-detail");
const moreBtns = document.querySelectorAll(".more-btn");
const serviceInfo = document.querySelector(".service-info");
const navButtons = document.querySelectorAll(".service-nav button");

// ================================
// === SERVICE DATA CONTENT ===
// ================================
const servicesData = {
  solarification: {
    title: "Solarification",
    image: "https://www.powerfrill.com/wp-content/uploads/2018/12/Solarification-770x500.jpg",
    content: `
      <p>“Solarification” refers to transitioning towards solar energy as a primary power source. This process supports renewable adoption and reduces fossil dependence.</p>
      <h3>Solarification initiatives include:</h3>
      <ul>
        <li><strong>Solar Panel Installation:</strong> Rooftop, field, or solar farm setups to harness sunlight.</li>
        <li><strong>Policy Support:</strong> Incentives promoting solar energy usage.</li>
        <li><strong>Public Awareness:</strong> Campaigns to educate about solar benefits.</li>
        <li><strong>Infrastructure Development:</strong> Better grids and storage systems.</li>
        <li><strong>Off-grid Solar:</strong> Powering remote areas sustainably.</li>
      </ul>
      <p>Solarification is vital for a sustainable renewable energy transition.</p>
    `,
  },

  audit: {
    title: "Energy Demand Audit",
    image: "https://www.powerfrill.com/wp-content/uploads/2018/12/Energy-demand-audit-1-770x500.jpeg",
    content: `
      <p>An energy demand audit identifies inefficiencies and areas to optimize energy usage.</p>
      <h3>Audit Process:</h3>
      <ul>
        <li><strong>Data Collection:</strong> Analyze usage and patterns.</li>
        <li><strong>Inspection:</strong> Evaluate HVAC, lighting, insulation, etc.</li>
        <li><strong>Modeling:</strong> Simulate and find optimization opportunities.</li>
        <li><strong>ROI Analysis:</strong> Determine financial benefits.</li>
        <li><strong>Monitoring:</strong> Continuous tracking and updates.</li>
      </ul>
      <p>Regular audits ensure efficiency and cost savings.</p>
    `,
  },

  custom: {
    title: "Custom Solution Engineering",
    image: "https://www.powerfrill.com/wp-content/uploads/2018/10/custom-solution-eng-770x500.jpeg",
    content: `
      <p>Custom solution engineering delivers tailor-made designs for unique project requirements.</p>
      <ul>
        <li><strong>Design Thinking:</strong> Problem-oriented innovation.</li>
        <li><strong>Prototyping:</strong> Rapid working model creation.</li>
        <li><strong>System Integration:</strong> Smooth interoperability.</li>
        <li><strong>Scalability:</strong> Designed for growth and flexibility.</li>
      </ul>
      <p>Powerfrill provides precision-built, reliable systems for every project.</p>
    `,
  },

  facility: {
    title: "Energy Farms Facility Management",
    image: "https://www.powerfrill.com/wp-content/uploads/2018/10/Energy-farms-facility-management-770x500.jpeg",
    content: `
      <p>Facility management ensures large-scale renewable operations like solar farms perform at peak efficiency.</p>
      <ul>
        <li><strong>Monitoring:</strong> Real-time performance tracking.</li>
        <li><strong>Maintenance:</strong> Scheduled and predictive upkeep.</li>
        <li><strong>Optimization:</strong> Resource and yield maximization.</li>
        <li><strong>Compliance:</strong> Safety and environmental assurance.</li>
      </ul>
      <p>Good management ensures performance and long-term ROI.</p>
    `,
  },

  efficacy: {
    title: "Solar Plants Efficacy Management",
    image: "https://www.powerfrill.com/wp-content/uploads/2018/10/Solar-Plants-Efficacy-Management-1-770x500.jpeg",
    content: `
      <p>Solar plant efficacy management focuses on consistent performance and system optimization.</p>
      <ul>
        <li><strong>Maintenance:</strong> Cleaning and inverter repairs.</li>
        <li><strong>Monitoring:</strong> Detecting real-time faults.</li>
        <li><strong>Optimization:</strong> Adjusting tilt and tracking sunlight.</li>
        <li><strong>Predictive Analysis:</strong> Prevent breakdowns early.</li>
      </ul>
      <p>Ensures long-term productivity and plant reliability.</p>
    `,
  },
};

// ================================
// === LOAD SERVICE CONTENT ===
// ================================
function loadService(serviceKey) {
  const data = servicesData[serviceKey];
  if (!data) return;

  // Set Active Button
  navButtons.forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`[data-service="${serviceKey}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  // Populate Info
  serviceInfo.innerHTML = `
    <div class="service-banner">
      <img src="${data.image}" alt="${data.title}">
    </div>
    <h1>${data.title}</h1>
    ${data.content}
    <form class="inquiry-form">
      <h3>Get in Touch</h3>
      <div class="form-group">
        <input type="text" placeholder="Name" required>
        <input type="text" placeholder="Phone" required>
      </div>
      <div class="form-group">
        <input type="email" placeholder="Email" required>
      </div>
      <div class="form-group">
        <select required>
          <option value="">Select Services</option>
          <option>Solarification</option>
          <option>Energy Demand Audit</option>
          <option>Custom Solution Engineering</option>
          <option>Energy Farms Facility Management</option>
          <option>Solar Plants Efficacy Management</option>
        </select>
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  `;

  // Animate Fade-in
  serviceInfo.style.opacity = "0";
  setTimeout(() => {
    serviceInfo.style.transition = "opacity 0.5s ease";
    serviceInfo.style.opacity = "1";
  }, 50);
}

// ================================
// === EVENT LISTENERS ===
// ================================

// Open service overlay
if (moreBtns && detail) {
  moreBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const cardTitle = btn.parentElement
        .querySelector(".card-title")
        .textContent.trim();
      const key = Object.keys(servicesData).find(
        (k) => servicesData[k].title.toLowerCase() === cardTitle.toLowerCase()
      );
      loadService(key || "solarification");
      detail.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
}

// Switch between service types
if (navButtons) {
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const serviceKey = btn.dataset.service;
      loadService(serviceKey);
    });
  });
}

// Close overlay
if (closeDetail) {
  closeDetail.addEventListener("click", () => {
    detail.style.display = "none";
    document.body.style.overflow = "";
  });
}
// RIMAC STYLE SIDE NAV SCROLL + ACTIVE STATE
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  // Click → smooth scroll
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Scroll spy → active state
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(item => item.classList.remove("active"));
          const activeItem = document.querySelector(
            `.nav-item[data-target="${entry.target.id}"]`
          );
          if (activeItem) activeItem.classList.add("active");
        }
      });
    },
    {
      threshold: 0.55
    }
  );

  sections.forEach(section => observer.observe(section));
});