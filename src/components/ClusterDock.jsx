import { CLUSTERS, MODE_LABELS, TONES } from '../data/latentData'

const MODES = ['domain', 'tech', 'timeline']

export default function ClusterDock({ mode, onChange }) {
  return (
    <div className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-30 flex flex-col items-center gap-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-[#0C0E15]/85 p-1.5 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {MODES.map((item) => {
          const active = mode === item
          return (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              aria-pressed={active}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan sm:px-5 sm:text-[11px] ${
                active
                  ? 'bg-cyan/15 text-cyan shadow-[inset_0_0_0_1px_rgba(0,240,255,0.35)]'
                  : 'text-slate-400 hover:text-warm'
              }`}
            >
              {MODE_LABELS[item]}
            </button>
          )
        })}
      </div>

      <div className="pointer-events-auto hidden items-center gap-3 rounded-full border border-white/[0.06] bg-[#0C0E15]/70 px-4 py-1.5 backdrop-blur-lg sm:flex">
        {CLUSTERS[mode].map((cluster) => (
          <span key={cluster.id} className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: TONES[cluster.tone], boxShadow: `0 0 8px ${TONES[cluster.tone]}` }} />
            {cluster.label}
          </span>
        ))}
      </div>
    </div>
  )
}
