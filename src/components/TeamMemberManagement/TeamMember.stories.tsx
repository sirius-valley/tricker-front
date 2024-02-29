import { type Meta, type StoryObj } from '@storybook/react'
import { TeamMemberManagement } from './TeamMemberManagement'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { type User } from '@utils/types'

const teamMembers: User[] = [
  { id: '1', email: 'victoriacapurro@sirius.com.ar', name: 'Victoria Capurro' },
  { id: '2', email: 'fabrizioserial@sirius.com.ar', name: 'Fabrizio Serial' },
  { id: '3', email: 'emiliamartella@sirius.com.ar', name: 'Emilia Martella' },
  { id: '3', email: 'matiaspizzi@gmail.com', name: 'Matias Pizzi' },
  {
    id: '4',
    email: 'federicoarielmartucci@sirius.com.ar',
    name: 'Federico Ariel Martucci'
  },
  { id: '5', email: 'othermember@sirius.com.ar', name: 'Other Member' }
]
const actualUser: User = {
  id: '3',
  email: 'emiliamartella@sirius.com.ar',
  name: 'Emilia Martella'
}

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
    },
    actualUser: {
      control: {
        type: 'object'
      },
      defaultValue: actualUser,
      description: 'This is the user that cannot be deleted as he is the pm'
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
    projectName: 'Tricker',
    actualUser
  },
  render: (args) => (
    <WrapperPage>
      <TeamMemberManagement {...args} />
    </WrapperPage>
  )
}
