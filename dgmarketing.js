// ================================
// === CAROUSEL SIDE NAV CONTROL ===
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item")
  const sections = document.querySelectorAll("section[id]")
  const navList = document.querySelector(".nav-list")

  const ITEMS_PER_VIEW = 8 // Show 8 items at a time
  const TOTAL_ITEMS = 16 // INTRO + 15 services
  let currentStartIndex = 0

  function updateNavDisplay(activeIndex) {
    // Determine which items should be visible based on active section
    const targetStartIndex = Math.max(0, Math.min(activeIndex - 2, TOTAL_ITEMS - ITEMS_PER_VIEW))

    if (targetStartIndex !== currentStartIndex) {
      currentStartIndex = targetStartIndex

      // Update visibility and numbering
      navItems.forEach((item, idx) => {
        const isVisible = idx >= currentStartIndex && idx < currentStartIndex + ITEMS_PER_VIEW
        item.style.display = isVisible ? "flex" : "none"

        if (isVisible) {
          const displayNum = idx + 1
          const numSpan = item.querySelector(".nav-num")
          if (numSpan) {
            numSpan.textContent = String(displayNum).padStart(2, "0")
          }
        }
      })
    }
  }

  // CLICK SCROLL
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.target)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // SCROLL SPY with carousel nav update
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id

          // Remove active from all
          navItems.forEach((i) => i.classList.remove("active"))

          // Find and activate the matching nav item
          const activeItem = document.querySelector(`.nav-item[data-target="${targetId}"]`)
          if (activeItem) {
            activeItem.classList.add("active")

            const activeIndex = Number.parseInt(activeItem.dataset.index)
            updateNavDisplay(activeIndex)
          }
        }
      })
    },
    {
      rootMargin: "-45% 0px -45% 0px",
    },
  )

  sections.forEach((section) => observer.observe(section))

  // Initialize nav display
  updateNavDisplay(0)
})

// ================================
// === ANIMATION ON PAGE LOAD ===
// ================================
window.addEventListener("load", () => {
  var status = document.querySelector(".status-indicator")
  var digital = document.querySelector(".animate-text span:first-child")
  var marketing = document.querySelector(".animate-text .text-hollow")
  var sub = document.querySelector(".animate-sub")
  var quote = document.querySelector(".quote-container")
  var image = document.querySelector(".dashboard-image-content")
  var nav = document.querySelector(".rimac-nav")

  if (status) {
    status.style.animation = "fadeUp 0.6s ease forwards"
  }

  setTimeout(() => {
    if (digital) {
      digital.style.animation = "fadeUp 0.8s cubic-bezier(0.215,0.61,0.355,1) forwards"
    }
  }, 150)

  setTimeout(() => {
    if (marketing) {
      marketing.style.animation = "fadeUp 0.8s cubic-bezier(0.215,0.61,0.355,1) forwards"
    }
  }, 300)

  setTimeout(() => {
    if (sub) {
      sub.style.animation = "fadeUp 0.6s ease forwards"
    }
  }, 450)

  setTimeout(() => {
    if (quote) {
      quote.style.animation = "fadeRight 0.7s ease forwards"
    }
  }, 650)

  setTimeout(() => {
    if (image) {
      image.style.animation = "fadeScale 0.8s ease forwards"
    }
  }, 800)

  setTimeout(() => {
    if (nav) {
      nav.style.animation = "fadeRight 0.6s ease forwards"
    }
  }, 1000)
})

// ================================
// === SERVICE SECTIONS REVEAL ===
// ================================
const serviceSections = document.querySelectorAll(".service-section")

const serviceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view")
      }
    })
  },
  {
    threshold: 0.35,
  },
)

serviceSections.forEach((section) => {
  serviceObserver.observe(section)
})

// ================================
// === SERVICE MODAL MANAGEMENT ===
// ================================

const serviceData = {
  seo: {
    title: "Search Engine Optimization",
    subtitle: "Sustainable Visibility & Long-Term Rankings",
    image: "images/Search Engine Optimization1.webp",
    overview:
      "Drive organic traffic and establish authority through comprehensive SEO strategies. We combine technical optimization, content excellence, and link building to improve your search engine rankings and visibility.",
    features: [
      "On-Page SEO Optimization",
      "Technical SEO Audits",
      "Keyword Research & Strategy",
      "Local SEO Management",
      "Link Building & Authority",
      "Content Optimization",
    ],
    benefits: [
      "Increased organic traffic",
      "Higher search rankings",
      "Long-term sustainable growth",
      "Reduced customer acquisition cost",
      "Improved brand authority",
      "Better user experience",
    ],
    process: [
      "Comprehensive site audit and competitor analysis",
      "Keyword research and strategy development",
      "On-page optimization implementation",
      "Technical SEO fixes and improvements",
      "Content creation and optimization",
      "Link building and outreach",
      "Monthly reporting and optimization",
    ],
  },
  sem: {
    title: "Search Engine Marketing",
    subtitle: "Strategic Paid Ads for Maximum ROI",
    image: "images/Search Engine Marketing1.jpg",
    overview:
      "Maximize visibility and conversions with strategic SEM campaigns. Our data-driven approach optimizes every dollar spent to deliver measurable results on Google Ads, Bing, and other search platforms.",
    features: [
      "Google Ads Management",
      "Bing Ads Campaigns",
      "Landing Page Optimization",
      "Conversion Rate Optimization",
      "Budget Optimization",
      "A/B Testing",
    ],
    benefits: [
      "Immediate visibility and traffic",
      "Highly targeted audience reach",
      "Measurable ROI tracking",
      "Flexible budget control",
      "Quick campaign adjustments",
      "High-intent customer acquisition",
    ],
    process: [
      "Market research and competitor analysis",
      "Campaign strategy and setup",
      "Keyword selection and bidding",
      "Ad copy creation and testing",
      "Landing page optimization",
      "Conversion tracking implementation",
      "Daily monitoring and optimization",
    ],
  },
  smm: {
    title: "Social Media Marketing",
    subtitle: "Platform-Specific Growth & Engagement",
    image: "images/Social Media Marketing1.webp",
    overview:
      "Build authentic connections with your audience through strategic social media marketing. We develop platform-specific content and engagement strategies that strengthen brand presence and drive community growth.",
    features: [
      "Content Strategy & Planning",
      "Community Management",
      "Platform Optimization",
      "Influencer Partnerships",
      "Crisis Management",
      "Analytics & Reporting",
    ],
    benefits: [
      "Increased brand awareness",
      "Higher engagement rates",
      "Loyal community building",
      "Word-of-mouth marketing",
      "Direct customer feedback",
      "Cost-effective promotion",
    ],
    process: [
      "Audience and competitor research",
      "Social media strategy development",
      "Content calendar creation",
      "Daily content posting and engagement",
      "Community interaction and response",
      "Performance tracking",
      "Monthly strategy adjustments",
    ],
  },
  "social-ads": {
    title: "Social Media Advertising",
    subtitle: "Targeted Campaigns for Ideal Audience",
    image: "images/Social Media Advertising.1.png",
    overview:
      "Reach your ideal customers with precision-targeted ads across Facebook, Instagram, TikTok, and LinkedIn. Our advanced audience segmentation and creative optimization drive conversions and brand awareness.",
    features: [
      "Audience Segmentation",
      "Creative Design & Testing",
      "Video Ad Production",
      "Retargeting Campaigns",
      "Lookalike Audience Building",
      "Multi-Platform Management",
    ],
    benefits: [
      "Highly targeted reach",
      "Lower cost per acquisition",
      "Increased conversion rates",
      "Brand awareness growth",
      "Retargeting effectiveness",
      "Real-time optimization",
    ],
    process: [
      "Audience analysis and targeting setup",
      "Campaign objective selection",
      "Creative asset creation",
      "Ad copy and messaging",
      "Campaign launch and monitoring",
      "Daily bid and budget optimization",
      "Conversion analysis and scaling",
    ],
  },
  content: {
    title: "Content Marketing",
    subtitle: "High-Impact Content That Converts",
    image: "images/Content Marketing1.png",
    overview:
      "Create compelling content that attracts, educates, and converts your audience. From blog posts to whitepapers, we craft strategic content that positions your brand as an industry leader.",
    features: [
      "Blog Writing & Optimization",
      "Video Script Writing",
      "Whitepaper Creation",
      "Case Study Development",
      "Infographic Design",
      "Email Content Strategy",
    ],
    benefits: [
      "Improved SEO rankings",
      "Increased customer trust",
      "Better lead generation",
      "Higher engagement rates",
      "Thought leadership position",
      "Content repurposing value",
    ],
    process: [
      "Content strategy and planning",
      "Keyword and topic research",
      "Content outline creation",
      "Writing and copywriting",
      "Editing and optimization",
      "Graphics and formatting",
      "Publishing and promotion",
    ],
  },
  branding: {
    title: "Branding & Creative",
    subtitle: "Authentic Brand Identity & Design",
    image: "images/Branding & Creative1.webp",
    overview:
      "Build a distinctive brand identity that resonates with your target audience. Our creative services encompass logo design, brand guidelines, visual identity, and campaigns that tell your unique story.",
    features: [
      "Logo Design & Development",
      "Brand Guidelines Creation",
      "Visual Identity System",
      "Brand Messaging",
      "Design Collateral",
      "Creative Campaign Development",
    ],
    benefits: [
      "Strong brand recognition",
      "Consistent messaging",
      "Professional appearance",
      "Audience connection",
      "Competitive differentiation",
      "Long-term brand value",
    ],
    process: [
      "Brand discovery and research",
      "Competitive analysis",
      "Brand positioning statement",
      "Visual identity development",
      "Logo and design creation",
      "Brand guidelines documentation",
      "Asset delivery and training",
    ],
  },
  "web-dev": {
    title: "Website & App Development",
    subtitle: "Conversion-Focused Digital Solutions",
    image: "images/Website & App Development1.jpg",
    overview:
      "Build fast, scalable, and conversion-optimized websites and applications. Our development team creates digital experiences engineered for performance, user engagement, and business growth.",
    features: [
      "Responsive Web Design",
      "Mobile App Development",
      "E-Commerce Solutions",
      "Progressive Web Apps",
      "API Integration",
      "Performance Optimization",
    ],
    benefits: [
      "Fast loading speeds",
      "Mobile responsiveness",
      "Higher conversion rates",
      "User-friendly interface",
      "Scalability",
      "Future-proof technology",
    ],
    process: [
      "Requirements gathering and planning",
      "Wireframing and prototyping",
      "Design creation",
      "Development and coding",
      "Testing and QA",
      "Launch and optimization",
      "Ongoing maintenance",
    ],
  },
  video: {
    title: "Video Production",
    subtitle: "Professional Video Content Creation",
    image: "images/Video Production1.webp",
    overview:
      "Engage your audience with professional video content. From promotional videos to product demos, we produce high-quality videos that tell your brand story and drive engagement.",
    features: [
      "Script Writing",
      "Storyboarding",
      "On-Location Filming",
      "Animation & Graphics",
      "Professional Editing",
      "Color Grading & Sound Design",
    ],
    benefits: [
      "Higher engagement rates",
      "Better storytelling",
      "Increased conversions",
      "Social media virality",
      "Professional appearance",
      "Memorable brand messaging",
    ],
    process: [
      "Concept and script development",
      "Storyboard creation",
      "Location and talent scouting",
      "Production filming",
      "Post-production editing",
      "Sound design and music",
      "Final delivery and optimization",
    ],
  },
  ecommerce: {
    title: "Ecommerce & Marketplace Marketing",
    subtitle: "Sales Growth Through Marketplace Optimization",
    image: "images/Ecommerce & Marketplace Marketing1.jpg",
    overview:
      "Drive sales on Amazon, Shopify, and other marketplaces with strategic optimization. We specialize in listing optimization, paid advertising, and inventory management for ecommerce success.",
    features: [
      "Product Listing Optimization",
      "Amazon Advertising (PPC)",
      "Enhanced Content Creation",
      "Competitor Price Monitoring",
      "Review Management",
      "Inventory Strategy",
    ],
    benefits: [
      "Increased sales volume",
      "Higher product visibility",
      "Better conversion rates",
      "Improved rankings",
      "Reduced advertising spend",
      "Customer trust building",
    ],
    process: [
      "Market and competitor research",
      "Keyword research and optimization",
      "Listing and content creation",
      "Advertising campaign setup",
      "Daily monitoring and bidding",
      "Review and feedback management",
      "Performance analysis and scaling",
    ],
  },
  performance: {
    title: "Performance Marketing",
    subtitle: "ROI-Driven Campaigns & Growth",
    image: "images/Performance Marketing1.jpg",
    overview:
      "Achieve measurable results with ROI-focused marketing campaigns. We optimize every channel for maximum return on investment, from paid search to affiliate marketing.",
    features: [
      "Multi-Channel Attribution",
      "Conversion Rate Optimization",
      "Funnel Analysis",
      "Lead Scoring",
      "Marketing Automation",
      "Real-Time Dashboarding",
    ],
    benefits: [
      "Clear ROI tracking",
      "Higher conversion rates",
      "Optimized customer journey",
      "Predictable growth",
      "Efficient budget allocation",
      "Data-driven decisions",
    ],
    process: [
      "Baseline analysis and goal setting",
      "Channel strategy development",
      "Campaign setup and launch",
      "Conversion tracking",
      "A/B testing and optimization",
      "Real-time monitoring",
      "Monthly performance reviews",
    ],
  },
  crm: {
    title: "CRM, Automation & AI",
    subtitle: "Intelligent Customer Relationships",
    image: "images/CRM, Automation & AI1.webp",
    overview:
      "Streamline customer relationships and automate marketing workflows with intelligent CRM systems and AI-powered tools. We implement solutions that personalize customer experiences at scale.",
    features: [
      "CRM Implementation",
      "Marketing Automation",
      "AI-Powered Personalization",
      "Lead Nurturing Workflows",
      "Customer Segmentation",
      "Predictive Analytics",
    ],
    benefits: [
      "Improved customer retention",
      "Faster sales cycles",
      "Automated lead nurturing",
      "Personalized experiences",
      "Better team efficiency",
      "Predictive insights",
    ],
    process: [
      "Needs assessment and planning",
      "System selection and setup",
      "Data migration",
      "Workflow automation creation",
      "Team training",
      "Performance monitoring",
      "Continuous optimization",
    ],
  },
  analytics: {
    title: "Analytics & Optimization & Reporting",
    subtitle: "Data-Driven Decision Making",
    image: "images/an.png",
    overview:
      "Track, analyze, and optimize every aspect of your digital marketing. Our comprehensive analytics and reporting provide actionable insights for continuous improvement and growth.",
    features: [
      "Google Analytics Setup",
      "Custom Dashboard Creation",
      "A/B Testing Framework",
      "Heat Map Analysis",
      "User Journey Tracking",
      "Advanced Reporting",
    ],
    benefits: [
      "Clear performance visibility",
      "Data-driven optimizations",
      "Improved conversion rates",
      "Better resource allocation",
      "Actionable insights",
      "Competitive advantage",
    ],
    process: [
      "Analytics setup and configuration",
      "Tracking implementation",
      "Baseline data collection",
      "Dashboard creation",
      "Testing and experimentation",
      "Analysis and reporting",
      "Recommendation development",
    ],
  },
  reputation: {
    title: "Reputation & PR",
    subtitle: "Brand Authority & Credibility",
    image: "images/Reputation & PR1.webp",
    overview:
      "Manage your brand reputation and build credibility through strategic PR. We handle online reviews, press releases, crisis management, and media relations to protect and enhance your brand image.",
    features: [
      "Review Management",
      "Press Release Distribution",
      "Media Relations",
      "Crisis Management",
      "Sentiment Monitoring",
      "Influencer Partnerships",
    ],
    benefits: [
      "Improved online reputation",
      "Increased customer trust",
      "Media coverage",
      "Crisis prevention",
      "Brand authority",
      "Customer confidence",
    ],
    process: [
      "Reputation audit and monitoring",
      "Review response strategy",
      "Content creation and outreach",
      "Media relations management",
      "Crisis communication planning",
      "Sentiment monitoring",
      "Monthly reporting",
    ],
  },
  "app-growth": {
    title: "App Growth",
    subtitle: "User Acquisition & Monetization",
    image: "images/App Growth1.webp",
    overview:
      "Drive user acquisition, retention, and monetization for mobile and web applications. Our app marketing strategies focus on growth loops, retention optimization, and revenue maximization.",
    features: [
      "App Store Optimization",
      "User Acquisition Campaigns",
      "Retention Optimization",
      "Push Notification Strategy",
      "In-App Marketing",
      "Monetization Strategy",
    ],
    benefits: [
      "Higher download rates",
      "Improved user retention",
      "Increased revenue",
      "Better app ratings",
      "Viral growth potential",
      "Sustainable user base",
    ],
    process: [
      "Market and competitor analysis",
      "App store listing optimization",
      "User acquisition channel planning",
      "Campaign setup and launch",
      "Retention testing and optimization",
      "Engagement and push strategies",
      "Revenue analysis and scaling",
    ],
  },
  genai: {
    title: "Advanced Generative Marketing",
    subtitle: "AI-Powered Personalization & Automation",
    image: "images/Advanced Generative Marketing1.avif",
    overview:
      "Leverage cutting-edge AI and generative technologies for next-level marketing. From personalized content generation to predictive customer behavior, we harness AI to drive innovation and growth.",
    features: [
      "AI Content Generation",
      "Personalization Engines",
      "Predictive Analytics",
      "Chatbot & Conversational AI",
      "Automated Email Campaigns",
      "Intelligent Recommendations",
    ],
    benefits: [
      "Personalized customer experiences",
      "Increased conversion rates",
      "Faster content creation",
      "Predictive customer insights",
      "Automated marketing at scale",
      "Competitive innovation",
    ],
    process: [
      "Technology assessment and planning",
      "AI tool selection and integration",
      "Personalization engine setup",
      "Content generation workflow",
      "Testing and refinement",
      "Performance monitoring",
      "Continuous optimization",
    ],
  },
}

const modal = document.getElementById("serviceModal")
const modalBackdrop = document.getElementById("modalBackdrop")
const modalClose = document.getElementById("modalClose")
const exploreButtons = document.querySelectorAll(".explore-btn")

// Open modal with service data
function openServiceModal(serviceId) {
  const data = serviceData[serviceId]
  if (!data) return

  // Populate modal content
  document.querySelector(".modal-title").textContent = data.title
  document.querySelector(".modal-subtitle").textContent = data.subtitle
  document.querySelector(".modal-img").src = data.image
  document.querySelector(".modal-img").alt = data.title
  document.querySelector(".modal-overview").textContent = data.overview

  // Populate features
  const featuresList = document.querySelector(".modal-features")
  featuresList.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("")

  // Populate benefits
  const benefitsList = document.querySelector(".modal-benefits")
  benefitsList.innerHTML = data.benefits.map((b) => `<li>${b}</li>`).join("")

  // Populate process
  const processList = document.querySelector(".modal-process")
  processList.innerHTML = data.process.map((p) => `<li>${p}</li>`).join("")

  // Show modal with animation
  modal.classList.add("visible")
  document.body.style.overflow = "hidden"
}

// Close modal
function closeServiceModal() {
  modal.classList.remove("visible")
  document.body.style.overflow = "auto"
}

// Event listeners for explore buttons
exploreButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    const serviceId = btn.dataset.service
    openServiceModal(serviceId)
  })
})

// Close button
modalClose.addEventListener("click", closeServiceModal)

// Backdrop click to close
modalBackdrop.addEventListener("click", closeServiceModal)

// Escape key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeServiceModal()
  }
})
