import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ADJACENCY,
  DOMAIN_META,
  EDGES,
  LAYOUTS,
  NODES,
  NODE_BY_ID,
} from '../data/latentData'
import { useTheme } from '../context/ThemeContext'
import { useLatentEngine } from '../hooks/useLatentEngine'
import { MinusIcon, PlusIcon, ResetIcon } from './icons'

const SIZE_BY_KIND = { project: 64, education: 48, skill: 36 }

function NodeGlyph({ node, size }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    className: 'block overflow-visible',
    'aria-hidden': true,
  }

  if (node.kind === 'project') {
    return (
      <svg {...common}>
        <g className="node-orbit">
          <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 6" />
        </g>
        <circle className="node-core" cx="32" cy="32" r="18" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.4" />
        <circle cx="32" cy="32" r="6.5" fill="currentColor" />
        <circle cx="32" cy="32" r="2.2" fill="rgb(var(--bg-rgb))" />
        <circle cx="54" cy="17" r="2.6" fill="currentColor" opacity="0.75" />
      </svg>
    )
  }

  if (node.kind === 'education') {
    return (
      <svg {...common}>
        <rect
          x="13.5"
          y="13.5"
          width="37"
          height="37"
          rx="4"
          transform="rotate(45 32 32)"
          fill="currentColor"
          fillOpacity="0.09"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <path d="M32 22v20M22 32h20" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.2" />
        <circle cx="32" cy="32" r="3.2" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path
        d="M32 7 54 19.5v25L32 57 10 44.5v-25z"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      <circle cx="32" cy="32" r="4.2" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

function ZoomControls({ onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="no-print pointer-events-auto absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-6">
      <button type="button" className="hud-button" onClick={onZoomIn} title="Zoom in (+)" aria-label="Zoom in">
        <PlusIcon />
      </button>
      <button type="button" className="hud-button" onClick={onZoomOut} title="Zoom out (-)" aria-label="Zoom out">
        <MinusIcon />
      </button>
      <button type="button" className="hud-button" onClick={onReset} title="Reset camera (0)" aria-label="Reset camera">
        <ResetIcon />
      </button>
    </div>
  )
}

export default function LatentCanvas({ mode, focusedId, coordRef, onOpenProject }) {
  const { tones: TONES, spaceMode } = useTheme()
  const {
    surfaceRef,
    worldRef,
    tooltipRef,
    registerNode,
    registerEdge,
    setHovered,
    hoveredId,
    zoomBy,
    reset,
  } = useLatentEngine({ mode, focusedId, coordRef, paused: false })

  const haloData = LAYOUTS[mode].halos
  const connected = useMemo(
    () => (hoveredId ? new Set([hoveredId, ...(ADJACENCY[hoveredId] || [])]) : null),
    [hoveredId],
  )
  const hoveredNode = hoveredId ? NODE_BY_ID[hoveredId] : null

  const handleKeyDown = (event) => {
    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      zoomBy(1.25)
    } else if (event.key === '-' || event.key === '_') {
      event.preventDefault()
      zoomBy(0.8)
    } else if (event.key === '0') {
      event.preventDefault()
      reset()
    }
  }

  return (
    <div
      ref={surfaceRef}
      tabIndex={0}
      role="application"
      aria-label="Interactive latent space. Drag to pan, scroll to zoom, click a project to inspect it."
      data-dragging="false"
      onKeyDown={handleKeyDown}
      className="canvas-surface absolute inset-0 overflow-hidden outline-none"
    >
      <div ref={worldRef} className="world-layer absolute left-0 top-0" style={{ pointerEvents: 'none' }}>
        <svg
          className="pointer-events-none absolute overflow-visible"
          width={4000}
          height={4000}
          style={{ left: -2000, top: -2000, overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <pattern id="ls-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgb(var(--grid-rgb))" strokeWidth="1" className="grid-line" />
            </pattern>
            <pattern id="ls-grid-major" width="320" height="320" patternUnits="userSpaceOnUse">
              <path d="M 320 0 L 0 0 0 320" fill="none" stroke="rgb(var(--cyan-rgb))" strokeOpacity="0.07" strokeWidth="1" className="grid-line" />
            </pattern>
          </defs>

          <g transform="translate(2000 2000)">
            <rect x="-2400" y="-2400" width="4800" height="4800" fill="url(#ls-grid)" opacity="0.75" />
            <rect x="-2400" y="-2400" width="4800" height="4800" fill="url(#ls-grid-major)" />
            <line x1="-2400" y1="0" x2="2400" y2="0" stroke="rgb(var(--cyan-rgb))" strokeOpacity="0.09" strokeWidth="1" />
            <line x1="0" y1="-2400" x2="0" y2="2400" stroke="rgb(var(--cyan-rgb))" strokeOpacity="0.09" strokeWidth="1" />

            {/* Cluster halos */}
            <AnimatePresence>
              <motion.g key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
                {haloData.map((halo) => {
                  const color = TONES[halo.tone]
                  return (
                    <g key={halo.id}>
                      <ellipse
                        cx={halo.center.x}
                        cy={halo.center.y}
                        rx={halo.rx}
                        ry={halo.ry}
                        fill={color}
                        fillOpacity="0.028"
                        stroke={color}
                        strokeOpacity="0.22"
                        strokeWidth="1"
                        strokeDasharray="5 9"
                      />
                      <circle cx={halo.center.x - halo.rx + 6} cy={halo.center.y - halo.ry + 6} r="2.5" fill={color} opacity="0.7" />
                      <text
                        x={halo.center.x}
                        y={halo.center.y - halo.ry - 14}
                        textAnchor="middle"
                        fill={color}
                        fillOpacity="0.8"
                        fontSize="11"
                        letterSpacing="2.2"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {halo.label}
                      </text>
                    </g>
                  )
                })}
              </motion.g>
            </AnimatePresence>

            {/* Semantic edges */}
            {EDGES.map((edge) => {
              const active = hoveredId && (edge.source === hoveredId || edge.target === hoveredId)
              const dimmed = hoveredId && !active
              const sourceTone = DOMAIN_META[NODE_BY_ID[edge.source]?.domain]?.tone || 'slate'
              const stroke = active ? TONES[sourceTone] : spaceMode ? '#8B93C8' : '#7C8AA3'
              return (
                <line
                  key={edge.id}
                  ref={(el) => registerEdge(edge.id, el)}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="0"
                  stroke={stroke}
                  strokeWidth={active ? 1.7 : 1}
                  strokeOpacity={active ? 0.85 : dimmed ? 0.035 : edge.type === 'shared' ? 0.24 : 0.14}
                  strokeDasharray={edge.type === 'shared' ? '4 6' : undefined}
                  strokeLinecap="round"
                  className="transition-[stroke-opacity,stroke-width] duration-300"
                />
              )
            })}
          </g>
        </svg>

        {/* Nodes are DOM elements so they stay crisp and keyboard accessible. */}
        <div className="absolute left-0 top-0" style={{ pointerEvents: 'none' }}>
          {NODES.map((node) => {
            const size = SIZE_BY_KIND[node.kind]
            const tone = TONES[DOMAIN_META[node.domain].tone]
            const isHovered = hoveredId === node.id
            const dimmed = Boolean(connected && !connected.has(node.id))
            return (
              <button
                key={node.id}
                ref={(el) => registerNode(node.id, el)}
                type="button"
                data-hovered={isHovered}
                data-dimmed={dimmed}
                className="node-shell"
                style={{ width: size, height: size, pointerEvents: 'auto', color: tone }}
                onPointerEnter={() => setHovered(node.id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => {
                  if (node.kind === 'project') onOpenProject(node.id)
                }}
                aria-label={`${node.label}. ${node.summary}${node.kind === 'project' ? ' Click to open case study.' : ''}`}
              >
                <span
                  className="node-visual absolute inset-0 grid place-items-center"
                  style={{
                    transformOrigin: 'center',
                    transition: 'transform 260ms cubic-bezier(.2,.9,.2,1), filter 260ms ease',
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                    filter: `drop-shadow(0 0 ${isHovered ? 18 : 9}px ${tone}${isHovered ? 'cc' : '66'})`,
                  }}
                >
                  <NodeGlyph node={node} size={size} />
                </span>

                <span
                  className={`node-label absolute left-1/2 -translate-x-1/2 whitespace-nowrap ${
                    node.kind === 'project'
                      ? 'top-[calc(100%+9px)] font-display text-[12px] font-semibold text-warm'
                      : node.kind === 'education'
                        ? 'top-[calc(100%+7px)] font-mono text-[9px] uppercase tracking-[0.08em] text-slate-300'
                        : 'top-[calc(100%+5px)] font-mono text-[9px] text-slate-400'
                  }`}
                >
                  {node.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Zoom + reset */}
      <ZoomControls onZoomIn={() => zoomBy(1.25)} onZoomOut={() => zoomBy(0.8)} onReset={reset} />

      {/* Interaction hint */}
      <div className="no-print pointer-events-none absolute bottom-28 left-5 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600 lg:block">
        Drag to pan · Scroll to zoom · Click a project to inspect
      </div>

      {/* Cursor-following tooltip */}
      <div ref={tooltipRef} className="pointer-events-none absolute left-0 top-0 z-20 w-[260px]">
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              key={hoveredNode.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              className="glass-panel overflow-hidden rounded-xl p-3.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className="mt-1 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background: TONES[DOMAIN_META[hoveredNode.domain].tone],
                    boxShadow: `0 0 10px ${TONES[DOMAIN_META[hoveredNode.domain].tone]}`,
                  }}
                />
                <div className="min-w-0">
                  <p className="font-display text-[13px] font-semibold text-warm">{hoveredNode.label}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                    {hoveredNode.meta}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-300">{hoveredNode.summary}</p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                {hoveredNode.kind === 'project'
                  ? 'Click to open case study →'
                  : `${ADJACENCY[hoveredNode.id]?.size || 0} connections in this graph`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
