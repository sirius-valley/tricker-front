import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import React, { useState } from 'react'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import { Pill } from '@components/Pill/Pill'
export interface TicketDisplayProps {
  ticketId: string
  title?: string
  variant: 'pm' | 'dev'
  priority?:
    | 'no-priority'
    | 'low-priority'
    | 'medium-priority'
    | 'high-priority'
    | 'urgent'
  storyPoints: number
  pill?: 'label' | 'tracking' | 'blocked'
  description: string
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({
  ticketId,
  title,
  variant,
  priority,
  storyPoints,
  pill,
  description
}): JSX.Element => {
  const [showFullText, setShowFullText] = useState(false)

  const toggleTextVisibility = (): void => {
    setShowFullText(!showFullText)
  }

  return (
    <div
      className={`w-[648px] gap-10 bg-transparent border border-white relative`}
    >
      <div className={`flex justify-start items-start`}>
        <span className={`flex flex-col text-left text-white text-[16px] mb-3`}>
          [{ticketId}]
        </span>
      </div>

      {variant === 'pm' && (
        <div className="flex">
          <ProfilePicture
            img="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain"
            size={'sm'}
          />
          <span className="text-white">Member Name</span>
        </div>
      )}

      <span className="text-white text-[30px] font-medium">{title}</span>
      <div className="flex justify-between items-center w-full">
        <div className="flex w-fit gap-4">
          <div className="flex gap-1 mt-3 mb-3 items-center">
            {priority && <PriorityIcon fillColor="white" variant={priority} />}
            {storyPoints && (
              <StoryPointsIcon fillColor="white" points={storyPoints} />
            )}
            {pill && <Pill variant={pill}>{'Tracking'}</Pill>}
          </div>
        </div>
      </div>
      <div className="mt-3 text-white">
        {description}{' '}
        {showFullText ? (
          <>
            {description}{' '}
            <button
              className="text-primary-400 bg-transparent border-none cursor-pointer"
              onClick={toggleTextVisibility}
            >
              ...Ver menos (-)
            </button>
          </>
        ) : (
          <button
            className="text-primary-400 bg-transparent border-none cursor-pointer"
            onClick={toggleTextVisibility}
          >
            ...Ver más (+)
          </button>
        )}
      </div>
    </div>
  )
}

export default TicketDisplay
