document.addEventListener("DOMContentLoaded", () => {
  // Single Responsibility: Each class handles one specific functionality
  class ScrollAnimationController {
    constructor() {
      this.observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
      this.init()
    }

    init() {
      const observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions)
      document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el))
    }

    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }
  }

  class CountdownController {
    constructor(targetDate) {
      this.targetDate = new Date(targetDate)
      this.elements = {
        days: document.getElementById("countdown-days"),
        hours: document.getElementById("countdown-hours"),
        minutes: document.getElementById("countdown-minutes"),
        seconds: document.getElementById("countdown-seconds"),
      }
      this.init()
    }

    init() {
      this.updateCountdown()
      setInterval(() => this.updateCountdown(), 1000)
    }

    updateCountdown() {
      const now = new Date().getTime()
      const distance = this.targetDate.getTime() - now

      if (distance < 0) return

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (this.elements.days) this.elements.days.textContent = days.toString().padStart(2, "0")
      if (this.elements.hours) this.elements.hours.textContent = hours.toString().padStart(2, "0")
      if (this.elements.minutes) this.elements.minutes.textContent = minutes.toString().padStart(2, "0")
      if (this.elements.seconds) this.elements.seconds.textContent = seconds.toString().padStart(2, "0")
    }
  }

  class WhatsAppController {
    constructor() {
      this.baseUrl = "https://wa.me/56995838926"
      this.init()
    }

    init() {
      document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => this.handleWhatsAppClick(e))
      })
    }

    handleWhatsAppClick(e) {
      e.preventDefault()
      const message = e.target.dataset.message || "Hola, me interesa el Helado del 18 de Di Creme"
      const encodedMessage = encodeURIComponent(message)
      window.open(`${this.baseUrl}?text=${encodedMessage}`, "_blank")
    }
  }

  class SmoothScrollController {
    constructor() {
      this.init()
    }

    init() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault()
          const target = document.querySelector(anchor.getAttribute("href"))
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        })
      })
    }
  }

  // Initialize all controllers
  new ScrollAnimationController()
  new CountdownController("2026-09-18T00:00:00")
  new WhatsAppController()
  new SmoothScrollController()
})
