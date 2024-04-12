import { type Meta, type StoryObj } from '@storybook/react'
import { MyProjectSelect } from './MyProjectSelection'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof MyProjectSelect> = {
  title: 'Components/MyProjectSelection',
  component: MyProjectSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  argTypes: {
    searchedProject: {
      control: {
        type: 'string'
      },
      description: 'Searched project to filter by.',
      defaultValue: ''
    }
  }
}

export default meta

type Story = StoryObj<typeof MyProjectSelect>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    searchedProject: ''
  },
  render: (args) => (
    <Provider store={store}>
      <MyProjectSelect {...args} />
    </Provider>
  )
}
