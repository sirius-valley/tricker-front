import NavButton from '@components/NavButton/NavButton'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavBarProps {
  isProjectManager?: boolean
}

const NavBar: React.FC<NavBarProps> = ({ isProjectManager = false }) => {
  return (
    <div className="w-screen h-[70px] py-1 px-6 flex justify-between items-center bg-black border-t border-gray-400">
      <NavLink to={`/`}>
        {({ isActive }) => (
          <NavButton variant="stats" state={isActive ? 'on' : 'off'} />
        )}
      </NavLink>
      {isProjectManager && (
        <NavLink to={`/`}>
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
        <NavLink to={`/`}>
          {({ isActive }) => (
            <NavButton variant="team" state={isActive ? 'on' : 'off'} />
          )}
        </NavLink>
      )}
      <NavLink to={`/`}>
        {({ isActive }) => (
          <NavButton variant="profile" state={isActive ? 'on' : 'off'} />
        )}
      </NavLink>
    </div>
  )
}

export default NavBar
