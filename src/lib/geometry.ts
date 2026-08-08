/**
 * Hand-authored iceberg geometry in world coordinates.
 *
 * The berg is built from flat facet planes rather than a traced photo. Light
 * reads as coming from the upper left, so left-facing planes carry the higher
 * values. Deltas between planes are deliberately small — form should come from
 * the silhouette and the facet breaks, not from contrast.
 */

export const WORLD = { w: 1600, h: 4600 }
export const WATERLINE = 880
export const KEEL_Y = 4230

type Pt = [number, number]

export const toPath = (pts: Pt[]) =>
  pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ') + ' Z'

export const toLine = (pts: Pt[]) =>
  pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

// ── Silhouette ──────────────────────────────────────────────────────────────
// Above water: a main peak with a lower sub-peak and a saddle between them.
const ABOVE_RIGHT: Pt[] = [
  [864, 544],
  [898, 588],
  [948, 654],
  [986, 668], // ledge — breaks the pyramid read
  [1006, 726],
  [1052, 782],
  [1044, 812],
  [1105, WATERLINE],
]

const ABOVE_LEFT_UP: Pt[] = [
  [562, 812],
  [586, 764],
  [612, 700],
  [652, 646],
  [676, 578], // sub-peak
  [702, 612], // saddle
  [736, 552],
  [762, 528],
  [780, 494],
]

const APEX: Pt = [820, 468]
const WL_L: Pt = [545, WATERLINE]
const WL_R: Pt = [1105, WATERLINE]

// Below water: widens hard, then tapers to a long keel.
// Small shelves and steps keep the submerged mass from reading as a smooth
// balloon once the camera pulls back far enough to see all of it.
const BELOW_RIGHT: Pt[] = [
  [1218, 1010],
  [1318, 1210],
  [1380, 1450],
  [1400, 1660],
  [1364, 1876],
  [1380, 1962], // step out
  [1300, 2160],
  [1252, 2296],
  [1196, 2420],
  [1108, 2596],
  [1098, 2684], // step
  [978, 2900],
  [902, 3140],
  [862, 3312],
  [852, 3380],
  [818, 3620],
  [800, 3860],
  [792, 4060],
]

const KEEL: Pt = [786, KEEL_Y]

const BELOW_LEFT_UP: Pt[] = [
  [770, 4060],
  [752, 3850],
  [726, 3620],
  [690, 3380],
  [640, 3130],
  [574, 2880],
  [500, 2620],
  [452, 2468],
  [432, 2360],
  [386, 2202],
  [374, 2100],
  [338, 1958],
  [330, 1840],
  [300, 1702],
  [304, 1580],
  [294, 1448], // step out
  [310, 1330],
  [348, 1120],
  [420, 960],
]

export const ABOVE_OUTLINE: Pt[] = [APEX, ...ABOVE_RIGHT, WL_L, ...ABOVE_LEFT_UP]
export const BELOW_OUTLINE: Pt[] = [WL_R, ...BELOW_RIGHT, KEEL, ...BELOW_LEFT_UP, WL_L]
export const FULL_OUTLINE: Pt[] = [
  APEX,
  ...ABOVE_RIGHT,
  ...BELOW_RIGHT,
  KEEL,
  ...BELOW_LEFT_UP,
  ...ABOVE_LEFT_UP,
]

// ── Facet ridges ────────────────────────────────────────────────────────────
// Ridges kink. Straight apex-to-waterline breaks made the berg read as a
// folded paper cone rather than a fractured mass.
const RIDGE_A: Pt[] = [APEX, [790, 562], [814, 646], [768, 740], [786, WATERLINE]]
const RIDGE_B: Pt[] = [APEX, [856, 586], [878, 664], [916, 758], [940, WATERLINE]]
/** Short secondary break: a shelf on the lower right face. */
const RIDGE_E: Pt[] = [
  [878, 664],
  [962, 700],
  [1006, 726],
]

// Both deep ridges must stay strictly inside the silhouette at every depth.
// Where they crossed it, the facet bounded by the ridge spilled into open
// water and rendered as a bright wedge beside the keel.
const RIDGE_C: Pt[] = [
  [782, WATERLINE],
  [700, 1300],
  [628, 1800],
  [596, 2400],
  [642, 3000],
  [746, 3620],
  KEEL,
] // below, left break

const RIDGE_D: Pt[] = [
  [940, WATERLINE],
  [1046, 1300],
  [1100, 1800],
  [1046, 2400],
  [906, 3000],
  [810, 3560],
  KEEL,
] // below, right break

const rev = (pts: Pt[]) => [...pts].reverse()

export interface Facet {
  id: string
  d: string
  /** 0 = darkest plane, 1 = brightest. Mapped to fill by the renderer. */
  value: number
  submerged: boolean
}

export const FACETS: Facet[] = [
  {
    id: 'aw-left',
    d: toPath([WL_L, ...ABOVE_LEFT_UP, APEX, ...RIDGE_A.slice(1)]),
    value: 1,
    submerged: false,
  },
  {
    id: 'aw-mid',
    d: toPath([...RIDGE_A, [940, WATERLINE], ...rev(RIDGE_B).slice(1)]),
    value: 0.82,
    submerged: false,
  },
  {
    id: 'aw-right-upper',
    d: toPath([
      APEX,
      [864, 544],
      [898, 588],
      [948, 654],
      [986, 668],
      [1006, 726],
      [962, 700],
      [878, 664],
      [856, 586],
    ]),
    value: 0.66,
    submerged: false,
  },
  {
    id: 'aw-right-lower',
    d: toPath([
      [878, 664],
      [962, 700],
      [1006, 726],
      [1052, 782],
      [1044, 812],
      WL_R,
      [940, WATERLINE],
      [916, 758],
    ]),
    value: 0.5,
    submerged: false,
  },
  {
    id: 'uw-left',
    d: toPath([WL_L, ...rev(BELOW_LEFT_UP), KEEL, ...rev(RIDGE_C).slice(1)]),
    value: 0.85,
    submerged: true,
  },
  {
    id: 'uw-mid',
    d: toPath([...RIDGE_C, ...rev(RIDGE_D).slice(1)]),
    value: 0.6,
    submerged: true,
  },
  {
    // Waterline across, down the outline to the keel, then back up the ridge.
    // Walking the ridge down first crossed the outline and left a bright wedge.
    id: 'uw-right',
    d: toPath([[940, WATERLINE], WL_R, ...BELOW_RIGHT, KEEL, ...rev(RIDGE_D).slice(1)]),
    value: 0.35,
    submerged: true,
  },
]

/** Ridge lines drawn as hairlines to sharpen the facet breaks. */
export const RIDGE_LINES = [RIDGE_A, RIDGE_B, RIDGE_E, RIDGE_C, RIDGE_D].map(toLine)

export const ABOVE_PATH = toPath(ABOVE_OUTLINE)
export const BELOW_PATH = toPath(BELOW_OUTLINE)
export const FULL_PATH = toPath(FULL_OUTLINE)

/**
 * Horizontal half-width of the berg at a given depth. Used to park node
 * markers and their leader lines just off the ice rather than on top of it.
 */
export function bergSpanAt(y: number): { left: number; right: number } {
  const edge = (pts: Pt[], fallback: number) => {
    let best = fallback
    let bestD = Infinity
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i]
      const [x2, y2] = pts[i + 1]
      if ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)) {
        const t = y2 === y1 ? 0 : (y - y1) / (y2 - y1)
        return x1 + (x2 - x1) * t
      }
      const d = Math.min(Math.abs(y - y1), Math.abs(y - y2))
      if (d < bestD) {
        bestD = d
        best = Math.abs(y - y1) < Math.abs(y - y2) ? x1 : x2
      }
    }
    return best
  }

  const rightChain: Pt[] = [APEX, ...ABOVE_RIGHT, ...BELOW_RIGHT, KEEL]
  const leftChain: Pt[] = [APEX, ...rev(ABOVE_LEFT_UP), WL_L, ...rev(BELOW_LEFT_UP), KEEL]

  return { left: edge(leftChain, 545), right: edge(rightChain, 1105) }
}
