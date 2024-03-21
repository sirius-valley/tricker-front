import { type Meta, type StoryObj } from '@storybook/react'
import TicketDisplay from './TicketDisplay'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mockedTicketDetail } from './MockedTicketDetail'

const queryClient = new QueryClient()

const meta: Meta<typeof TicketDisplay> = {
  title: 'Components/TicketDisplay',
  component: TicketDisplay,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  argTypes: {
    variant: {
      description: 'The variant of the sidebar.',
      control: {
        type: 'select'
      },
      options: ['Project Manager', 'Developer']
    },
    issue: {
      description: 'The issue to display.',
      control: {
        type: 'object'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof TicketDisplay>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'Project Manager',
    issue: mockedTicketDetail
  },
  render: (args) => <TicketDisplay {...args} />
}
