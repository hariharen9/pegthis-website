import { useState } from 'react'
import styles from './WhySection.module.css'

const PAIN_STATS = [
  { value: '47+', label: 'Flags to memorize', icon: '🤯' },
  { value: '3hrs', label: 'Wasted per edit', icon: '⏱' },
  { value: '∞', label: 'Stack Overflow tabs', icon: '📋' },
  { value: '1', label: 'Command needed now', icon: '✨' },
]

const WHY_FEATURES = [
  {
    icon: '⌨️',
    title: <span>One command: <code>peg_this</code></span>,
    desc: 'No flags. No syntax. Pick from a menu. Follow prompts. Done in seconds.',
  },
  {
    icon: '🧠',
    title: 'AI that runs on YOUR machine',
    desc: 'Auto subtitles, smart reframe, background removal, voice dubbing — zero cloud. Zero cost. Zero privacy concerns.',
  },
  {
    icon: '⚡',
    title: 'Lossless when it counts',
    desc: 'Trim and loop without re-encoding. Stream-copy for instant results. Only re-encode when the operation demands it.',
  },
  {
    icon: '📥',
    title: '1000+ sites. One command.',
    desc: 'YouTube, TikTok, Twitter — download, then trim, compress, subtitle, all without leaving peg_this.',
  },
]

export default function WhySection() {
  const [activeAB, setActiveAB] = useState('bad')
  const isBad = activeAB === 'bad'

  return (
    <section className={styles.section} id="why">
      <div className="container">
        <p className={styles.sectionLabel}>Reality Check</p>
        <h2 className={styles.sectionTitle}>
          You Googled that FFmpeg command.{' '}
          <span className={styles.titleAccent}>Again.</span>
        </h2>
        <p className={styles.sectionSub}>
          Everyone does. FFmpeg syntax is unforgivable. The flags are endless. You deserve better.
        </p>

        {/* Pain Stats */}
        <div className={`${styles.painStats} reveal`}>
          {PAIN_STATS.map((s, i) => (
            <div className={styles.painStat} key={i}>
              <span className={styles.painIcon}>{s.icon}</span>
              <span className={styles.painValue}>{s.value}</span>
              <span className={styles.painLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {/* LEFT: A/B toggle code panel */}
          <div className="reveal-left">
            <div className={styles.abToggleWrap}>
              <button
                className={`${styles.abBtn} ${isBad ? styles.activeBad : ''}`}
                onClick={() => setActiveAB('bad')}
              >😩 The Hard Way</button>
              <button
                className={`${styles.abBtn} ${!isBad ? styles.activeGood : ''}`}
                onClick={() => setActiveAB('good')}
              >😎 The Easy Way</button>
            </div>

            <div
              className={styles.codePanel}
              style={{ borderColor: isBad ? 'rgba(232,64,64,0.3)' : 'rgba(61,214,140,0.3)' }}
            >
              <span className={`${styles.codePanelLabel} ${isBad ? styles.labelBad : styles.labelGood}`}>
                {isBad ? '💀 RAW FFMPEG' : '🍌 WITH PEG_THIS'}
              </span>

              {/* BAD view */}
              <div className={`${styles.codeView} ${!isBad ? styles.codeViewHidden : ''}`}>
                <div className={styles.codeBlock}>
                  <span className={styles.cCmt}># Task: Crop video to 9:16 for TikTok</span>{'\n'}
                  <span className={styles.cCmt}># Step 1: Figure out the crop filter math...</span>{'\n\n'}
                  <span className={styles.cCmd}>ffmpeg</span> <span className={styles.cFlag}>-i</span> input.mp4 <span className={styles.cFlag}>-vf</span> <span className={styles.cStr}>"crop=iw*9/16:ih:(iw-iw*9/16)/2:0"</span>{'\n'}
                  <span className={styles.cFlag}>-c:v</span> libx264 <span className={styles.cFlag}>-crf</span> 23 <span className={styles.cFlag}>-preset</span> medium <span className={styles.cFlag}>-c:a</span> aac output.mp4{'\n\n'}
                  <span className={styles.cCmt}># Task: Compress to 25MB for Discord</span>{'\n'}
                  <span className={styles.cCmt}># Step 1: Calculate target bitrate manually...</span>{'\n\n'}
                  <span className={styles.cCmd}>ffmpeg</span> <span className={styles.cFlag}>-i</span> input.mp4 <span className={styles.cFlag}>-c:v</span> libx264 <span className={styles.cFlag}>-b:v</span>{'\n'}
                  <span className={styles.cErr}>$(( 25*8192/$(ffprobe -v error -show_entries</span>{'\n'}
                  <span className={styles.cErr}>format=duration -of csv=p=0 in.mp4 | cut -d. -f1) ))k</span>{'\n'}
                  <span className={styles.cFlag}>-pass</span> 1 <span className={styles.cFlag}>-f</span> null /dev/null <span className={styles.cErr}>&amp;&amp; ...</span>{'\n\n'}
                  <span className={styles.cCmt}># Task: Add subtitles</span>{'\n'}
                  <span className={styles.cCmt}># Step 1: Install whisper, configure model...</span>{'\n'}
                  <span className={styles.cCmt}># Step 2: Generate .srt file manually...</span>{'\n'}
                  <span className={styles.cCmt}># Step 3: Burn subs with correct encoding...</span>{'\n'}
                  <span className={styles.cErr}># ...you get the idea. 😵</span>
                </div>
                <div className={styles.verdict}>
                  <span className={styles.verdictBad}>3 tasks. 20+ flags. 45 minutes of pain.</span>
                </div>
              </div>

              {/* GOOD view */}
              <div className={`${styles.codeView} ${isBad ? styles.codeViewHidden : ''}`}>
                <div className={styles.codeBlock}>
                  <span className={styles.cCmt}># Same 3 tasks. Zero Googling.</span>{'\n\n'}
                  <span className={styles.cCmd}>$</span> peg_this
                </div>

                <div className={styles.taskBlock}>
                  <div className={styles.taskHeader}><span className={styles.cArrow}>▶</span> <span className={styles.cKey}>🎬 Crop to 9:16</span></div>
                  <div className={styles.taskStep}><span className={styles.cCmt}>Select:</span> <span className={styles.cVal}>Video → Crop to aspect ratio</span></div>
                  <div className={styles.taskStep}><span className={styles.cCmt}>Ratio:</span> <span className={styles.cKey}>9:16</span></div>
                  <div className={styles.taskResult}><span className={styles.cArrow}>✓</span> <span className={styles.cVal}>Done → output_9x16.mp4</span></div>
                </div>

                <div className={styles.taskBlock}>
                  <div className={styles.taskHeader}><span className={styles.cArrow}>▶</span> <span className={styles.cKey}>📦 Compress for Discord</span></div>
                  <div className={styles.taskStep}><span className={styles.cCmt}>Select:</span> <span className={styles.cVal}>Video → Compress video</span></div>
                  <div className={styles.taskStep}><span className={styles.cCmt}>Target:</span> <span className={styles.cKey}>25 MB</span></div>
                  <div className={styles.taskResult}><span className={styles.cArrow}>✓</span> <span className={styles.cVal}>Done → compressed.mp4</span></div>
                </div>

                <div className={styles.taskBlock}>
                  <div className={styles.taskHeader}><span className={styles.cArrow}>▶</span> <span className={styles.cKey}>🤖 Auto Subtitles</span></div>
                  <div className={styles.taskStep}><span className={styles.cCmt}>Select:</span> <span className={styles.cVal}>AI Tools → Auto Subtitles</span></div>
                  <div className={styles.taskStep}><span className={styles.cCmt}>Model:</span> <span className={styles.cKey}>small.en</span></div>
                  <div className={styles.taskResult}><span className={styles.cArrow}>✓</span> <span className={styles.cVal}>Done → subtitles burned in</span></div>
                </div>

                <div className={styles.verdict}>
                  <span className={styles.verdictGood}>3 tasks. 0 flags. Under 2 minutes. 🎉</span>
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
