import CategoryIcon from '@components/CategoryIcon/CategoryIcon'
// import { Pill } from "@components/Pill/Pill";
import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import React from 'react'
// import config from "../../../tailwind.config";
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'

export interface TicketDisplayProps {
  ticketId: string
  title?: string
  category?: 'feature' | 'improvement' | 'bug'
  priority?:
    | 'no-priority'
    | 'low-priority'
    | 'medium-priority'
    | 'high-priority'
    | 'urgent'
  storyPoints: number
  associatedUserProfile: string
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({
  ticketId,
  title,
  category,
  priority,
  storyPoints,
  associatedUserProfile
}): JSX.Element => {
  return (
    <div
      className={`w-[648px] h-[210px] gap-10 bg-transparent border border-white`}
    >
      <div className={`flex justify-start items-start`}>
        <span className={`flex flex-col text-left text-white text-[16px] mb-3`}>
          [{ticketId}]
        </span>
      </div>

      <div className="flex">
        <ProfilePicture img={associatedUserProfile} size={'sm'} />
        <span className="text-white">Member name</span>
      </div>

      <span className="text-white text-[30px] font-medium">{title}</span>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center w-fit gap-4">
          <div className="flex gap-1 mt-3 mb-3">
            {priority && <PriorityIcon fillColor="white" variant={priority} />}
            {category && <CategoryIcon fillColor="white" variant={category} />}
            {category && (
              <StoryPointsIcon fillColor="white" points={storyPoints} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non asperiores
        ducimus consequatur minus architecto consequuntur quam adipisci amet
        aspernatur necessitatibus voluptatum vel accusamus, minima soluta eaque
        aut debitis beatae nesciunt!
      </div>
    </div>
  )
}

export default TicketDisplay
