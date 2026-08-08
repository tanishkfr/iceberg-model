/**
 * Content layer. Everything the piece says lives here.
 *
 * `pos` is the marker's position in world coordinates (see lib/geometry.ts).
 * Positions are hand-placed to sit inside the berg silhouette at that depth —
 * if you add a node, put it near a sibling rather than guessing, because the
 * berg narrows sharply below y≈3000.
 */

export type LayerId = 'events' | 'patterns' | 'systems' | 'mental_models' | 'insights'

/** Layers the user can explore node by node. `insights` is the finale. */
export type NodeLayerId = Exclude<LayerId, 'insights'>

export interface IcebergNode {
  id: string
  layer: NodeLayerId
  title: string
  description: string
  /**
   * Four-to-eight word gloss. Used only by the Quick Review panel, where the
   * full `description` would be far too much text to scan.
   */
  summary: string
  bullets: string[]
  connectsTo: string[]
  pos: { x: number; y: number }
}

/**
 * The finale. Deliberately not IcebergNodes — these are read, not explored,
 * so they carry no position, no bullets and no connections.
 */
export interface Insight {
  title: string
  statement: string
  sublines?: string[]
}

export const INSIGHTS: Insight[] = [
  {
    title: 'Control of Attention',
    statement: 'Control of attention is more powerful than control of truth.',
    sublines: [
      'What people see defines what they believe matters',
      'Ignored realities effectively disappear',
      'Attention shapes public understanding more than facts',
    ],
  },
  {
    title: 'Passive Consumption',
    statement: 'When information is easy to consume, critical thinking fades.',
    sublines: [
      'Simple narratives discourage deeper questioning',
      'Repetition builds acceptance without reflection',
      'People react to opinions instead of understanding realities',
    ],
  },
  {
    title: 'Perception Becomes Reality',
    statement: 'When perception is controlled, reality becomes negotiable.',
    sublines: [
      'Visible order is accepted as real progress',
      'Lived experience is overridden by presented narratives',
      'Outcomes follow perception, not ground truth',
    ],
  },
  {
    title: 'Omission Shapes Truth',
    statement: 'The system doesn’t need to lie — it shapes truth by deciding what to show.',
    sublines: [
      'What is excluded matters as much as what is shown',
      'Partial visibility creates controlled understanding',
      'Framing determines interpretation',
    ],
  },
  {
    title: 'Erasure Through Invisibility',
    statement: 'People disappear from narratives before they disappear from reality.',
    sublines: [
      'Lack of visibility reduces empathy',
      'Unseen issues face less resistance',
      'Absence makes harm easier to justify',
    ],
  },
  {
    title: 'Visual Fix = Perceived Fix',
    statement: 'What looks fixed is treated as solved.',
    sublines: [
      'Aesthetic improvement masks structural issues',
      'Clean visuals signal false progress',
      'Presentation outweighs lived outcomes',
    ],
  },
]

export interface Layer {
  id: LayerId
  index: number
  name: string
  caption: string
  /** World-space y the camera centres on for this layer. */
  cameraY: number
  /**
   * Camera pull-back. Each descent widens the frame so the layer above stays
   * in view — you never stop seeing what you already understood.
   */
  zoom: number
}

export const LAYERS: Layer[] = [
  {
    id: 'events',
    index: 0,
    name: 'Events',
    caption: 'What you can see',
    cameraY: 706,
    zoom: 0.78,
  },
  {
    id: 'patterns',
    index: 1,
    name: 'Patterns',
    caption: 'What keeps repeating',
    cameraY: 1300,
    zoom: 1.9,
  },
  {
    id: 'systems',
    index: 2,
    name: 'Systems',
    caption: 'The rules and incentives',
    cameraY: 2150,
    zoom: 2.6,
  },
  {
    id: 'mental_models',
    index: 3,
    name: 'Mental Models',
    caption: 'The beliefs underneath',
    cameraY: 3020,
    zoom: 2.9,
  },
  {
    id: 'insights',
    index: 4,
    name: 'Insights',
    caption: 'What it all amounts to',
    cameraY: 3700,
    zoom: 3.4,
  },
]

/** Index of the finale stop. */
export const FINALE_INDEX = LAYERS.length - 1

export const NODES: IcebergNode[] = [
  // ── Events — what was visible ─────────────────────────────────────────────
  {
    id: 'e1',
    layer: 'events',
    title: 'Rapid clean-up ahead of events',
    description:
      'Visible areas of cities are rapidly cleaned, repaired, or upgraded ahead of high-profile events or visits.',
    summary: 'Rapid city makeovers before high-profile visits',
    bullets: [
      'Maintenance concentrates along visitor corridors.',
      'Upgrades compress months of work into short deadlines.',
    ],
    connectsTo: ['p1', 'p2'],
    pos: { x: 800, y: 550 },
  },
  {
    id: 'e2',
    layer: 'events',
    title: 'Concealment of informal settlements',
    description:
      'Informal settlements and economically weaker zones are concealed using barriers, sheets, or visual obstructions.',
    summary: 'Barriers used to hide low-income zones',
    bullets: [
      'Green sheets and walls obscure non-upgraded areas.',
      'Concealment is used where relocation is impractical.',
    ],
    connectsTo: ['p2', 'p4'],
    pos: { x: 680, y: 600 },
  },
  {
    id: 'e3',
    layer: 'events',
    title: 'Removal of vendors and unhoused people',
    description:
      'Street vendors, hawkers, and homeless individuals are removed from high-visibility public spaces.',
    summary: 'Public spaces cleared of informal presence',
    bullets: [
      'Hawkers and vendors are cleared from visitor routes.',
      'Removals are framed publicly as routine tidiness.',
    ],
    connectsTo: ['p3', 'p6'],
    pos: { x: 920, y: 600 },
  },
  {
    id: 'e4',
    layer: 'events',
    title: 'Surface beautification of public spaces',
    description:
      'Public spaces are beautified through lighting, landscaping, repainting, and infrastructure touch-ups.',
    summary: 'Visual upgrades along camera sightlines',
    bullets: [
      'Fresh paint, lighting, and greenery deployed rapidly.',
      'Prioritises visual impression over structural utility.',
    ],
    connectsTo: ['p1', 'p4'],
    pos: { x: 610, y: 660 },
  },
  {
    id: 'e5',
    layer: 'events',
    title: 'Relocation from photographed zones',
    description:
      'Certain groups are relocated or displaced from areas likely to be photographed or filmed.',
    summary: 'Targeted displacement from media zones',
    bullets: [
      'Displacement follows camera sightlines.',
      'Notice periods are short or absent.',
    ],
    connectsTo: ['p5', 'p6'],
    pos: { x: 990, y: 660 },
  },
  {
    id: 'e6',
    layer: 'events',
    title: 'Restrictions on documentation',
    description:
      'Filming, reporting, or on-ground documentation is restricted or indirectly discouraged in sensitive zones.',
    summary: 'Access limits on independent recording',
    bullets: [
      'Permits and limits restrict independent filming.',
      'Reduces recording of clearances and screening.',
    ],
    connectsTo: ['p8'],
    pos: { x: 730, y: 690 },
  },
  {
    id: 'e7',
    layer: 'events',
    title: 'Forced adaptation to avoid eviction',
    description:
      'Residents and workers adapt to concealment or relocation to avoid stricter action or eviction.',
    summary: 'Compliance under threat of harsher loss',
    bullets: [
      'Screening is accepted as the lesser of two risks.',
      'Cooperation is read publicly as agreement.',
    ],
    connectsTo: ['p3', 'p6'],
    pos: { x: 870, y: 690 },
  },
  {
    id: 'e8',
    layer: 'events',
    title: 'Media focus on visual improvements',
    description:
      'Media coverage predominantly highlights visual improvements and organized public spaces.',
    summary: 'Coverage highlights upgrades over costs',
    bullets: [
      'Photogenic changes receive dominant coverage.',
      'Visual transformation obscures human impact.',
    ],
    connectsTo: ['p8', 'p9'],
    pos: { x: 590, y: 740 },
  },
  {
    id: 'e9',
    layer: 'events',
    title: 'Limited scrutiny of displacement',
    description:
      'Negative impacts such as displacement or livelihood disruption receive limited or delayed attention.',
    summary: 'Displacement reported late or omitted',
    bullets: [
      'Livelihood losses receive minimal initial focus.',
      'Critical reports fade quickly after the event.',
    ],
    connectsTo: ['p5', 'p9'],
    pos: { x: 1010, y: 740 },
  },
  {
    id: 'e10',
    layer: 'events',
    title: 'Rapid, temporary interventions',
    description:
      'Temporary interventions are implemented quickly, often without long-term planning or continuity.',
    summary: 'Short-term fixes lack long-term continuity',
    bullets: [
      'Fixes designed specifically for event duration.',
      'Maintenance drops once visitors depart.',
    ],
    connectsTo: ['p4', 'p7'],
    pos: { x: 690, y: 790 },
  },
  {
    id: 'e11',
    layer: 'events',
    title: 'Recurrent visibility-driven cleanups',
    description:
      'Similar visibility-driven clean-up efforts are observed across multiple cities and events.',
    summary: 'Clean-up playbook recurs across host cities',
    bullets: [
      'Same approach repeated across global events.',
      'Precedent normalises temporary removals.',
    ],
    connectsTo: ['p1', 'p10'],
    pos: { x: 910, y: 790 },
  },
  {
    id: 'e12',
    layer: 'events',
    title: 'Messaging frames progress',
    description:
      'Public messaging frames these actions as development, cleanliness, or national progress.',
    summary: 'Framed as national pride and progress',
    bullets: [
      'Beautification framed as civic achievement.',
      'Objection repositioned as anti-development.',
    ],
    connectsTo: ['p3', 'p10'],
    pos: { x: 800, y: 820 },
  },

  // ── Patterns — what keeps repeating ───────────────────────────────────────
  {
    id: 'p1',
    layer: 'patterns',
    title: 'Global events trigger rapid makeovers',
    description:
      'Large international events set off compressed city-improvement drives that would not otherwise happen.',
    summary: 'Events force compressed makeovers',
    bullets: [
      'Work is scheduled backwards from the event date.',
      'Scope is set by what can be finished in time.',
    ],
    connectsTo: ['s8'],
    pos: { x: 560, y: 1200 },
  },
  {
    id: 'p2',
    layer: 'patterns',
    title: 'Visibility determines priority',
    description:
      'Areas that will be seen are addressed first; areas that will not are left as they are.',
    summary: 'Seen areas get fixed first',
    bullets: [
      'Sightlines function as a planning boundary.',
      'Need is a weaker predictor of action than exposure.',
    ],
    connectsTo: ['s7', 's8'],
    pos: { x: 900, y: 1180 },
  },
  {
    id: 'p3',
    layer: 'patterns',
    title: 'Displacement described in neutral terms',
    description:
      'Removals are framed as beautification, cleaning or development rather than as displacement.',
    summary: 'Removal renamed as improvement',
    bullets: [
      'The language removes the affected party from the sentence.',
      'Neutral terms lower the threshold for objection.',
    ],
    connectsTo: ['s4', 's9'],
    pos: { x: 1180, y: 1260 },
  },
  {
    id: 'p4',
    layer: 'patterns',
    title: 'Visual fixes chosen over structural ones',
    description:
      'Temporary changes to appearance are preferred to slower work on the underlying conditions.',
    summary: 'Appearance over structure',
    bullets: [
      'Surface work fits the available timeline.',
      'Structural work outlasts the political window.',
    ],
    connectsTo: ['s7', 's6'],
    pos: { x: 420, y: 1400 },
  },
  {
    id: 'p5',
    layer: 'patterns',
    title: 'Rehabilitation promised, then delayed',
    description:
      'Commitments to rehouse or compensate are made inconsistently and often are not met.',
    summary: 'Commitments made, then dropped',
    bullets: [
      'Follow-through weakens once attention moves on.',
      'Few mechanisms track whether promises were kept.',
    ],
    connectsTo: ['s6', 's8'],
    pos: { x: 760, y: 1420 },
  },
  {
    id: 'p6',
    layer: 'patterns',
    title: 'The same groups are pushed out',
    description:
      'The populations moved are largely the same each cycle, from the same kinds of spaces.',
    summary: 'Displacement recurs on the same people',
    bullets: [
      'Displacement recurs rather than resolves.',
      'Each cycle begins from a worse position than the last.',
    ],
    connectsTo: ['s9', 's2'],
    pos: { x: 1080, y: 1470 },
  },
  {
    id: 'p7',
    layer: 'patterns',
    title: 'Activity spikes before deadlines',
    description:
      'Effort intensifies sharply as the event approaches and drops away once it has passed.',
    summary: 'Effort peaks at the deadline',
    bullets: [
      'Urgency is produced by the date, not by the problem.',
      'Maintenance rarely survives the event.',
    ],
    connectsTo: ['s8', 's6'],
    pos: { x: 380, y: 1650 },
  },
  {
    id: 'p8',
    layer: 'patterns',
    title: 'Reporting tracks what is visible',
    description:
      'Coverage concentrates on improvements that can be shown rather than conditions that cannot.',
    summary: 'Coverage follows what photographs',
    bullets: [
      'Visible change is cheaper to report.',
      'Absence is difficult to photograph.',
    ],
    connectsTo: ['s1', 's5'],
    pos: { x: 640, y: 1680 },
  },
  {
    id: 'p9',
    layer: 'patterns',
    title: 'Critical coverage does not sustain',
    description:
      'Scrutiny appears briefly around the event and does not persist long enough to force a response.',
    summary: 'Scrutiny fades before it bites',
    bullets: [
      'Attention expires before accountability begins.',
      'Short cycles reward waiting it out.',
    ],
    connectsTo: ['s6', 's1'],
    pos: { x: 980, y: 1720 },
  },
  {
    id: 'p10',
    layer: 'patterns',
    title: 'Practice justified as global norm',
    description:
      'The approach is defended on the grounds that every host city does the same thing.',
    summary: 'Precedent used as defence',
    bullets: [
      'Precedent is offered in place of justification.',
      'Comparison shifts the question away from harm.',
    ],
    connectsTo: ['s4', 's9'],
    pos: { x: 760, y: 1930 },
  },

  // ── Systems — the rules and incentives ────────────────────────────────────
  {
    id: 's1',
    layer: 'systems',
    title: 'Government–media dependency',
    description:
      'Outlets depend on official access, cooperation and advertising, which shapes what gets pursued.',
    summary: 'Access and revenue shape coverage',
    bullets: [
      'Access can be withdrawn from unfavourable coverage.',
      'Revenue and information arrive from the same source.',
    ],
    connectsTo: ['m4', 'm6'],
    pos: { x: 520, y: 2180 },
  },
  {
    id: 's2',
    layer: 'systems',
    title: 'Access control systems',
    description:
      'Entry, filming and presence in specific areas are permissioned centrally.',
    summary: 'Permits decide who can document',
    bullets: [
      'Permits determine who is able to document what.',
      'Enforcement capacity concentrates near venues.',
      'Appeal routes are slow relative to the event.',
    ],
    connectsTo: ['m1', 'm9'],
    pos: { x: 820, y: 2160 },
  },
  {
    id: 's3',
    layer: 'systems',
    title: 'Information selection systems',
    description:
      'What is recorded, released and retained is filtered before it reaches the public.',
    summary: 'Filtering happens before publication',
    bullets: [
      'Absence of a record reads as absence of an event.',
      'Selection happens before publication, not after.',
    ],
    connectsTo: ['m1', 'm5'],
    pos: { x: 1140, y: 2230 },
  },
  {
    id: 's4',
    layer: 'systems',
    title: 'Narrative framing systems',
    description:
      'Official vocabulary sets the terms in which an action can be discussed.',
    summary: 'Official wording sets the terms',
    bullets: [
      'Naming the act determines how it is judged.',
      'Frames are supplied to reporters ready-made.',
    ],
    connectsTo: ['m3', 'm7'],
    pos: { x: 560, y: 2420 },
  },
  {
    id: 's5',
    layer: 'systems',
    title: 'Official information pipelines',
    description:
      'Briefings and releases supply most of the material that coverage is built from.',
    summary: 'Briefings supply most material',
    bullets: [
      'Speed favours the pre-packaged version.',
      'Verification costs more than reprinting.',
    ],
    connectsTo: ['m1', 'm5'],
    pos: { x: 860, y: 2440 },
  },
  {
    id: 's6',
    layer: 'systems',
    title: 'Attention cycle systems',
    description:
      'Public attention has a short and predictable duration that can simply be waited out.',
    summary: 'Attention decays on schedule',
    bullets: [
      'Scrutiny peaks and decays on a known schedule.',
      'Delay is an effective response to criticism.',
    ],
    connectsTo: ['m8', 'm5'],
    pos: { x: 1080, y: 2480 },
  },
  {
    id: 's7',
    layer: 'systems',
    title: 'Visual validation systems',
    description:
      'Success is assessed through images, so improving the image improves the assessment.',
    summary: 'Images stand in for outcomes',
    bullets: [
      'Photographs function as evidence of progress.',
      'What is not pictured is not measured.',
    ],
    connectsTo: ['m5', 'm2'],
    pos: { x: 640, y: 2700 },
  },
  {
    id: 's8',
    layer: 'systems',
    title: 'Event-driven alignment systems',
    description:
      'A single external date reorders priorities across otherwise separate agencies.',
    summary: 'One date reorders every agency',
    bullets: [
      'Departments align to the deadline, not to each other.',
      'Ordinary planning is suspended around the event.',
      'Responsibility disperses across the alignment.',
    ],
    connectsTo: ['m3', 'm8'],
    pos: { x: 880, y: 2720 },
  },
  {
    id: 's9',
    layer: 'systems',
    title: 'Social legitimacy systems',
    description:
      'Public consent is secured by attaching the work to pride, order and national standing.',
    summary: 'Pride converts consent into duty',
    bullets: [
      'Objection is repositioned as disloyalty.',
      'Legitimacy is borrowed from the occasion.',
    ],
    connectsTo: ['m3', 'm4'],
    pos: { x: 960, y: 2860 },
  },

  // ── Mental models — the beliefs underneath ────────────────────────────────
  {
    id: 'm1',
    layer: 'mental_models',
    title: 'Visibility equals reality',
    description: '“If it is not shown, it did not happen.”',
    summary: 'Unshown is treated as unhappened',
    bullets: [
      'Concealment is treated as resolution.',
      'The record matters more than the condition.',
    ],
    connectsTo: [],
    pos: { x: 700, y: 2960 },
  },
  {
    id: 'm2',
    layer: 'mental_models',
    title: 'Aesthetics equal progress',
    description: '“A clean city is a developed city.”',
    summary: 'Clean is read as developed',
    bullets: [
      'Appearance is accepted as evidence of development.',
      'Tidiness substitutes for provision.',
    ],
    connectsTo: [],
    pos: { x: 860, y: 2980 },
  },
  {
    id: 'm3',
    layer: 'mental_models',
    title: 'Nation first justification',
    description: '“This is necessary for national pride.”',
    summary: 'Pride licenses the method',
    bullets: [
      'Cost to individuals is offset against collective standing.',
      'The scale of the occasion licenses the method.',
    ],
    connectsTo: [],
    pos: { x: 660, y: 3100 },
  },
  {
    id: 'm4',
    layer: 'mental_models',
    title: 'Dissent as disloyalty',
    description: '“Criticism is anti-national.”',
    summary: 'Criticism recast as betrayal',
    bullets: [
      'Objection is answered by questioning motive.',
      'Scrutiny becomes socially expensive.',
    ],
    connectsTo: [],
    pos: { x: 800, y: 3120 },
  },
  {
    id: 'm5',
    layer: 'mental_models',
    title: 'Optics over reality',
    description: '“What looks better is better.”',
    summary: 'Appearance replaces the goal',
    bullets: [
      'The measurable proxy replaces the goal.',
      'Improving the view counts as improving the place.',
    ],
    connectsTo: [],
    pos: { x: 870, y: 3160 },
  },
  {
    id: 'm6',
    layer: 'mental_models',
    title: 'Global gaze priority',
    description: '“Outside perception matters more than local reality.”',
    summary: 'Outsiders set the standard',
    bullets: [
      'Residents become audience rather than stakeholders.',
      'Standards are set by visitors.',
    ],
    connectsTo: [],
    pos: { x: 712, y: 3280 },
  },
  {
    id: 'm7',
    layer: 'mental_models',
    title: 'Normalisation through repetition',
    description: '“This is how it is done everywhere.”',
    summary: 'Repetition makes it normal',
    bullets: [
      'Precedent removes the need for a defence.',
      'Repetition converts practice into expectation.',
    ],
    connectsTo: [],
    pos: { x: 826, y: 3300 },
  },
  {
    id: 'm8',
    layer: 'mental_models',
    title: 'Short-term proof bias',
    description: '“Immediate change is real change.”',
    summary: 'Speed mistaken for competence',
    bullets: ['Speed is read as competence.', 'Slow work appears as inaction.'],
    connectsTo: [],
    pos: { x: 760, y: 3440 },
  },
  {
    id: 'm9',
    layer: 'mental_models',
    title: 'Blame shifted to the displaced',
    description: '“The poor are part of the problem.”',
    summary: 'The displaced blamed for displacement',
    bullets: [
      'Presence is reframed as cause.',
      'Removal becomes a solution rather than a harm.',
    ],
    connectsTo: [],
    pos: { x: 790, y: 3580 },
  },
]

export const byId = new Map(NODES.map((n) => [n.id, n]))
export const nodesOfLayer = (layer: LayerId) => NODES.filter((n) => n.layer === layer)

/** Nodes in the layer above that point at `id`. */
export const parentsOf = (id: string) => NODES.filter((n) => n.connectsTo.includes(id))
