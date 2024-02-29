import React from 'react'
import Button from '@components/Button/Button'

export interface RoleButtonProps {
  handleClick: () => void
  children: React.ReactNode
}
const RoleButton: React.FC<RoleButtonProps> = ({
  handleClick,
  children
}): JSX.Element => {
  return (
    <div className="bg-gray-600 rounded-lg w-fit">
      <Button
        variant="outline"
        className="w-full lg:w-[500px] h-[500px] text-white shadow-2 rounded-lg"
        onClick={handleClick}
      >
        <h1 className="font-semibold text-lg leading-[41px] text-[34px]">
          {children}
        </h1>
      </Button>
    </div>
  )
}

export default RoleButton
