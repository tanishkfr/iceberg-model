import type { NodeLayerId } from './iceberg'

/**
 * Source material the model is built on.
 *
 * Grouped by `kind` rather than by topic on purpose: seeing reporting, official
 * statements and opinion side by side is itself part of the argument the piece
 * is making about how a narrative gets assembled.
 *
 * NOTE ON ACCURACY — only the Quint headline below was retrieved directly; the
 * rest were reconstructed from their URLs and should be checked against the
 * live pages before this is shown publicly. `note` is an editorial summary,
 * not a quotation.
 */

export type SourceKind = 'Reporting' | 'Official' | 'Document' | 'Commentary'

export interface Source {
  id: string
  publisher: string
  title: string
  url: string
  year: string
  kind: SourceKind
  /** The layer this material speaks to most directly. */
  relatesTo: NodeLayerId
  note: string
}

export const SOURCES: Source[] = [
  {
    id: 'src-quint',
    publisher: 'The Quint',
    title: '‘Build a Wall to Hide Us, Don’t Evict’: Slums Near Pragati Maidan Ahead of G-20',
    url: 'https://www.thequint.com/news/india/pragati-maidan-g20-summit-slum-demolition-eviction-janta-camp-delhi-high-court-uncertainty-dusib-railways-pwd',
    year: '2023',
    kind: 'Reporting',
    relatesTo: 'events',
    note: 'Janta Camp residents asked for a barrier rather than eviction; land ownership and rehabilitation left unresolved.',
  },
  {
    id: 'src-ap',
    publisher: 'AP News',
    title: 'New Delhi’s poor and the G20 summit',
    url: 'https://apnews.com/article/india-g20-new-delhi-poor-9d449f133d5ed0aa8855ee65485ce873',
    year: '2023',
    kind: 'Reporting',
    relatesTo: 'events',
    note: 'International wire coverage of clearances and concealment around the summit.',
  },
  {
    id: 'src-hindu',
    publisher: 'The Hindu',
    title: 'A year after G20 demolitions, New Delhi’s slum dwellers remain neglected',
    url: 'https://www.thehindu.com/news/national/watch-a-year-after-g20-demolitions-new-delhis-slum-dwellers-remain-neglected/article68428653.ece',
    year: '2024',
    kind: 'Reporting',
    relatesTo: 'patterns',
    note: 'Follow-up a year on: those displaced before the summit were still without rehousing.',
  },
  {
    id: 'src-nie',
    publisher: 'The New Indian Express',
    title: 'Post-G20 shine wears off in city as murals fade, fountains dry',
    url: 'https://www.newindianexpress.com/states/delhi/2025/Jul/02/post-g20-shine-wears-off-in-city-as-murals-fade-fountains-dry',
    year: '2025',
    kind: 'Reporting',
    relatesTo: 'patterns',
    note: 'The visible upgrades were not maintained once the event had passed.',
  },
  {
    id: 'src-ie',
    publisher: 'The Indian Express',
    title: 'Supreme Court clarification on courtroom recordings by news outlets',
    url: 'https://indianexpress.com/article/legal-news/supreme-court-courtroom-recordings-news-outlets-audio-video-clarification-10819254/',
    year: '2025',
    kind: 'Reporting',
    relatesTo: 'systems',
    note: 'On limits to audio-video recording of proceedings. Not summit-specific — included for how documentation access is governed.',
  },
  {
    id: 'src-wgo',
    publisher: 'WGONIFIS',
    title: 'G20 public hearing',
    url: 'https://wgonifis.net/wp-content/uploads/2023/07/g-20-public-hearing-6.pdf',
    year: '2023',
    kind: 'Document',
    relatesTo: 'patterns',
    note: 'Civil-society public hearing record on summit preparations and their impact on residents.',
  },
  {
    id: 'src-pib',
    publisher: 'PIB Fact Check',
    title: 'Official fact-check post on summit coverage',
    url: 'https://x.com/PIBFactCheck/status/1699256129182966036',
    year: '2023',
    kind: 'Official',
    relatesTo: 'systems',
    note: 'Government response issued during the summit period — an example of the official information pipeline in use.',
  },
  {
    id: 'src-news18',
    publisher: 'News18',
    title: 'The G20 slum narrative: critics defame India, neglect global realities',
    url: 'https://www.news18.com/opinion/opinion-g20-slum-narrative-modis-critics-defame-india-neglect-global-realities-8582999.html',
    year: '2023',
    kind: 'Commentary',
    relatesTo: 'mental_models',
    note: 'Argues criticism of the clearances is unpatriotic and that the practice is a global norm.',
  },
  {
    id: 'src-toi',
    publisher: 'The Times of India',
    title: 'That parts of cities are beautified for events like G20 is ok; that they are in shambles most times isn’t',
    url: 'https://timesofindia.indiatimes.com/blogs/toi-editorials/when-vvips-leave-that-parts-of-cities-are-beautified-for-events-like-g20-is-ok-that-they-are-in-shambles-most-times-isnt/',
    year: '2023',
    kind: 'Commentary',
    relatesTo: 'patterns',
    note: 'Editorial on event-driven upgrading as a substitute for ordinary maintenance.',
  },
]

/** Display order for the grouped list. */
export const SOURCE_KINDS: SourceKind[] = ['Reporting', 'Document', 'Official', 'Commentary']
