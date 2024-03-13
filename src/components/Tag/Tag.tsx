import React from 'react'
import { DismissIcon } from '../Icon'
import Body2 from '@utils/typography/body2/body2'

export interface TagProps {
  className?: string
  name: string
  handleRemove: () => void
}

const Tag: React.FC<TagProps> = ({
  className,
  name,
  handleRemove,
  ...props
}) => {
  return (
    <div
      className={`bg-gray-400 rounded gap-2.5 w-fit h-[26px] px-2 py-1 flex items-center justify-between ${className}`}
      {...props}
    >
      <Body2 className="text-white text-sm">{name}</Body2>
      <div className="w-px h-[18px] bg-gray-600" />
      <button
        className="hover:bg-gray-300/30 rounded-sm"
        onClick={handleRemove}
      >
        <DismissIcon width="18px" height="18px" />
      </button>
    </div>
  )
}

export default Tag
