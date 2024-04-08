import { type Meta, type StoryObj } from '@storybook/react'
import TicketList from './TicketList'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { mockedTicket } from './MockedTicket'
import { SnackBarProvider } from '@components/SnackBarProvider/SnackBarProvider'

const queryClient = new QueryClient()

const meta: Meta<typeof TicketList> = {
  title: 'Components/TicketList',
  component: TicketList,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}>{Story()}</Provider>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
    (Story) => <SnackBarProvider>{Story()}</SnackBarProvider>
  ],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['grid', 'list']
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof TicketList>

export const DevView: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'grid',
    currentTicket: mockedTicket,
    filters: [],
    searchedTicket: '',
    isOutOfEstimation: false,
    isProjectManager: false
  },
  render: (args) => <TicketList {...args} />
}
export const PMView: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'grid',
    currentTicket: mockedTicket,
    filters: [],
    searchedTicket: '',
    isOutOfEstimation: false,
    isProjectManager: true
  },
  render: (args) => <TicketList {...args} />
}
