import styles from './AiSection.module.css'

const AI_HERO_CARDS = [
  {
    title: '💬 Auto Subtitles',
    desc: 'Generate subtitles using Faster-Whisper. 7 model sizes from tiny (~75MB) to large-v3 (~3GB). Hard burn, soft embed, or export to SRT/VTT/LRC.',
    details: [
      { key: 'Languages', val: '99+ via Whisper multilingual' },
      { key: 'Output', val: '.srt · .vtt · .txt · .lrc · ASS burn-in' },
      { key: 'Models', val: 'tiny.en → large-v3' },
    ],
  },
  {
    title: '🎙️ Auto-Dubbing',
    desc: 'Translate and re-voice videos into 24+ languages. Whisper transcription → translation → Piper TTS voice synthesis — all running locally.',
    details: [
      { key: 'Languages', val: '24+ including CJK, Arabic, Hindi' },
      { key: 'Pipeline', val: 'Whisper → Translate → Piper TTS' },
      { key: 'Privacy', val: '100% local — zero cloud API calls' },
    ],
  },
]

const AI_GRID_CARDS = [
  {
    icon: '🔥',
    title: 'Brainrot Captions',
    desc: 'TikTok-style animated word-by-word captions using Whisper + ASS rendering. The viral subtitle effect, automated.',
  },
  {
    icon: '🚀',
    title: 'Super Resolution',
    desc: 'AI upscaling via Real-ESRGAN. 4 modes: Quick (FFmpeg), Fast AI, Quality AI, and Anime AI. CUDA, MPS, CPU.',
  },
  {
    icon: '🎭',
    title: 'Blur Faces',
    desc: 'Auto-detect and blur all faces in a video using Haar cascade detection. Privacy-safe content in one step.',
  },
  {
    icon: '✂️',
    title: 'Remove Background',
    desc: 'AI background removal from video frames using rembg (U2-Net). Replace or make transparent — no green screen needed.',
  },
  {
    icon: '🎵',
    title: 'Music Separation',
    desc: 'Separate any song into vocals, drums, bass, and other stems using Demucs. Perfect for remixes and karaoke.',
  },
]

export default function AiSection() {
  return (
    <section className={styles.section} id="ai">
      <div className="container">
        <p className={styles.sectionLabel}>AI Spotlight</p>
        <h2 className={`${styles.sectionTitle} reveal`}>
          7 AI tools. <span className={styles.titleAccent}>Zero cloud.</span><br />
          Runs on your machine.
        </h2>
        <p className={`${styles.sectionSub} reveal`}>
          Every AI feature runs locally — no API keys, no subscriptions, no data leaving your computer. Just install and use.
        </p>

        {/* Hero cards — 2 large */}
        <div className={`${styles.heroGrid} reveal`}>
          {AI_HERO_CARDS.map((card) => (
            <div className={styles.heroCard} key={card.title}>
              <div className={styles.badge}>AI</div>
              <div className={styles.cardTitle}>{card.title}</div>
              <div className={styles.cardDesc}>{card.desc}</div>
              <div>
                {card.details.map((d) => (
                  <div className={styles.detailRow} key={d.key}>
                    <span className={styles.detailKey}>{d.key}</span>
                    <span className={styles.detailVal}>{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Grid cards — 5 smaller */}
        <div className={`${styles.miniGrid} reveal`}>
          {AI_GRID_CARDS.map((card) => (
            <div className={styles.miniCard} key={card.title}>
              <span className={styles.miniIcon}>{card.icon}</span>
              <div className={styles.miniTitle}>{card.title}</div>
              <div className={styles.miniDesc}>{card.desc}</div>
              <div className={styles.aiBadgeSmall}>AI</div>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className={`${styles.statStrip} reveal`}>
          <div className={styles.statCell}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>API keys needed</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>$0</span>
            <span className={styles.statLabel}>Per-month cost</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Private & local</span>
          </div>
          <div className={styles.statCell}>
            <span className={styles.statValue}>3</span>
            <span className={styles.statLabel}>GPU backends</span>
          </div>
        </div>
      </div>
    </section>
  )
}
