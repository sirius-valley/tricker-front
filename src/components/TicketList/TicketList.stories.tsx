import { type Meta, type StoryObj } from '@storybook/react'
import TicketList from './TicketList'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof TicketList> = {
  title: 'Components/TicketList',
  component: TicketList,
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

type Story = StoryObj<typeof TicketList>

export const Default: Story = {
  render: () => <TicketList />
}
