import { useEffect, useRef, useState } from 'react'
import { WORLD } from '../lib/geometry'
import { LAYERS, type IcebergNode, type LayerId } from '../data/iceberg'
import { Ocean } from './Ocean'
import { Iceberg } from './Iceberg'
import { NodeMarkers } from './NodeMarkers'
import { Connections, type Link } from './Connections'
import { BergLabels } from './BergLabels'

interface Props {
  layer: number
  maxUnlocked: number
  markers: IcebergNode[]
  links: Link[]
  selectedId: string | null
  hoveredId: string | null
  linkedIds: Set<string>
  hoveredBand: LayerId | null
  onHoverBand: (l: LayerId | null) => void
  onSelectBand: (l: LayerId) => void
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  bergFade: number
}

/** Per-frame approach rate. Low enough to read as sinking, not snapping. */
const EASE = 0.055

export function Scene(props: Props) {
  const [svg, setSvg] = useState<SVGSVGElement | null>(null)
  /** Camera zoom, quantised — markers counter-scale by it to hold screen size. */
  const [k, setK] = useState(LAYERS[0].zoom)

  const targetY = LAYERS[props.layer].cameraY
  const targetZ = LAYERS[props.layer].zoom
  const cur = useRef({ y: LAYERS[0].cameraY, z: LAYERS[0].zoom })

  /**
   * The camera is an explicit rAF ease writing the viewBox straight to the DOM.
   * It stays off React's render path, and unlike a spring MotionValue there is
   * no hidden re-targeting to argue with.
   */
  useEffect(() => {
    if (!svg) return

    const write = () => {
      const { width: w, height: h } = svg.getBoundingClientRect()
      if (w <= 0 || h <= 0) return
      const vw = WORLD.w * cur.current.z
      const vh = vw * (h / w)
      svg.setAttribute('viewBox', `${800 - vw / 2} ${cur.current.y - vh / 2} ${vw} ${vh}`)
    }

    let raf = 0
    const tick = () => {
      const c = cur.current
      c.y += (targetY - c.y) * EASE
      c.z += (targetZ - c.z) * EASE
      const done = Math.abs(targetY - c.y) < 0.4 && Math.abs(targetZ - c.z) < 0.0008
      if (done) {
        c.y = targetY
        c.z = targetZ
      }
      write()
      setK(Math.round(c.z * 20) / 20)
      if (!done) raf = requestAnimationFrame(tick)
    }

    write()
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(write)
    ro.observe(svg)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [svg, targetY, targetZ])

  return (
    <svg
      ref={setSvg}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <Ocean />
      <Iceberg
        activeLayer={LAYERS[props.layer].id}
        hoveredBand={props.hoveredBand}
        onHoverBand={props.onHoverBand}
        onSelectBand={props.onSelectBand}
        fade={props.bergFade}
      />
      <BergLabels layer={props.layer} maxUnlocked={props.maxUnlocked} k={k} fade={props.bergFade} />
      <Connections links={props.links} />
      <NodeMarkers
        nodes={props.markers}
        selectedId={props.selectedId}
        hoveredId={props.hoveredId}
        linkedIds={props.linkedIds}
        onSelect={props.onSelect}
        onHover={props.onHover}
        k={k}
        showLeaders={props.layer === 0}
        leaderX={800 + (WORLD.w * k) / 2 - 30}
      />
    </svg>
  )
}
