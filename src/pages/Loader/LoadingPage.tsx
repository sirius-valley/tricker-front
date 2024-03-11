import React from 'react'
import Spinner from '@components/Spinner/Spinner'

const LoadingPage: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="absolute top-1/2 flex items-center justify-center">
        <Spinner variant={'primary'} size={50} />
      </div>
    </div>
  )
}

export default LoadingPage
