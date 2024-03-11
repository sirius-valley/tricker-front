import React from 'react'

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
      <button
        className="lg:w-[480px] max-h-[600px] md:h-[60vh] h-[56px] w-[329px] shadow-2 rounded-xl px-2 border border-primary-400 hover:bg-gray-400 text-white"
        onClick={handleClick}
      >
        <h1 className="font-medium md:font-semibold text-xl leading-[41px] md:text-[34px] ">
          {children}
        </h1>
      </button>
    </div>
  )
}

export default RoleButton
