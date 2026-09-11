import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function SoundOnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 5 6.7 8.5H3v7h3.7L11 19V5Z" />
      <path d="M15 9.2a4 4 0 0 1 0 5.6M17.8 6.5a7.6 7.6 0 0 1 0 11" />
    </svg>
  )
}

export function SoundOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 5 6.7 8.5H3v7h3.7L11 19V5Z" />
      <path d="m16 10 5 5M21 10l-5 5" />
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

export function HandTapIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.2 11.4V5.5a2 2 0 0 1 4 0V10" />
      <path d="M13.2 9V7.8a1.8 1.8 0 0 1 3.6 0v2.8" />
      <path d="M16.8 10V9.2a1.7 1.7 0 0 1 3.4 0v4.2c0 5.2-2.7 8-7.2 8-3.4 0-5.3-1.6-7-4.1l-2.6-3.8a1.8 1.8 0 0 1 2.8-2.2l3 2.4" />
      <path d="M5 4.5 3 2.8M5.2 8H2.5M16.5 3.8l1.4-2.1" />
    </svg>
  )
}

export function SwipeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 12h10M14 9l3 3-3 3" />
      <path d="M10 17.5V9.7a1.8 1.8 0 1 0-3.6 0v5.5l-1.1-1.1a1.6 1.6 0 0 0-2.4 2l2.2 3.1c1.2 1.7 3 2.5 5 2.5 3.8 0 6.1-2.2 6.1-6.1" />
    </svg>
  )
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h8v4c0 3.1-1.6 5-4 5s-4-1.9-4-5V4Z" />
      <path d="M8 6H4v2c0 2 1.5 3 4 3M16 6h4v2c0 2-1.5 3-4 3M12 13v4M8 21h8M9 17h6v4H9z" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
    </svg>
  )
}

export function ReplayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 8V3l-2 2a9 9 0 1 0 2.3 10" />
      <path d="M20 3h-5" />
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 11 9-7 9 7" />
      <path d="M5.5 9.5V20h13V9.5M9.5 20v-6h5v6" />
    </svg>
  )
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
    </svg>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5v14M16 5v14" />
    </svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 5 11 7-11 7V5Z" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}
