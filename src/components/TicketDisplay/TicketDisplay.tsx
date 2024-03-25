import PriorityIcon from '@components/PriorityIcon/PriorityIcon'
import React, { useEffect, useRef, useState } from 'react'
import StoryPointsIcon from '@components/StoryPointsIcon/StoryPointsIcon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import { Pill } from '@components/Pill/Pill'
import { Priority, type IssueView } from '@utils/types'
import Subtitle from '@utils/typography/subtitle/subtitle'
import FormattedText from '@components/FormattedText/FormattedText'

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

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.offsetHeight < textRef.current.scrollHeight + 10 ||
        textRef.current.offsetWidth < textRef.current.scrollWidth + 10
      setHasOverflow(isOverflowing)
    }
  }, [])

  useEffect(() => {
    setShowFullText(false)
  }, [issue])

  const toggleTextVisibility = (): void => {
    setShowFullText(!showFullText)
  }

  return (
    <div className={`w-fit flex flex-col font-inter gap-10 text-white`}>
      <div className="flex flex-col gap-4">
        <div className={`flex justify-start items-start`}>
          <Subtitle className="font-normal">[{issue.name}]</Subtitle>
        </div>

        {variant === 'Project Manager' && (
          <div className="flex gap-2 items-center">
            <ProfilePicture
              img={issue.assignee?.profileUrl ? issue.assignee.profileUrl : ''}
              size={'sm'}
            />
            <Subtitle className="font-normal">{issue.assignee?.name}</Subtitle>
          </div>
        )}

        <span className="text-[30px] font-bold font-inter">{issue.title}</span>
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <div
          className=" text-ellipsis overflow-hidden"
          ref={textRef}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: showFullText ? 'unset' : 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          <FormattedText text={issue.description} />
        </div>
        {issue.description && hasOverflow && !showFullText && (
          <button className="underline" onClick={toggleTextVisibility}>
            See more
          </button>
        )}
      </div>
    </div>
  )
}

export default TicketDisplay
