import { useState } from 'react'
import styles from './OpsSection.module.css'

const TABS = ['video', 'image', 'audio', 'ai', 'download', 'utils']
const TAB_LABELS = {
  video: '🎬 Video',
  image: '🖼️ Image',
  audio: '🎵 Audio',
  ai: '🤖 AI',
  download: '📥 Download',
  utils: '📦 Utilities',
}
const TAB_COUNTS = { video: 29, image: 13, audio: 10, ai: 8, download: 12, utils: 8 }

// ── VIDEO ────────────────────────────────────────────────────────────────────
const VIDEO_EDIT = [
  ['Trim Video', 'Stream copy', 'LOSSLESS'],
  ['Chop Middle (Lossless)', 'Remove a section from the middle of a video', 'LOSSLESS'],
  ['Crop (Visual Interactive)', 'crop filter with interactive selection', 'Yes'],
  ['Split (Equal Parts / Duration)', 'Stream copy or re-encode', 'Configurable'],
  ['Join / Concatenate', 'Concat filter', 'Yes'],
  ['Extract Frames', 'Frame extraction at interval', 'N/A'],
]
const VIDEO_CONVERT = [
  ['Convert Format (MP4, MKV, MOV, AVI, WebM)', 'FFmpeg transcode', 'Yes'],
  ['Compress (Target Size or CRF)', '2-pass encoding', 'Yes'],
  ['Change Resolution (4K/1080p/720p/480p/Custom)', 'Scale filter', 'Yes'],
  ['Change FPS (24/30/60/120)', 'fps / minterpolate', 'Yes'],
  ['Create GIF (2-Pass Palette)', 'palettegen + paletteuse', 'Yes'],
]
const VIDEO_EFFECTS = [
  ['Change Speed (0.25x – 4x)', 'setpts + atempo', 'Yes'],
  ['Smooth Slow Motion (Optical Flow)', 'minterpolate + setpts', 'Yes'],
  ['Reverse', 'Reverse filter', 'Yes'],
  ['Rotate (90°/180°)', 'transpose filter', 'Yes'],
  ['Flip (Horizontal / Vertical)', 'hflip / vflip', 'Yes'],
  ['Video Fade In/Out (Black or White)', 'fade filter', 'Yes'],
  ['Loop (N Times or Target Duration)', 'stream_loop', 'LOSSLESS'],
  ['Color Correction', 'eq filter (brightness, contrast, saturation)', 'Yes'],
  ['Denoise (Fast / Quality)', 'hqdn3d / nlmeans', 'Yes'],
  ['Blur/Pixelate Region (Visual)', 'boxblur / scale with interactive selection', 'Yes'],
  ['Add Watermark (Image or Text)', 'overlay filter', 'Yes'],
  ['Picture-in-Picture', 'overlay + scale filter', 'Yes'],
  ['Stabilize (Two-Pass)', 'vidstab (analysis + stabilization)', 'Yes'],
  ['Audio Visualizer', 'Spectrum / Waveform / CQT render', 'Yes'],
  ['Create Slideshow', 'Image sequence → video with transitions', 'Yes'],
  ['Merge Audio with Video', 'Replace or mix audio tracks', 'Yes'],
  ['Smart Reframe (AI Crop)', 'Haar face tracking + dynamic crop', 'Yes'],
  ['Metadata Editor', 'View and edit Title, Artist, Album, etc.', 'N/A'],
]

// ── IMAGE ────────────────────────────────────────────────────────────────────
const IMAGE_OPS = [
  ['Convert Format', 'JPG · PNG · WebP · BMP · TIFF'],
  ['Resize', 'Custom dimensions, preserve aspect ratio'],
  ['Rotate', '90° CW/CCW · 180° rotation'],
  ['Flip', 'Horizontal · Vertical'],
  ['Crop (Visual Interactive)', 'Click-and-drag interactive selection'],
  ['Adjust Colors', 'Brightness · Contrast · Saturation · Gamma (8 presets)'],
  ['Blur / Sharpen', '4 blur levels · 3 sharpen levels'],
  ['Effects', 'Grayscale · Sepia · Invert'],
  ['Add Border', 'Custom size · 7 colors + hex input'],
  ['Add Text / Caption', '7 positions · Font · Color · Shadow/Outline'],
  ['Compress / Optimize', 'Quality 40–90% · Auto format conversion'],
  ['Batch Convert', 'Convert all images in a directory'],
  ['AI Background Removal', 'rembg U2-Net model'],
]

// ── AUDIO ────────────────────────────────────────────────────────────────────
const AUDIO_OPS = [
  ['Extract Audio from Video', 'MP3 · FLAC · WAV — stream copy where possible'],
  ['Remove Audio from Video', 'LOSSLESS — stream copy'],
  ['Merge Audio with Video', 'Replace or mix audio tracks'],
  ['Adjust Volume', 'Presets · dB value · Multiplier'],
  ['Audio Fade In/Out', '6 curve types available'],
  ['Normalize Audio', 'EBU R128 · Peak · RMS · Dynamic'],
  ['Audio Visualizer', 'Spectrum · Waveform · CQT render'],
  ['Convert Audio Format', 'MP3 · FLAC · WAV'],
  ['AI Stem Separation', 'Vocals · Drums · Bass · Other via Demucs (~1.5GB)'],
  ['AI Auto-Dubbing', 'Translate + re-voice in 24+ languages via Piper TTS'],
]

// ── AI ───────────────────────────────────────────────────────────────────────
const AI_OPS = [
  ['Subtitles (Whisper)', '7 model sizes · 99+ languages · SRT/VTT/LRC/ASS · Hard/Soft embed'],
  ['Brainrot Captions', 'TikTok-style animated word-by-word captions · Whisper + ASS'],
  ['Auto-Dubbing', 'Transcribe → Translate → Piper TTS · 24+ languages · 100% local'],
  ['Music Stem Separation', 'Demucs · Isolate Vocals / Drums / Bass / Other'],
  ['Background Removal', 'rembg U2-Net · Video frames or images · No green screen'],
  ['Auto Blur Faces', 'Haar cascade face detection + blur · Privacy-safe content'],
  ['Video Upscaling (Super Resolution)', 'Real-ESRGAN · Quick / Fast AI / Quality AI / Anime AI'],
  ['Smart Reframe (AI Crop)', 'Haar face tracking + EMA smoothing · 9:16 / 1:1 / 4:5'],
]

// ── DOWNLOAD ─────────────────────────────────────────────────────────────────
const DOWNLOAD_OPS = [
  ['Single Video Download', 'Quality picker · Resolution / Codec / Container selection'],
  ['Audio-Only Download', 'MP3 · FLAC · WAV · AAC · Opus · M4A (128k–320k)'],
  ['Playlist Download', 'All · First N · Range · Specific items · Auto-numbering'],
  ['Subtitle Download', 'Download subtitles in any available language'],
  ['Thumbnail Download', 'Save video thumbnail as image'],
  ['Quick Download (-dy)', 'Best quality MP4 instantly — zero prompts'],
  ['SponsorBlock Integration', 'Auto-skip or remove sponsor segments'],
  ['Speed Limit', 'Throttle download speed to avoid rate limits'],
  ['Cookie Support', 'Use browser cookies for private/age-restricted videos'],
  ['Proxy Support', 'Route downloads through SOCKS/HTTP proxy'],
  ['Embed Metadata', 'Title · Artist · Thumbnail embedded into file'],
  ['Post-Download Processing', 'Trim → Compress → Subtitle — all inline after download'],
]

// ── UTILITIES ────────────────────────────────────────────────────────────────
const UTILS_OPS = [
  ['Batch Convert', 'Convert all media files in a directory at once'],
  ['File Inspector', 'Deep analysis of codecs, streams, bitrates via ffprobe'],
  ['Metadata Editor', 'View and edit Title, Artist, Album, and more'],
  ['GUI Mode (--gui)', 'Hardware-accelerated desktop interface via DearPyGUI'],
  ['Hardware Acceleration', 'Auto-detect NVIDIA CUDA and Apple Silicon MPS'],
  ['Configurable Settings', 'Default output directory, encoding presets, preferences'],
  ['Interactive CLI', 'Fully guided menus with smart defaults and autocomplete'],
  ['Local Logging', 'Detailed ffmpeg_log.txt for debugging failing operations'],
]

function Lossless({ val }) {
  if (val === 'LOSSLESS') return <span className={styles.lossless}>No — lossless ⚡</span>
  return val
}

export default function OpsSection() {
  const [activeTab, setActiveTab] = useState('video')
  const total = Object.values(TAB_COUNTS).reduce((a, b) => a + b, 0)

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <div>
            <p className={styles.sectionLabel}>Full Reference</p>
            <h2 className={`${styles.sectionTitle} reveal`}>{total}+ operations.<br />Zero flags to remember.</h2>
          </div>
          <div className={`${styles.totalBadge} reveal`}>
            <span className={styles.totalNumber}>{total}+</span>
            <span className={styles.totalLabel}>Total Operations</span>
          </div>
        </div>

        <div className={`${styles.tabs} reveal`}>
          {TABS.map(id => (
            <button
              key={id}
              className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {TAB_LABELS[id]}
              <span className={styles.tabCount}>{TAB_COUNTS[id]}</span>
            </button>
          ))}
        </div>

        {/* Video */}
        <div className={`${styles.panel} ${activeTab === 'video' ? styles.active : ''}`}>
          <div className={styles.subHeading}>✂️ Edit & Structure</div>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Method</th><th>Re-encode?</th></tr></thead>
            <tbody>
              {VIDEO_EDIT.map(([op, method, reencode]) => (
                <tr key={op}><td>{op}</td><td>{method}</td><td><Lossless val={reencode} /></td></tr>
              ))}
            </tbody>
          </table>
          <div className={styles.subHeading}>🔄 Convert & Compress</div>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Method</th><th>Re-encode?</th></tr></thead>
            <tbody>
              {VIDEO_CONVERT.map(([op, method, reencode]) => (
                <tr key={op}><td>{op}</td><td>{method}</td><td><Lossless val={reencode} /></td></tr>
              ))}
            </tbody>
          </table>
          <div className={styles.subHeading}>✨ Effects & Tools</div>
          <table className={styles.table}>
            <thead><tr><th>Operation</th><th>Method</th><th>Re-encode?</th></tr></thead>
            <tbody>
              {VIDEO_EFFECTS.map(([op, method, reencode]) => (
                <tr key={op}><td>{op}</td><td>{method}</td><td><Lossless val={reencode} /></td></tr>
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

        {/* AI */}
        <div className={`${styles.panel} ${activeTab === 'ai' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>AI Tool</th><th>Details</th></tr></thead>
            <tbody>
              {AI_OPS.map(([op, details]) => (
                <tr key={op}><td>{op}</td><td>{details}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download */}
        <div className={`${styles.panel} ${activeTab === 'download' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Feature</th><th>Details</th></tr></thead>
            <tbody>
              {DOWNLOAD_OPS.map(([op, details]) => (
                <tr key={op}><td>{op}</td><td>{details}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Utils */}
        <div className={`${styles.panel} ${activeTab === 'utils' ? styles.active : ''}`}>
          <table className={styles.table}>
            <thead><tr><th>Feature</th><th>Details</th></tr></thead>
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
