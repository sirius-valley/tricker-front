import '../../index.css'
import React, { useState } from 'react'
// import { Dropdown } from '@components/Dropdown/Dropdown'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'
import { NavbarItem } from '@components/NavbarItem/NavbarItem'
import Icon from '@components/Icon/Icon'
import TimeTrackingBadge from '@components/TimeTrackingBadge/TimeTrackingBadge'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import Body1 from '@utils/typography/body1/body1'
import { NavLink } from 'react-router-dom'
import { type TimeTracking, type User } from '@utils/types'
import Popover from '@components/Popover/Popover'

export interface SidebarNavProps
  extends React.HTMLAttributes<HTMLInputElement> {
  user: User
  variant: 'pm' | 'dev'
  timeTracking?: TimeTracking
  dropdownOptions: Array<{ title: string; image: string }>
  handleDropdownSelect: (option: { title: string; image: string }) => void
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  user,
  variant,
  // dropdownOptions,
  timeTracking
  // handleDropdownSelect
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col w-[224px] h-screen pt-10 gap-20 bg-gray-500">
      <NavLink to="/">
        <div className="flex items-center h-[30px] gap-2 px-6 cursor-pointer">
          <TrickerLogo height="30" width="30" />
          <TrickerTitle height="19" width="83" />
        </div>
      </NavLink>
      <div className="flex flex-col justify-between h-full pb-6">
        <div className="flex flex-col gap-6 w-full h-[256px]">
          {variant === 'pm' && (
            <div className="px-6">
              <NavLink to="/projects">
                {({ isActive }) => (
                  <NavbarItem
                    title="Projects"
                    icon={<Icon name="FolderIcon" width="20" height="20" />}
                    variant={isActive ? 'selected' : 'default'}
                  >
                    {'My projects'}
                  </NavbarItem>
                )}
              </NavLink>
            </div>
          )}
          {/*
          
          It is a provisionary version without dropdown as there are not projects to display already.

          <Dropdown
            options={dropdownOptions}
            handleSelect={(option) => {
              handleDropdownSelect(option)
            }}
          /> */}
          <div className="flex flex-col gap-2 px-6">
            <NavLink to="/">
              {({ isActive }) => (
                <NavbarItem
                  title="Home"
                  icon={<Icon name="HomeIcon" width="20" height="20" />}
                  variant={isActive ? 'selected' : 'default'}
                >
                  {'Home'}
                </NavbarItem>
              )}
            </NavLink>
            {variant === 'pm' && (
              <NavLink to="/team">
                {({ isActive }) => (
                  <NavbarItem
                    title="Team"
                    icon={<Icon name="TeamIcon" width="20" height="20" />}
                    variant={isActive ? 'selected' : 'default'}
                  >
                    {'Team'}
                  </NavbarItem>
                )}
              </NavLink>
            )}
            <NavLink to="/statistics">
              {({ isActive }) => (
                <NavbarItem
                  title="Statistics"
                  icon={<Icon name="ChartDonutIcon" width="20" height="20" />}
                  variant={isActive ? 'selected' : 'default'}
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
            <div className="flex items-center p-2 gap-3 max-w-[224px]">
              <ProfilePicture
                className="min-w-10 min-h-10"
                img={user?.profileImage}
              />
              <Body1 className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
                {user?.name || 'User name'}
              </Body1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
