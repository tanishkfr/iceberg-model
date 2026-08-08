import { LAYERS } from '../data/iceberg'
import { SOURCES, SOURCE_KINDS } from '../data/sources'

/**
 * The material the model is built on.
 *
 * Grouped by kind rather than by topic: reporting, an official statement and
 * commentary sitting in one list is itself part of the point — the same events
 * produce very different accounts depending on who is doing the accounting.
 */

const layerName = (id: string) => LAYERS.find((l) => l.id === id)?.name ?? id

export function SourcesPanel() {
  return (
    <>
      <p className="px-4 pt-2 pb-3 font-serif text-[12px] leading-[1.55] font-light text-ice-lo/60">
        Reporting, official statements and commentary this model draws on.
      </p>

      {SOURCE_KINDS.map((kind) => {
        const items = SOURCES.filter((s) => s.kind === kind)
        if (items.length === 0) return null
        return (
          <div key={kind} className="border-t border-white/[0.06]">
            <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
              <span className="label text-ice-lo">{kind}</span>
              <span className="font-mono text-[10px] text-ice-lo/40">{items.length}</span>
            </div>

            <ul className="pb-2">
              {items.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block px-4 py-2 transition-colors duration-200 hover:bg-white/[0.04]"
                  >
                    <span className="flex items-baseline gap-1.5">
                      <span className="font-mono text-[10px] tracking-wide text-accent/75">
                        {s.publisher}
                      </span>
                      <span className="font-mono text-[10px] text-ice-lo/35">{s.year}</span>
                      <svg
                        width="7"
                        height="7"
                        viewBox="0 0 8 8"
                        fill="none"
                        className="ml-auto shrink-0 text-ice-lo/30 transition-colors duration-200 group-hover:text-accent"
                      >
                        <path d="M1 7L7 1M7 1H2.5M7 1v4.5" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </span>

                    <span className="mt-1 block font-serif text-[13px] leading-snug font-light text-ice-mid/85 transition-colors duration-200 group-hover:text-ice-hi">
                      {s.title}
                    </span>
                    <span className="mt-1 block font-serif text-[11.5px] leading-[1.5] font-light text-ice-lo/55">
                      {s.note}
                    </span>
                    <span className="label mt-1.5 block text-[9px] text-ice-lo/35">
                      {layerName(s.relatesTo)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </>
  )
}
