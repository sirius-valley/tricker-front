import React from 'react'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'

interface WrapperProps {
  children: React.ReactNode
}

const WrapperPage: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col items-center">
      <div className="hidden md:flex flex-col items-center justify-center pt-5 mb-5">
        <TrickerLogo width="35px" height="35px" />
        <div className="mt-2">
          <TrickerTitle width="130px" />
        </div>
      </div>
      <div className="w-full h-full flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default WrapperPage
