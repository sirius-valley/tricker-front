import { GradientRoundedButton } from '@components/GradientRoundedButton/GradientRoundedButton'
import Icon from '@components/Icon/Icon'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

export interface TimeTrackingBadgeProps {
  ticketId: string
}

const TimeTrackingBadge: React.FC<TimeTrackingBadgeProps> = ({
  ticketId
}): JSX.Element => {
  const [paused, setPaused] = React.useState<boolean>(true)
  return (
    <div className="flex jusify-between items-center">
      <div className="flex flex-col">
        <Subtitle className="text-xs leading-[14.52px] text-gradient">
          {ticketId}
        </Subtitle>
      </div>

      <GradientRoundedButton
        icon={
          <Icon name={paused ? 'PlayIcon' : 'StopIcon'} fillColor="black" />
        }
        size="lg"
        onClick={() => {
          setPaused(!paused)
        }}
      />
    </div>
  )
}

export default TimeTrackingBadge
