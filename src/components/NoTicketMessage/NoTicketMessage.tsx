import { Fragment } from 'react'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import NoTicketSvg from '../../assets/NoTicket.svg'
import useScreenSize from '@hooks/useScreenSize'
import { type Screen } from '@utils/types'

const NoTicketMessage: React.FC = (): JSX.Element => {
  const screen: Screen = useScreenSize()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4 text-white">
      <div className="flex flex-col gap-1">
        <img src={NoTicketSvg} className="h-[42px] md:h-[29px]" alt="My SVG" />
        {screen.width >= 768 && (
          <Fragment>
            <img src={NoTicketSvg} alt="My SVG" />
            <img src={NoTicketSvg} alt="My SVG" />
          </Fragment>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <Body2>No assigned tasks</Body2>
        <Body1>Once you get one, it&apos;ll pop up here.</Body1>
      </div>
    </div>
  )
}

export default NoTicketMessage
