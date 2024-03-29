import React from 'react'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import NoTicketSvg from '../../assets/NoTicket.svg'
import useScreenSize from '@hooks/useScreenSize'

interface NoTicketMessageProps {
  title?: string
  subtitle?: string
}

const NoTicketMessage: React.FC<NoTicketMessageProps> = ({
  title = 'No assigned tasks',
  subtitle = "Once you get one, it'll pop up here."
}: NoTicketMessageProps): JSX.Element => {
  const screen = useScreenSize()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 text-white">
      <div className="flex flex-col gap-1">
        <img src={NoTicketSvg} alt="My SVG" />
        {screen.width >= 768 && (
          <>
            <img src={NoTicketSvg} alt="My SVG" />
            <img src={NoTicketSvg} alt="My SVG" />
          </>
        )}
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-1">
        <Body2>{title}</Body2>
        <Body1>{subtitle}</Body1>
      </div>
    </div>
  )
}

export default NoTicketMessage
