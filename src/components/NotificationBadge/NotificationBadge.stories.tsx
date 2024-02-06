import { type Meta, type StoryObj } from '@storybook/react'
import NotificationBadge from './NotificationBadge'

const genericText: string =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit.'

const meta: Meta<typeof NotificationBadge> = {
  title: 'Components/NotificationBadge',
  component: NotificationBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'success', 'error', 'warning'],
      defaultValue: 'default',
      control: {
        type: 'select'
      }
    },
    children: {
      defaultValue: genericText,
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof NotificationBadge>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    children: genericText
  },
  render: (args) => (
    <NotificationBadge {...args}>{args.children}</NotificationBadge>
  )
}

export const Success: Story = {
  tags: ['autodocs'],
  args: {
    children: genericText,
    variant: 'success'
  },
  render: (args) => (
    <NotificationBadge {...args}>{args.children}</NotificationBadge>
  )
}

export const Error: Story = {
  tags: ['autodocs'],
  args: {
    children: genericText,
    variant: 'error'
  },
  render: (args) => (
    <NotificationBadge {...args}>{args.children}</NotificationBadge>
  )
}

export const Warning: Story = {
  tags: ['autodocs'],
  args: {
    children: genericText,
    variant: 'warning'
  },
  render: (args) => (
    <NotificationBadge {...args}>{args.children}</NotificationBadge>
  )
}
