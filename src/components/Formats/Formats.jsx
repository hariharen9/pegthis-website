import styles from './Formats.module.css'

const FORMATS = [
  {
    title: 'Video Input',
    pills: ['.mp4', '.mkv', '.avi', '.mov', '.webm', '.flv', '.wmv', '.gif'],
  },
  {
    title: 'Video Output',
    pills: ['.mp4', '.mkv', '.mov', '.avi', '.webm', '.gif'],
  },
  {
    title: 'Audio',
    pills: ['.mp3', '.flac', '.wav', '.ogg', '.aac', '.m4a', '.opus'],
  },
  {
    title: 'Image',
    pills: ['.jpg', '.png', '.webp', '.bmp', '.tiff'],
  },
  {
    title: 'Subtitles',
    pills: ['.srt', '.vtt', '.txt', '.lrc', '.ass'],
  },
]

export default function Formats() {
  return (
    <section>
      <div className="container">
        <p className={styles.sectionLabel}>Supported Formats</p>
        <h2 className={`${styles.sectionTitle} reveal`}>Every format you&apos;ll ever encounter.</h2>

        <div className={`${styles.grid} reveal-scale`}>
          {FORMATS.map(f => (
            <div key={f.title} className={styles.group}>
              <div className={styles.groupTitle}>{f.title}</div>
              <div className={styles.list}>
                {f.pills.map(p => <span key={p} className={styles.pill}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
