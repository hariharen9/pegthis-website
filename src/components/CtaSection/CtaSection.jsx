import styles from './CtaSection.module.css'

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <h2 className={`${styles.title} reveal`}>
        Stop memorizing.<br />
        <span className={styles.accent}>Start creating.</span>
      </h2>
      <p
        className={`${styles.sub} reveal`}
        onMouseEnter={(e) => e.target.innerText = 'The full power of FFmpeg, finally at your fingertips.'}
        onMouseLeave={(e) => e.target.innerText = 'The full power of FFmpeg, right up your... terminal.'}
      >
        <span style={{ transition: 'color 0.2s' }}>The full power of FFmpeg, right up your... terminal.</span>
      </p>
      <div className={`${styles.actions} reveal`}>
        <a href="https://github.com/hariharen9/ffmpeg-this" target="_blank" rel="noreferrer" className="btn-primary">★ Star on GitHub</a>
        <a href="https://pypi.org/project/peg-this/" target="_blank" rel="noreferrer" className="btn-secondary">↗ View on PyPI</a>
        <a href="https://github.com/sponsors/hariharen9" target="_blank" rel="noreferrer" className="btn-secondary">♥ Sponsor</a>
      </div>
    </section>
  )
}
