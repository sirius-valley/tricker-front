import { type Meta, type StoryObj } from '@storybook/react'
import SelectProjectScreen from './SelectProject'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof SelectProjectScreen> = {
  title: 'Components/SelectProjectScreen',
  component: SelectProjectScreen,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    handleSelection: {
      action: 'handleSelection'
    },
    projects: {
      control: {
        type: 'Array'
      },
      defaultValue: []
    }
  }
}

export default meta

type Story = StoryObj<typeof SelectProjectScreen>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    handleSelection: () => {},
    projects: []
  },
  render: (args) => <SelectProjectScreen {...args} />
}
