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
import useScreenSize from '@hooks/useScreenSize'
import { useAppDispatch, useCurrentTicket } from '@redux/hooks'
import {
  setCurrentTicket,
  setCurrentTrackingTicket,
  setHasToRefetch
} from '@redux/user'

export interface TimerProps {
  ticketId: string
  ticketName: string
  blocked?: boolean
  handleElapsedTime?: (elapsedTime: number) => void
}

const Timer: React.FC<TimerProps> = ({
  ticketId,
  ticketName,
  blocked = false,
  handleElapsedTime
}): JSX.Element => {
  const {
    data: elapsedTime,
    isLoading,
    error: errorElapsedTime,
    refetch: refetchElapsedTime
  } = useGetTicketElapsedTime(ticketId)
  const currentTicket = useCurrentTicket()
  console.log(elapsedTime)
  const [paused, setPaused] = useState<boolean>(!currentTicket.isTracking)
  const [time, setTime] = useState<number>(0)
  const [isBlocked, setIsBlocked] = useState<boolean>(blocked)
  const [modalVariant, setModalVariant] = useState<'add' | 'remove'>('add')
  const [showModalTime, setShowModalTime] = useState<boolean>(false)
  const [showModalBlock, setShowModalBlock] = useState<boolean>(false)
  const [showModalResume, setShowModalResume] = useState<boolean>(false)
  const [showModalUnblock, setShowModalUnblock] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentTicket.id) {
      setPaused(!currentTicket.isTracking)
    }
  }, [currentTicket.id])

  useEffect(() => {
    if (elapsedTime && elapsedTime.workedTime !== time) {
      setTime(elapsedTime.workedTime)
    }
  }, [elapsedTime])

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
  const screen = useScreenSize()

  useEffect(() => {
    if (errorElapsedTime) {
      memoizedShowSnackBar(
        'An error occurred while fetching the ticket time',
        'error'
      )
    }
  }, [errorElapsedTime, memoizedShowSnackBar])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (!paused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          handleElapsedTime && handleElapsedTime(newTime)
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [paused])

  const handleTrackingButton = (): void => {
    if (paused && isBlocked) {
      setShowModalTime(true)
    } else {
      mutateTimer({
        ticketId,
        date: new Date(),
        action: paused ? 'resume' : 'pause'
      })
      dispatch(setHasToRefetch(true))
      dispatch(setCurrentTrackingTicket({ id: ticketId, name: ticketName }))
    }
  }

  const handleModalResume = (): void => {
    mutateUnblock({ ticketId })
    mutateTimer({
      ticketId,
      date: new Date(),
      action: 'resume'
    })
    dispatch(setHasToRefetch(true))
    dispatch(setCurrentTrackingTicket({ id: ticketId, name: ticketName }))
    setShowModalTime(false)
  }

  const handleUnblock = (): void => {
    mutateUnblock({ ticketId })
    dispatch(setHasToRefetch(true))
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
      dispatch(setCurrentTicket({ ...currentTicket, isTracking: !paused }))
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
  console.log('time: ', time)
  return (
    <div className="w-full h-fit self-end h-32 md:bg-gray-500 bg-gray-700 xl:px-10 py-4 px-5 items-center flex text-white md:rounded-br-xl border-t border-white/10">
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
        elapsedTime={time}
        refetchTime={refetchElapsedTime}
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
            {ticketName}
          </Subtitle>
          {isLoading && (
            <SkeletonTheme baseColor="#3A3A3A" highlightColor="#4F4F4F">
              <Skeleton height={32} width={130} />
            </SkeletonTheme>
          )}
          {!isLoading && (
            <div role="timer">
              <H1 className="xl:text-[32px] lg:text-[26px] text-[20px]">
                {('0' + Math.floor(time / 3600)).slice(-2)}:
                {('0' + Math.floor((time % 3600) / 60)).slice(-2)}:
                {('0' + Math.floor(time % 60)).slice(-2)}
              </H1>
            </div>
          )}
        </div>
        <div className="flex w-fit gap-4 items-center justify-center">
          <Tooltip
            content={!paused ? 'Stop the timer before substracting time' : ''}
          >
            <RoundedIconButton
              className="w-11 h-11"
              icon={<SubstractTimeIcon />}
              size={screen.width > 1024 ? 'lg' : 'sm'}
              variant={'disabled'}
              onClick={
                !paused
                  ? () => {}
                  : () => {
                      setModalVariant('remove')
                      setShowModalTime(true)
                    }
              }
            />
          </Tooltip>
          <Tooltip content={!paused ? 'Stop the timer before adding time' : ''}>
            <RoundedIconButton
              className="w-11 h-11"
              icon={<AddTimeIcon />}
              size={screen.width > 1024 ? 'lg' : 'sm'}
              variant={'disabled'}
              onClick={
                !paused
                  ? () => {}
                  : () => {
                      setModalVariant('add')
                      setShowModalTime(true)
                    }
              }
            />
          </Tooltip>
          <Tooltip
            content={!paused ? 'Stop the timer before setting a blocker' : ''}
          >
            <RoundedIconButton
              className="w-11 h-11"
              icon={<BlockedIcon />}
              size={screen.width > 1024 ? 'lg' : 'sm'}
              variant={'disabled'}
              onClick={
                !paused
                  ? () => {}
                  : isBlocked
                    ? handleUnblock
                    : () => {
                        setShowModalBlock(true)
                      }
              }
            />
          </Tooltip>
          <GradientRoundedButton
            size={screen.width > 1024 ? 'lg' : 'md'}
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
