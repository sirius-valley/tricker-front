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
import { usePostTimerAction, usePostUnblock } from '@data-provider/query'
import ModalBlock from '@components/ModalBlock/ModalBlock'
import ModalUnblock from '@components/ModalUnblock/ModalUnblock'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import useScreenSize from '@hooks/useScreenSize'

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
  const [isBlocked, setIsBlocked] = useState<boolean>(blocked)
  const [modalVariant, setModalVariant] = useState<'add' | 'remove'>('add')
  const [showModalTime, setShowModalTime] = useState<boolean>(false)
  const [showModalBlock, setShowModalBlock] = useState<boolean>(false)
  const [showModalResume, setShowModalResume] = useState<boolean>(false)
  const [showModalUnblock, setShowModalUnblock] = useState<boolean>(false)

  const { showSnackBar } = useSnackBar()
  const screen = useScreenSize()

  const {
    mutate: mutateTimer,
    reset: resetTimer,
    // isPending: pendingTimer,
    isSuccess: successTimer,
    error: errorTimer
  } = usePostTimerAction()
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
      setShowModalTime(true)
    } else {
      mutateTimer({
        ticketId,
        date: new Date(),
        action: paused ? 'resume' : 'pause'
      })
    }
  }

  const handleModalResume = (): void => {
    mutateUnblock({ ticketId })
    mutateTimer({
      ticketId,
      date: new Date(),
      action: 'resume'
    })
    setShowModalTime(false)
  }

  const handleUnblock = (): void => {
    mutateUnblock({ ticketId })
    setShowModalUnblock(false)
  }

  useEffect(() => {
    if (successUnblock) {
      showSnackBar('The ticket is now Unblocked', 'success')
      setIsBlocked(false)
      resetUnblock()
    }
    if (successTimer) {
      setPaused(!paused)
      resetTimer()
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
  }, [successUnblock, successTimer, errorUnblock, errorTimer])

  return (
    <div className="w-full self-end h-32 bg-gray-500 xl:px-10 px-5 items-center lg:flex text-white hidden md:rounded-br-xl border-t border-white/10">
      <ModalResume
        onResume={() => {
          handleModalResume()
        }}
        onClose={() => {
          setShowModalResume(false)
        }}
        show={showModalResume}
      />
      <ModalUnblock
        onUnblock={() => {
          handleUnblock()
        }}
        onClose={() => {
          setShowModalUnblock(false)
        }}
        show={showModalUnblock}
      />
      <ModalModifyTime
        variant={modalVariant}
        show={showModalTime}
        onClose={() => {
          setShowModalTime(false)
        }}
      />
      <ModalBlock
        show={showModalBlock}
        onClose={() => {
          setShowModalBlock(false)
        }}
      />
      <div className="flex w-full justify-between gap-5">
        <div className="flex flex-col items-start gap-2">
          <Subtitle className="bg-clip-text text-transparent bg-gradient text-sm overflow-hidden max-h-[14px]">
            {ticketId}
          </Subtitle>
          <H1 className="xl:text-[32px] text-[26px]">
            {Math.floor(time / 3600000)
              .toString()
              .padStart(2, '0')}
            :{('0' + Math.floor((time / 60000) % 60)).slice(-2)}hs
          </H1>
        </div>
        <div className="flex w-fit xl:gap-4 gap-2 items-center justify-center">
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
              size={screen.width > 1280 ? 'lg' : 'sm'}
              variant={'default'}
              onClick={() => {
                setModalVariant('remove')
                setShowModalTime(true)
              }}
            />
          )}
          {!paused ? (
            <Tooltip content={'Stop the timer before adding time'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<AddTimeIcon />}
                size={screen.width > 1280 ? 'lg' : 'sm'}
                variant={'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<AddTimeIcon />}
              size={screen.width > 1280 ? 'lg' : 'sm'}
              variant={'default'}
              onClick={() => {
                setModalVariant('add')
                setShowModalTime(true)
              }}
            />
          )}
          {!paused ? (
            <Tooltip content={'Stop the timer before setting a blocker'}>
              <RoundedIconButton
                className="w-11 h-11"
                icon={<BlockedIcon />}
                size={screen.width > 1280 ? 'lg' : 'sm'}
                variant={'disabled'}
              />
            </Tooltip>
          ) : (
            <RoundedIconButton
              className="w-11 h-11"
              icon={<BlockedIcon />}
              size={screen.width > 1280 ? 'lg' : 'sm'}
              variant={isBlocked ? 'blocked' : 'default'}
              onClick={
                isBlocked
                  ? handleUnblock
                  : () => {
                      setShowModalBlock(true)
                    }
              }
            />
          )}
          <GradientRoundedButton
            size={screen.width > 1280 ? 'lg' : 'md'}
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
