import { type Screen } from '@utils/types'
import React from 'react'

const useScreenSize = (): Screen => {
  const [screenSize, setScreenSize] = React.useState<Screen>({
    width: 0,
    height: 0
  })

  const handleSize = (): void => {
    setScreenSize({
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

  return screenSize
}

export default useScreenSize
