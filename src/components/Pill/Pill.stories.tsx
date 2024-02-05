import { type Meta, type StoryObj } from '@storybook/react'
import { Pill } from './Pill'

const meta: Meta<typeof Pill> = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'gradient', 'error'],
      defaultValue: 'default',
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

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    children: 'Default'
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>
}

export const Gradient: Story = {
  tags: ['autodocs'],
  args: {
    children: 'Gradient',
    variant: 'gradient'
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>
}

export const Error: Story = {
  tags: ['autodocs'],
  args: {
    children: 'Blocked',
    variant: 'error'
  },
  render: (args) => <Pill {...args}>{args.children}</Pill>
}
