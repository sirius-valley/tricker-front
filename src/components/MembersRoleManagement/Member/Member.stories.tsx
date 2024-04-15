import { type Meta, type StoryObj } from '@storybook/react'
import Member from './Member'
import { mockedMember } from './mockedMember'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from '@redux/store'

const queryClient = new QueryClient()

const meta: Meta<typeof Member> = {
  title: 'Components/Member',
  component: Member,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}>{Story()}</Provider>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  argTypes: {
    member: {
      defaultValue: mockedMember,
      control: {
        type: 'object'
      }
    },
    handleRemove: {
      control: {
        type: 'function'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Member>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    member: mockedMember,
    handleRemove: () => {}
  },
  render: (args) => <Member {...args} />
}
