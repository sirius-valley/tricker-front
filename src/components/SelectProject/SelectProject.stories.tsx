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
    providerKey: {
      control: {
        type: 'text'
      },
      defaultValue: 'providerKey_1'
    },
    provider: {
      control: {
        type: 'text'
      },
      defaultValue: 'Provider'
    }
  }
}

export default meta

type Story = StoryObj<typeof SelectProjectScreen>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    handleSelection: () => {},
    provider: 'Provider',
    providerKey: 'ProviderKey_1'
  },
  render: (args) => <SelectProjectScreen {...args} />
}
