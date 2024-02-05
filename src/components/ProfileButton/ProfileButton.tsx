import React from 'react'

interface ProfileButtonProps {
  className?: string
  img: string
  onClick?: () => void
}

export const ProfileButton: React.FC<ProfileButtonProps> = ({
  className = '',
  img,
  onClick
}) => {
  return (
    <button onClick={onClick}>
      <img
        src={img}
        alt="User's profile picture"
        className={`bg-gradient p-0.5 rounded-[40px] cursor-pointer w-10 h-10 object-cover ${className}`}
      />
    </button>
  )
}
