import { CASE_STUDIES, CV_SUMMARY, EMAIL, GITHUB_PROFILE } from '../data/latentData'
import { BoltIcon, ExternalIcon, GithubIcon } from './icons'

function Section({ title, children }) {
  return (
    <section className="mt-7 break-inside-avoid">
      <h2 className="border-b border-white/10 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan/80">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export default function QuickCv({ onExit }) {
  return (
    <div className="cv-sheet thin-scroll absolute inset-0 z-10 overflow-y-auto bg-obsidian">
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">
              CANDIDATE PROFILE // 2026
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-warm sm:text-5xl">
              {CV_SUMMARY.name}
            </h1>
            <p className="mt-2 text-[15px] text-cyan">{CV_SUMMARY.role}</p>
            <p className="mt-1 font-mono text-[11px] text-slate-500">
              {CV_SUMMARY.location} · {EMAIL} · {GITHUB_PROFILE.replace('https://', '')}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="pill-button border border-white/15 px-4 py-2.5 text-slate-300 hover:border-cyan/50 hover:text-cyan"
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onExit}
              className="pill-button border border-cyan/40 bg-cyan/10 px-4 py-2.5 text-cyan"
            >
              <BoltIcon className="h-3.5 w-3.5" />
              Back to Map
            </button>
          </div>
        </div>

        <Section title="Summary">
          <p className="max-w-3xl text-[14px] leading-7 text-slate-300">{CV_SUMMARY.intro}</p>
        </Section>

        <Section title="Core Skills">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {CV_SUMMARY.skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-display text-[13px] font-semibold text-warm">{group.label}</h3>
                <p className="mt-1.5 text-[12px] leading-6 text-slate-400">{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-4">
            {Object.entries(CASE_STUDIES).map(([id, study]) => (
              <div key={id} className="grid gap-1 border-l-2 border-white/10 pl-4 sm:grid-cols-[190px_1fr] sm:gap-5">
                <div>
                  <p className="font-display text-[14px] font-semibold text-warm">{study.title}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{study.year}</p>
                </div>
                <div>
                  <p className="text-[12px] leading-6 text-slate-400">{study.solution}</p>
                  <p className="mt-1 font-mono text-[10px] text-slate-500">{study.stack.join(' · ')}</p>
                  <a
                    href={study.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] text-cyan/80 hover:text-cyan"
                  >
                    <GithubIcon className="h-3 w-3" /> Source <ExternalIcon className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          {CV_SUMMARY.education.map((entry) => (
            <div key={entry.title}>
              <p className="font-display text-[14px] font-semibold text-warm">{entry.title}</p>
              <p className="mt-1 text-[12px] leading-6 text-slate-400">{entry.org}</p>
              <p className="mt-1 font-mono text-[10px] text-slate-500">{entry.detail}</p>
            </div>
          ))}
        </Section>

        <Section title="Certifications">
          <ul className="space-y-1.5">
            {CV_SUMMARY.certifications.map((cert) => (
              <li key={cert} className="text-[12px] leading-6 text-slate-300">— {cert}</li>
            ))}
          </ul>
        </Section>

        <p className="mt-10 border-t border-white/[0.07] pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
          Latent Space Explorer · Sasha Kolhatkar · v1.0
        </p>
      </div>
    </div>
  )
}
