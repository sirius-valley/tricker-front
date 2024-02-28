import { type Meta, type StoryObj } from '@storybook/react'
import { TeamMemberManagement } from './TeamMemberManagement'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { type User } from '@utils/types'

const teamMembers: User[] = [
  { id: '1', username: 'Victoria Capurro' },
  { id: '2', username: 'Fabrizio Serial' },
  { id: '3', username: 'Emilia Martella' },
  { id: '4', username: 'Other Member' }
]

const meta: Meta<typeof TeamMemberManagement> = {
  title: 'Components/TeamMemberManagement',
  component: TeamMemberManagement,
  tags: ['autodocs'],
  argTypes: {
    handleRemainingUsers: {
      control: {
        type: 'function'
      },
      description: 'This function is a callback when a user is removed.'
    },
    projectName: {
      control: {
        type: 'text'
      },
      description: 'The selected project name.',
      defaultValue: 'Tricker'
    },
    teamMembers: {
      control: {
        type: 'array'
      },
      defaultValue: teamMembers,
      description: 'A list of the members that belong to the project.'
    }
  }
}

export default meta

type Story = StoryObj<typeof TeamMemberManagement>

export const TeamMemberManagements: Story = {
  tags: ['autodocs'],
  args: {
    handleRemainingUsers: () => {},
    teamMembers,
    projectName: 'Tricker'
  },
  render: (args) => (
    <WrapperPage>
      <TeamMemberManagement {...args} />
    </WrapperPage>
  )
}
