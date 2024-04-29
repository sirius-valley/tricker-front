import { type Meta, type StoryObj } from '@storybook/react'
import { TeamMemberManagement } from './TeamMemberManagement'
import WrapperPage from '@components/Wrapper/WrapperPage'
import {
  type MemberPreIntegrated,
  type ProjectPreIntegrated
} from '@utils/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const actualUser: MemberPreIntegrated = {
  providerId: 'providerId',
  email: 'emiliamartella@sirius.com.ar',
  name: 'Emilia Martella'
}
const project: ProjectPreIntegrated = {
  providerProjectId: 'projectId',
  name: 'Tricker',
  image: null,
  state: 'NOT_ADDED'
}

const queryClient = new QueryClient()

const meta: Meta<typeof TeamMemberManagement> = {
  title: 'Components/TeamMemberManagement',
  component: TeamMemberManagement,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  argTypes: {
    handleRemainingUsers: {
      control: {
        type: 'function'
      },
      description: 'This function is a callback when a user is removed.'
    },
    project: {
      control: {
        type: 'object'
      },
      description: 'The selected project.',
      defaultValue: project
    },
    apiKey: {
      control: {
        type: 'text'
      },
      description: 'The provider API key.',
      defaultValue: 'lin_123456789'
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
    project,
    apiKey: 'lin_123456789',
    actualUser
  },
  render: (args) => (
    <WrapperPage>
      <TeamMemberManagement {...args} />
    </WrapperPage>
  )
}
