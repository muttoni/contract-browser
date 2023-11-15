export function CBLogo({size = 32} : {size? : number | string}) {
  return (
    <svg className="text-primary" width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="100" fill="currentColor"/>
      <path d="M20 73.7L93 31V49.7692L20 92V73.7Z" fill="white"/>
      <path d="M71.8212 106.292L93.8302 118.857L93.8306 136.943L56.0802 115.38L71.8212 106.292Z" fill="white"/>
      <path d="M20 126.3L93 169V150.231L20 108V126.3Z" fill="white"/>
      <path d="M20 104L93 63.0569V81.1427L20 122V104Z" fill="white"/>
      <path d="M181 126.3L107 169V150.231L181 108V126.3Z" fill="white"/>
      <path d="M128.906 93.7083L106.897 81.1427L106.897 63.0569L144.647 84.6202L128.906 93.7083Z" fill="white"/>
      <path d="M181 73.7L107 31V49.7692L181 92V73.7Z" fill="white"/>
      <path d="M181 96L107 136.943V118.857L181 78V96Z" fill="white"/>
    </svg>
  )
}