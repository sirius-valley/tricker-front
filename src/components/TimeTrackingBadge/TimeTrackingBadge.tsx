import { GradientRoundedButton } from '@components/GradientRoundedButton/GradientRoundedButton'
import Icon from '@components/Icon/Icon'
import Body2 from '@utils/typography/body2/body2'
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
    <div className=' bg-gradient rounded-xl w-fit p-px'>
      <div className="flex justify-between w-[206.7px] rounded-xl items-center p-4 bg-gray-500">
        <div className="flex flex-col bg-gray-500 gap-[4.95px]">
          <Subtitle className="text-xs leading-[14.52px] bg-gradient text-transparent bg-clip-text">
            {ticketId}
          </Subtitle>
          <Body2 className='leading-[19.36px] text-white'>
            01:00hs
          </Body2>
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
    </div>
  )
}

export default TimeTrackingBadge
