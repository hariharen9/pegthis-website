import styles from './Features.module.css'

const FEATURES = [
  {
    icon: '🎬', title: 'Video', num: '01',
    stat: { highlight: '20+', text: 'operations' },
    desc: 'Convert, compress, trim, crop, split, join, rotate, speed change, reverse, stabilize, color grade, denoise, watermark, PiP, loop, fade, GIF.',
    tags: [
      { label: 'Convert', cls: 'tagAmber' }, { label: 'Compress', cls: 'tagAmber' },
      { label: 'Trim', cls: '' }, { label: 'Crop', cls: '' }, { label: 'GIF', cls: '' }, { label: 'Stabilize', cls: '' },
    ],
  },
  {
    icon: '🤖', title: 'AI Tools', num: '02',
    stat: { highlight: '100%', text: 'local — zero cloud' },
    desc: 'Auto subtitles in 99 languages, brainrot captions, smart reframe with face tracking, auto face blur, background removal, upscaling, stem separation, auto-dubbing.',
    tags: [
      { label: 'Subtitles', cls: 'tagCyan' }, { label: 'Upscale', cls: 'tagCyan' },
      { label: 'Reframe', cls: 'tagCyan' }, { label: 'Face Blur', cls: 'tagCyan' }, { label: 'Dub', cls: 'tagCyan' },
    ],
  },
  {
    icon: '📥', title: 'Downloader', num: '03',
    stat: { highlight: '1000+', text: 'supported sites' },
    desc: 'YouTube, TikTok, Twitter and 1000+ sites via yt-dlp. Quality picker, audio extraction, playlist mode, SponsorBlock, speed limit, proxy support.',
    tags: [
      { label: 'yt-dlp', cls: 'tagGreen' }, { label: 'Playlists', cls: '' },
      { label: 'SponsorBlock', cls: '' }, { label: '4K', cls: '' },
    ],
  },
  {
    icon: '🎵', title: 'Audio', num: '04',
    stat: { highlight: '9', text: 'operations' },
    desc: 'Extract, remove, merge, adjust volume, fade with 6 curve types, normalize (EBU R128/Peak/RMS), generate visualizers, convert formats.',
    tags: [
      { label: 'MP3', cls: '' }, { label: 'FLAC', cls: '' }, { label: 'WAV', cls: '' }, { label: 'Stems', cls: 'tagCyan' },
    ],
  },
  {
    icon: '🖼️', title: 'Images', num: '05',
    stat: { highlight: '11', text: 'operations' },
    desc: 'Resize, rotate, flip, crop interactively, adjust colors with 8 presets, blur/sharpen, apply effects, add borders and text, compress, convert, remove background.',
    tags: [
      { label: 'Resize', cls: '' }, { label: 'Crop', cls: '' }, { label: 'BG Remove', cls: 'tagCyan' }, { label: 'Compress', cls: '' },
    ],
  },
  {
    icon: '📦', title: 'Batch & Utilities', num: '06',
    stat: { highlight: 'GPU', text: 'accelerated' },
    desc: 'Batch convert folders, create slideshows, edit metadata, inspect files, configure encoding presets, hardware acceleration via CUDA and Apple Silicon MPS.',
    tags: [
      { label: 'Batch', cls: 'tagAmber' }, { label: 'CUDA', cls: '' }, { label: 'MPS', cls: '' }, { label: 'Metadata', cls: '' },
    ],
  },
]

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className={`${styles.header} reveal`}>
          <div>
            <p className={styles.sectionLabel}>What It Does</p>
            <h2 className={styles.sectionTitle}>Every media operation<br />in one place.</h2>
          </div>
          <p className={styles.sectionDesc}>
            Video, audio, images, downloads, subtitles, AI upscaling — peg_this wraps FFmpeg's full power into a guided, memorable experience.
          </p>
        </div>

        <div className={`${styles.grid} reveal`}>
          {FEATURES.map((f) => (
            <div className={styles.card} key={f.title}>
              <span className={styles.cardNumber}>{f.num}</span>
              <span className={styles.icon}>{f.icon}</span>
              <div className={styles.title}>{f.title}</div>
              <div className={styles.statLine}>
                <span className={styles.statHighlight}>{f.stat.highlight}</span> {f.stat.text}
              </div>
              <div className={styles.desc}>{f.desc}</div>
              <div className={styles.tags}>
                {f.tags.map((t) => (
                  <span key={t.label} className={`${styles.tag} ${t.cls ? styles[t.cls] : ''}`}>{t.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
