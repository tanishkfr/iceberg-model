import { useCallback, useEffect, useRef, useState } from 'react'
import { LAYERS } from '../data/iceberg'

/**
 * The descent is a sequence of camera stops, not a scrollable document.
 *
 * Free scrolling would make this read as a long page. Discrete stops let each
 * layer hold its own mood — pacing, contrast and motion all change per stop —
 * and the eased move between them supplies the feeling of sinking.
 *
 * This hook owns only *which* stop is current; Scene owns the camera easing.
 */
export function useDescent() {
  const [layer, setLayer] = useState(0)
  const [maxUnlocked, setMaxUnlocked] = useState(0)

  const goTo = useCallback((next: number) => {
    setLayer(Math.max(0, Math.min(LAYERS.length - 1, next)))
  }, [])

  const unlock = useCallback((index: number) => {
    setMaxUnlocked((m) => Math.max(m, Math.min(index, LAYERS.length - 1)))
  }, [])

  // ── Input: wheel, drag and keys, all quantised to one stop per gesture ────
  const accum = useRef(0)
  const cooling = useRef(false)

  const step = useCallback(
    (dir: 1 | -1) => {
      if (cooling.current) return
      const target = layer + dir
      // Never descend past what the user has actually opened up.
      if (dir > 0 && target > maxUnlocked) return
      if (target < 0 || target > LAYERS.length - 1) return
      cooling.current = true
      goTo(target)
      window.setTimeout(() => (cooling.current = false), 900)
    },
    [layer, maxUnlocked, goTo]
  )

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (cooling.current) return
      accum.current += e.deltaY
      if (Math.abs(accum.current) > 120) {
        step(accum.current > 0 ? 1 : -1)
        accum.current = 0
      }
    }

    let touchY = 0
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0].clientY)
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY
      if (Math.abs(dy) > 70) {
        step(dy > 0 ? 1 : -1)
        touchY = e.touches[0].clientY
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') step(1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') step(-1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [step])

  return { layer, maxUnlocked, goTo, unlock }
}
