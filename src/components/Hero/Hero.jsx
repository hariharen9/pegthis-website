import { useState, useEffect, useRef, useMemo } from 'react'
import styles from './Hero.module.css'

const WAVEFORM_COUNT = 120

function Waveform() {
  const bars = useMemo(() => Array.from({ length: WAVEFORM_COUNT }, (_, i) => {
    // Generate a smooth rolling wave shape
    const wave1 = Math.sin(i * 0.15) * 25;
    const wave2 = Math.cos(i * 0.05) * 15;
    let h = 45 + wave1 + wave2; // ranges roughly 5 to 85
    // Add a tiny bit of noise so it isn't completely flat
    h += (Math.random() - 0.5) * 10;
    
    return {
      id: i,
      height: Math.max(10, Math.min(100, h)), // clamp 10-100%
      dur: (0.7 + Math.sin(i * 0.1) * 0.2).toFixed(2), // smooth duration variance
      delay: (i * 0.03).toFixed(2) // ripple effect left to right
    }
  }), [])

  return (
    <div className={styles.waveform}>
      {bars.map(b => (
        <div
          key={b.id}
          className={styles.waveformBar}
          style={{ height: `${b.height}%`, '--dur': `${b.dur}s`, '--delay': `${b.delay}s` }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [timecode, setTimecode] = useState('00:00:00:00')
  const [copied, setCopied] = useState(false)

  // Live timecode at ~30fps
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date()
      const p = v => String(v).padStart(2, '0')
      setTimecode(`${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}:${p(Math.floor(n.getMilliseconds() / 33))}`)
    }, 33)
    return () => clearInterval(id)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText('pip install peg_this').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg}>
        <div className={styles.heroGrid} />
        <Waveform />
      </div>

      <div className={styles.timecode}>REC ● <span>{timecode}</span></div>
      <div className={`${styles.corner} ${styles.cornerTl}`} />
      <div className={`${styles.corner} ${styles.cornerTr}`} />
      <div className={`${styles.corner} ${styles.cornerBl}`} />
      <div className={`${styles.corner} ${styles.cornerBr}`} />

      <p
        className={styles.eyebrow}
        onMouseEnter={() => document.getElementById('eyebrow-text').innerText = '● NOW BROADCASTING — v5.1.0'}
        onMouseLeave={() => document.getElementById('eyebrow-text').innerText = '● BEND OVER, WE\'RE ENCODING — v5.1.0'}
      >
        <span id="eyebrow-text" style={{ transition: 'color 0.2s' }}>● BEND OVER, WE'RE ENCODING — v5.1.0</span>
      </p>

      <h1 className={styles.title}>
        FFm<span className={styles.accent}>PEG</span><span className={styles.dim}>-this</span>
      </h1>

      <p className={styles.sub}>
        Professional video editing, AI tools, and downloads — all in an interactive CLI menu. No flags to memorize. No StackOverflow required.
      </p>

      <div className={styles.actions}>
        <a href="#install" className="btn-primary">▶ Get Started</a>
        <a href="https://github.com/hariharen9/ffmpeg-this" target="_blank" rel="noreferrer" className="btn-secondary">
          ★ Star on GitHub
        </a>
      </div>

      <div className={styles.installCmd}>
        <code>
          <span className={styles.prompt}>$ </span>pip install peg_this
        </code>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
        >
          {copied ? '✓ COPIED!' : 'COPY'}
        </button>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>17</span>
          <span className={styles.statLabel}>GitHub Stars</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>100+</span>
          <span className={styles.statLabel}>Operations</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>99+</span>
          <span className={styles.statLabel}>Languages</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>1000+</span>
          <span className={styles.statLabel}>Download Sites</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>3</span>
          <span className={styles.statLabel}>Platforms</span>
        </div>
      </div>
    </section>
  )
}
