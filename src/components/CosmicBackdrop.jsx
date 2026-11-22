/* Deterministic starfield + nebula wash. Pure CSS/SVG, no per-frame JS. */

import { useTheme } from '../context/ThemeContext'

const random = (seed) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const STARS = Array.from({ length: 170 }, (_, index) => ({
  x: random(index + 1) * 1000,
  y: random(index + 211) * 600,
  r: 0.35 + random(index + 401) * 1.15,
  opacity: 0.18 + random(index + 601) * 0.62,
  delay: -(random(index + 811) * 8),
  duration: 3.5 + random(index + 1013) * 5,
  tint: random(index + 1217),
}))

export default function CosmicBackdrop({ animated = true }) {
  const { tones } = useTheme()
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="space-base absolute inset-0" />

      <div className={`absolute inset-0 ${animated ? 'nebula-drift' : ''}`}>
        <div className="nebula nebula-violet" />
        <div className="nebula nebula-cyan" />
        <div className="nebula nebula-emerald" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        {STARS.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={star.tint > 0.86 ? tones.violet : star.tint > 0.7 ? tones.cyan : tones.slate}
            opacity={star.opacity}
            className={animated ? 'star-twinkle' : ''}
            style={
              animated
                ? { animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }
                : undefined
            }
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_45%,transparent_30%,rgba(3,4,12,0.78)_100%)]" />
    </div>
  )
}
