import styles from './Formats.module.css'

const FORMATS = [
  {
    title: 'Video',
    pills: ['.mp4', '.mkv', '.avi', '.mov', '.webm', '.flv', '.wmv', '.gif'],
  },
  {
    title: 'Audio',
    pills: ['.mp3', '.flac', '.wav', '.ogg', '.aac', '.m4a', '.opus'],
  },
  {
    title: 'Image',
    pills: ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'],
  },
  {
    title: 'Subtitles',
    pills: ['.srt', '.vtt', '.txt', '.ass', '.lrc'],
  },
]

export default function Formats() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={styles.sectionLabel}>The Magic of FFmpeg</p>
            <h2 className={`${styles.sectionTitle} reveal`}>
              Every format you&apos;ll ever encounter. <br />
              <span className={styles.accent}>Literally anything.</span>
            </h2>
          </div>
          <p className={`${styles.subTitle} reveal`}>
            If it holds pixels or soundwaves, peg_this can read it, edit it, and convert it. Standard formats, ancient codecs, or bizarre proprietary files — zero extra plugins required.
          </p>
        </div>

        <div className={`${styles.grid} reveal-scale`}>
          {FORMATS.map(f => (
            <div key={f.title} className={styles.group}>
              <div className={styles.groupTitle}>{f.title}</div>
              <div className={styles.list}>
                {f.pills.map(p => <span key={p} className={styles.pill}>{p}</span>)}
              </div>
            </div>
          ))}
          
          {/* Highlight for the "Everything Else" */}
          <div className={`${styles.group} ${styles.highlightGroup}`}>
            <div className={styles.groupTitleHighlight}>And 1000+ More...</div>
            <div className={styles.obscureText}>
              .ts .m2ts .vob .mxf .prores .dnxhd .raw .alac .dsf .amr .wma .rmvb .ogv .dv .cine .braw .r3d .hevc .av1 ...
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
