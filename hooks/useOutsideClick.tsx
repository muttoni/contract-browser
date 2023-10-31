import * as React from 'react'

export default function useOutsideClick(callback) {
  const ref = React.useRef()

  React.useEffect(() => {
    const handleClick = (event) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}