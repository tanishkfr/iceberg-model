import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { FINALE_INDEX, LAYERS, byId, nodesOfLayer, type LayerId } from './data/iceberg'
import { useDescent } from './lib/useDescent'
import { Scene } from './components/Scene'
import { LayerPanel } from './components/LayerPanel'
import { DetailPanel } from './components/DetailPanel'
import { DepthRail } from './components/DepthRail'
import { Intro } from './components/Intro'
import { InsightsFinale } from './components/InsightsFinale'
import { QuickReview } from './components/QuickReview'
import type { Link } from './components/Connections'

const NONE: (string | null)[] = LAYERS.map(() => null)

export default function App() {
  const { layer, maxUnlocked, goTo, unlock } = useDescent()

  const [selection, setSelection] = useState<(string | null)[]>(NONE)
  const [openLayers, setOpenLayers] = useState<Set<number>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hoveredBand, setHoveredBand] = useState<LayerId | null>(null)

  /** The finale is read, not explored — no markers, no panels, no selection. */
  const isFinale = layer === FINALE_INDEX
  const selectedId = selection[layer]
  const isOpen = openLayers.has(layer) && !isFinale

  const open = useCallback((i: number) => {
    setOpenLayers((s) => (s.has(i) ? s : new Set(s).add(i)))
  }, [])

  /**
   * Layer 0 has to be uncovered by clicking the berg — that discovery is the
   * hook. Repeating the same ritual at every stop would turn it into a chore,
   * so deeper layers open themselves once the camera settles.
   */
  useEffect(() => {
    if (layer === 0 || isFinale) return
    const t = window.setTimeout(() => open(layer), 900)
    return () => clearTimeout(t)
  }, [layer, isFinale, open])

  const select = useCallback(
    (id: string) => {
      const node = byId.get(id)
      if (!node) return
      const idx = LAYERS.findIndex((l) => l.id === node.layer)

      setSelection((prev) => {
        const next = [...prev]
        next[idx] = id
        return next
      })
      unlock(idx + 1)
      if (idx !== layer) goTo(idx)
    },
    [layer, goTo, unlock]
  )

  /** Following a chip from the detail panel descends to that node's layer. */
  const follow = useCallback(
    (id: string) => {
      const node = byId.get(id)
      if (!node) return
      const idx = LAYERS.findIndex((l) => l.id === node.layer)
      unlock(idx)
      open(idx)
      goTo(idx)
      window.setTimeout(() => select(id), 700)
    },
    [goTo, open, select, unlock]
  )

  // ── What the scene shows ──────────────────────────────────────────────────
  // Previous layers collapse to the single node you chose, so the trail stays
  // legible as the camera pulls back instead of accumulating into noise.
  const markers = useMemo(() => {
    const trail = selection
      .slice(0, layer)
      .map((id) => (id ? byId.get(id) : null))
      .filter(Boolean) as ReturnType<typeof nodesOfLayer>
    const current = isOpen ? nodesOfLayer(LAYERS[layer].id) : []
    return [...trail, ...current]
  }, [selection, layer, isOpen])

  const links = useMemo<Link[]>(() => {
    const out: Link[] = []
    // Spine: the path already taken.
    for (let j = 0; j < layer - 1; j++) {
      const a = selection[j]
      const b = selection[j + 1]
      if (a && b) out.push({ from: a, to: b })
    }
    // Fan: the parent selection opening onto everything it feeds.
    const parent = layer > 0 ? selection[layer - 1] : null
    if (parent && isOpen) {
      const node = byId.get(parent)
      node?.connectsTo.forEach((to) => out.push({ from: parent, to }))
    }
    return out
  }, [selection, layer, isOpen])

  const linkedIds = useMemo(() => {
    const parent = layer > 0 ? selection[layer - 1] : null
    return new Set(parent ? (byId.get(parent)?.connectsTo ?? []) : [])
  }, [selection, layer])

  const hint = useMemo(() => {
    if (isFinale) return ''
    if (!isOpen) return 'Click the ice'
    if (!selectedId) return `Choose a ${LAYERS[layer].name.toLowerCase().replace(/s$/, '')}`
    if (layer < maxUnlocked) return 'Scroll to descend'
    return ''
  }, [layer, isFinale, isOpen, selectedId, maxUnlocked])

  return (
    <main className="relative h-full w-full overflow-hidden bg-ink">
      <Scene
        layer={layer}
        maxUnlocked={maxUnlocked}
        markers={markers}
        links={links}
        selectedId={selectedId}
        hoveredId={hoveredId}
        linkedIds={linkedIds}
        hoveredBand={hoveredBand}
        onHoverBand={setHoveredBand}
        onSelectBand={() => open(layer)}
        onSelect={select}
        onHover={setHoveredId}
        bergFade={isFinale ? 0.3 : 1}
      />

      {/* Depth closes in as you sink. Opacity only — no colour tricks. */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-[1600ms]"
        style={{
          opacity: layer === 0 ? 0 : 0.25 + layer * 0.14,
          background:
            'radial-gradient(120% 90% at 50% 45%, transparent 30%, rgba(3,6,9,0.9) 100%)',
        }}
      />
      <div className="grain pointer-events-none fixed inset-0 z-10" />

      <Intro visible={layer === 0} hint={hint} />

      <DepthRail layer={layer} maxUnlocked={maxUnlocked} onGo={goTo} />

      <AnimatePresence>{isFinale && <InsightsFinale active={isFinale} />}</AnimatePresence>

      <QuickReview onNavigate={follow} />

      {/* Height is capped so the centred stack can never rise into the Quick
          Review toggle above it, however short the viewport gets. */}
      <div className="pointer-events-none fixed top-1/2 right-8 z-30 flex max-h-[calc(100vh-140px)] w-[356px] -translate-y-1/2 flex-col gap-3">
        {/* Panels are direct children of AnimatePresence — wrapping them in a
            plain div leaves the outgoing one mounted forever. */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <LayerPanel
              key={`layer-${layer}`}
              layer={LAYERS[layer]}
              nodes={nodesOfLayer(LAYERS[layer].id)}
              selectedId={selectedId}
              hoveredId={hoveredId}
              linkedIds={linkedIds}
              onSelect={select}
              onHover={setHoveredId}
              onClose={() =>
                setOpenLayers((s) => {
                  const n = new Set(s)
                  n.delete(layer)
                  return n
                })
              }
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {selectedId && (
            <DetailPanel
              key={selectedId}
              node={byId.get(selectedId)!}
              onClose={() =>
                setSelection((prev) => {
                  const next = [...prev]
                  next[layer] = null
                  return next
                })
              }
              onFollow={follow}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
