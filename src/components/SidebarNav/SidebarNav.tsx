import '../../index.css'
import React, { useState } from 'react'
import { Dropdown } from '@components/Dropdown/Dropdown'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'
import { NavbarItem } from '@components/NavbarItem/NavbarItem'
import Icon from '@components/Icon/Icon'
import TimeTrackingBadge from '@components/TimeTrackingBadge/TimeTrackingBadge'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import Body1 from '@utils/typography/body1/body1'
import { NavLink } from 'react-router-dom'
import { type User, type DropdownOption, type TimeTracking } from '@utils/types'
import Popover from '@components/Popover/Popover'
import useScreenSize from '@hooks/useScreenSize'
import ModalAddNewProject from '@components/ModalAddNewProject/ModalAddNewProject'

export interface SidebarNavProps
  extends React.HTMLAttributes<HTMLInputElement> {
  user: User
  variant: string
  timeTracking?: TimeTracking
  preSelectedOption: DropdownOption
  dropdownOptions: DropdownOption[]
  handleDropdownSelect: (selectedProjectId: DropdownOption) => void
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  user,
  variant,
  timeTracking,
  preSelectedOption,
  dropdownOptions,
  handleDropdownSelect
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const screen = useScreenSize()
  return (
    <div className="flex flex-col items-center flex-1 w-fit max-w-[224px] h-screen pt-10 gap-20 bg-gray-500">
      <NavLink to="/">
        <div className="w-full flex items-center lg:pr-4 h-[30px] gap-2 cursor-pointer">
          <TrickerLogo height="30" width="30" />
          {screen.width > 1024 && <TrickerTitle height="19" width="83" />}
        </div>
      </NavLink>
      <div className="flex flex-col justify-between items-center h-full pb-6">
        <div className="flex flex-col gap-6 w-full items-center lg:items-start justify-center h-[256px]">
          {variant === 'Project Manager' && (
            <div className="lg:px-6">
              <NavLink to="/projects">
                {({ isActive }) => (
                  <NavbarItem
                    title="Projects"
                    icon={<Icon name="FolderIcon" width="20" height="20" />}
                    variant={isActive ? 'selected' : 'default'}
                    showText={screen.width > 1024}
                  >
                    {'My projects'}
                  </NavbarItem>
                )}
              </NavLink>
            </div>
          )}
          <button
            onClick={() => {
              setShowModal(true)
            }}
          >
            show modal
          </button>
          <ModalAddNewProject
            show={showModal}
            onClose={() => {
              setShowModal(false)
            }}
          />
          <Dropdown
            preSelectedOption={preSelectedOption}
            options={dropdownOptions}
            handleSelect={(option) => {
              handleDropdownSelect(option)
            }}
            showText={screen.width > 1024}
          />
          <div className="w-fit flex flex-col  justify-center gap-2 lg:px-6">
            <NavLink to="/">
              {({ isActive }) => (
                <NavbarItem
                  title="Home"
                  icon={<Icon name="HomeIcon" width="20" height="20" />}
                  variant={isActive ? 'selected' : 'default'}
                  showText={screen.width > 1024}
                >
                  {'Home'}
                </NavbarItem>
              )}
            </NavLink>
            {variant === 'Project Manager' && (
              <NavLink to="/my-team">
                {({ isActive }) => (
                  <NavbarItem
                    title="Team"
                    icon={<Icon name="TeamIcon" width="20" height="20" />}
                    variant={isActive ? 'selected' : 'default'}
                    showText={screen.width > 1024}
                  >
                    {'Team'}
                  </NavbarItem>
                )}
              </NavLink>
            )}
            <NavLink to="/stats">
              {({ isActive }) => (
                <NavbarItem
                  title="Statistics"
                  icon={<Icon name="ChartDonutIcon" width="20" height="20" />}
                  variant={isActive ? 'selected' : 'default'}
                  showText={screen.width > 1024}
                >
                  {'Statistics'}
                </NavbarItem>
              )}
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {timeTracking && <TimeTrackingBadge ticketId={timeTracking.id} />}
          <div
            className="flex flex-col items-center h-fit w-fit"
            onMouseEnter={() => {
              setIsHovered(true)
            }}
            onMouseLeave={() => {
              setIsHovered(false)
            }}
          >
            <Popover userId={user?.id} show={isHovered} />
            <div className="flex items-center p-2 px-4 gap-3 max-w-[224px] overflow-hidden">
              <ProfilePicture
                className="min-w-10 min-h-10"
                img={user?.profileImage || ''}
                userName={user.name || ''}
              />
              {screen.width > 1024 && (
                <Body1 className="text-white text-wrap">{user?.name}</Body1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
