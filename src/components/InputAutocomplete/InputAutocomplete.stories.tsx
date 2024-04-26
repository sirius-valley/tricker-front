import { type Meta, type StoryObj } from '@storybook/react'
import InputAutocomplete from './InputAutocomplete'
import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackBarProvider } from '@components/SnackBarProvider/SnackBarProvider'

const queryClient = new QueryClient()

const meta: Meta<typeof InputAutocomplete> = {
  title: 'Components/InputAutocomplete',
  component: InputAutocomplete,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SnackBarProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {Story()}
          </QueryClientProvider>
        </Provider>
      </SnackBarProvider>
    )
  ],
  argTypes: {
    variant: {
      defaultValue: 'default',
      options: ['default', 'error', 'disabled'],
      control: {
        type: 'select'
      }
    },
    type: {
      defaultValue: ['text'],
      options: ['text', 'password'],
      control: {
        type: 'radio'
      }
    },
    label: {
      defaultValue: 'InputAutocomplete Label Text',
      control: {
        type: 'text'
      }
    },
    helpertext: {
      defaultValue: 'InputAutocomplete Helper Text',
      control: {
        type: 'text'
      }
    },
    placeholder: {
      defaultValue: 'This Input is quite long',
      control: {
        type: 'text'
      }
    },
    required: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof InputAutocomplete>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'default',
    label: 'InputAutocomplete Label Text',
    placeholder: 'This Input is quite long',
    helpertext: 'InputAutocomplete Label Text',
    type: 'text',
    required: true,
    icon: ''
  },
  render: (args) => <InputAutocomplete {...args} />
}
