import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import React, { useEffect, useRef, useState } from 'react'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import { Pill } from '@components/Pill/Pill'
import { type IssueDetail, Priority } from '@utils/types'
import Subtitle from '@utils/typography/subtitle/subtitle'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export interface TicketDisplayProps {
  issue?: IssueDetail
  isLoading: boolean
  variant: 'Developer' | 'Project Manager'
}
const TicketDisplay: React.FC<TicketDisplayProps> = ({
  issue,
  isLoading = true,
  variant
}): JSX.Element => {
  const [showFullText, setShowFullText] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)

  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowFullText(false)
    if (textRef.current) {
      const isOverflowing =
        textRef.current.offsetHeight < textRef.current.scrollHeight + 10 ||
        textRef.current.offsetWidth < textRef.current.scrollWidth + 10
      setHasOverflow(isOverflowing)
    }
  }, [issue])

  const toggleTextVisibility = (): void => {
    setShowFullText(!showFullText)
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-6">
        {isLoading && !issue && (
          <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
            <Skeleton height={18} containerClassName="h-[18px] w-[70px]" />
            <Skeleton height={40} containerClassName={`h-[40px] w-full`} />
            <Skeleton height={26} containerClassName="h-[26px] w-[130px]" />
            <Skeleton height={100} containerClassName="h-[100px] w-full" />
          </SkeletonTheme>
        )}
      </div>
      <div className={`w-full flex flex-col font-inter gap-10 text-white`}>
        {issue && (
          <>
            <div className="flex flex-col gap-4">
              <div className={`flex justify-start items-start`}>
                <Subtitle className="font-normal">[{issue.name}]</Subtitle>
              </div>

              {variant === 'Project Manager' && (
                <div className="flex gap-2 items-center">
                  <ProfilePicture
                    userName={issue.assignee?.name || ''}
                    img={
                      issue.assignee?.profileUrl
                        ? issue.assignee.profileUrl
                        : ''
                    }
                    size={'sm'}
                  />
                  <Subtitle className="font-normal">
                    {issue.assignee?.name}
                  </Subtitle>
                </div>
              )}

              <span className="text-[30px] font-bold font-inter">
                {issue.title}
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
                    {issue?.storyPoints && (
                      <StoryPointsIcon
                        className="w-[26px] h-[26px]"
                        points={issue.storyPoints}
                      />
                    )}
                    {issue.labels.map((label) => (
                      <Pill key={label.id} variant="label">
                        {label.name}
                      </Pill>
                    ))}
                    {issue.isBlocked && <Pill variant="blocked">Blocked</Pill>}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <div
                className="text-ellipsis overflow-hidden w-full"
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
                  {issue.description}
                </Markdown>
              </div>
              {issue.description && hasOverflow && !showFullText && (
                <button
                  className="underline text-gray-300/70 hover:text-gray-300 active:text"
                  onClick={toggleTextVisibility}
                >
                  See more
                </button>
              )}
              {issue.description && showFullText && (
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
