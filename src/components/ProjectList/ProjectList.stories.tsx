import { type Meta, type StoryObj } from '@storybook/react'
import { ProjectList } from './ProjectList'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackBarProvider } from '@components/SnackBarProvider/SnackBarProvider'

const queryClient = new QueryClient()

const meta: Meta<typeof ProjectList> = {
  title: 'Components/ProjectListion',
  component: ProjectList,
  tags: ['autodocs'],
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

type Story = StoryObj<typeof ProjectList>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    searchedProject: ''
  },
  render: (args) => (
    <SnackBarProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ProjectList {...args} />
        </Provider>
      </QueryClientProvider>
    </SnackBarProvider>
  )
}
