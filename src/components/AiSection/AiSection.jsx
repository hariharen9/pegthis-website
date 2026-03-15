import styles from './AiSection.module.css'

const AI_CARDS = [
  {
    title: '💬 Auto Subtitles',
    desc: 'Generate subtitles using Faster-Whisper with 7 model sizes from tiny to large-v3. Hard burn, soft embed, or export to SRT/VTT/LRC.',
    details: [
      { key: 'Models', val: 'tiny.en → large-v3 (75MB–3GB)' },
      { key: 'Languages', val: '99+ via Whisper multilingual' },
      { key: 'Output', val: '.srt · .vtt · .txt · .lrc · ASS burn' },
      { key: 'Special', val: 'Brainrot animated word captions' },
    ],
    delay: '0s',
  },
  {
    title: '📐 Smart Reframe',
    desc: 'Auto-crop 16:9 → 9:16 keeping subjects in frame. Haar cascade face detection with temporal EMA smoothing. No GPU required.',
    details: [
      { key: 'Targets', val: '9:16 · 1:1 · 4:5' },
      { key: 'Use Cases', val: 'TikTok · Reels · Shorts · Instagram' },
      { key: 'Method', val: 'Haar cascade + EMA smoothing' },
      { key: 'Hardware', val: 'CPU only — no GPU needed' },
    ],
    delay: '0.1s',
  },
  {
    title: '🚀 Video Upscaling',
    desc: 'Real-ESRGAN powered upscaling with four modes. From instant FFmpeg to slow quality AI and an anime-specific model. CUDA, MPS, CPU.',
    details: [
      { key: 'Quick', val: '⚡ FFmpeg — instant basic upscaling' },
      { key: 'Fast AI', val: '🚀 Real-ESRGAN, general content' },
      { key: 'Quality AI', val: '🐢 Slow, best for final renders' },
      { key: 'Anime AI', val: '🚀 Optimized for animation' },
    ],
    delay: '0.2s',
  },
  {
    title: '🎙️ Auto-Dubbing',
    desc: 'Translate and re-voice videos into 24+ languages. Transcription, translation, and voice synthesis all run locally via Piper TTS.',
    details: [
      { key: 'Languages', val: '24+ including CJK, Arabic, Hindi' },
      { key: 'Pipeline', val: 'Whisper → translate → Piper TTS' },
      { key: 'Privacy', val: '100% local — no cloud API calls' },
      { key: 'Bonus', val: 'Demucs stems: vocals/drums/bass' },
    ],
    delay: '0.3s',
  },
]

export default function AiSection() {
  return (
    <section className={styles.section} id="ai">
      <div className="container">
        <p className={styles.sectionLabel}>AI Spotlight</p>
        <h2 className={`${styles.sectionTitle} reveal`}>Local AI. Zero cloud.<br />Runs on your machine.</h2>

        <div className={styles.grid}>
          {AI_CARDS.map((card) => (
            <div className={`${styles.card} reveal`} key={card.title} style={{ transitionDelay: card.delay }}>
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
      </div>
    </section>
  )
}
