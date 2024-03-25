import React from 'react'
import H2 from '@utils/typography/h2/h2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import useScreenSize from '@hooks/useScreenSize'
import { useGetChronology } from '@data-provider/query'
import { useCurrentTicket } from '@redux/hooks'
import Spinner from '@components/Spinner/Spinner'
import NotificationBadge from '@components/NotificationBadge/NotificationBadge'

const Chronology: React.FC = () => {
  const screen = useScreenSize()
  const currentTicket = useCurrentTicket()

  const { data, isLoading, error } = useGetChronology(currentTicket?.id)

  data?.forEach((event) => {
    event.date = new Date(event.date)
  })

  data?.sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="flex flex-col gap-3 h-full text-white w-full">
      <H2 className="font-bold text-lg flex">Chronology</H2>
      {(isLoading || error) && (
        <div className="h-full flex items-center justify-center">
          {isLoading && <Spinner variant="primary" size={50} />}
          {error && (
            <NotificationBadge variant="error" className="w-fit items-center">
              We had a problem loading the chronology, please try again later.
            </NotificationBadge>
          )}
        </div>
      )}
      {data && (
        <div className="flex flex-col pr-6 min-h-full">
          {data?.map((event, index) => (
            <div
              key={index}
              className={`flex min-h-fit z-20 ${data.length === index + 1 ? 'h-full overflow-hidden' : ''}`}
            >
              <div
                className={`flex w-[1px] h-full rounded-full ${event.isBlocker ? 'bg-error-500' : 'bg-primary-400'} relative left-[73px] top-4 z-10`}
              ></div>
              <div className="flex gap-3 items-start py-2 w-full">
                <div className="flex flex-col items-end">
                  <HelperText className="min-w-14 pt-[2px] flex flex-col items-end">
                    {new Date(event.date).getDate() !==
                      new Date(data[index - 1]?.date).getDate() &&
                      event.date.getDate().toLocaleString('en-US', {
                        minimumIntegerDigits: 2
                      }) +
                        '/' +
                        (event.date.getMonth() + 1).toLocaleString('en-US', {
                          minimumIntegerDigits: 2
                        }) +
                        '/' +
                        event.date.getFullYear().toString().slice(-2)}
                  </HelperText>
                  <HelperText
                    className={`${screen.width < 1000 ? 'block' : 'hidden'}`}
                  >
                    {event.date.getHours().toString().padStart(2, '0') +
                      ':' +
                      event.date.getMinutes().toString().padStart(2, '0') +
                      'hs'}
                  </HelperText>
                </div>
                <span
                  className={`flex min-w-[9px] h-[9px] rounded-full mt-1 ${event.isBlocker ? 'bg-error-500' : 'bg-primary-400'} `}
                ></span>
                <div className="flex flex-col gap-2  w-full">
                  <div className={`min-w-12 flex items-start gap-3`}>
                    <div className="flex mt-[1px]">
                      <HelperText
                        className={`px-1 ${screen.width > 1000 ? 'block' : 'hidden'}`}
                      >
                        {event.date.getHours().toString().padStart(2, '0') +
                          ':' +
                          event.date.getMinutes().toString().padStart(2, '0') +
                          'hs'}
                      </HelperText>
                    </div>
                    <div className="flex flex-wrap">
                      <Body2 className="min-w-fit text-sm">
                        {event.message}
                      </Body2>
                    </div>
                  </div>
                  {event.comment && event.comment !== '' && (
                    <div className="flex gap-2 pl-0 lg:pl-7 w-full flex-nowrap">
                      {screen.width > 1000 && (
                        <div className="min-w-7 min-h-7">
                          <ProfilePicture
                            userName={currentTicket?.assignee?.name || ''}
                            size="sm"
                            img={currentTicket?.assignee?.profileUrl || ''}
                            className="min-w-7 min-h-7"
                          />
                        </div>
                      )}
                      <div className="bg-gray-400 p-3 rounded-xl flex flex-col gap-1 w-full">
                        <Body2 className="font-semibold text-sm">
                          {currentTicket?.assignee?.name}
                        </Body2>
                        <Body1 className="min-w-fit w-full flex text-sm">
                          &quot;{event.comment}&quot;
                        </Body1>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Chronology
