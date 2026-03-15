import { useState, useEffect, useCallback } from 'react'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { href: '#why', label: 'Why' },
  { href: '#features', label: 'Features' },
  { href: '#ai', label: 'AI' },
  { href: '#cli', label: 'CLI' },
  { href: '#install', label: 'Install' },
]

export default function Nav({ starCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Theme toggle — reads/writes to <html data-theme>
  const toggleTheme = useCallback(() => {
    const html = document.documentElement
    const isLight = html.getAttribute('data-theme') === 'light'
    const next = isLight ? 'dark' : 'light'
    html.setAttribute('data-theme', next)
    localStorage.setItem('peg-theme', next)
  }, [])

  // Scroll → shadow + active section
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      let cur = ''
      sections.forEach(s => { if (y >= s.offsetTop - 120) cur = s.id })
      setActiveSection(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} id="main-nav">
      <a href="#" className={styles.logo} title="Please don't ask about the name.">
        <span className={styles.blink}>🍌</span>
        <span>PEG-this</span>
      </a>

      <ul className={styles.navCenter}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className={activeSection === href.slice(1) ? styles.active : ''}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.navRight}>
        <a className={styles.navStars} href="https://github.com/hariharen9/ffmpeg-this" target="_blank" rel="noreferrer">
          <span>★</span>
          <span className={styles.starCount}>{starCount || '—'}</span>
        </a>

        <button
          className={styles.themeToggle}
          aria-label="Toggle light/dark mode"
          onClick={toggleTheme}
        >
          <div className={styles.toggleTrack}>
            <div className={styles.toggleThumb} />
            <span className={`${styles.toggleIcon} ${styles.iconMoon}`}>🌙</span>
            <span className={`${styles.toggleIcon} ${styles.iconSun}`}>☀️</span>
          </div>
        </button>

        <a href="https://github.com/hariharen9/ffmpeg-this" target="_blank" rel="noreferrer" className={styles.navCta}>
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}
