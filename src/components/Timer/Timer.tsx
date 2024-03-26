import { GradientRoundedButton } from '@components/GradientRoundedButton/GradientRoundedButton'
import Icon from '@components/Icon/Icon'
import H1 from '@utils/typography/h1/h1'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React, { useEffect, useState, useCallback } from 'react'
import { RoundedIconButton } from '@components/RoundedIconButton/RoundedIconButton'
import { BlockedIcon, AddTimeIcon, SubstractTimeIcon } from '@components/Icon'
import { Tooltip } from '@components/Tooltip/Tooltip'
import ModalResume from '@components/ModalResumeTracking/ModalResumeTracking'
import ModalModifyTime from '@components/ModalModifyTime/ModalModifyTime'
import {
  usePostTimerAction,
  usePostUnblock,
  useGetTicketElapsedTime
} from '@data-provider/query'
import ModalBlock from '@components/ModalBlock/ModalBlock'
import ModalUnblock from '@components/ModalUnblock/ModalUnblock'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface TimerProps {
  ticketId: string
  blocked?: boolean
  handleElapsedTime?: (elapsedTime: number) => void
}

const Timer: React.FC<TimerProps> = ({
  ticketId,
  blocked = false,
  handleElapsedTime
}): JSX.Element => {
  const {
    data: elapsedTime,
    isLoading,
    error: errorElapsedTime
  } = useGetTicketElapsedTime(ticketId)

  const [paused, setPaused] = useState<boolean>(true)
  const [time, setTime] = useState<number>(elapsedTime || 0)
  const [isBlocked, setIsBlocked] = useState<boolean>(blocked)
  const [modalVariant, setModalVariant] = useState<'add' | 'remove'>('add')
  const [showModalTime, setShowModalTime] = useState<boolean>(false)
  const [showModalBlock, setShowModalBlock] = useState<boolean>(false)
  const [showModalResume, setShowModalResume] = useState<boolean>(false)
  const [showModalUnblock, setShowModalUnblock] = useState<boolean>(false)

  const { showSnackBar } = useSnackBar()

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

  const memoizedShowSnackBar = useCallback(showSnackBar, [])

  useEffect(() => {
    if (errorElapsedTime) {
      memoizedShowSnackBar(
        'An error occurred while fetching the ticket time',
        'error'
      )
    }
  }, [errorElapsedTime, memoizedShowSnackBar])

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
    <div className="w-full self-end h-32 md:bg-gray-500  bg-gray-700 xl:px-10 py-4 px-5 items-center flex text-white md:rounded-br-xl border-t border-white/10">
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
          {isLoading && (
            <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
              <Skeleton height={32} width={130} />
            </SkeletonTheme>
          )}
          {!isLoading && (
            <H1 className="xl:text-[32px] text-[26px]">
              {Math.floor(time / 3600000)
                .toString()
                .padStart(2, '0')}
              :{('0' + Math.floor((time / 60000) % 60)).slice(-2)}hs
            </H1>
          )}
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
                setShowModalTime(true)
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
                setShowModalTime(true)
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
            size="lg"
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
