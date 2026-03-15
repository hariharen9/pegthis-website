import { useState } from 'react'
import styles from './WhySection.module.css'

const WHY_FEATURES = [
  {
    icon: '⌨️',
    title: <span>Just type <code>peg_this</code></span>,
    desc: 'An interactive menu guides you through every operation. Pick from a list. Follow prompts. Done.',
  },
  {
    icon: '🧠',
    title: 'AI-Powered, Locally Run',
    desc: 'Auto subtitles, smart reframe, background removal, voice dubbing — all on your machine, no cloud.',
  },
  {
    icon: '⚡',
    title: 'Lossless Where It Matters',
    desc: 'Trim and loop without re-encoding. Stream-copy for instant results. Re-encode only when you need it.',
  },
  {
    icon: '🖥️',
    title: 'GUI Mode Available',
    desc: 'Hardware-accelerated desktop interface via DearPyGUI. Full engine, visual workflow.',
  },
]

export default function WhySection() {
  const [activeAB, setActiveAB] = useState('bad')
  const isBad = activeAB === 'bad'

  return (
    <section className={styles.section} id="why">
      <div className="container">
        <p className={styles.sectionLabel}>The Problem</p>
        <h2 className={styles.sectionTitle}>FFmpeg is power.<br />The syntax is the wall.</h2>

        <div className={styles.grid}>
          {/* LEFT: A/B toggle code panel */}
          <div className="reveal-left">
            <div className={styles.abToggleWrap}>
              <button
                className={`${styles.abBtn} ${isBad ? styles.activeBad : ''}`}
                onClick={() => setActiveAB('bad')}
              >✗ Without peg_this</button>
              <button
                className={`${styles.abBtn} ${!isBad ? styles.activeGood : ''}`}
                onClick={() => setActiveAB('good')}
              >✓ With peg_this</button>
            </div>

            <div
              className={styles.codePanel}
              style={{ borderColor: isBad ? 'rgba(232,64,64,0.3)' : 'rgba(61,214,140,0.3)' }}
            >
              <span className={`${styles.codePanelLabel} ${isBad ? styles.labelBad : styles.labelGood}`}>
                {isBad ? 'WITHOUT peg_this' : 'WITH peg_this'}
              </span>

              {/* BAD view */}
              <div className={`${styles.codeView} ${!isBad ? styles.codeViewHidden : ''}`}>
                <div className={styles.codeBlock}>
                  <span className={styles.cCmt}># Crop to 9:16 portrait</span>{'\n'}
                  <span className={styles.cCmd}>ffmpeg</span> <span className={styles.cFlag}>-i</span> input.mp4 <span className={styles.cFlag}>-vf</span> <span className={styles.cStr}>"crop=iw*9/16:ih:(iw-iw*9/16)/2:0"</span>{'\n'}
                  <span className={styles.cFlag}>-c:v</span> libx264 <span className={styles.cFlag}>-crf</span> 23 <span className={styles.cFlag}>-preset</span> medium <span className={styles.cFlag}>-c:a</span> aac output.mp4{'\n\n'}
                  <span className={styles.cCmt}># Compress to 25MB for Discord</span>{'\n'}
                  <span className={styles.cCmd}>ffmpeg</span> <span className={styles.cFlag}>-i</span> input.mp4 <span className={styles.cFlag}>-c:v</span> libx264 <span className={styles.cFlag}>-b:v</span>{'\n'}
                  <span className={styles.cErr}>$(( 25*8192/$(ffprobe -v error -show_entries</span>{'\n'}
                  <span className={styles.cErr}>format=duration -of csv=p=0 in.mp4 | cut -d. -f1) ))k</span>{'\n'}
                  <span className={styles.cFlag}>-pass</span> 1 <span className={styles.cFlag}>-f</span> null /dev/null <span className={styles.cErr}>&amp;&amp; ...</span>{'\n\n'}
                  <span className={styles.cCmt}># Add subtitles... good luck</span>
                </div>
              </div>

              {/* GOOD view */}
              <div className={`${styles.codeView} ${isBad ? styles.codeViewHidden : ''}`}>
                <div className={styles.codeBlock}>
                  <span className={styles.cCmt}># Just run peg_this and follow the menu</span>{'\n'}
                  <span className={styles.cCmd}>$</span> peg_this{'\n\n'}
                  <span className={styles.cArrow}>  ▶</span> <span className={styles.cKey}>🎬  Video Operations</span>{'\n'}
                  {'      '}<span className={styles.cOpt}>[1]</span> <span className={styles.cVal}>Convert format</span>{'\n'}
                  {'      '}<span className={styles.cOpt}>[2]</span> <span className={styles.cVal}>Compress video</span>{'\n'}
                  {'      '}<span className={styles.cOpt}>[3]</span> <span className={styles.cVal}>Crop to aspect ratio</span>{'\n'}
                  {'      '}<span className={styles.cOpt}>[4]</span> <span className={styles.cVal}>Trim (lossless)</span>{'\n'}
                  {'      '}<span className={styles.cOpt}>...</span>{'\n\n'}
                  <span className={styles.cCmt}>  Enter choice: </span><span className={styles.cKey}>3</span>{'\n'}
                  <span className={styles.cCmt}>  Target ratio: </span><span className={styles.cKey}>9:16</span>{'\n'}
                  <span className={styles.cCmt}>  Input file: </span><span className={styles.cKey}>input.mp4</span>{'\n\n'}
                  <span className={styles.cArrow}>  ✓</span> <span className={styles.cVal}>Done → output_9x16.mp4</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: feature list */}
          <div className={`${styles.features} reveal-right`}>
            {WHY_FEATURES.map((f, i) => (
              <div className={styles.feature} key={i}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
