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
    <div className="bg-gray-600 rounded-xl w-full">
      <Button
        variant="outline"
        className="w-full lg:w-[480px] h-[56px] md:h-[425px] text-white shadow-2 px-2 xl:max-h-max"
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
