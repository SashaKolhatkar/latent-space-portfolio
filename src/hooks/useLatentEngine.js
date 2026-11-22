import { useCallback, useEffect, useRef, useState } from 'react'
import { EDGES, LAYOUTS, NODES, NODE_BY_ID } from '../data/latentData'

const ZOOM_MIN = 0.4
const ZOOM_MAX = 2.6

const CAMERA_DAMPING = 0.86
const SPRING = 0.048
const SPRING_DAMPING = 0.86
const MAGNET_RADIUS = 155

const SIZE_BY_KIND = { project: 64, education: 48, skill: 36 }

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

/**
 * The rendering loop lives entirely in refs: React only re-renders on hover /
 * mode changes, while rAF writes transforms and SVG endpoints directly.
 */
export function useLatentEngine({ mode, focusedId, paused, coordRef }) {
  const surfaceRef = useRef(null)
  const worldRef = useRef(null)
  const tooltipRef = useRef(null)
  const nodeEls = useRef(new Map())
  const edgeEls = useRef(new Map())
  const positions = useRef(new Map())
  const targets = useRef(LAYOUTS[mode].positions)
  const camera = useRef({ x: 0, y: 0, z: 1, tx: 0, ty: 0, tz: 1 })
  const savedCamera = useRef(null)
  const pointer = useRef({ sx: 0, sy: 0, wx: 0, wy: 0, inside: false })
  const drag = useRef({ active: false, id: null, x: 0, y: 0, camX: 0, camY: 0, start: 0, moved: false })
  const activePointers = useRef(new Map())
  const pinch = useRef(null)
  const paintRef = useRef(null)
  const lastTap = useRef({ time: 0, x: 0, y: 0 })
  const modeRef = useRef(mode)
  const pausedRef = useRef(paused)
  const hoveredRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)

  const registerNode = useCallback((id, el) => {
    if (el) nodeEls.current.set(id, el)
    else nodeEls.current.delete(id)
  }, [])

  const registerEdge = useCallback((id, el) => {
    if (el) edgeEls.current.set(id, el)
    else edgeEls.current.delete(id)
  }, [])

  const setHovered = useCallback((id) => {
    hoveredRef.current = id
    setHoveredId(id)
  }, [])

  const sizeOf = useCallback((id) => SIZE_BY_KIND[NODE_BY_ID[id]?.kind] || 36, [])

  const zoomAt = useCallback((sx, sy, factor) => {
    const surface = surfaceRef.current
    if (!surface) return
    const { width, height } = surface.getBoundingClientRect()
    const cam = camera.current
    const worldX = (sx - width / 2 - cam.x) / cam.z
    const worldY = (sy - height / 2 - cam.y) / cam.z
    const next = clamp(cam.z * factor, ZOOM_MIN, ZOOM_MAX)
    cam.x = cam.tx = sx - width / 2 - worldX * next
    cam.y = cam.ty = sy - height / 2 - worldY * next
    cam.z = cam.tz = next
    paintRef.current?.()
  }, [])

  const zoomBy = useCallback(
    (factor) => {
      const surface = surfaceRef.current
      if (!surface) return
      const { width, height } = surface.getBoundingClientRect()
      zoomAt(width / 2, height / 2, factor)
    },
    [zoomAt],
  )

  const reset = useCallback(() => {
    const cam = camera.current
    cam.x = cam.tx = 0
    cam.y = cam.ty = 0
    cam.z = cam.tz = 1
    paintRef.current?.()
  }, [])

  /* ---------------------------------------------------------------------- */
  /*  Layout hand-off                                                        */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    modeRef.current = mode
    targets.current = LAYOUTS[mode].positions
  }, [mode])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    if (!focusedId) {
      if (savedCamera.current) {
        camera.current.tx = savedCamera.current.x
        camera.current.ty = savedCamera.current.y
        camera.current.tz = savedCamera.current.z
        savedCamera.current = null
      }
      return
    }

    const cam = camera.current
    if (!savedCamera.current) {
      savedCamera.current = { x: cam.tx, y: cam.ty, z: cam.tz }
    }
    const node = positions.current.get(focusedId) || targets.current[focusedId]
    if (!node) return
    cam.tx = -node.x * 1.75
    cam.ty = -node.y * 1.75
    cam.tz = 1.75
  }, [focusedId])

  /* ---------------------------------------------------------------------- */
  /*  Main animation loop                                                    */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const initial = targets.current
    NODES.forEach((node, index) => {
      const target = initial[node.id]
      if (!target) return
      positions.current.set(node.id, {
        x: target.x + Math.sin(index * 3.7) * 26,
        y: target.y + Math.cos(index * 2.3) * 26,
        vx: 0,
        vy: 0,
        phase: index * 0.83,
      })
    })

    /** Write the current simulation state straight to the DOM. */
    const paint = () => {
      const cam = camera.current
      const surface = surfaceRef.current
      if (surface && worldRef.current) {
        const { width, height } = surface.getBoundingClientRect()
        worldRef.current.style.transform = `translate3d(${width / 2 + cam.x}px, ${height / 2 + cam.y}px, 0) scale(${cam.z})`
      }

      NODES.forEach((node) => {
        const p = positions.current.get(node.id)
        const el = nodeEls.current.get(node.id)
        if (!p || !el) return
        const half = sizeOf(node.id) / 2
        el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`
      })

      EDGES.forEach((edge) => {
        const a = positions.current.get(edge.source)
        const b = positions.current.get(edge.target)
        const line = edgeEls.current.get(edge.id)
        if (!a || !b || !line) return
        line.setAttribute('x1', a.x.toFixed(1))
        line.setAttribute('y1', a.y.toFixed(1))
        line.setAttribute('x2', b.x.toFixed(1))
        line.setAttribute('y2', b.y.toFixed(1))
      })
    }

    // Paint once synchronously so nodes never flash at the origin while the
    // first animation frame is pending (also helps reduced-frame environments).
    paintRef.current = paint
    paint()

    let frameId
    let previous = performance.now()

    const frame = (now) => {
      const elapsed = now - previous
      previous = now
      const dt = clamp(elapsed / 16.667, 0.4, 2)
      const cam = camera.current
      const surface = surfaceRef.current

      // Camera easing.
      const ease = 1 - Math.pow(CAMERA_DAMPING, dt)
      cam.x += (cam.tx - cam.x) * ease
      cam.y += (cam.ty - cam.y) * ease
      cam.z += (cam.tz - cam.z) * ease

      if (pointer.current.inside && surface) {
        const { width, height } = surface.getBoundingClientRect()
        pointer.current.wx = (pointer.current.sx - width / 2 - cam.x) / cam.z
        pointer.current.wy = (pointer.current.sy - height / 2 - cam.y) / cam.z
        if (coordRef?.current) {
          coordRef.current.textContent = `X: ${(pointer.current.wx / 100).toFixed(2)} | Y: ${(pointer.current.wy / 100).toFixed(2)}`
        }
      }

      const time = now / 1000
      const magnetActive = pointer.current.inside && !pausedRef.current

      NODES.forEach((node) => {
        const p = positions.current.get(node.id)
        const target = targets.current[node.id]
        if (!p || !target) return

        const breathe = pausedRef.current ? 0 : 1
        const driftX = Math.sin(time * 0.52 + p.phase) * 2.6 * breathe
        const driftY = Math.cos(time * 0.44 + p.phase) * 2.4 * breathe

        let fx = (target.x + driftX - p.x) * SPRING
        let fy = (target.y + driftY - p.y) * SPRING

        if (magnetActive) {
          const dx = p.x - pointer.current.wx
          const dy = p.y - pointer.current.wy
          const distance = Math.hypot(dx, dy)
          if (distance > 0.5 && distance < MAGNET_RADIUS) {
            const strength = (1 - distance / MAGNET_RADIUS) ** 2
            const force = hoveredRef.current === node.id ? -16 * strength : 46 * strength
            fx += (dx / distance) * force
            fy += (dy / distance) * force
          }
        }

        p.vx = (p.vx + fx * dt) * Math.pow(SPRING_DAMPING, dt)
        p.vy = (p.vy + fy * dt) * Math.pow(SPRING_DAMPING, dt)
        p.x += p.vx * dt
        p.y += p.vy * dt
      })

      paint()
      frameId = requestAnimationFrame(frame)
    }

    frameId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(frameId)
      paintRef.current = null
    }
  }, [coordRef, sizeOf])

  /* ---------------------------------------------------------------------- */
  /*  Pointer, wheel and touch input                                         */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    const surface = surfaceRef.current
    if (!surface) return undefined

    const localPoint = (event) => {
      const rect = surface.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onPointerMove = (event) => {
      const point = localPoint(event)
      pointer.current.sx = point.x
      pointer.current.sy = point.y
      pointer.current.inside = true

      if (coordRef?.current && surface) {
        const { width, height } = surface.getBoundingClientRect()
        const cam = camera.current
        const wx = (point.x - width / 2 - cam.x) / cam.z
        const wy = (point.y - height / 2 - cam.y) / cam.z
        coordRef.current.textContent = `X: ${(wx / 100).toFixed(2)} | Y: ${(wy / 100).toFixed(2)}`
      }

      if (activePointers.current.has(event.pointerId)) {
        activePointers.current.set(event.pointerId, point)
      }

      if (activePointers.current.size === 2) {
        const [a, b] = [...activePointers.current.values()]
        const distance = Math.hypot(a.x - b.x, a.y - b.y)
        const midX = (a.x + b.x) / 2
        const midY = (a.y + b.y) / 2
        if (pinch.current && pinch.current.distance > 0) {
          zoomAt(midX, midY, distance / pinch.current.distance)
        }
        pinch.current = { distance, midX, midY }
        return
      }

      if (drag.current.active && drag.current.id === event.pointerId) {
        const dx = point.x - drag.current.x
        const dy = point.y - drag.current.y
        if (Math.hypot(dx, dy) > 6) drag.current.moved = true
        camera.current.tx = drag.current.camX + dx
        camera.current.ty = drag.current.camY + dy
      }

      if (tooltipRef.current && hoveredRef.current) {
        const { width, height } = surface.getBoundingClientRect()
        const x = clamp(point.x + 20, 12, width - 272)
        const y = clamp(point.y + 18, 12, height - 150)
        tooltipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }

    const onPointerDown = (event) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return
      if (event.target instanceof Element && event.target.closest('[data-zoom-controls]')) return
      const point = localPoint(event)
      activePointers.current.set(event.pointerId, point)
      pointer.current.sx = point.x
      pointer.current.sy = point.y
      pointer.current.inside = true

      if (activePointers.current.size === 1) {
        try {
          surface.setPointerCapture(event.pointerId)
        } catch {
          /* capture is best-effort */
        }
        drag.current = {
          active: true,
          id: event.pointerId,
          x: point.x,
          y: point.y,
          camX: camera.current.tx,
          camY: camera.current.ty,
          start: performance.now(),
          moved: false,
        }
        surface.dataset.dragging = 'true'
      } else {
        drag.current.active = false
        const [a, b] = [...activePointers.current.values()]
        pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), midX: 0, midY: 0 }
      }
    }

    const endPointer = (event) => {
      const wasDragging = drag.current.active && drag.current.id === event.pointerId
      const point = localPoint(event)
      activePointers.current.delete(event.pointerId)
      if (activePointers.current.size < 2) pinch.current = null

      if (wasDragging) {
        drag.current.active = false
        surface.dataset.dragging = 'false'
        if (!drag.current.moved && event.pointerType === 'touch') {
          const now = performance.now()
          const doubleTap =
            now - lastTap.current.time < 340 &&
            Math.hypot(point.x - lastTap.current.x, point.y - lastTap.current.y) < 44
          if (doubleTap) {
            zoomAt(point.x, point.y, 1.6)
            lastTap.current = { time: 0, x: 0, y: 0 }
          } else {
            lastTap.current = { time: now, x: point.x, y: point.y }
          }
        }
      }
    }

    const onPointerLeave = () => {
      pointer.current.inside = false
      setHovered(null)
    }

    const onWheel = (event) => {
      event.preventDefault()
      const point = localPoint(event)
      zoomAt(point.x, point.y, Math.exp(-event.deltaY * 0.0013))
    }

    surface.addEventListener('pointermove', onPointerMove, { passive: true })
    surface.addEventListener('pointerdown', onPointerDown)
    surface.addEventListener('pointerup', endPointer)
    surface.addEventListener('pointercancel', endPointer)
    surface.addEventListener('pointerleave', onPointerLeave)
    surface.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      surface.removeEventListener('pointermove', onPointerMove)
      surface.removeEventListener('pointerdown', onPointerDown)
      surface.removeEventListener('pointerup', endPointer)
      surface.removeEventListener('pointercancel', endPointer)
      surface.removeEventListener('pointerleave', onPointerLeave)
      surface.removeEventListener('wheel', onWheel)
    }
  }, [coordRef, setHovered, zoomAt])

  return {
    surfaceRef,
    worldRef,
    tooltipRef,
    registerNode,
    registerEdge,
    setHovered,
    hoveredId,
    zoomBy,
    reset,
  }
}
