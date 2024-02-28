import { type UserProjectRole } from '@utils/types'
import React from 'react'
import { TabItem } from './TabItem/TabItem'
import { CaretDownIcon, CaretUpIcon } from '@components/Icon'

interface TabBarProps {
  users: UserProjectRole[]
  handleChange: (activeTabId: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ users, handleChange }) => {
  const [activeTab, setActiveTab] = React.useState<string>('Team statistics')
  const [hideScrollRight, setHideScrollRight] = React.useState<boolean>(false)
  const [hideScrollLeft, setHideScrollLeft] = React.useState<boolean>(true)

  const tabBarRef = React.useRef<HTMLDivElement>(null)

  const handleClick = (activeTabId: string): void => {
    setActiveTab(activeTabId)
    handleChange(activeTabId)
  }

  const handleScrollLeft = (): void => {
    if (tabBarRef.current) {
      tabBarRef.current.scrollLeft -= tabBarRef.current.offsetWidth
    }
  }

  const handleScrollRight = (): void => {
    if (tabBarRef.current) {
      tabBarRef.current.scrollLeft += tabBarRef.current.offsetWidth
    }
  }
  const handleOnScroll = (): void => {
    if (tabBarRef.current) {
      setHideScrollRight(
        tabBarRef.current.scrollWidth - tabBarRef.current.clientWidth <=
          tabBarRef.current.scrollLeft + 1
      )
      setHideScrollLeft(tabBarRef.current.scrollLeft === 0)
    }
  }

  return (
    <div className="flex items-center">
      <div className="hidden w-4 h-4 md:block">
        <button
          className={`rotate-90 rounded-full bg-gray-500 hover:bg-gray-400 ${hideScrollLeft && 'hidden'}`}
          onClick={handleScrollLeft}
        >
          <CaretDownIcon width="16px" height="16px" />
        </button>
      </div>
      <div
        id="tab-bar"
        className="w-full overflow-x-scroll scroll-smooth"
        ref={tabBarRef}
        onScroll={handleOnScroll}
      >
        <div className="flex w-fit h-fit">
          <TabItem
            teamMember="Team statistics"
            active={activeTab === 'Team statistics'}
            onClick={handleClick}
          />
          {users.map((user: UserProjectRole) => (
            <TabItem
              key={user.id}
              teamMember={user.user.username}
              active={activeTab === user.id}
              onClick={() => {
                handleClick(user.id ?? '')
              }}
            />
          ))}
        </div>
      </div>
      <div className="hidden w-4 h-4 md:block">
        <button
          className={`rotate-90 rounded-full bg-gray-500 hover:bg-gray-400 ${hideScrollRight && 'hidden'}`}
          onClick={handleScrollRight}
        >
          <CaretUpIcon width="16px" height="16px" />
        </button>
      </div>
    </div>
  )
}
