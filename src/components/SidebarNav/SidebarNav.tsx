import '../../index.css'
import React from 'react'
import { Dropdown } from '@components/Dropdown/Dropdown'
import TrickerLogo from '@assets/TrickerLogo'
import TrickerTitle from '@assets/TrickerTitle'
import { NavbarItem } from '@components/NavbarItem/NavbarItem'
import Icon from '@components/Icon/Icon'
import TimeTrackingBadge from '@components/TimeTrackingBadge/TimeTrackingBadge'
import { ProfileButton } from '@components/ProfileButton/ProfileButton'
import Body1 from '@utils/typography/body1/body1'
import { NavLink } from 'react-router-dom'
import { type TimeTracking } from '@utils/types'

export interface SidebarNavProps
  extends React.HTMLAttributes<HTMLInputElement> {
  user: { name: string; id: string }
  variant: 'pm' | 'dev'
  timeTracking?: TimeTracking
  dropdownOptions: Array<{ title: string; image: string }>
  handleDropdownSelect: (option: { title: string; image: string }) => void
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  user,
  variant,
  dropdownOptions,
  timeTracking,
  handleDropdownSelect
}) => {
  const path = window.location.pathname

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
                <NavbarItem
                  title="Projects"
                  icon={<Icon name="FolderIcon" width="20" height="20" />}
                  variant={path === '/projects' ? 'selected' : 'default'}
                >
                  {'My projects'}
                </NavbarItem>
              </NavLink>
            </div>
          )}
          <Dropdown
            options={dropdownOptions}
            handleSelect={(option) => {
              handleDropdownSelect(option)
            }}
          />
          <div className="flex flex-col gap-2 px-6">
            <NavLink to="/">
              <NavbarItem
                title="Home"
                icon={<Icon name="HomeIcon" width="20" height="20" />}
                variant={path === '/' ? 'selected' : 'default'}
              >
                {'Home'}
              </NavbarItem>
            </NavLink>
            {variant === 'pm' && (
              <NavLink to="/team">
                <NavbarItem
                  title="Team"
                  icon={<Icon name="TeamIcon" width="20" height="20" />}
                  variant={path === '/team' ? 'selected' : 'default'}
                >
                  {'Team'}
                </NavbarItem>
              </NavLink>
            )}
            <NavLink to="/statistics">
              <NavbarItem
                title="Statistics"
                icon={<Icon name="ChartDonutIcon" width="20" height="20" />}
                variant={path === '/statistics' ? 'selected' : 'default'}
              >
                {'Statistics'}
              </NavbarItem>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          {timeTracking && <TimeTrackingBadge ticketId={timeTracking.id} />}
          <NavLink to={'/user/' + user.id}>
            <div className="flex items-center py-2 gap-3">
              <ProfileButton img="https://s3-alpha-sig.figma.com/img/4fe8/a23d/ddeece2a91e7cc5919fd149d572c6d1e?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a33zUweOtCPNcY1RYMBSl7M0W3HvLrpSgGfHnnqS-~FBATDlE42BrkMOby65VNWC2eo3p7sknPz1zjtO3xZfNT4zZyke6ZRrYV1k2nllK6NJMDzTKFn~qe4R0xWUtyxxWtauAlAvqmDY7G2O417AE05nFyFXyLlo7zePBrxsCNWm9f3jD2W65zFwgLy8wzcy5ryT5OZPA5wxOXPXN-6-VngmrBmoZqg-SWVfgL-E6W3GkoLj4IvMi7LcJZ162JsXmP0o-mHJ4bRi9K04k3ACjyg7BT2f9fCLbGzy5Nddzk8p61tDl7OczzCY-K9bx0ju3uAbhMnWfpFU0vcp7gpOcw__" />
              <Body1 className="text-white">{user.name}</Body1>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
