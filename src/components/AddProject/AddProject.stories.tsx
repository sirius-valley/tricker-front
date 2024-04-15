import { type Meta, type StoryObj } from '@storybook/react'
import AddProject from './AddProject'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof AddProject> = {
  title: 'Components/AddProject',
  component: AddProject,
  decorators: [
    (Story) => <Provider store={store}>{Story()}</Provider>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    handleSearch: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage searched ticket.'
    }
  }
}

export default meta

type Story = StoryObj<typeof AddProject>

export const DefaultAddProject: Story = {
  tags: ['autodocs'],
  args: {
    handleSearch: function (searchedValue: string): void {
      console.log(searchedValue)
    }
  },
  render: (args) => (
    <div className="h-screen w-screen bg-gray-700">
      <AddProject {...args} />
    </div>
  )
}
