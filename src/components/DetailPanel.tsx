import { motion } from 'motion/react'
import { byId, parentsOf, type IcebergNode } from '../data/iceberg'

/**
 * The detail card reframes itself per layer. Events list what they feed into;
 * mental models are stated as a cause -> belief pair, because that is the
 * relationship that actually matters at that depth.
 */
const RELATION_LABEL: Record<string, string> = {
  events: 'Repeats as',
  patterns: 'Produced by',
  systems: 'Rests on the belief that',
  mental_models: '',
}

interface Props {
  node: IcebergNode
  onClose: () => void
  onFollow: (id: string) => void
}

export function DetailPanel({ node, onClose, onFollow }: Props) {
  const downstream = node.connectsTo.map((id) => byId.get(id)).filter(Boolean) as IcebergNode[]
  const upstream = parentsOf(node.id)
  const isModel = node.layer === 'mental_models'

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="pointer-events-auto w-[356px] shrink-0 overflow-y-auto rounded-md border border-white/10 bg-[#080e12]/82 backdrop-blur-md pb-1"
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5">
        <h2 className="display text-[21px] leading-[1.25] text-ice-hi">{node.title}</h2>
        <button
          onClick={onClose}
          aria-label="Close detail"
          className="-mr-1 mt-1 shrink-0 p-1.5 text-ice-lo transition-colors hover:text-ice-hi"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      {/* Mental models get their cause stated above them, not beside them. */}
      {isModel && upstream.length > 0 && (
        <div className="mt-4 px-5">
          <div className="label text-ice-lo/60">Because</div>
          <div className="mt-1.5 border-l border-accent/35 pl-3 font-serif text-[14px] leading-relaxed font-light text-ice-mid/75 italic">
            {upstream.map((u) => u.title).join(' · ')}
          </div>
        </div>
      )}

      <p className="mt-4 px-5 font-serif text-[15px] leading-[1.6] font-light text-ice-mid/85">
        {node.description}
      </p>

      {node.bullets.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2 px-5">
          {node.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="flex gap-2.5 font-serif text-[13.5px] leading-[1.55] font-light text-ice-mid/65"
            >
              <span className="mt-[9px] h-px w-2.5 shrink-0 bg-ice-lo/40" />
              {b}
            </motion.li>
          ))}
        </ul>
      )}

      {downstream.length > 0 && (
        <div className="mt-5 border-t border-white/[0.07] px-5 py-4">
          <div className="label text-ice-lo/60">{RELATION_LABEL[node.layer]}</div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {downstream.map((d) => (
              <button
                key={d.id}
                onClick={() => onFollow(d.id)}
                className="rounded-sm border border-accent/25 px-2.5 py-1.5 font-serif text-[12.5px] leading-none font-light text-accent/85 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
