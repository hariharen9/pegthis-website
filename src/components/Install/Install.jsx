import { useState } from 'react'
import styles from './Install.module.css'

const METHODS = [
  {
    id: 'pipx',
    label: '📦 pipx (Recommended)',
    cmd: 'pipx install peg_this',
    desc: 'Installs in an isolated environment. Requires FFmpeg in PATH.'
  },
  {
    id: 'pip',
    label: '🐍 pip (Classic)',
    cmd: 'pip install peg_this',
    desc: 'Standard global/venv install. Requires FFmpeg in PATH.'
  },
  {
    id: 'uv',
    label: '⚡ uv (Blazing Fast)',
    cmd: 'uv tool install peg_this',
    desc: 'The fastest Python package manager. Requires FFmpeg in PATH.'
  }
]

const EXTRAS = [
  { id: 'download', name: '[download]', desc: 'Unlocks yt-dlp integration' },
  { id: 'demucs', name: '[demucs]', desc: 'Unlocks music stem separation' },
  { id: 'upscale', name: '[upscale]', desc: 'Unlocks Real-ESRGAN upscaling' },
  { id: 'all-ai', name: '[all-ai]', desc: 'Installs everything' }
]

export default function Install() {
  const [activeId, setActiveId] = useState('pipx')
  const [copied, setCopied] = useState(false)
  const activeMethod = METHODS.find(m => m.id === activeId)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch(() => { })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className={styles.section} id="install">
      <div className="container">
        <p className={styles.sectionLabel}>Install</p>
        <h2 className={`${styles.sectionTitle} reveal`}>Zero to Hero in 10 seconds.</h2>

        <div className={`${styles.showcase} reveal`}>
          {/* Main Terminal Block */}
          <div className={styles.terminalContainer}>
            <div className={styles.terminalBar}>
              <div className={`${styles.dot} ${styles.dotR}`} />
              <div className={`${styles.dot} ${styles.dotY}`} />
              <div className={`${styles.dot} ${styles.dotG}`} />
              <div className={styles.terminalTitle}>Install peg_this</div>
            </div>

            <div className={styles.terminalBody}>
              <div className={styles.methodSelector}>
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    className={`${styles.methodBtn} ${activeId === m.id ? styles.activeBtn : ''}`}
                    onClick={() => setActiveId(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className={styles.cmdArea}>
                <div className={styles.cmdInfo}>{activeMethod.desc}</div>
                <div className={styles.cmdLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.commandText}>{activeMethod.cmd}</span>
                  <button
                    className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                    onClick={() => handleCopy(activeMethod.cmd)}
                    title="Copy command"
                  >
                    {copied ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>
              </div>

              <div className={styles.osReqs}>
                <span className={styles.reqLabel}>FFmpeg required:</span>
                <span className={styles.reqPlatform}>macOS: <code>brew install ffmpeg</code></span>
                <span className={styles.reqPlatform}>Windows: <code>winget install ffmpeg</code></span>
                <span className={styles.reqPlatform}>Linux: <code>sudo apt install ffmpeg</code></span>
              </div>
            </div>
          </div>

          {/* Optional Plugins Section (Sidebar-ish) */}
          <div className={styles.pluginsContainer}>
            <h3 className={styles.pluginsTitle}>⚡ Optional Plugins</h3>
            <p className={styles.pluginsDesc}>Appending these flags to the pip/uv installation unlocks heavy AI extensions later.</p>

            <div className={styles.pluginsGrid}>
              {EXTRAS.map(e => (
                <div className={styles.pluginItem} key={e.id}>
                  <div className={styles.pluginName}>{e.name}</div>
                  <div className={styles.pluginDesc}>{e.desc}</div>
                </div>
              ))}
            </div>

            <div className={styles.pluginExample}>
              <span className={styles.exLabel}>Example:</span>
              <code>pipx install &#x27;peg_this[download,upscale]&#x27;</code>
            </div>
          </div>
        </div>

        {/* Floating Binary Note */}
        <div className={`${styles.binaryNote} reveal`}>
          <div className={styles.binaryNoteText}>
            <span className={styles.bnBadge}>EASIEST</span>
            <div>
              <strong>No Python? No FFMpeg? No problem.</strong>
              <span>Download a pre-built executable for Windows, macOS, or Linux.</span>
            </div>
          </div>
          <a href="https://github.com/hariharen9/ffmpeg-this/releases/latest" target="_blank" rel="noreferrer" className={styles.binaryBtn}>
            ↓ Download Binary
          </a>
        </div>
      </div>
    </section>
  )
}
