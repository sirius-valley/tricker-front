import React from 'react'
import Button from '@components/Button/Button'

interface RoleButtonProps {
    handleClick : () => void
    children:React.ReactNode
}
const RoleButton:React.FC<RoleButtonProps> = ({handleClick, children}):JSX.Element => {
  return (
    <div className="bg-gray-600 rounded-lg">
      <Button
        variant="outline"
        className="w-[100%] lg:w-[500px] h-[500px] text-white shadow-2"
        onClick={handleClick}
      >
        <h1
          className="font-semibold text-lg leading-[41px] text-[34px]"
        >
          {children}
        </h1>
      </Button>
    </div>
  )
}

export default RoleButton
