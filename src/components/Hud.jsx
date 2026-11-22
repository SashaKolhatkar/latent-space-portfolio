import { BoltIcon, FileIcon, GithubIcon } from './icons'
import { EMAIL, GITHUB_PROFILE, RESUME_URL } from '../data/latentData'

function BrandMark() {
  return (
    <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
      <circle cx="18" cy="18" r="13" fill="none" stroke="#00F0FF" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="18" cy="18" r="4.5" fill="#00F0FF" />
      <circle cx="29" cy="9" r="2.4" fill="#8B5CF6" />
      <circle cx="7" cy="27" r="2.4" fill="#10B981" />
    </svg>
  )
}

export default function Hud({ cvMode, onToggleCv, coordRef }) {
  return (
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between gap-4 p-4 sm:p-6">
      <div className="pointer-events-auto flex items-center gap-3">
        <BrandMark />
        <div>
          <h1 className="font-display text-[13px] font-semibold leading-tight tracking-[0.08em] text-warm sm:text-sm">
            SASHA KOLHATKAR
          </h1>
          <p className="mono-label mt-0.5 text-[9px] text-cyan/70">
            {cvMode ? 'QUICK CV // RECRUITER VIEW' : '// LATENT SPACE v1.0'}
          </p>
          {!cvMode && (
            <div className="mt-2 flex items-center gap-3">
              <span
                ref={coordRef}
                className="font-mono text-[10px] tabular-nums tracking-tight text-slate-400 sm:text-[11px]"
              >
                X: 0.00 | Y: 0.00
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-emerald shadow-[0_0_8px_#10B981] sm:block" />
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 sm:block">
                AI / ML · DATA SCIENCE
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <a
          className="hud-button"
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noreferrer"
          title="GitHub profile"
          aria-label="Open GitHub profile"
        >
          <GithubIcon />
        </a>
        <a
          className="hud-button"
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          title="Resume PDF"
          aria-label="Open resume PDF"
        >
          <FileIcon />
        </a>
        <a
          className="hud-button hidden sm:inline-flex"
          href={`mailto:${EMAIL}`}
          title="Email Sasha"
          aria-label="Email Sasha"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </a>

        <button
          type="button"
          onClick={onToggleCv}
          aria-pressed={cvMode}
          className={`pill-button ml-1 border px-3 py-2.5 sm:px-4 ${
            cvMode
              ? 'border-cyan/60 bg-cyan/10 text-cyan'
              : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan/50 hover:text-cyan'
          }`}
        >
          <BoltIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Quick CV Mode</span>
          <span className="sm:hidden">CV</span>
          <span
            className={`relative ml-1 h-3.5 w-6 rounded-full border transition-colors duration-200 ${
              cvMode ? 'border-cyan/50 bg-cyan/25' : 'border-white/15 bg-white/5'
            }`}
          >
            <span
              className={`absolute top-[2px] h-2 w-2 rounded-full transition-all duration-200 ${
                cvMode ? 'left-[12px] bg-cyan' : 'left-[2px] bg-slate-500'
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  )
}
