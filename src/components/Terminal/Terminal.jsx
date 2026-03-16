import { useEffect, useRef, useState } from 'react'
import styles from './Terminal.module.css'

// ── Sequence Definitions ───────────────────────────────────────────────────
const SEQ_LEFT = [
  { type: 'type', prompt: true, text: 'peg_this', delay: 80 },
  { type: 'newline', pause: 200 },
  { type: 'instant', html: '<span class="t-dim">  FFm</span><span class="t-hdr">PEG</span><span class="t-dim">-this  v5.1.0  ·  python -m src.peg_this</span>' },
  { type: 'newline', pause: 200 },
  { type: 'instant', html: '<span class="t-dim">  Select an operation:</span>' },
  { type: 'newline', pause: 100 },
  { type: 'menu', html: '     🎬  <span class="t-dim">Video Operations</span>', pause: 80 },
  { type: 'menu', html: '     🤖  <span class="t-dim">AI Tools</span>', pause: 80 },
  { type: 'menu', html: '     📥  <span class="t-dim">Download</span>', pause: 80 },
  { type: 'menu', html: '     🎵  <span class="t-dim">Audio</span>', pause: 80 },
  { type: 'menu', html: '     🖼️  <span class="t-dim">Images</span>', pause: 80 },
  { type: 'menu', html: '     📦  <span class="t-dim">Batch &amp; Utilities</span>', pause: 80 },
  { type: 'newline', pause: 300 },
  { type: 'highlight', index: 0, pause: 400 },
  { type: 'newline', pause: 0 },
  { type: 'instant', html: '<span class="t-dim">  ─── Video Operations ──────────────────</span>' },
  { type: 'submenu', html: '     <span class="t-sel">[1]</span> <span class="t-dim">Convert format</span>', pause: 70 },
  { type: 'submenu', html: '     <span class="t-sel">[2]</span> <span class="t-dim">Compress video</span>', pause: 70 },
  { type: 'submenu', html: '     <span class="t-sel">[3]</span> <span class="t-dim">Crop to aspect ratio</span>', pause: 70 },
  { type: 'submenu', html: '     <span class="t-sel">[4]</span> <span class="t-dim">Trim (lossless)</span>', pause: 70 },
  { type: 'submenu', html: '     <span class="t-sel">[5]</span> <span class="t-dim">Add subtitles (AI)</span>', pause: 70 },
  { type: 'newline', pause: 500 },
  { type: 'type', prompt: true, text: '3', delay: 120, pause: 300 },
  { type: 'newline', pause: 0 },
  { type: 'type', prompt: false, label: '  Target ratio (9:16 / 1:1 / 4:5): ', text: '9:16', delay: 100, pause: 300 },
  { type: 'newline', pause: 0 },
  { type: 'type', prompt: false, label: '  Input file: ', text: 'footage.mp4', delay: 80, pause: 400 },
  { type: 'newline', pause: 200 },
  { type: 'progress', pause: 1800 },
  { type: 'newline', pause: 0 },
  { type: 'instant', html: '<span class="t-success">  ✓ Done  →  footage_9x16.mp4  (00:03.2s)</span>' },
  { type: 'newline', pause: 0 },
  { type: 'instant', html: '<span class="t-dim">  Press any key to return to menu...</span>' },
  { type: 'done' },
]

const SEQ_RIGHT = [
  { type: 'type', prompt: true, text: 'peg_this', delay: 80, pause: 400 },
  { type: 'newline', pause: 200 },
  { type: 'instant', html: '<span class="t-dim">  FFm</span><span class="t-hdr">PEG</span><span class="t-dim">-this  v5.1.0  ·  python -m src.peg_this</span>' },
  { type: 'newline', pause: 200 },
  { type: 'instant', html: '<span class="t-dim">  Select an operation:</span>' },
  { type: 'newline', pause: 100 },
  { type: 'menu', html: '     🎬  <span class="t-dim">Video Operations</span>', pause: 80 },
  { type: 'menu', html: '     🤖  <span class="t-dim">AI Tools</span>', pause: 80 },
  { type: 'menu', html: '     📥  <span class="t-dim">Download</span>', pause: 80 },
  { type: 'menu', html: '     🎵  <span class="t-dim">Audio</span>', pause: 80 },
  { type: 'menu', html: '     🖼️  <span class="t-dim">Images</span>', pause: 80 },
  { type: 'menu', html: '     📦  <span class="t-dim">Batch &amp; Utilities</span>', pause: 80 },
  { type: 'newline', pause: 600 },
  { type: 'highlight', index: 4, pause: 400 },
  { type: 'newline', pause: 0 },
  { type: 'instant', html: '<span class="t-dim">  ─── Image Operations ──────────────────</span>' },
  { type: 'submenu', html: '     <span class="t-sel">[1]</span> <span class="t-dim">Convert to WebP</span>', pause: 70 },
  { type: 'submenu', html: '     <span class="t-sel">[2]</span> <span class="t-dim">Remove background (AI)</span>', pause: 70 },
  { type: 'submenu', html: '     <span class="t-sel">[3]</span> <span class="t-dim">Resize & Optimize</span>', pause: 70 },
  { type: 'newline', pause: 500 },
  { type: 'type', prompt: true, text: '1', delay: 120, pause: 400 },
  { type: 'newline', pause: 0 },
  { type: 'type', prompt: false, label: '  Input file/folder: ', text: 'hero_assets/', delay: 80, pause: 300 },
  { type: 'newline', pause: 0 },
  { type: 'type', prompt: false, label: '  Quality (1-100): ', text: '85', delay: 100, pause: 250 },
  { type: 'newline', pause: 200 },
  { type: 'progress', pause: 1200 },
  { type: 'newline', pause: 0 },
  { type: 'instant', html: '<span class="t-success">  ✓ Done  →  Converted 12 files to WebP  (00:01.4s)</span>' },
  { type: 'newline', pause: 0 },
  { type: 'instant', html: '<span class="t-dim">  Press any key to return to menu...</span>' },
  { type: 'done' },
]

// ── Inline terminal styles ──────────────────────────────────────────────
const TERMINAL_STYLE = `
  .t-prompt { color: var(--amber); }
  .t-cmd { color: var(--text); font-weight: 500; }
  .t-hdr { color: var(--amber); font-weight: 800; }
  .t-dim { color: var(--text-3); }
  .t-active { color: var(--amber); text-shadow: 0 0 8px rgba(255,184,108,0.4); }
  .t-menu { color: var(--text-2); padding-left: 1rem; }
  .t-sel { color: var(--cyan); font-weight: 700; }
  .t-success { color: var(--cyan); }
`

// ── Terminal Instance (Single Pane API) ─────────────────────────────────
function TerminalInstance({ sequence, started, replayKey, onDone }) {
  const bodyRef = useRef(null)
  const timeoutRef = useRef(null)
  const seqRef = useRef(0)
  const menuLinesRef = useRef([])

  const clearTimeout_ = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }

  const addLine = (html, extraClass = '') => {
    const body = bodyRef.current
    if (!body) return null
    const cur = body.querySelector(`.${styles.cursor}`)
    if (cur) cur.remove()
    const line = document.createElement('span')
    line.style.cssText = 'opacity:1; display:block;'
    if (extraClass) line.className = extraClass
    line.innerHTML = html
    body.appendChild(line)
    body.scrollTop = body.scrollHeight
    return line
  }

  const addCursor = () => {
    const body = bodyRef.current
    if (!body) return
    const cur = document.createElement('span')
    cur.className = styles.cursor
    body.appendChild(cur)
  }

  const typeText = (prefix, textClass, text, speed, cb) => {
    const body = bodyRef.current
    if (!body) return
    const cur = body.querySelector(`.${styles.cursor}`)
    if (cur) cur.remove()

    const line = document.createElement('span')
    line.style.cssText = 'display:block; opacity:1;'
    line.innerHTML = prefix

    const textSpan = document.createElement('span')
    if (textClass) textSpan.className = textClass
    line.appendChild(textSpan)

    const cursor = document.createElement('span')
    cursor.className = styles.cursor
    line.appendChild(cursor)

    body.appendChild(line)

    let i = 0
    const tick = () => {
      if (!bodyRef.current) return
      if (i < text.length) {
        textSpan.appendChild(document.createTextNode(text[i++]))
        body.scrollTop = body.scrollHeight
        timeoutRef.current = setTimeout(tick, speed + Math.random() * speed * 0.4)
      } else {
        timeoutRef.current = setTimeout(cb, 80)
      }
    }
    tick()
  }

  const runProgress = (onFinishStep) => {
    const body = bodyRef.current
    if (!body) return
    const cur = body.querySelector(`.${styles.cursor}`)
    if (cur) cur.remove()
    const line = document.createElement('span')
    line.style.cssText = 'display:block; opacity:1;'
    line.innerHTML = `  <span class="t-dim">Processing </span><span style="display:inline-block;vertical-align:middle;"><span style="display:inline-block;width:200px;background:var(--border);height:6px;vertical-align:middle;"><span id="__prog_fill" style="display:block;height:100%;background:var(--amber);width:0%;transition:width 0.1s linear;"></span></span> <span id="__prog_pct" style="font-family:var(--mono);font-size:0.75rem;color:var(--amber);">0%</span></span>`
    body.appendChild(line)
    body.scrollTop = body.scrollHeight
    let pct = 0
    const fill = line.querySelector('#__prog_fill')
    const pctEl = line.querySelector('#__prog_pct')
    const tick = () => {
      if (!bodyRef.current) return
      pct += 1 + Math.random() * 3
      if (pct >= 100) {
        pct = 100
        if (fill) fill.style.width = '100%'
        if (pctEl) { pctEl.textContent = '100%'; pctEl.style.color = 'var(--green)' }
        timeoutRef.current = setTimeout(onFinishStep, 300)
        return
      }
      if (fill) fill.style.width = pct + '%'
      if (pctEl) pctEl.textContent = Math.round(pct) + '%'
      timeoutRef.current = setTimeout(tick, 30)
    }
    tick()
  }

  const runSequence = () => {
    const idx = seqRef.current
    if (idx >= sequence.length) return
    seqRef.current = idx + 1
    const step = sequence[idx]

    switch (step.type) {
      case 'type': {
        const prefix = step.prompt
          ? '<span class="t-prompt">$</span> '
          : `<span class="t-dim">${step.label || ''}</span>`
        typeText(prefix, 't-cmd', step.text, step.delay || 90, () => {
          timeoutRef.current = setTimeout(runSequence, step.pause || 200)
        })
        break
      }
      case 'newline':
        addLine('&nbsp;')
        timeoutRef.current = setTimeout(runSequence, step.pause || 50)
        break
      case 'instant':
        addLine(step.html)
        timeoutRef.current = setTimeout(runSequence, step.pause || 40)
        break
      case 'menu': {
        const el = addLine(step.html)
        menuLinesRef.current.push(el)
        timeoutRef.current = setTimeout(runSequence, step.pause || 60)
        break
      }
      case 'submenu':
        addLine(step.html)
        timeoutRef.current = setTimeout(runSequence, step.pause || 60)
        break
      case 'highlight': {
        menuLinesRef.current.forEach((el, i) => {
          if (i === step.index && el) {
            el.innerHTML = el.innerHTML
              .replace('t-dim', '')
              .replace('     ', '  <span class="t-active">▶</span> ')
            el.style.color = 'var(--amber)'
          }
        })
        if (bodyRef.current) bodyRef.current.scrollTop = 9999
        timeoutRef.current = setTimeout(runSequence, step.pause || 400)
        break
      }
      case 'progress':
        runProgress(() => { timeoutRef.current = setTimeout(runSequence, step.pause || 0) })
        break
      case 'done':
        addCursor()
        if (onDone) onDone()
        break
      default:
        runSequence()
    }
  }

  useEffect(() => {
    if (!started) return
    clearTimeout_()
    seqRef.current = 0
    menuLinesRef.current = []
    if (bodyRef.current) {
      bodyRef.current.innerHTML = `<span class="${styles.cursor}"></span>`
    }
    const tid = setTimeout(runSequence, 500)
    timeoutRef.current = tid
    return clearTimeout_
  }, [started, replayKey])

  return (
    <div className={styles.terminalPane} ref={bodyRef}>
      <span className={styles.cursor} />
    </div>
  )
}

// ── Main Shell ──────────────────────────────────────────────────────────
export default function Terminal({ version }) {
  const wrapRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [doneCount, setDoneCount] = useState(0)
  const [replayKey, setReplayKey] = useState(0)

  // Dynamically inject the version into the sequences
  const dynamicSeqLeft = SEQ_LEFT.map(step => {
    if (step.html && step.html.includes('v5.1.0')) {
      return { ...step, html: step.html.replace('v5.1.0', version) }
    }
    return step
  })

  const dynamicSeqRight = SEQ_RIGHT.map(step => {
    if (step.html && step.html.includes('v5.1.0')) {
      return { ...step, html: step.html.replace('v5.1.0', version) }
    }
    return step
  })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        observer.unobserve(el)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  const handleReplay = () => {
    setDoneCount(0)
    setReplayKey(k => k + 1)
  }

  return (
    <section id="cli">
      <style>{TERMINAL_STYLE}</style>

      <div className="container">
        <p className={styles.sectionLabel}>Interactive CLI</p>
        <h2 className={`${styles.sectionTitle} reveal`}>A menu-driven experience.<br />Zero memorization.</h2>

        <div className={`${styles.terminal} reveal`} ref={wrapRef}>
          <div className={styles.terminalBar}>
            <div className={`${styles.dot} ${styles.dotR}`} />
            <div className={`${styles.dot} ${styles.dotY}`} />
            <div className={`${styles.dot} ${styles.dotG}`} />
            <div className={styles.terminalTitle}>peg_this — split pane</div>
          </div>

          <div className={styles.terminalBody}>
            <TerminalInstance
              sequence={dynamicSeqLeft}
              started={started}
              replayKey={replayKey}
              onDone={() => setDoneCount(c => c + 1)}
            />
            <TerminalInstance
              sequence={dynamicSeqRight}
              started={started}
              replayKey={replayKey}
              onDone={() => setDoneCount(c => c + 1)}
            />
          </div>

          <button
            className={`${styles.replayBtn} ${doneCount === 2 ? styles.replayVisible : ''}`}
            onClick={handleReplay}
          >↺ REPLAY</button>
        </div>

        <div className={`${styles.cliStrip} reveal`}>
          <div className={styles.cliCell}>
            <div className={styles.cliHeading}>INTERACTIVE</div>
            <div className={styles.cliCmd}>peg_this</div>
            <div className={styles.cliDesc}>Full interactive menu</div>
            <div className={styles.cliCmd}>peg_this --gui</div>
            <div className={styles.cliDesc}>Desktop GUI (beta)</div>
          </div>
          <div className={styles.cliCell}>
            <div className={styles.cliHeading}>DOWNLOAD SHORTCUTS</div>
            <div className={styles.cliCmd}>peg_this -d [url]</div>
            <div className={styles.cliDesc}>Download with quality picker</div>
            <div className={styles.cliCmd}>peg_this -dy [url]</div>
            <div className={styles.cliDesc}>Instant best-quality MP4</div>
          </div>
          <div className={styles.cliCell}>
            <div className={styles.cliHeading}>PREREQUISITES</div>
            <div className={`${styles.cliCmd} ${styles.cliCmdCyan}`}>brew install ffmpeg</div>
            <div className={styles.cliDesc}>macOS (Homebrew)</div>
            <div className={`${styles.cliCmd} ${styles.cliCmdCyan}`}>choco install ffmpeg</div>
            <div className={styles.cliDesc}>Windows (Chocolatey)</div>
          </div>
        </div>
      </div>
    </section>
  )
}
