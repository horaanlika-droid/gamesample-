type MascotProps = {
  mood?: 'happy' | 'celebrate' | 'oops'
  className?: string
}

export function Mascot({ mood = 'happy', className = '' }: MascotProps) {
  return (
    <svg
      className={`mascot mascot--${mood} ${className}`}
      viewBox="0 0 390 350"
      role="img"
      aria-label={mood === 'oops' ? 'Шеф Шмыг удивлён' : 'Шеф Шмыг улыбается'}
    >
      <defs>
        <linearGradient id="mascot-body" x1="145" y1="142" x2="270" y2="329" gradientUnits="userSpaceOnUse">
          <stop stopColor="#766B8B" />
          <stop offset="1" stopColor="#4C4564" />
        </linearGradient>
        <linearGradient id="mascot-apron" x1="183" y1="225" x2="252" y2="326" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#EFE8DD" />
        </linearGradient>
        <filter id="mascot-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#382D48" floodOpacity=".18" />
        </filter>
      </defs>

      <ellipse className="mascot__floor-shadow" cx="196" cy="328" rx="112" ry="15" fill="#473E5D" opacity=".14" />

      <path
        className="mascot__tail"
        d="M135 267C81 248 54 280 67 307c11 23 47 14 38-7-5-12-19-7-17 2"
        fill="none"
        stroke="#8A809A"
        strokeWidth="16"
        strokeLinecap="round"
      />

      <g filter="url(#mascot-shadow)">
        <path d="M141 317c4-19 21-30 40-26 18 4 29 20 26 38h-69l3-12Z" fill="#403950" />
        <path d="M244 317c-4-19-21-30-40-26-18 4-29 20-26 38h69l-3-12Z" fill="#403950" transform="translate(43)" />
        <path
          d="M133 270c0-59 28-99 64-99s65 40 65 99v38c-30 24-99 24-129 0v-38Z"
          fill="url(#mascot-body)"
        />
        <path d="M166 227c0-22 14-40 31-40s31 18 31 40v91c-20 8-42 8-62 0v-91Z" fill="url(#mascot-apron)" />
        <path d="M170 215c18 12 37 12 55 0" fill="none" stroke="#FF7056" strokeWidth="13" strokeLinecap="round" />
        <path d="M194 221l-19 25 22 10 18-12-21-23Z" fill="#FF9D57" />
        <path d="M198 252v66" stroke="#D7CDC2" strokeWidth="3" strokeDasharray="5 8" strokeLinecap="round" />
        <path d="M177 271h18v14h-18z" fill="#FFF" stroke="#DED5CB" strokeWidth="2" />
      </g>

      <g className="mascot__arm mascot__arm--left">
        <path d="M151 231c-26 4-39 24-43 47" fill="none" stroke="#665C79" strokeWidth="24" strokeLinecap="round" />
        <circle cx="107" cy="281" r="15" fill="#8A809A" />
        <path d="M98 276l-13-7M101 270l-7-12" stroke="#8A809A" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g className="mascot__arm mascot__arm--right">
        <path d="M243 231c26 4 39 24 43 47" fill="none" stroke="#665C79" strokeWidth="24" strokeLinecap="round" />
        <circle cx="287" cy="281" r="15" fill="#8A809A" />
        <path d="M296 276l13-7M293 270l7-12" stroke="#8A809A" strokeWidth="6" strokeLinecap="round" />
      </g>

      <g className="mascot__head" filter="url(#mascot-shadow)">
        <circle cx="132" cy="140" r="52" fill="#625873" />
        <circle cx="262" cy="140" r="52" fill="#625873" />
        <circle cx="132" cy="140" r="29" fill="#F2A1A8" />
        <circle cx="262" cy="140" r="29" fill="#F2A1A8" />
        <path
          d="M126 153c0-54 31-88 71-88s71 34 71 88c0 43-24 83-71 83s-71-40-71-83Z"
          fill="url(#mascot-body)"
        />
        <ellipse cx="166" cy="173" rx="30" ry="35" fill="#938A9F" opacity=".78" />
        <ellipse cx="228" cy="173" rx="30" ry="35" fill="#938A9F" opacity=".78" />
        <ellipse cx="197" cy="195" rx="42" ry="36" fill="#A59CAD" />

        <g className="mascot__eyes">
          <ellipse cx="168" cy="157" rx="8" ry={mood === 'oops' ? 12 : 10} fill="#29243B" />
          <ellipse cx="226" cy="157" rx="8" ry={mood === 'oops' ? 12 : 10} fill="#29243B" />
          <circle cx="165" cy="153" r="2.7" fill="white" />
          <circle cx="223" cy="153" r="2.7" fill="white" />
        </g>
        {mood === 'oops' && (
          <g className="mascot__brows" fill="none" stroke="#40384E" strokeWidth="5" strokeLinecap="round">
            <path d="M155 137l22-6" />
            <path d="M217 131l22 6" />
          </g>
        )}
        <path d="M184 187c0-10 6-17 13-17s13 7 13 17c-4 7-9 10-13 10s-9-3-13-10Z" fill="#FF7188" />
        <circle cx="193" cy="179" r="3" fill="#FFB4C0" />
        {mood === 'oops' ? (
          <ellipse cx="197" cy="211" rx="9" ry="12" fill="#342E43" />
        ) : (
          <path d="M183 207c8 11 20 11 28 0" fill="none" stroke="#342E43" strokeWidth="5" strokeLinecap="round" />
        )}
        <g className="mascot__whiskers" fill="none" stroke="#4B435A" strokeWidth="3" strokeLinecap="round">
          <path d="M158 190l-60-13M158 202l-66 8M236 190l60-13M236 202l66 8" />
        </g>
      </g>

      <g className="mascot__hat" filter="url(#mascot-shadow)">
        <path d="M139 102c-18-14-14-43 8-50 2-25 34-38 52-21 20-21 56-7 56 22 23 6 28 37 9 51l-125-2Z" fill="#FFFDF7" />
        <path d="M145 94h108v32c-33 11-75 11-108 0V94Z" fill="#FFFDF7" />
        <path d="M160 104c25 7 53 7 78 0" fill="none" stroke="#E8E1D9" strokeWidth="4" strokeLinecap="round" />
      </g>

      <g className="mascot__sparkles" fill="#FFD55A">
        <path d="M69 132l5 11 11 5-11 5-5 11-5-11-11-5 11-5 5-11Z" />
        <path d="M324 168l4 8 8 4-8 4-4 9-4-9-8-4 8-4 4-8Z" />
        <circle cx="312" cy="106" r="5" fill="#FF8063" />
      </g>
    </svg>
  )
}
