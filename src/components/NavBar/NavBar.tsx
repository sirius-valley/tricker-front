import NavButton from '@components/NavButton/NavButton'
import React from 'react'
// import { NavLink } from 'react-router-dom'

interface NavBarProps {
  isProjectManager?: boolean
}

const NavBar: React.FC<NavBarProps> = ({ isProjectManager = false }) => {
  const [isActive, setIsActive] = React.useState<string>('stats')
  return (
    <div className="absolute bottom-0 w-screen h-[70px] py-1 px-6 flex justify-between items-center bg-black border-t border-gray-400">
      <NavButton
        onClick={() => {
          setIsActive('stats')
        }}
        variant="stats"
        state={isActive === 'stats' ? 'on' : 'off'}
      />
      {isProjectManager && (
        <NavButton
          onClick={() => {
            setIsActive('projects')
          }}
          variant="projects"
          state={isActive === 'projects' ? 'on' : 'off'}
        />
      )}
      <NavButton
        onClick={() => {
          setIsActive('home')
        }}
        variant="home"
        state={isActive === 'home' ? 'on' : 'off'}
      />
      {isProjectManager && (
        <NavButton
          onClick={() => {
            setIsActive('team')
          }}
          variant="team"
          state={isActive === 'team' ? 'on' : 'off'}
        />
      )}
      <NavButton
        variant="profile"
        profilePicture="https://images.ecestaticos.com/FVdcvD11qPRi-JWDH3USTiXDmeQ=/0x0:2120x1414/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F47b%2F328%2F963%2F47b3289639713b8e80c8d682d219fba7.jpg"
        state={'off'}
      />
    </div>
  )
}
/* Use it when react-router-dom is setted up.
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
*/
export default NavBar
