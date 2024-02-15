import React from 'react'

const useWindowSize = (): { width: number; height: number } => {
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })

  const handleSize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  React.useLayoutEffect(() => {
    handleSize()

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
