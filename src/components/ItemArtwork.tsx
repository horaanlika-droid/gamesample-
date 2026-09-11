import { useId, type ReactNode } from 'react'

export type ItemKind =
  | 'cheese'
  | 'strawberry'
  | 'pizza'
  | 'croissant'
  | 'apple'
  | 'cupcake'
  | 'carrot'
  | 'donut'
  | 'sock'
  | 'key'
  | 'soap'
  | 'bulb'
  | 'duck'
  | 'battery'
  | 'sneaker'
  | 'pencil'

export type ItemDefinition = {
  kind: ItemKind
  label: string
  edible: boolean
  accent: string
}

export const ITEMS: ItemDefinition[] = [
  { kind: 'cheese', label: 'Сыр', edible: true, accent: '#FFD34E' },
  { kind: 'strawberry', label: 'Клубника', edible: true, accent: '#FF5D67' },
  { kind: 'pizza', label: 'Пицца', edible: true, accent: '#FF9850' },
  { kind: 'croissant', label: 'Круассан', edible: true, accent: '#EFA94F' },
  { kind: 'apple', label: 'Яблоко', edible: true, accent: '#A8CF55' },
  { kind: 'cupcake', label: 'Кекс', edible: true, accent: '#FC88A4' },
  { kind: 'carrot', label: 'Морковка', edible: true, accent: '#FF824C' },
  { kind: 'donut', label: 'Пончик', edible: true, accent: '#E98BC2' },
  { kind: 'sock', label: 'Носок', edible: false, accent: '#7C72E8' },
  { kind: 'key', label: 'Ключ', edible: false, accent: '#F2B84B' },
  { kind: 'soap', label: 'Мыло', edible: false, accent: '#68CADA' },
  { kind: 'bulb', label: 'Лампочка', edible: false, accent: '#FFD55A' },
  { kind: 'duck', label: 'Уточка', edible: false, accent: '#FFD64F' },
  { kind: 'battery', label: 'Батарейка', edible: false, accent: '#72B76D' },
  { kind: 'sneaker', label: 'Кроссовок', edible: false, accent: '#5CB7CF' },
  { kind: 'pencil', label: 'Карандаш', edible: false, accent: '#EF6C5B' },
]

export const FOOD_ITEMS = ITEMS.filter((item) => item.edible)
export const NON_FOOD_ITEMS = ITEMS.filter((item) => !item.edible)

function Cheese() {
  return (
    <>
      <path d="M39 123 85 48c6-9 15-13 25-9l58 23-47 99-82-38Z" fill="#FFD653" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m39 123 82 38 47-42-1-57-46 41-82-35v55Z" fill="#F2B93F" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m39 68 82 35 46-41-57-23c-10-4-19 0-25 9L39 68Z" fill="#FFE57A" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="101" cy="69" rx="12" ry="7" fill="#E9B23D" transform="rotate(18 101 69)" />
      <ellipse cx="137" cy="68" rx="8" ry="5" fill="#E9B23D" transform="rotate(-20 137 68)" />
      <circle cx="91" cy="124" r="10" fill="#E2A936" />
      <path d="M46 94c11 0 17 7 16 17l-16-7V94Z" fill="#E2A936" />
      <path d="M138 114c11-2 17 5 16 15l-19 16 3-31Z" fill="#D99D32" />
    </>
  )
}

function Strawberry() {
  return (
    <>
      <path d="M101 166C72 148 44 108 53 75c7-26 34-32 49-14 15-18 43-12 49 14 9 33-19 73-50 91Z" fill="#FA5A68" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M101 65c-17-17-33-19-45-16 8 6 14 13 17 22-11-1-21 2-29 8 18 3 38 2 57-7 20 9 39 10 57 7-8-6-18-9-29-8 3-9 9-16 17-22-12-3-28-1-45 16Z" fill="#6EBC63" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <g fill="#FFD779">
        <ellipse cx="77" cy="94" rx="3.5" ry="6" transform="rotate(-20 77 94)" />
        <ellipse cx="118" cy="91" rx="3.5" ry="6" transform="rotate(18 118 91)" />
        <ellipse cx="96" cy="116" rx="3.5" ry="6" />
        <ellipse cx="71" cy="123" rx="3" ry="5" transform="rotate(-16 71 123)" />
        <ellipse cx="125" cy="122" rx="3" ry="5" transform="rotate(16 125 122)" />
        <ellipse cx="99" cy="145" rx="3" ry="5" />
      </g>
      <path d="M68 78c5-10 13-13 23-11" fill="none" stroke="#FF9AA2" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Pizza() {
  return (
    <>
      <path d="M99 36 33 151c40 19 91 19 133 0L99 36Z" fill="#FFD45E" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M99 36 89 54c9 8 19 8 29 0L99 36Z" fill="#F4B543" />
      <path d="M35 140c40 19 89 19 129 0 11 6 12 21 1 29-45 20-89 20-132 0-11-9-9-24 2-29Z" fill="#D99045" stroke="#40384E" strokeWidth="5" />
      <path d="M42 137c36 14 78 14 114 0" fill="none" stroke="#F0B460" strokeWidth="7" strokeLinecap="round" />
      <circle cx="82" cy="105" r="14" fill="#EB6759" stroke="#BE4F4C" strokeWidth="3" />
      <circle cx="121" cy="128" r="13" fill="#EB6759" stroke="#BE4F4C" strokeWidth="3" />
      <circle cx="112" cy="76" r="10" fill="#EB6759" stroke="#BE4F4C" strokeWidth="3" />
      <path d="M63 127c10 1 16-4 19-13M127 99c8 3 15 1 20-5" fill="none" stroke="#7BB35B" strokeWidth="6" strokeLinecap="round" />
      <path d="M63 76c8-6 16-5 24-1" fill="none" stroke="#FFF0A8" strokeWidth="7" strokeLinecap="round" />
    </>
  )
}

function Croissant() {
  return (
    <>
      <path d="M42 79c-12 14-14 35-4 51 16 26 51 39 84 30 31-8 48-30 45-51-2-16-14-28-28-32-2 29-18 48-43 51-26 3-45-16-54-49Z" fill="#E6A64C" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M42 79c4-13 14-23 27-27 6 32 17 57 27 76-25 3-45-16-54-49Z" fill="#F7C868" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M69 52c20-13 47-12 70 5 1 30-16 66-43 71-11-20-22-45-27-76Z" fill="#EFBB5C" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M139 57c13 4 23 11 28 22-6 24-15 39-28 48-6 4-14 6-22 5 15-18 23-43 22-75Z" fill="#F8CB6D" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M53 80c11 2 19-2 25-10M87 65c12 1 22-2 31-8M121 74c9 3 17 3 25-1" fill="none" stroke="#FFE197" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function Apple() {
  return (
    <>
      <path d="M100 74c-21-24-59-14-66 18-8 37 22 78 52 76 10-1 17-6 27 0 27 5 59-38 52-76-7-32-44-42-65-18Z" fill="#A9D655" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M100 76c-8-22-5-40 6-53" fill="none" stroke="#675044" strokeWidth="8" strokeLinecap="round" />
      <path d="M107 45c11-19 31-23 47-13-8 18-26 27-47 13Z" fill="#6EBB62" stroke="#3E374F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M51 91c7-14 19-20 32-18" fill="none" stroke="#DDF28E" strokeWidth="8" strokeLinecap="round" />
      <path d="M137 81c15 21 12 51-6 70" fill="none" stroke="#87BC42" strokeWidth="6" strokeLinecap="round" opacity=".6" />
    </>
  )
}

function Cupcake() {
  return (
    <>
      <path d="M53 99h94l-11 67H65L53 99Z" fill="#70BFD0" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M69 108l7 49M91 108l3 49M116 108l-3 49M139 108l-7 49" stroke="#A5DFE5" strokeWidth="5" strokeLinecap="round" />
      <path d="M51 100c-10-8-8-26 5-31-1-16 15-28 29-20 8-23 42-23 50 1 17-2 27 13 23 27 13 9 8 29-7 31H54c-7-1-10-4-3-8Z" fill="#F58EAE" stroke="#40384E" strokeWidth="5" strokeLinejoin="round" />
      <path d="M67 66c5-9 14-12 23-8" fill="none" stroke="#FFC4D4" strokeWidth="7" strokeLinecap="round" />
      <circle cx="104" cy="37" r="12" fill="#F45B67" stroke="#40384E" strokeWidth="4" />
      <path d="M104 25c2-8 7-13 14-16" fill="none" stroke="#5C9953" strokeWidth="5" strokeLinecap="round" />
      <g fill="#FFF0A5">
        <rect x="72" y="78" width="12" height="4" rx="2" transform="rotate(-20 72 78)" />
        <rect x="111" y="67" width="12" height="4" rx="2" transform="rotate(18 111 67)" />
        <rect x="127" y="88" width="11" height="4" rx="2" transform="rotate(-14 127 88)" />
      </g>
    </>
  )
}

function Carrot() {
  return (
    <>
      <path d="M78 66c8-9 35-9 44 0-5 39-25 76-50 104-8-36-6-75 6-104Z" fill="#FF824C" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M88 62C69 48 67 30 74 17c13 9 22 22 26 39 2-22 13-39 30-49 5 18-2 37-20 55 15-11 31-13 45-7-9 15-23 23-42 24L88 62Z" fill="#67B860" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M76 91l22 4M74 115l17 3M70 140l11 2" stroke="#D96138" strokeWidth="5" strokeLinecap="round" />
      <path d="M89 73c10-3 18-2 24 1" fill="none" stroke="#FFAA72" strokeWidth="6" strokeLinecap="round" />
    </>
  )
}

function Donut() {
  return (
    <>
      <ellipse cx="100" cy="109" rx="69" ry="60" fill="#D99A58" stroke="#3E374F" strokeWidth="5" />
      <path d="M36 99c6-31 32-52 64-52 34 0 62 23 65 56-10 7-13 21-27 19-11-2-13-13-24-10-12 3-14 17-29 16-13-1-15-15-26-16-10 0-14-7-23-13Z" fill="#F18AB3" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <ellipse cx="100" cy="103" rx="22" ry="19" fill="#FFF7E8" stroke="#3E374F" strokeWidth="5" />
      <path d="M48 117c8 30 29 48 54 49 29 0 50-21 60-50" fill="none" stroke="#BD7A40" strokeWidth="5" opacity=".45" />
      <g strokeWidth="5" strokeLinecap="round">
        <path d="m61 82 8 4" stroke="#FFF0A5" />
        <path d="m91 65-3 9" stroke="#6FC3D1" />
        <path d="m128 75 8-5" stroke="#FFF0A5" />
        <path d="m143 96 9 3" stroke="#6FC3D1" />
        <path d="m63 104-7 5" stroke="#7E73DB" />
      </g>
    </>
  )
}

function Sock() {
  return (
    <>
      <path d="M72 31h62l-8 73 29 23c18 15 8 43-16 44l-70 2c-34 1-46-39-19-56l30-19-8-67Z" fill="#7A70DF" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M72 31h62l-4 30H76l-4-30Z" fill="#FFCF58" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M80 98c17 12 33 14 48 5l27 24c-23 15-48 21-75 18-19-2-30-11-35-21l35-26Z" fill="#9289EE" />
      <path d="M88 73c8 7 17 7 26 0M79 124c9 8 19 10 30 7" fill="none" stroke="#B9B2FF" strokeWidth="7" strokeLinecap="round" />
      <circle cx="108" cy="47" r="5" fill="#FF8C66" />
    </>
  )
}

function Key() {
  return (
    <>
      <circle cx="69" cy="77" r="37" fill="#F4BE4E" stroke="#3E374F" strokeWidth="6" />
      <circle cx="69" cy="77" r="16" fill="#FFF7E8" stroke="#3E374F" strokeWidth="5" />
      <path d="m94 104 57 57 18-18-13-13 10-10-14-14-10 10-30-30-18 18Z" fill="#F4BE4E" stroke="#3E374F" strokeWidth="6" strokeLinejoin="round" />
      <path d="M46 59c8-12 22-17 34-12" fill="none" stroke="#FFE38B" strokeWidth="7" strokeLinecap="round" />
    </>
  )
}

function Soap() {
  return (
    <>
      <rect x="40" y="69" width="122" height="91" rx="36" fill="#69CADA" stroke="#3E374F" strokeWidth="5" transform="rotate(-7 101 114)" />
      <rect x="54" y="82" width="91" height="59" rx="25" fill="#8BDDE8" opacity=".72" transform="rotate(-7 99 111)" />
      <path d="M66 99c13-12 31-16 47-13" fill="none" stroke="#C5F6F6" strokeWidth="8" strokeLinecap="round" />
      <g fill="#BDF3F2" stroke="#3E374F" strokeWidth="4">
        <circle cx="54" cy="55" r="13" />
        <circle cx="83" cy="37" r="9" />
        <circle cx="107" cy="52" r="6" />
      </g>
    </>
  )
}

function Bulb() {
  return (
    <>
      <path d="M100 28c-37 0-59 28-57 58 2 25 16 36 31 50 6 6 8 13 8 22h36c0-9 2-16 8-22 15-14 29-25 31-50 2-30-20-58-57-58Z" fill="#FFD85C" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M67 80c2-17 14-29 30-32" fill="none" stroke="#FFF2A5" strokeWidth="9" strokeLinecap="round" />
      <path d="M82 157h36v18c-11 12-25 12-36 0v-18Z" fill="#828092" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M84 163h32M85 172h30" stroke="#C7C3CE" strokeWidth="4" />
      <path d="m84 118 16-21 16 21M100 97v59" fill="none" stroke="#D49F3F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <g stroke="#F7BE43" strokeWidth="6" strokeLinecap="round">
        <path d="M29 51 18 42M171 51l11-9M100 12V3M42 22l-7-12M158 22l7-12" />
      </g>
    </>
  )
}

function Duck() {
  return (
    <>
      <path d="M57 94c-21 4-35 19-32 38 5 28 41 40 78 35 36-4 65-24 68-51 2-21-18-35-42-31 2-36-42-52-65-26-8 9-10 22-7 35Z" fill="#FFD650" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M61 95c-16 5-27 16-30 28 15 6 31 3 45-7" fill="#F3BB39" />
      <path d="M128 89c19-7 35-1 43 11-11 11-25 14-42 10" fill="#FF8A55" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="104" cy="69" r="7" fill="#302B40" />
      <circle cx="102" cy="67" r="2" fill="white" />
      <path d="M69 132c22 15 49 15 71-2" fill="none" stroke="#FFE783" strokeWidth="7" strokeLinecap="round" />
      <path d="M95 118c7-10 20-13 30-7" fill="none" stroke="#E7AB33" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

function Battery() {
  return (
    <>
      <path d="M77 35h46v20H77z" fill="#777383" stroke="#3E374F" strokeWidth="5" />
      <rect x="55" y="50" width="90" height="126" rx="18" fill="#68B66C" stroke="#3E374F" strokeWidth="5" />
      <path d="M57 67c0-8 7-15 15-15h56c8 0 15 7 15 15v22H57V67Z" fill="#8ED083" />
      <path d="M57 143h86v17c0 8-7 14-15 14H72c-8 0-15-6-15-14v-17Z" fill="#4D9859" />
      <path d="M100 85 77 120h19l-7 30 33-45h-20l12-20h-14Z" fill="#FFF1A3" stroke="#3E374F" strokeWidth="4" strokeLinejoin="round" />
      <path d="M70 66h38" stroke="#C8EDB3" strokeWidth="7" strokeLinecap="round" />
    </>
  )
}

function Sneaker() {
  return (
    <>
      <path d="M49 72c15 14 31 21 49 19l15-29c6-12 19-17 29-10 12 8 14 23 7 35l-7 12c17 11 30 23 34 37 4 14-5 27-20 29l-100 10c-22 2-39-15-35-35l10-54c2-12 10-19 18-14Z" fill="#5FBAD0" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="M24 139c37 10 91 3 151-4 6 14-3 28-19 30l-100 10c-19 2-34-11-35-28l3-8Z" fill="#FFFDF6" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m75 88 42 33M86 82l-27 31M101 78l-28 44" fill="none" stroke="#FFFDF6" strokeWidth="7" strokeLinecap="round" />
      <path d="M49 120c15 5 30 5 45 1" fill="none" stroke="#3E374F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="147" cy="145" r="6" fill="#FF7D61" />
    </>
  )
}

function Pencil() {
  return (
    <>
      <path d="m36 154 25-57 72-72 42 42-72 72-57 25-10-10Z" fill="#EF6C5B" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m61 97 42 42 72-72-42-42-72 72Z" fill="#F27862" />
      <path d="m78 80 42 42M95 63l42 42" stroke="#FFAE75" strokeWidth="12" />
      <path d="m133 25 42 42 14-14c5-5 5-13 0-18l-24-24c-5-5-13-5-18 0l-14 14Z" fill="#6EC2CE" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m36 154 25-57 42 42-57 25-10-10Z" fill="#F0D0A2" stroke="#3E374F" strokeWidth="5" strokeLinejoin="round" />
      <path d="m36 154 15-7 3 11-8 6-10-10Z" fill="#3E374F" />
    </>
  )
}

const artwork: Record<ItemKind, () => ReactNode> = {
  cheese: Cheese,
  strawberry: Strawberry,
  pizza: Pizza,
  croissant: Croissant,
  apple: Apple,
  cupcake: Cupcake,
  carrot: Carrot,
  donut: Donut,
  sock: Sock,
  key: Key,
  soap: Soap,
  bulb: Bulb,
  duck: Duck,
  battery: Battery,
  sneaker: Sneaker,
  pencil: Pencil,
}

type ItemArtworkProps = {
  kind: ItemKind
  className?: string
  decorative?: boolean
}

export function ItemArtwork({ kind, className = '', decorative = false }: ItemArtworkProps) {
  const filterId = `item-shadow-${useId().replace(/:/g, '')}`
  const item = ITEMS.find((entry) => entry.kind === kind)!
  const Artwork = artwork[kind]

  return (
    <svg
      className={`item-art ${className}`}
      viewBox="0 0 200 200"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : item.label}
    >
      <defs>
        <filter id={filterId} x="-25%" y="-25%" width="150%" height="170%">
          <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#332B45" floodOpacity=".18" />
        </filter>
      </defs>
      <ellipse cx="100" cy="174" rx="55" ry="9" fill="#3B334D" opacity=".12" />
      <g filter={`url(#${filterId})`}>
        <Artwork />
      </g>
    </svg>
  )
}
