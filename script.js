// Slider functionality
const slides = document.querySelectorAll(".slide")
const prevBtn = document.querySelector(".slider-btn.prev")
const nextBtn = document.querySelector(".slider-btn.next")
const dotsContainer = document.querySelector(".slider-dots")

let currentSlide = 0
const totalSlides = slides.length

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div")
  dot.classList.add("dot")
  if (i === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToSlide(i))
  dotsContainer.appendChild(dot)
}

const dots = document.querySelectorAll(".dot")

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  currentSlide = (n + totalSlides) % totalSlides

  slides[currentSlide].classList.add("active")
  dots[currentSlide].classList.add("active")
}

function nextSlide() {
  showSlide(currentSlide + 1)
}

function prevSlide() {
  showSlide(currentSlide - 1)
}

function goToSlide(n) {
  showSlide(n)
}

nextBtn.addEventListener("click", nextSlide)
prevBtn.addEventListener("click", prevSlide)

// Auto slide
let autoSlide = setInterval(nextSlide, 5000)

// Pause auto slide on hover
document.querySelector(".hero-slider").addEventListener("mouseenter", () => {
  clearInterval(autoSlide)
})

document.querySelector(".hero-slider").addEventListener("mouseleave", () => {
  autoSlide = setInterval(nextSlide, 5000)
})

// Stats counter animation
function animateCounter(element) {
  const target = Number.parseInt(element.dataset.target)
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => animateCounter(counter))
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".stats-section")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navMenu = document.querySelector(".nav-menu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })
}

// Video play button
const playBtn = document.querySelector(".play-btn")
if (playBtn) {
  playBtn.addEventListener("click", () => {
    alert("Video player akan ditampilkan di sini")
    // Anda bisa mengganti dengan modal video player
  })
}

// Add scroll effect to navbar
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.15)"
  } else {
    navbar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)"
  }

  lastScroll = currentScroll
})

// Add animation on scroll for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards
document.querySelectorAll(".product-card, .news-item, .news-featured").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  observer.observe(el)
})
