import { useEffect, useState } from 'react'
import Lenis from 'lenis'

import MouseSpotlight from './components/MouseSpotlight/MouseSpotlight'
import Nav from './components/Nav/Nav'
import Hero from './components/Hero/Hero'
import WhySection from './components/WhySection/WhySection'
import Features from './components/Features/Features'
import AiSection from './components/AiSection/AiSection'
import DownloadSpotlight from './components/DownloadSpotlight/DownloadSpotlight'
import Terminal from './components/Terminal/Terminal'
import OpsSection from './components/OpsSection/OpsSection'
import Formats from './components/Formats/Formats'
import Install from './components/Install/Install'
import CtaSection from './components/CtaSection/CtaSection'
import Footer from './components/Footer/Footer'

export default function App() {
  const [starCount, setStarCount] = useState(null)

  // ── Lenis smooth scroll ────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis()
    let rafId
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { lenis.destroy(); cancelAnimationFrame(rafId) }
  }, [])

  // ── Fetch GitHub stars ─────────────────────────────────────────────────────
  useEffect(() => {
    fetch('https://api.github.com/repos/hariharen9/ffmpeg-this', {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) return
        const n = d.stargazers_count
        if (typeof n === 'number') {
          setStarCount(n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n))
        }
      })
      .catch(() => {})
  }, [])

  // ── Scroll-reveal IntersectionObserver ────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe after a short delay so all children have mounted
    const tid = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach(el => observer.observe(el))
    }, 100)

    return () => { clearTimeout(tid); observer.disconnect() }
  }, [])

  return (
    <>
      <MouseSpotlight />
      <Nav starCount={starCount} />
      <Hero />
      <WhySection />
      <Features />
      <DownloadSpotlight />
      <AiSection />
      <Terminal />
      <OpsSection />
      <Formats />
      <Install />
      <CtaSection />
      <Footer />
    </>
  )
}
