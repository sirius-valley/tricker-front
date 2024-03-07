import { type Meta, type StoryObj } from '@storybook/react'
import Spinner from './Spinner'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary']
    },
    size: {
      control: {
        type: 'number'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Spinner>

export const Play: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 50
  },
  render: (args) => <Spinner {...args} />
}
