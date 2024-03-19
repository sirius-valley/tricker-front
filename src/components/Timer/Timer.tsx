import { GradientRoundedButton } from '@components/GradientRoundedButton/GradientRoundedButton'
import Icon from '@components/Icon/Icon'
import H1 from '@utils/typography/h1/h1'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'
import { RoundedIconButton } from '@components/RoundedIconButton/RoundedIconButton'
import { BlockedIcon, AddTimeIcon, SubstractTimeIcon } from '@components/Icon'
import { Tooltip } from '@components/Tooltip/Tooltip'
import ModalResume from '@components/ModalResumeTracking/ModalResumeTracking'

export interface TimerProps {
  ticketId: string
  blocked?: boolean
  elapsedTime?: number
  handleElapsedTime?: (elapsedTime: number) => void
}

const Timer: React.FC<TimerProps> = ({
  ticketId,
  blocked = false,
  elapsedTime = 0,
  handleElapsedTime
}): JSX.Element => {
  const [paused, setPaused] = React.useState<boolean>(true)
  const [time, setTime] = React.useState<number>(elapsedTime)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isBlocked, setIsBlocked] = React.useState<boolean>(blocked)

  React.useEffect(() => {
    window.onbeforeunload = function (e) {
      return e
    }

    let interval: string | number | NodeJS.Timeout | undefined
    if (!paused)
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    else {
      clearInterval(interval)
      handleElapsedTime && handleElapsedTime(time)
    }
    return () => {
      clearInterval(interval)
    }
  })

  const handleTrackingButton = (): void => {
    if (paused && isBlocked) {
      setShowModal(true)
    } else {
      setPaused(!paused)
    }
  }

  const handleUnblock = (): void => {
    // TODO: Implement request to unblock ticket
    setIsBlocked(false)
  }

  return (
    <div className="w-[729] h-32 bg-gray-500 py-10 px-8 flex text-white">
      <ModalResume
        onResume={() => {
          console.log('resuming')
          setPaused(false)
          setShowModal(false)
          handleUnblock()
        }}
        onClose={() => {
          setShowModal(false)
        }}
        show={showModal}
      />
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start gap-2">
          <Subtitle className="bg-clip-text text-transparent bg-gradient text-sm">
            {ticketId}
          </Subtitle>
          <H1 className="text-[32px]">
            {Math.floor(time / 3600000)
              .toString()
              .padStart(2, '0')}
            :{('0' + Math.floor((time / 60000) % 60)).slice(-2)}hs
          </H1>
        </div>
        <div className="flex w-fit gap-4 items-center justify-center">
          {!paused ? (
            <Tooltip content={'Stop the timer before substracting time'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<SubstractTimeIcon />}
                size="lg"
                variant={paused ? 'default' : 'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<SubstractTimeIcon />}
              size="lg"
              variant={paused ? 'default' : 'disabled'}
            />
          )}
          {!paused ? (
            <Tooltip content={'Stop the timer before adding time'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<AddTimeIcon />}
                size="lg"
                variant={paused ? 'default' : 'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<AddTimeIcon />}
              size="lg"
              variant={paused ? 'default' : 'disabled'}
            />
          )}
          {!paused ? (
            <Tooltip content={'Stop the timer before setting a blocker'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<BlockedIcon />}
                size="lg"
                variant={paused ? 'default' : 'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<BlockedIcon />}
              size="lg"
              variant={!paused ? 'disabled' : isBlocked ? 'blocked' : 'default'}
            />
          )}
          <GradientRoundedButton
            icon={
              <Icon name={paused ? 'PlayIcon' : 'StopIcon'} fillColor="black" />
            }
            onClick={() => {
              handleTrackingButton()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Timer
