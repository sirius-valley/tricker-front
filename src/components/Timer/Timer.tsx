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
import { useAppDispatch, useCurrentTicket, useStopTracking } from '@redux/hooks'
import {
  initialState,
  setCurrentTrackingTicket,
  setHasToRefetchDisplay,
  setHasToRefetchList,
  setStopTracking
} from '@redux/user'
import { type IssueView, type Screen, StageType } from '@utils/types'

export interface TimerProps {
  ticketId: string
  ticketName: string
  handleElapsedTime?: (elapsedTime: number) => void
  myTeam?: boolean
}

const Timer: React.FC<TimerProps> = ({
  ticketId,
  ticketName,
  handleElapsedTime,
  myTeam = false
}): JSX.Element => {
  const currentTicket: IssueView = useCurrentTicket()
  const stopTracking: boolean = useStopTracking()
  const screen: Screen = useScreenSize()
  const dispatch = useAppDispatch()
  const { showSnackBar } = useSnackBar()
  const memoizedShowSnackBar = useCallback(showSnackBar, [])

  const [paused, setPaused] = useState<boolean>(!currentTicket.isTracking)
  const [time, setTime] = useState<number>(0)
  const [isBlocked, setIsBlocked] = useState<boolean>(currentTicket.isBlocked)
  const [modalVariant, setModalVariant] = useState<'add' | 'remove'>('add')
  const [showModalTime, setShowModalTime] = useState<boolean>(false)
  const [showModalBlock, setShowModalBlock] = useState<boolean>(false)
  const [showModalResume, setShowModalResume] = useState<boolean>(false)
  const [showModalUnblock, setShowModalUnblock] = useState<boolean>(false)

  const {
    mutate: mutateTimer,
    reset: resetTimer,
    isPending: pendingTimer,
    isSuccess: successTimer,
    error: errorTimer
  } = usePostTimerAction()
  const {
    mutate: mutateUnblock,
    reset: resetUnblock,
    isPending: pendingUnblock,
    isSuccess: successUnblock,
    error: errorUnblock
  } = usePostUnblock()
  const {
    data: elapsedTime,
    isLoading,
    error: errorElapsedTime,
    refetch: refetchElapsedTime
  } = useGetTicketElapsedTime(ticketId)

  useEffect(() => {
    if (currentTicket.id) {
      setPaused(!currentTicket.isTracking)
      setIsBlocked(currentTicket.isBlocked)
    }
    if (currentTicket.isTracking) setPaused(!currentTicket.isTracking)
  }, [currentTicket.id, currentTicket.isTracking])

  useEffect(() => {
    if (elapsedTime && elapsedTime.workedTime !== time) {
      setTime(elapsedTime.workedTime)
    }
  }, [elapsedTime])

  useEffect(() => {
    if (stopTracking) {
      mutateTimer({
        ticketId,
        date: new Date(),
        action: 'pause'
      })
      dispatch(setHasToRefetchList(true))
      dispatch(setHasToRefetchDisplay(true))
      dispatch(setStopTracking(false))
    }
  }, [stopTracking])

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
      setShowModalResume(true)
    } else if (
      (currentTicket.stage.type as unknown as string) !==
      StageType[StageType.STARTED]
    ) {
      memoizedShowSnackBar(
        "This issue needs to be 'In Progress' or 'In Review' in order to be able to track time",
        'error'
      )
    } else {
      if (!pendingTimer) {
        mutateTimer({
          ticketId,
          date: new Date(),
          action: paused ? 'resume' : 'pause'
        })
        dispatch(setHasToRefetchList(true))
        dispatch(setHasToRefetchDisplay(true))
      }
    }
  }

  const handleModalResume = (): void => {
    if (
      (currentTicket.stage.type as unknown as string) !==
      StageType[StageType.STARTED]
    ) {
      memoizedShowSnackBar(
        "This issue needs to be 'In Progress' or 'In Review' in order to be able to track time",
        'error'
      )
      setShowModalResume(false)
    } else if (!pendingTimer) {
      mutateUnblock({ ticketId })
      mutateTimer({
        ticketId,
        date: new Date(),
        action: 'resume'
      })
      setShowModalResume(false)
      dispatch(setHasToRefetchList(true))
      dispatch(setHasToRefetchDisplay(true))
    }
  }

  const handleUnblock = (): void => {
    mutateUnblock({ ticketId })
    setShowModalUnblock(false)
    dispatch(setHasToRefetchList(true))
    dispatch(setHasToRefetchDisplay(true))
  }

  useEffect(() => {
    if (successUnblock) {
      showSnackBar('The ticket is now Unblocked', 'success')
      dispatch(setHasToRefetchList(true))
      dispatch(setHasToRefetchDisplay(true))
      setIsBlocked(false)
      resetUnblock()
    }
    if (successTimer) {
      setPaused(!paused)
      resetTimer()
      dispatch(
        setCurrentTrackingTicket(
          paused ? currentTicket : initialState.currentTicket
        )
      )
      dispatch(setHasToRefetchList(true))
      dispatch(setHasToRefetchDisplay(true))
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
    <div className="w-full self-end h-32 md:bg-gray-500 bg-gray-700 xl:px-10 py-4 px-5 items-center flex text-white md:rounded-br-xl border-t border-white/10">
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
        setIsBlocked={setIsBlocked}
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
        {!myTeam && (
          <div className="flex w-fit gap-4 items-center justify-center">
            <Tooltip
              content={!paused ? 'Stop the timer before substracting time' : ''}
            >
              <RoundedIconButton
                className="w-11 h-11"
                icon={<SubstractTimeIcon />}
                size={screen.width > 1024 ? 'lg' : 'sm'}
                variant={!paused ? 'disabled' : 'default'}
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
            <Tooltip
              content={!paused ? 'Stop the timer before adding time' : ''}
            >
              <RoundedIconButton
                className="w-11 h-11"
                icon={<AddTimeIcon />}
                size={screen.width > 1024 ? 'lg' : 'sm'}
                variant={!paused ? 'disabled' : 'default'}
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
                variant={
                  !paused ? 'disabled' : isBlocked ? 'blocked' : 'default'
                }
                onClick={
                  !paused && pendingUnblock
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
                <Icon
                  name={paused ? 'PlayIcon' : 'StopIcon'}
                  fillColor="black"
                />
              }
              onClick={() => {
                handleTrackingButton()
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Timer
