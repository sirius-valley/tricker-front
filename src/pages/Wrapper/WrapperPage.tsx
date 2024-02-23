import React from 'react'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'

interface WrapperProps {
  children: React.ReactNode
}

const WrapperPage: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col justify-center items-center">
      <div className="hidden md:flex flex-col items-center justify-center mt-8 mb-8">
        <TrickerLogo width="47px" height="47px" />
        <div className="mt-2">
          <TrickerTitle width="157px"/>
        </div>
      </div>
      <div className="w-full h-full flex-1 flex items-center justify-center">
        <div className="mx-8 my-8">
            {children}
        </div>
      </div>
    </div>
  )
}

export default WrapperPage
