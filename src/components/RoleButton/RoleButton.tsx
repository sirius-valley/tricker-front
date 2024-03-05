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
    <div className="bg-gray-600 rounded-xl">
      <Button
        variant="outline"
        className="lg:w-[480px] max-h-[600px] md:h-[60vh] h-[56px] w-[329px] text-white shadow-2 px-2"
        onClick={handleClick}
      >
        <h1 className="font-medium md:font-semibold text-xl leading-[41px] md:text-[34px] ">
          {children}
        </h1>
      </Button>
    </div>
  )
}

export default RoleButton
