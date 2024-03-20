import { type Meta, type StoryObj } from '@storybook/react'
import TicketListSmallDisplay from './TicketListSmallDisplay'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof TicketListSmallDisplay> = {
  title: 'Components/TicketListSmallDisplay',
  component: TicketListSmallDisplay,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}>{Story()}</Provider>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof TicketListSmallDisplay>

export const Default: Story = {
  render: (args) => <TicketListSmallDisplay {...args} />
}
