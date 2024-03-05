import React from 'react'
import Spinner from '@components/Spinner/Spinner'

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {
        <div className="flex items-center justify-center w-full h-full">
          <Spinner variant={'primary'} size={50} />
        </div>
      }
    </div>
  )
}

export default LoadingPage
