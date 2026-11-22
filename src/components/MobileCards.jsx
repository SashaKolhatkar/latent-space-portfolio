import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CASE_STUDIES,
  CLUSTERS,
  DOMAIN_META,
  NODES,
  TONES,
} from '../data/latentData'
import { ArrowLeftIcon, CheckIcon, MapIcon } from './icons'

const FILTERS = [{ id: 'all', label: 'All' }, ...CLUSTERS.domain.map((cluster) => ({ id: cluster.id, label: cluster.label }))]

export default function MobileCards({ onExploreMap, onOpenProject }) {
  const [filter, setFilter] = useState('all')
  const cards = NODES.filter(
    (node) => node.kind === 'project' || node.kind === 'education',
  ).filter((node) => filter === 'all' || node.domain === filter)

  return (
    <div className="thin-scroll absolute inset-0 z-10 overflow-y-auto bg-obsidian">
      <div className="px-4 pb-32 pt-28">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/80">LATENT SPACE · COMPACT VIEW</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-warm">
          Explore the work
        </h2>
        <p className="mt-2 text-[13px] leading-6 text-slate-400">
          A frustration-free card view of the same graph. Open any project for the full case study, or switch to the interactive map.
        </p>

        <button
          type="button"
          onClick={onExploreMap}
          className="pill-button mt-5 w-full border border-cyan/40 bg-cyan/10 px-5 py-3 text-cyan"
        >
          <MapIcon />
          Explore Interactive Map
        </button>

        <div className="thin-scroll -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`shrink-0 rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${
                filter === item.id
                  ? 'border-cyan/50 bg-cyan/10 text-cyan'
                  : 'border-white/10 text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-5 space-y-3">
          <AnimatePresence mode="popLayout">
            {cards.map((node) => {
              const tone = TONES[DOMAIN_META[node.domain].tone]
              const study = CASE_STUDIES[node.id]
              return (
                <motion.button
                  layout
                  key={node.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.24 }}
                  type="button"
                  onClick={() => {
                    if (node.kind === 'project') onOpenProject(node.id)
                  }}
                  className="block w-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left"
                  style={{ borderLeftColor: tone, borderLeftWidth: 2 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-[15px] font-semibold text-warm">{node.label}</p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{node.meta}</p>
                    </div>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: tone, boxShadow: `0 0 10px ${tone}` }} />
                  </div>
                  <p className="mt-3 text-[12px] leading-6 text-slate-400">{node.summary}</p>
                  {study && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {study.stack.slice(0, 5).map((tech) => (
                        <span key={tech} className="rounded border border-white/[0.07] px-1.5 py-0.5 font-mono text-[9px] text-slate-500">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {node.kind === 'project' && (
                    <p className="mt-3 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-cyan/70">
                      Open case study <ArrowLeftIcon className="h-3 w-3 rotate-180" />
                    </p>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
          <p className="mono-label">AVAILABLE FOR</p>
          <p className="mt-2 text-[13px] text-slate-300">AI / ML engineering · Data science · Applied NLP</p>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-emerald/80">
            <CheckIcon className="h-3.5 w-3.5" /> Open to internships and full-time roles
          </p>
        </div>
      </div>
    </div>
  )
}
