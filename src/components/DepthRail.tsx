import { motion } from 'motion/react'
import { LAYERS } from '../data/iceberg'

interface Props {
  layer: number
  maxUnlocked: number
  onGo: (i: number) => void
}

/**
 * Depth gauge, not navigation. It shows how far down you are and what you have
 * earned access to — locked stops stay visible so the descent has a horizon.
 */
export function DepthRail({ layer, maxUnlocked, onGo }: Props) {
  return (
    <div className="pointer-events-auto fixed top-1/2 left-0 z-30 w-[100px] -translate-y-1/2 select-none">
      <div className="relative pl-7">
        <div className="absolute top-2 bottom-2 left-[13px] w-px bg-white/10" />
        <motion.div
          className="absolute left-[13px] w-px bg-accent/50"
          initial={false}
          animate={{ top: 8, height: `${(layer / (LAYERS.length - 1)) * 100}%` }}
          transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
        />

        <div className="flex flex-col gap-11">
          {LAYERS.map((l, i) => {
            const active = i === layer
            const locked = i > maxUnlocked
            return (
              <button
                key={l.id}
                disabled={locked}
                onClick={() => onGo(i)}
                className={[
                  'group relative flex items-center text-left transition-opacity duration-500',
                  locked ? 'cursor-default opacity-25' : 'cursor-pointer opacity-100',
                ].join(' ')}
              >
                <span className="absolute -left-[14px] flex h-3 w-3 items-center justify-center">
                  <motion.span
                    className="rounded-full"
                    initial={false}
                    animate={{
                      width: active ? 7 : 4,
                      height: active ? 7 : 4,
                      backgroundColor: active ? '#c2a878' : 'rgba(148,169,181,0.55)',
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </span>
                <span
                  className={[
                    'label leading-[1.5] transition-colors duration-500',
                    active ? 'text-ice-hi' : 'text-ice-lo/70 group-hover:text-ice-mid',
                  ].join(' ')}
                >
                  {l.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
