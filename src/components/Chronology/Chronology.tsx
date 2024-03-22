import React from 'react'
import H2 from '@utils/typography/h2/h2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import useScreenSize from '@hooks/useScreenSize'
export interface ChronologyProps {
  events: Array<{
    date: Date
    blocker: boolean
    message: string
    time?: string
    description?: string
  }>
}

const Chronology: React.FC<ChronologyProps> = ({ events }) => {
  const screen = useScreenSize()
  events.sort((a, b) => a.date.getTime() - b.date.getTime())
  return (
    <div className="flex flex-col gap-3 h-[400px] text-white w-full">
      <H2 className="font-bold text-lg">Chronology</H2>
      <div className="flex flex-col pr-6 overflow-y-scroll h-full max-w-[700px]">
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex min-h-fit z-20 ${events.length === index + 1 ? 'h-full overflow-hidden' : ''}`}
          >
            <div
              className={`flex w-[1px] h-full rounded-full ${event.blocker ? 'bg-error-500' : 'bg-primary-400'} relative left-[73px] top-4 z-10`}
            ></div>
            <div className="flex gap-3 items-start py-2 w-full">
              <div className="flex flex-col items-end">
                <HelperText className="min-w-14 pt-[2px] flex flex-col items-end">
                  {event.date.getDate() !== events[index - 1]?.date.getDate() &&
                    event.date
                      .getDate()
                      .toLocaleString('en-US', { minimumIntegerDigits: 2 }) +
                      '/' +
                      (event.date.getMonth() + 1).toLocaleString('en-US', {
                        minimumIntegerDigits: 2
                      }) +
                      '/' +
                      event.date.getFullYear().toString().slice(-2)}
                </HelperText>
                <HelperText
                  className={`${screen.width < 420 ? 'block' : 'hidden'}`}
                >
                  {event.date.getHours().toString().padStart(2, '0') +
                    ':' +
                    event.date.getMinutes().toString().padStart(2, '0') +
                    'hs'}
                </HelperText>
              </div>
              <span
                className={`flex min-w-[9px] h-[9px] rounded-full mt-1 ${event.blocker ? 'bg-error-500' : 'bg-primary-400'} `}
              ></span>
              <div className="flex flex-col gap-2  w-full">
                <div className={`min-w-12 flex gap-3`}>
                  <HelperText
                    className={`px-1 ${screen.width > 420 ? 'block' : 'hidden'}`}
                  >
                    {event.date.getHours().toString().padStart(2, '0') +
                      ':' +
                      event.date.getMinutes().toString().padStart(2, '0') +
                      'hs'}
                  </HelperText>
                  <Body2 className="min-w-fit flex text-sm">
                    {event.message}
                  </Body2>
                </div>
                {event.description && (
                  <div className="flex gap-2 pl-0 sm:pl-7 w-fit flex-nowrap">
                    <div className="min-w-7 min-h-7">
                      <ProfilePicture
                        size="sm"
                        img="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA?rs=1&pid=ImgDetMain"
                        className="min-w-7 min-h-7"
                      />
                    </div>
                    <div className="bg-gray-400 p-3 rounded-xl flex flex-col gap-1 w-full">
                      <Body2 className="font-semibold text-sm">User Name</Body2>
                      <Body1 className="min-w-fit flex text-sm">
                        &quot;{event.description}&quot;
                      </Body1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chronology
