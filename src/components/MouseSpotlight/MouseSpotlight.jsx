import { useEffect, useRef } from 'react'
import styles from './MouseSpotlight.module.css'

export default function MouseSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e) => {
      el.style.setProperty('--mx', e.clientX + 'px')
      el.style.setProperty('--my', e.clientY + 'px')
    }
    document.addEventListener('mousemove', handler, { passive: true })
    return () => document.removeEventListener('mousemove', handler)
  }, [])

  return <div ref={ref} className={styles.spotlight} />
}
