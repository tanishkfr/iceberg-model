import { WATERLINE } from '../lib/geometry'
import { Environment } from './Environment'

/**
 * Sky, water and the ambient motion that makes the opening feel ordinary.
 *
 * All gradients are userSpaceOnUse so they stay pinned to world depth while
 * the camera moves — sinking actually changes the light, rather than just
 * translating a picture.
 */
export function Ocean() {
  return (
    <>
      <defs>
        <linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="-900" x2="0" y2={WATERLINE}>
          <stop offset="0" stopColor="#8fa3b2" />
          <stop offset="0.55" stopColor="#c3ced7" />
          <stop offset="1" stopColor="#e4eaee" />
        </linearGradient>

        <linearGradient id="water" gradientUnits="userSpaceOnUse" x1="0" y1={WATERLINE} x2="0" y2="4600">
          <stop offset="0" stopColor="#5b7787" />
          <stop offset="0.12" stopColor="#3d5866" />
          <stop offset="0.34" stopColor="#223a47" />
          <stop offset="0.62" stopColor="#12222c" />
          <stop offset="1" stopColor="#060c11" />
        </linearGradient>

        {/*
          Fades the submerged berg into the water. It bites hard immediately
          below the surface: at the opening you should be able to sense the
          mass without being able to read it.
        */}
        <linearGradient id="dissolve" gradientUnits="userSpaceOnUse" x1="0" y1={WATERLINE} x2="0" y2="4400">
          <stop offset="0" stopColor="#4d6a7a" stopOpacity="0.42" />
          <stop offset="0.05" stopColor="#3f5c6c" stopOpacity="0.52" />
          {/* Holds steady through the systems band so structure stays legible
              once you are down there, then closes in again toward the keel. */}
          <stop offset="0.14" stopColor="#33505f" stopOpacity="0.54" />
          <stop offset="0.32" stopColor="#26404e" stopOpacity="0.63" />
          <stop offset="0.48" stopColor="#1c3341" stopOpacity="0.76" />
          <stop offset="0.72" stopColor="#12222c" stopOpacity="0.9" />
          <stop offset="1" stopColor="#060c11" stopOpacity="0.99" />
        </linearGradient>

        {/* Clouds and haze are blurred rather than drawn — no hard edges. */}
        <filter id="haze" x="-40%" y="-200%" width="180%" height="500%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id="haze-soft" x="-40%" y="-200%" width="180%" height="500%">
          <feGaussianBlur stdDeviation="42" />
        </filter>

        {/* Light falls off down the face — keeps flat facets from reading flat. */}
        <linearGradient id="face-light" gradientUnits="userSpaceOnUse" x1="0" y1="440" x2="0" y2={WATERLINE}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#5f7787" stopOpacity="0.16" />
        </linearGradient>

        <radialGradient id="sun" gradientUnits="userSpaceOnUse" cx="380" cy="60" r="900">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="-3000" y="-2400" width="7600" height={WATERLINE + 2400} fill="url(#sky)" />
      <rect x="-3000" y="-2400" width="7600" height={WATERLINE + 2400} fill="url(#sun)" />
      <rect x="-3000" y={WATERLINE} width="7600" height="6000" fill="url(#water)" />

      {/* Dynamic environmental background: clouds, ships, fish, submarine, vegetation */}
      <Environment />

      {/* Cloud banks: blurred masses, never discrete shapes. Positioned in the
          sky band that is actually in frame at the surface (y 290-620). */}
      <g className="drift-slow" filter="url(#haze)" opacity="0.75">
        <ellipse cx="240" cy="372" rx="470" ry="54" fill="#ffffff" />
        <ellipse cx="560" cy="410" rx="320" ry="38" fill="#ffffff" opacity="0.75" />
        <ellipse cx="1240" cy="344" rx="520" ry="48" fill="#ffffff" opacity="0.85" />
        <ellipse cx="1520" cy="404" rx="360" ry="34" fill="#ffffff" opacity="0.6" />
      </g>
      <g className="drift-slower" filter="url(#haze-soft)" opacity="0.5">
        <ellipse cx="860" cy="516" rx="700" ry="42" fill="#ffffff" />
        <ellipse cx="60" cy="560" rx="440" ry="32" fill="#ffffff" opacity="0.8" />
      </g>
      {/* A higher, fainter deck for depth. */}
      <g className="drift-slower" filter="url(#haze-soft)" opacity="0.32">
        <ellipse cx="1100" cy="252" rx="620" ry="30" fill="#ffffff" />
      </g>

      {/* Haze pooling on the horizon separates sky from water. */}
      <ellipse
        cx="800"
        cy={WATERLINE - 26}
        rx="2600"
        ry="52"
        fill="#eef3f6"
        opacity="0.5"
        filter="url(#haze)"
      />

      {/* Surface: one bright hairline, then swells that fade out with distance. */}
      <rect x="-3000" y={WATERLINE - 1} width="7600" height="2" fill="#e6eef2" opacity="0.6" />
      <g className="swell-a" opacity="0.5">
        <ellipse cx="500" cy={WATERLINE + 30} rx="900" ry="4" fill="#9db4c0" opacity="0.5" filter="url(#haze)" />
        <ellipse cx="1300" cy={WATERLINE + 74} rx="800" ry="5" fill="#9db4c0" opacity="0.36" filter="url(#haze)" />
      </g>
      <g className="swell-b" opacity="0.36">
        <ellipse cx="300" cy={WATERLINE + 140} rx="1000" ry="6" fill="#87a0ae" opacity="0.4" filter="url(#haze)" />
      </g>
    </>
  )
}

