import { type Meta, type StoryObj } from '@storybook/react'
import { Pill } from './Pill'

const meta: Meta<typeof Pill> = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['completed', 'tracking', 'blocked'],
      defaultValue: 'completed',
      control: {
        type: 'select'
      }
    },
    children: {
      defaultValue: 'Pill',
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Pill>

export const Completed: Story = {
  tags: ['autodocs'],
  args: {
    children: 'Completed'
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>
}

export const Tracking: Story = {
  tags: ['autodocs'],
  args: {
    children: 'Gradient',
    variant: 'tracking'
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>
}

export const Blocked: Story = {
  tags: ['autodocs'],
  args: {
    children: 'Blocked',
    variant: 'blocked'
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>
}
