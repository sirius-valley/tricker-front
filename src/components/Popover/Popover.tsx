import React from 'react'
import HelperText from '@utils/typography/helpertext/helpertext'
import { Link, useNavigate } from 'react-router-dom'
import { setUser, initialState } from '@redux/user'
import { useAppDispatch } from '@redux/hooks'
import { removeLoginCookies } from '@data-provider/Cookies'
import useScreenSize from '@hooks/useScreenSize'

export interface PopoverProps {
  userId: string // To redirect to the user profile in the future
  show?: boolean
}

const Popover: React.FC<PopoverProps> = ({ show = false }) => {
  const dispatch = useAppDispatch()
  const screen = useScreenSize()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    dispatch(setUser(initialState.user))
    removeLoginCookies()
    navigate('/login')
  }

  return (
    <div>
      {show && screen.width > 500 && (
        <div className="pb-2">
          <div className="w-[184px] h-[62px] rounded-lg bg-gray-400 border border-[#939393] flex flex-col text-white">
            <Link
              to=""
              className="w-full h-1/2 flex items-center py-2 px-4 hover:bg-[#93939393] rounded-t-lg"
            >
              <HelperText> View profile </HelperText>
            </Link>
            <button
              className="w-full h-1/2 flex items-center py-2 px-4 hover:bg-[#93939393] rounded-b-lg"
              onClick={() => {
                handleLogout()
              }}
            >
              <HelperText> Log out </HelperText>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Popover
