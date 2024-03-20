import NavButton from '@components/NavButton/NavButton'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavBarProps {
  isProjectManager?: boolean
  profilePicture?: string
}

const NavBar: React.FC<NavBarProps> = ({
  isProjectManager = false,
  profilePicture
}) => {
  return (
    <div className="absolute bottom-0 w-screen h-[70px] py-1 px-6 flex justify-between items-center bg-gray-600 border-t border-gray-400">
      <NavLink to={`/stats`}>
        {({ isActive }) => (
          <NavButton variant="stats" state={isActive ? 'on' : 'off'} />
        )}
      </NavLink>
      {isProjectManager && (
        <NavLink to={`/projects`}>
          {({ isActive }) => (
            <NavButton variant="projects" state={isActive ? 'on' : 'off'} />
          )}
        </NavLink>
      )}
      <NavLink to={`/`}>
        {({ isActive }) => (
          <NavButton variant="home" state={isActive ? 'on' : 'off'} />
        )}
      </NavLink>
      {isProjectManager && (
        <NavLink to={`/my-team`}>
          {({ isActive }) => (
            <NavButton variant="team" state={isActive ? 'on' : 'off'} />
          )}
        </NavLink>
      )}
      <NavLink to={`/profile`}>
        {({ isActive }) => (
          <NavButton
            variant="profile"
            profilePicture={
              profilePicture ??
              'https://images.ecestaticos.com/FVdcvD11qPRi-JWDH3USTiXDmeQ=/0x0:2120x1414/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F47b%2F328%2F963%2F47b3289639713b8e80c8d682d219fba7.jpg'
            }
            state={isActive ? 'on' : 'off'}
          />
        )}
      </NavLink>
    </div>
  )
}

export default NavBar
