import { type UserProjectRole } from '@utils/types'
import React from 'react'
import { TabItem } from './TabItem/TabItem'

interface TabBarProps {
  users: UserProjectRole[]
  handleChange: (activeTabId: string) => void
}

export const TabBar: React.FC<TabBarProps> = ({ users, handleChange }) => {
  const [activeTab, setActiveTab] = React.useState<string>('')
  const handleClick = (activeTabId: string): void => {
    setActiveTab(activeTabId)
    handleChange(activeTabId)
  }
  return (
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
            handleClick(user.id)
          }}
        />
      ))}
    </div>
  )
}
