import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import React, { useEffect, useRef, useState } from 'react'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import { Pill } from '@components/Pill/Pill'
import { Priority, type IssueView } from '@utils/types'
import Subtitle from '@utils/typography/subtitle/subtitle'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useGetIssueById } from '@data-provider/query'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export interface TicketDisplayProps {
  issue: IssueView
  variant: 'Developer' | 'Project Manager'
}
const TicketDisplay: React.FC<TicketDisplayProps> = ({
  issue,
  variant
}): JSX.Element => {
  const [showFullText, setShowFullText] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)

  const textRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, error } = useGetIssueById(issue.id)

  useEffect(() => {
    setShowFullText(false)
    if (textRef.current) {
      const isOverflowing =
        textRef.current.offsetHeight < textRef.current.scrollHeight + 10 ||
        textRef.current.offsetWidth < textRef.current.scrollWidth + 10
      setHasOverflow(isOverflowing)
    }
  }, [data])

  const toggleTextVisibility = (): void => {
    setShowFullText(!showFullText)
  }

  return (
    <div className="w-fit">
      <div className="w-full flex flex-col gap-4">
        {isLoading && !error && !data && (
          <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
            <Skeleton
              width={70}
              height={20}
              containerClassName="h-[20px] w-full"
            />
            <Skeleton height={40} containerClassName="h-[40px] w-full" />
            <Skeleton
              width={120}
              height={30}
              containerClassName="h-[30px] w-full"
            />
            <Skeleton height={70} containerClassName="h-[70px] w-full" />
          </SkeletonTheme>
        )}
      </div>
      <div className={`w-fit flex flex-col font-inter gap-10 text-white`}>
        {data && (
          <>
            <div className="flex flex-col gap-4">
              <div className={`flex justify-start items-start`}>
                <Subtitle className="font-normal">[{data.name}]</Subtitle>
              </div>

              {variant === 'Project Manager' && (
                <div className="flex gap-2 items-center">
                  <ProfilePicture
                    userName={data.assignee?.name || ''}
                    img={
                      data.assignee?.profileUrl ? data.assignee.profileUrl : ''
                    }
                    size={'sm'}
                  />
                  <Subtitle className="font-normal">
                    {data.assignee?.name}
                  </Subtitle>
                </div>
              )}

              <span className="text-[30px] font-bold font-inter">
                {data.title}
              </span>
              <div className="flex justify-between items-center w-full">
                <div className="flex w-fit gap-4">
                  <div className="flex gap-1 items-center">
                    <PriorityIcon
                      className="w-[26px] h-[26px]"
                      variant={
                        issue.priority !== undefined
                          ? Priority[
                              issue.priority as unknown as keyof typeof Priority
                            ]
                          : Priority.NO_PRIORITY
                      }
                    />
                    {data?.storyPoints && (
                      <StoryPointsIcon
                        className="w-[26px] h-[26px]"
                        points={data.storyPoints}
                      />
                    )}
                    {data.labels.map((label) => (
                      <Pill key={label.id} variant="label">
                        {label.name}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div
                className=" text-ellipsis overflow-hidden "
                ref={textRef}
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: showFullText ? 'unset' : 3,
                  WebkitBoxOrient: 'vertical',
                  maxHeight: showFullText ? 'unset' : '72px',
                  textOverflow: 'ellipsis'
                }}
              >
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {data.description}
                </Markdown>
              </div>
              {data.description && hasOverflow && !showFullText && (
                <button
                  className="underline text-gray-300/70 hover:text-gray-300 active:text"
                  onClick={toggleTextVisibility}
                >
                  See more
                </button>
              )}
              {data.description && showFullText && (
                <button
                  className="underline text-gray-300/70 hover:text-gray-300 active:text"
                  onClick={toggleTextVisibility}
                >
                  <p>See less</p>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TicketDisplay
