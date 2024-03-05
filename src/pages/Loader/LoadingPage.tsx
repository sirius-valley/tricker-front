import React, { useState, useEffect } from 'react'
import Spinner from '@components/Spinner/Spinner'

const LoadingPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner variant={'primary'} size={50} />
        </div>
      )}
    </div>
  )
}

export default LoadingPage
