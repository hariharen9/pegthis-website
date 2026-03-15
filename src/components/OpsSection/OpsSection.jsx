import { useState } from 'react'
import styles from './OpsSection.module.css'

const TABS = ['video', 'audio', 'image', 'subtitle', 'utils']
const TAB_LABELS = { video: '🎬 Video', audio: '🎵 Audio', image: '🖼️ Image', subtitle: '💬 Subtitles', utils: '📦 Utilities' }

const VIDEO_OPS = [
  ['Convert (MP4, MKV, MOV, AVI, WebM)', 'FFmpeg transcode', 'Yes'],
  ['Compress (target size or CRF)', '2-pass encoding', 'Yes'],
  ['Change Resolution (4K/1080p/720p/480p/custom)', 'Scale filter', 'Yes'],
  ['Change FPS (24/30/60/120)', 'fps / minterpolate', 'Yes'],
  ['Trim (lossless cut)', 'Stream copy', 'LOSSLESS'],
  ['Crop (visual interactive)', 'crop filter', 'Yes'],
  ['Split (equal parts or by duration)', 'Stream copy or re-encode', 'Configurable'],
  ['Join / Concatenate', 'Concat filter', 'Yes'],
  ['Speed (0.25x – 4x)', 'setpts + atempo', 'Yes'],
  ['Reverse', 'Reverse filter', 'Yes'],
  ['Rotate (90°/180°) / Flip', 'transpose / hflip/vflip', 'Yes'],
  ['Loop (N times or target duration)', 'stream_loop', 'LOSSLESS'],
  ['Color Correction', 'eq filter', 'Yes'],
  ['Denoise (fast / quality)', 'hqdn3d / nlmeans', 'Yes'],
  ['Stabilize', 'vidstab (two-pass)', 'Yes'],
  ['Picture-in-Picture', 'overlay filter', 'Yes'],
  ['Add Watermark (image or text)', 'overlay filter', 'Yes'],
  ['Extract Frames', 'Frame extraction', 'N/A'],
  ['Video Fade', 'Fade In/Out (black or white)', 'Yes'],
  ['Blur Region', 'Visual interactive selection', 'Yes'],
  ['Smooth Slow Motion', 'minterpolate + setpts', 'Yes'],
  ['Audio Visualizer', 'Spectrum / Waveform render', 'Yes'],
  ['Create GIF (2-pass palette)', 'palettegen + paletteuse', 'Yes'],
  ['AI Smart Reframe', 'Haar face tracking + crop', 'Yes'],
  ['AI Auto Blur Faces', 'Haar face detection + blur', 'Yes'],
  ['AI Background Removal', 'rembg (U2-Net)', 'Yes'],
  ['AI Brainrot Captions', 'Whisper + ASS', 'Yes'],
  ['AI Video Upscaling', 'Real-ESRGAN', 'Yes'],
]

const AUDIO_OPS = [
  ['Extract from video', 'MP3, FLAC, WAV — stream copy where possible'],
  ['Remove from video', 'LOSSLESS'],
  ['Merge with video', 'Replace or mix audio tracks'],
  ['Adjust Volume', 'Presets, dB value, or multiplier'],
  ['Fade In / Out', '6 curve types available'],
  ['Normalize', 'EBU R128 · Peak · RMS · Dynamic'],
  ['Visualizer', 'Spectrum · Waveform · CQT render'],
  ['Convert format', 'MP3 · FLAC · WAV'],
  ['AI Stem Separation', 'Vocals · Drums · Bass · Other via Demucs (~1.5GB)'],
]

const IMAGE_OPS = [
  ['Convert', 'JPG · PNG · WebP · BMP · TIFF'],
  ['Resize', 'Custom dimensions, preserve aspect ratio'],
  ['Rotate / Flip', '90° CW/CCW · 180° · Horizontal · Vertical'],
  ['Crop', 'Visual click-and-drag interactive selection'],
  ['Adjust Colors', 'Brightness · Contrast · Saturation · Gamma (8 presets)'],
  ['Blur / Sharpen', '4 blur levels · 3 sharpen levels'],
  ['Effects', 'Grayscale · Sepia · Invert'],
  ['Add Border', 'Custom size · 7 colors + hex input'],
  ['Add Text', '7 positions · Font · Color · Shadow/Outline'],
  ['Compress', 'Quality 40–90% · Auto format conversion'],
  ['AI Background Removal', 'rembg U2-Net model'],
]

const SUBTITLE_OPS = [
  ['tiny.en', '~75 MB', 'Fastest', 'English only'],
  ['base.en', '~150 MB', 'Fast', 'English only'],
  ['small.en', '~500 MB', 'Balanced', 'English only'],
  ['medium.en', '~1.5 GB', 'Slower', 'English only'],
  ['small', '~500 MB', 'Balanced', '99+ languages'],
  ['medium', '~1.5 GB', 'Slower', '99+ languages'],
  ['large-v3', '~3 GB', 'Slowest', '99+ (best accuracy)'],
]

const UTILS_OPS = [
  ['Batch Convert', 'Convert all media files in a directory'],
  ['Slideshow Creator', 'Create video from images with custom duration'],
  ['Metadata Editor', 'View and edit Title, Artist, Album, etc.'],
  ['File Inspector', 'Deep analysis of codecs, streams, bitrates via ffprobe'],
  ['Hardware Acceleration', 'Auto-detect CUDA (NVIDIA) and MPS (Apple Silicon)'],
  ['GUI Mode', 'Hardware-accelerated desktop interface (--gui)'],
]

function Lossless({ val }) {
  if (val === 'LOSSLESS') return <span className={styles.lossless}>No — lossless</span>
  return val
}

export default function OpsSection() {
  const [activeTab, setActiveTab] = useState('video')

  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.sectionLabel}>Full Reference</p>
        <h2 className={`${styles.sectionTitle} reveal`}>100+ operations.<br />Zero flags to remember.</h2>

        <div className={`${styles.tabs} reveal`}>
          {TABS.map(id => (
            <button
              key={id}
              className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
              onClick={() => setActiveTab(id)}
            >{TAB_LABELS[id]}</button>
          ))}
        </div>

        {/* Video */}
        <div className={`${styles.panel} ${activeTab === 'video' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Method</th><th>Re-encode?</th></tr></thead>
            <tbody>
              {VIDEO_OPS.map(([op, method, reencode]) => (
                <tr key={op}><td>{op}</td><td>{method}</td><td><Lossless val={reencode} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Audio */}
        <div className={`${styles.panel} ${activeTab === 'audio' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Notes</th></tr></thead>
            <tbody>
              {AUDIO_OPS.map(([op, notes]) => (
                <tr key={op}><td>{op}</td><td><Lossless val={notes} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Image */}
        <div className={`${styles.panel} ${activeTab === 'image' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Options</th></tr></thead>
            <tbody>
              {IMAGE_OPS.map(([op, opts]) => (
                <tr key={op}><td>{op}</td><td>{opts}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subtitles */}
        <div className={`${styles.panel} ${activeTab === 'subtitle' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Model</th><th>Size</th><th>Speed</th><th>Languages</th></tr></thead>
            <tbody>
              {SUBTITLE_OPS.map(([model, size, speed, lang]) => (
                <tr key={model}><td>{model}</td><td>{size}</td><td>{speed}</td><td>{lang}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Utils */}
        <div className={`${styles.panel} ${activeTab === 'utils' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Notes</th></tr></thead>
            <tbody>
              {UTILS_OPS.map(([op, notes]) => (
                <tr key={op}><td>{op}</td><td>{notes}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
