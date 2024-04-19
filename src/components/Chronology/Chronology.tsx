import React from 'react'
import H2 from '@utils/typography/h2/h2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import useScreenSize from '@hooks/useScreenSize'
import { useCurrentTicket } from '@redux/hooks'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { type IssueChronologyEventDTO } from '@utils/types'
import { handleAddOrSubstractTime } from './TimeAddRemoveHandler'

interface ChronologyProps {
  isLoading: boolean
  events: IssueChronologyEventDTO[]
}

const Chronology: React.FC<ChronologyProps> = ({ events, isLoading }) => {
  const screen = useScreenSize()
  const currentTicket = useCurrentTicket()

  return (
    <div className="flex flex-col gap-3 h-full text-white w-full max-h-full">
      {isLoading && (
        <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
          <Skeleton width={150} height={20} containerClassName="h-[20px]" />
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex p-2 pl-4 items-center">
              <Skeleton
                width={Math.random() * 130 + (screen.width > 500 ? 200 : 50)}
                height={26}
                containerClassName="h-[20px]"
              />
            </div>
          ))}
        </SkeletonTheme>
      )}
      {events?.length !== 0 && !isLoading && (
        <>
          <H2 className="font-bold text-lg flex">Chronology</H2>
          <div className="flex flex-col pr-6 h-full">
            {events?.map((event, index) => (
              <div
                key={index}
                className={`flex min-h-fit z-20 ${events.length === index + 1 ? 'h-full overflow-hidden' : ''} ${index === events.length - 1 ? 'min-h-[60px]' : ''}`}
              >
                <div
                  className={`flex w-[1px] h-full rounded-full ${event.isBlocker ? 'bg-error-500' : 'bg-primary-400'} relative left-[73px] top-4 z-10`}
                />
                <div className="flex gap-3 items-start py-2 w-full">
                  <div className="flex flex-col items-end">
                    <HelperText className="min-w-14 pt-[2px] flex flex-col items-end">
                      {new Date(event.date).getDate() !==
                        new Date(events[index - 1]?.date).getDate() &&
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
                  />
                  <div className="flex flex-col gap-2  w-full">
                    <div className={`min-w-12 flex items-start gap-3`}>
                      <div className="flex mt-[1px]">
                        <HelperText
                          className={`px-1 ${screen.width > 1000 ? 'block' : 'hidden'}`}
                        >
                          {event.date.getHours().toString().padStart(2, '0') +
                            ':' +
                            event.date
                              .getMinutes()
                              .toString()
                              .padStart(2, '0') +
                            'hs'}
                        </HelperText>
                      </div>
                      <div className="flex flex-wrap">
                        <Body2 className="min-w-fit text-sm">
                          {event.message
                            ? event.message
                            : handleAddOrSubstractTime(event)}
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
        </>
      )}
    </div>
  )
}

export default Chronology
