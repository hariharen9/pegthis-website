import styles from './Footer.module.css'

const LINKS = [
  { href: 'https://github.com/hariharen9/ffmpeg-this', label: 'GitHub' },
  { href: 'https://pypi.org/project/peg-this/', label: 'PyPI' },
  { href: 'https://github.com/hariharen9/ffmpeg-this/releases/latest', label: 'Releases' },
  { href: 'https://github.com/hariharen9/ffmpeg-this/blob/master/CONTRIBUTING.md', label: 'Contributing' },
  { href: 'https://github.com/sponsors/hariharen9', label: 'Sponsor' },
  { href: 'https://hariharen.site', label: 'Author' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo} title="Please don't ask about the name.">peg_this</div>
      <ul className={styles.links}>
        {LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
          </li>
        ))}
      </ul>
      <div className={styles.copy}>
        MIT License · Crafted by{' '}
        <a href="https://hariharen.site" target="_blank" rel="noreferrer">Hariharen</a>
      </div>
    </footer>
  )
}
