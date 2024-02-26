import { type Meta, type StoryObj } from '@storybook/react'
import { Stepper } from './Stepper'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      defaultValue: 3,
      control: {
        type: 'number'
      }
    },
    numberOfSteps: {
      defaultValue: 5,
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
    currentStep: 3,
    numberOfSteps: 5,
    label: 'Initial Setup'
  },
  render: (args) => <Stepper {...args} />
}
