import styles from './DownloadSpotlight.module.css'

const FEATURES = [
  { label: <><strong>Quality Picker:</strong> Choose exact resolution or audio format</> },
  { label: <><strong>Playlists:</strong> Download all, specific items, or a range</> },
  { label: <><strong>SponsorBlock:</strong> Automatically skip or remove sponsor segments</> },
  { label: <><strong>Instant Flow:</strong> Download → Trim → Compress instantly</> },
]

export default function DownloadSpotlight() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className="reveal-left">
            <p className={styles.sectionLabel}>Download Engine</p>
            <h2 className={styles.sectionTitle}>1000+ sites.<br />Zero friction.</h2>
            <p className={styles.sectionDesc}>
              Powered by yt-dlp, download from YouTube, TikTok, Twitter, and everywhere else. With smart defaults and powerful overrides.
            </p>
            <ul className={styles.featureList}>
              {FEATURES.map((f, i) => (
                <li key={i} className={styles.featureItem}>
                  <span className={styles.check}>✓</span>
                  <span className={styles.featureText}>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-right">
            <div className={styles.codePanel}>
              <span className={styles.codePanelLabel}>peg_this -d</span>
              <div className={styles.codeBlock}>
                <span className={styles.cCmd}>$</span> peg_this -d &quot;https://youtu.be/...&quot;{'\n\n'}
                <span className={styles.cCmt}>  [Info] 10 Hours of Intense Pegging (ASMR Soft Whispering)</span>{'\n'}
                <span className={styles.cCmt}>  [Views] 1.4B • [Duration] 10:00:00</span>{'\n\n'}
                <span className={styles.cArrow}>  ▶</span> <span className={styles.cKey}>Select Format</span>{'\n'}
                {'      '}<span className={styles.cOpt}>[1]</span> <span className={styles.cVal}>Video (MP4/MKV)</span>{'\n'}
                {'      '}<span className={styles.cOpt}>[2]</span> <span className={styles.cVal}>Audio Only (MP3/FLAC)</span>{'\n\n'}
                <span className={styles.cCmt}>  Enter choice: </span><span className={styles.cKey}>1</span>{'\n'}
                <span className={styles.cArrow}>  ✓</span> <span className={styles.cVal}>Downloading 1080p (45MB)...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
