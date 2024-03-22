import { GradientRoundedButton } from '@components/GradientRoundedButton/GradientRoundedButton'
import Icon from '@components/Icon/Icon'
import H1 from '@utils/typography/h1/h1'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React, { useEffect, useState } from 'react'
import { RoundedIconButton } from '@components/RoundedIconButton/RoundedIconButton'
import { BlockedIcon, AddTimeIcon, SubstractTimeIcon } from '@components/Icon'
import { Tooltip } from '@components/Tooltip/Tooltip'
import ModalResume from '@components/ModalResumeTracking/ModalResumeTracking'
import ModalModifyTime from '@components/ModalModifyTime/ModalModifyTime'
import {
  usePostTimerAction,
  usePostBlock,
  usePostUnblock
} from '@data-provider/query'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'

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
  const [paused, setPaused] = useState<boolean>(true)
  const [time, setTime] = useState<number>(elapsedTime)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isBlocked, setIsBlocked] = useState<boolean>(blocked)
  const [modalVariant, setModalVariant] = useState<'add' | 'remove'>('add')
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false)
  const { showSnackBar } = useSnackBar()

  const {
    mutate: mutateTimer,
    reset: resetTimer,
    // isPending: pendingTimer,
    isSuccess: successTimer,
    error: errorTimer
  } = usePostTimerAction()
  const {
    mutate: mutateBlock,
    reset: resetBlock,
    // isPending: pendingBlock,
    isSuccess: successBlock,
    error: errorBlock
  } = usePostBlock()
  const {
    mutate: mutateUnblock,
    reset: resetUnblock,
    // isPending: pendingUnblock,
    isSuccess: successUnblock,
    error: errorUnblock
  } = usePostUnblock()

  useEffect(() => {
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
      mutateTimer({
        ticketId,
        date: new Date(),
        action: paused ? 'resume' : 'pause'
      })
    }
  }

  const handleModalResume = (): void => {
    mutateTimer({
      ticketId,
      date: new Date(),
      action: 'resume'
    })
    mutateUnblock({ ticketId })
    setShowModal(false)
  }

  const handleUnblock = (): void => {
    mutateUnblock({ ticketId })
  }

  const handleBlock = (): void => {
    mutateBlock({
      ticketId,
      reason: 'Blocked by user',
      comment: 'Blocked by user'
    })
  }

  useEffect(() => {
    if (successBlock) {
      setIsBlocked(true)
      resetBlock()
    }
    if (successUnblock) {
      setIsBlocked(false)
      resetUnblock()
    }
    if (successTimer) {
      setPaused(!paused)
      resetTimer()
    }
    if (errorBlock) {
      showSnackBar('An error occurred while blocking the ticket', 'error')
      resetBlock()
    }
    if (errorUnblock) {
      showSnackBar('An error occurred while unblocking the ticket', 'error')
      resetUnblock()
    }
    if (errorTimer) {
      showSnackBar('An error occurred with the ticket', 'error')
      resetTimer()
      resetUnblock()
    }
  }, [
    successUnblock,
    successBlock,
    successTimer,
    errorUnblock,
    errorTimer,
    errorBlock
  ])

  return (
    <div className="w-full self-end h-32 bg-gray-500 px-10 items-center lg:flex text-white hidden md:rounded-br-xl border-t border-white/10">
      <ModalResume
        onResume={() => {
          handleModalResume()
        }}
        onClose={() => {
          setShowModal(false)
        }}
        show={showModal}
      />
      <ModalModifyTime
        variant={modalVariant}
        show={showTimeModal}
        onClose={() => {
          setShowTimeModal(false)
        }}
      />
      <div className="flex w-full justify-between gap-5">
        <div className="flex flex-col items-start gap-2">
          <Subtitle className="bg-clip-text text-transparent bg-gradient text-sm overflow-hidden max-h-[14px]">
            {ticketId}
          </Subtitle>
          <H1 className="md:text-[32px] text-[26px]">
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
                variant={'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<SubstractTimeIcon />}
              size="lg"
              variant={'default'}
              onClick={() => {
                setModalVariant('remove')
                setShowTimeModal(true)
              }}
            />
          )}
          {!paused ? (
            <Tooltip content={'Stop the timer before adding time'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<AddTimeIcon />}
                size="lg"
                variant={'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<AddTimeIcon />}
              size="lg"
              variant={'default'}
              onClick={() => {
                setModalVariant('add')
                setShowTimeModal(true)
              }}
            />
          )}
          {!paused ? (
            <Tooltip content={'Stop the timer before setting a blocker'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<BlockedIcon />}
                size="lg"
                variant={'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<BlockedIcon />}
              size="lg"
              variant={isBlocked ? 'blocked' : 'default'}
              onClick={isBlocked ? handleUnblock : handleBlock}
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
