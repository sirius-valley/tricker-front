import { type Meta, type StoryObj } from '@storybook/react'
import { Stepper } from './Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    stepNumber: {
      defaultValue: 1,
      control: {
        type: 'number'
      }
    },
    label: {
      defaultValue: 'Initial setup',
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Stepper>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    stepNumber: 1,
    label: 'Initial Setup'
  },
  render: (args) => <Stepper {...args} />
}
