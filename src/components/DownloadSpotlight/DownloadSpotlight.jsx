import styles from './DownloadSpotlight.module.css'

const PLATFORMS = [
  { name: 'YouTube', color: '#ff0000', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="#ff0000"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.9 31.9 0 0 0 0 12a31.9 31.9 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.9 31.9 0 0 0 24 12a31.9 31.9 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg> },
  { name: 'TikTok', color: '#fe2c55', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19.3 6.4a4.6 4.6 0 0 1-2.8-1 4.6 4.6 0 0 1-1.7-2.8h-3.3v13.2a2.8 2.8 0 1 1-1.9-2.6V9.8a6.2 6.2 0 1 0 5.2 6v-6.6A8 8 0 0 0 19.3 11V7.6a4.9 4.9 0 0 1 0-1.2Z" style={{fill: '#fe2c55'}}/></svg> },
  { name: 'Twitter / X', color: '#fff', svg: <svg viewBox="0 0 24 24" width="13" height="13" fill="var(--text)"><path d="M18.2 2.25h3.5l-7.7 8.8L23 21.75h-7.1l-5.5-7.2-6.3 7.2H.6l8.2-9.4L.4 2.25H7.6l5 6.6 5.6-6.6Zm-1.2 17.5h2L7.1 4.3H4.9l12.1 15.45Z"/></svg> },
  { name: 'Twitch', color: '#9146ff', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="#9146ff"><path d="M11.6 11.2V7h1.6v4.2h-1.6Zm4.3 0V7h1.6v4.2h-1.6ZM6 1 2 5v16h5.3v3l3-3h2.3L20 13.7V1H6Zm12.4 11.8L15.8 15h-3l-2.3 2.3v-2.3H7.2V2.6h11.2v10.2Z"/></svg> },
  { name: 'Vimeo', color: '#1ab7ea', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="#1ab7ea"><path d="M23.96 6.4c-.1 2.2-1.64 5.2-4.6 9.07C16.2 19.4 13.52 21.4 11.3 21.4c-1.36 0-2.52-1.27-3.48-3.8L6.08 11c-.56-2.54-1.16-3.8-1.8-3.8-.14 0-.63.3-1.47.88L2 7.03c.92-.82 1.83-1.63 2.72-2.45 1.23-1.06 2.15-1.62 2.77-1.67 1.46-.14 2.35.86 2.69 3 .36 2.3.6 3.74.74 4.3.41 1.87.86 2.8 1.36 2.8.38 0 .96-.6 1.73-1.82.77-1.22 1.18-2.15 1.23-2.78.1-.97-.26-1.45-1.1-1.45-.4 0-.8.09-1.22.27.81-2.66 2.36-3.95 4.65-3.88 1.7.05 2.5 1.15 2.39 3.3Z"/></svg> },
  { name: 'SoundCloud', color: '#ff5500', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="#ff5500"><path d="M1.2 14.3c-.07 0-.12-.05-.12-.13l-.33-2.09.33-2.15c.01-.08.06-.13.12-.13s.12.05.13.13l.4 2.15-.4 2.1c0 .07-.06.12-.13.12Zm1.82.73a.14.14 0 0 1-.14-.14L2.5 12.1l.38-3.62a.14.14 0 0 1 .28 0l.44 3.62-.44 2.79a.14.14 0 0 1-.14.14Zm1.83.17a.16.16 0 0 1-.16-.16l-.36-3.04.36-3.64a.16.16 0 0 1 .32 0l.42 3.64-.42 3.04a.16.16 0 0 1-.16.16Zm1.84.05a.18.18 0 0 1-.18-.18l-.34-3.07.34-4.63a.18.18 0 0 1 .36 0l.4 4.63-.4 3.07a.18.18 0 0 1-.18.18Zm1.86.05a.2.2 0 0 1-.2-.2l-.32-3.1.32-5a.2.2 0 0 1 .4 0l.37 5-.37 3.1a.2.2 0 0 1-.2.2Zm1.88.04a.22.22 0 0 1-.22-.22l-.3-3.12.3-5.34a.22.22 0 0 1 .44 0l.34 5.34-.34 3.12a.22.22 0 0 1-.22.22Zm1.92-.01a.23.23 0 0 1-.23-.23l-.28-2.9.28-5.48c.01-.13.1-.23.23-.23s.23.1.24.23l.32 5.48-.32 2.9c0 .13-.11.23-.24.23Zm1.97-.01c-.14 0-.26-.11-.26-.26l-.24-2.63.24-5.53c.01-.14.12-.26.26-.26s.25.12.26.26l.28 5.53-.28 2.63c0 .15-.12.26-.26.26Zm5.32-.3c-1.04 0-5.12 0-5.12 0a.27.27 0 0 1-.27-.27V5.52c0-.15.1-.25.22-.3.57-.25 1.2-.39 1.87-.39 2.62 0 4.75 2.1 4.8 4.7 0 0 .42-.13.87-.13a2.78 2.78 0 0 1 0 5.56Z"/></svg> },
  { name: 'Reddit', color: '#ff4500', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="#ff4500"><path d="M12 0A12 12 0 1 0 24 12 12 12 0 0 0 12 0Zm5.01 13.6a1.87 1.87 0 0 1-.18.82A4.56 4.56 0 0 1 12 17.06a4.56 4.56 0 0 1-4.83-2.64 1.87 1.87 0 0 1-.18-.82 1.86 1.86 0 0 1 .57-1.35 5.7 5.7 0 0 1-.17-.76 1.27 1.27 0 0 1 2.17-.97 5.4 5.4 0 0 1 2.44-.58l.46-2.16a.3.3 0 0 1 .36-.23l1.53.33a.9.9 0 1 1-.1.44l-1.37-.3-.41 1.93a5.3 5.3 0 0 1 2.36.57 1.27 1.27 0 0 1 2.18.97c0 .26-.06.52-.17.76a1.86 1.86 0 0 1 .57 1.35ZM9.9 13.06a.9.9 0 1 0 .9-.9.9.9 0 0 0-.9.9Zm4.63 1.87a2.97 2.97 0 0 1-2.53.64 2.97 2.97 0 0 1-2.53-.64.3.3 0 1 1 .42-.42 2.4 2.4 0 0 0 2.11.49 2.4 2.4 0 0 0 2.11-.49.3.3 0 0 1 .42.42Zm-.23-1.87a.9.9 0 1 0-.9-.9.9.9 0 0 0 .9.9Z"/></svg> },
  { name: '1000+ more', color: 'var(--amber)', svg: <svg viewBox="0 0 24 24" width="14" height="14" fill="var(--amber)"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg> },
]

const FEATURES = [
  { icon: '🎯', label: <><strong>Quality Picker:</strong> Choose exact resolution, codec, and audio format before downloading</> },
  { icon: '📋', label: <><strong>Playlists:</strong> Download all, first N, a range, or specific items — auto-numbered</> },
  { icon: '✂️', label: <><strong>SponsorBlock:</strong> Automatically skip or remove sponsor segments from videos</> },
  { icon: '⚡', label: <><strong>Instant Flow:</strong> Download → Trim → Compress → Subtitle — all without leaving peg_this</> },
  { icon: '🔒', label: <><strong>Cookies & Proxy:</strong> Use browser cookies for private videos, proxy support built-in</> },
  { icon: '📊', label: <><strong>Info Panel:</strong> See title, views, duration, file size, codecs — before you download</> },
]

export default function DownloadSpotlight() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.sectionLabel}>Download Engine</p>
        <h2 className={`${styles.sectionTitle} reveal`}>Paste a link.<br /><span className={styles.titleAccent}>Get the file.</span></h2>
        <p className={`${styles.sectionSub} reveal`}>
          Powered by yt-dlp. No browser extensions. No sketchy websites. Just a URL and a menu.
        </p>

        {/* Platform pills */}
        <div className={`${styles.platforms} reveal`}>
          {PLATFORMS.map(p => (
            <div className={styles.platform} key={p.name}>
              <span className={styles.platformIcon}>{p.svg}</span>
              <span className={styles.platformName}>{p.name}</span>
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {/* LEFT: Feature list */}
          <div className="reveal-left">
            <div className={styles.featureList}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <span className={styles.featureText}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Code panel */}
          <div className="reveal-right">
            <div className={styles.codePanel}>
              <span className={styles.codePanelLabel}>one-liner</span>
              <div className={styles.codeBlock}>
                <span className={styles.cCmt}># Instant best-quality download — zero prompts</span>{'\n'}
                <span className={styles.cCmd}>$</span> peg_this -dy "https://youtu.be/dQw4..."
              </div>
              <div className={styles.codeResult}>
                <span className={styles.cArrow}>✓</span> <span className={styles.cVal}>Downloaded → video_1080p.mp4 (45MB)</span>
              </div>
            </div>

            <div className={styles.codePanel} style={{ marginTop: '1px' }}>
              <span className={styles.codePanelLabel}>interactive</span>
              <div className={styles.codeBlock}>
                <span className={styles.cCmd}>$</span> peg_this -d "https://youtu.be/..."{'\n\n'}
                <span className={styles.cCmt}>  ℹ 10 Hours of Relaxing Coding Music</span>{'\n'}
                <span className={styles.cCmt}>  ♥ 142K  •  ⏱ 10:00:00  •  📐 1080p</span>{'\n\n'}
                <span className={styles.cArrow}>  ▶</span> <span className={styles.cKey}>Select Format</span>{'\n'}
                {'    '}<span className={styles.cOpt}>[1]</span> <span className={styles.cVal}>Video — MP4 1080p (2.1GB)</span>{'\n'}
                {'    '}<span className={styles.cOpt}>[2]</span> <span className={styles.cVal}>Video — MP4  720p (980MB)</span>{'\n'}
                {'    '}<span className={styles.cOpt}>[3]</span> <span className={styles.cVal}>Audio — MP3  320k (140MB)</span>{'\n'}
                {'    '}<span className={styles.cOpt}>[4]</span> <span className={styles.cVal}>Audio — FLAC       (490MB)</span>{'\n\n'}
                <span className={styles.cCmt}>  Enter choice: </span><span className={styles.cKey}>1</span>{'\n'}
                <span className={styles.cArrow}>  ⬇</span> <span className={styles.cVal}>Downloading... ████████████ 100%</span>{'\n'}
                <span className={styles.cArrow}>  ✓</span> <span className={styles.cVal}>Done → Relaxing_Coding_Music.mp4</span>
              </div>
            </div>

            <div className={styles.oneLiner}>
              <span className={styles.cCmt}>💡 </span>After download, peg_this offers to <strong>trim</strong>, <strong>compress</strong>, or <strong>add subtitles</strong> — all inline.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
