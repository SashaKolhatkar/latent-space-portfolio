import { motion } from 'framer-motion'
import { CASE_STUDIES, TONES } from '../data/latentData'
import { ArrowLeftIcon, CheckIcon, CloseIcon, ExternalIcon, GithubIcon } from './icons'

const panel = {
  hidden: { opacity: 0, scale: 0.965, y: 18 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 26 } },
  exit: { opacity: 0, scale: 0.98, y: 12, transition: { duration: 0.2 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
}

export default function CaseStudy({ projectId, onClose }) {
  const study = CASE_STUDIES[projectId]
  if (!study) return null
  const color = TONES[study.tone]

  return (
    <motion.div
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${study.title} case study`}
    >
      <button
        type="button"
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#050609]/85 backdrop-blur-md"
      />

      <motion.section
        variants={panel}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="glass-panel thin-scroll relative z-10 max-h-[92dvh] w-full max-w-6xl overflow-y-auto rounded-2xl border-white/[0.12] sm:rounded-3xl"
        style={{ boxShadow: `0 40px 120px -40px ${color}33, 0 0 0 1px ${color}12` }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/[0.07] bg-[#0C0E15]/95 px-5 py-4 backdrop-blur-xl sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="pill-button group -ml-2 px-2 py-2 text-slate-300 hover:text-cyan"
          >
            <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px]">Return to Latent Space</span>
            <span className="ml-1 hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-500 sm:inline">ESC</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:block">
              CASE STUDY / {study.index}
            </span>
            <button type="button" onClick={onClose} className="hud-button" aria-label="Close case study">
              <CloseIcon />
            </button>
          </div>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="px-5 py-7 sm:px-8 sm:py-9 lg:px-12">
          {/* Title block */}
          <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tabular-nums text-slate-500">{study.index}</span>
                <span className="h-px w-8" style={{ background: color }} />
                <span
                  className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]"
                  style={{ color, borderColor: `${color}55`, background: `${color}12` }}
                >
                  {study.domain}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-warm sm:text-4xl lg:text-5xl">
                {study.title}
              </h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              BUILT {study.year}
            </div>
          </motion.div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            {/* Left: narrative + metrics */}
            <div className="space-y-7">
              <motion.div variants={item}>
                <p className="mono-label">01 / PROBLEM</p>
                <p className="mt-3 text-[14px] leading-7 text-slate-300 sm:text-[15px]">{study.problem}</p>
              </motion.div>

              <motion.div variants={item}>
                <p className="mono-label">02 / APPROACH</p>
                <p className="mt-3 text-[14px] leading-7 text-slate-300 sm:text-[15px]">{study.solution}</p>
              </motion.div>

              <motion.div variants={item} className="grid grid-cols-3 gap-2 sm:gap-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 sm:p-4">
                    <div className="font-display text-lg font-semibold text-warm sm:text-2xl">{metric.value}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-slate-500">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: architecture + highlights + stack */}
            <div className="space-y-7">
              <motion.div variants={item}>
                <p className="mono-label">03 / ARCHITECTURE · PIPELINE</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {study.pipeline.map((step, index) => (
                    <div key={step} className="flex items-center gap-1.5">
                      <span className="rounded-lg border border-white/[0.09] bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] text-slate-300">
                        {step}
                      </span>
                      {index < study.pipeline.length - 1 && (
                        <span className="font-mono text-[10px]" style={{ color }}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item}>
                <p className="mono-label">04 / TECHNICAL HIGHLIGHTS</p>
                <ul className="mt-4 space-y-3">
                  {study.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-[13px] leading-6 text-slate-300">
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color }} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={item}>
                <p className="mono-label">05 / STACK</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {study.repoUnverified && (
                <motion.p variants={item} className="font-mono text-[9px] leading-relaxed text-slate-600">
                  Repository link points to a GitHub search — replace it with the exact URL in src/data/latentData.js.
                </motion.p>
              )}
            </div>
          </div>

          {/* Actions */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-7"
          >
            <a
              href={study.repo}
              target="_blank"
              rel="noreferrer"
              className="pill-button border-transparent px-5 py-3 text-warm"
              style={{ background: color, color: '#090A0F' }}
            >
              <GithubIcon />
              GitHub Repository
              <ExternalIcon className="h-3 w-3 opacity-70" />
            </a>
            {study.demo && (
              <a
                href={study.demo}
                target="_blank"
                rel="noreferrer"
                className="pill-button border border-white/15 px-5 py-3 text-slate-300 hover:border-white/35 hover:text-warm"
              >
                <ExternalIcon />
                {study.demoLabel || 'Live Demo'}
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="pill-button ml-auto border border-white/10 px-4 py-3 text-slate-500 hover:text-slate-300"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
    </motion.div>
  )
}
