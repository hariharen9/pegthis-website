import styles from './Install.module.css'

export default function Install() {
  return (
    <section className={styles.section} id="install">
      <div className="container">
        <p className={styles.sectionLabel}>Installation</p>
        <h2 className={`${styles.sectionTitle} reveal`}>Up and running in 10 seconds.</h2>

        <div className={`${styles.grid} reveal`}>
          {/* PyPI */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>📦 PyPI (Recommended)</div>
            <div className={styles.codeBlock}>
              <span className={styles.prefix}>$</span>
              <span>pip install peg_this</span>
            </div>
            <div className={styles.note}>Requires Python 3.8+ and FFmpeg installed in PATH</div>
            <div className={styles.extrasLabel}>OPTIONAL EXTRAS</div>
            <div className={styles.extras}>
              <span className={styles.extra}><strong>[download]</strong> yt-dlp</span>
              <span className={styles.extra}><strong>[demucs]</strong> stems</span>
              <span className={styles.extra}><strong>[upscale]</strong> ESRGAN</span>
              <span className={styles.extra}><strong>[all-ai,download]</strong> everything</span>
            </div>
          </div>

          {/* Platform prerequisites */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>🖥️ Platform Prerequisites</div>
            <div className={styles.cardSubtitle}>🍺 macOS</div>
            <div className={styles.codeBlock}><span className={styles.prefix}>$</span><span>brew install ffmpeg</span></div>
            <div className={styles.cardSubtitle}>🪟 Windows</div>
            <div className={styles.codeBlock}><span className={styles.prefix}>&gt;</span><span>choco install ffmpeg</span></div>
            <div className={styles.cardSubtitle}>🐧 Linux</div>
            <div className={styles.codeBlock}><span className={styles.prefix}>$</span><span>sudo apt install ffmpeg</span></div>
          </div>

          {/* Binaries */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>⬇️ Pre-built Binaries</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', marginBottom: '1.25rem', fontWeight: 300, lineHeight: 1.6 }}>
              No Python required. Download the latest binary for your platform from the Releases page.
            </p>
            <a href="https://github.com/hariharen9/ffmpeg-this/releases/latest" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.65rem 1.25rem' }}>
              ↓ Download Binary
            </a>
            <div className={styles.note} style={{ marginTop: '0.75rem' }}>Windows · macOS · Linux</div>
          </div>

          {/* From source */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>🔧 From Source</div>
            <div className={`${styles.codeBlock} ${styles.multiLine}`}>
              <div><span className={styles.prefix}>$</span><span>git clone github.com/hariharen9/ffmpeg-this</span></div>
              <div><span className={styles.prefix}>$</span><span>cd ffmpeg-this</span></div>
              <div><span className={styles.prefix}>$</span><span>pip install -r requirements.txt</span></div>
              <div><span className={styles.prefix}>$</span><span>python -m src.peg_this.peg_this</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
