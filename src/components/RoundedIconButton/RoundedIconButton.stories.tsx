import { type Meta, type StoryObj } from '@storybook/react'
import { RoundedIconButton } from './RoundedIconButton'
import BlockedIcon from '../../utils/icons/BlockedIcon'

const meta: Meta<typeof RoundedIconButton> = {
  title: 'Components/RoundedIconButton',
  component: RoundedIconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: {
        type: null
      }
    },
    size: {
      options: ['sm', 'lg'],
      defaultValue: 'lg',
      control: {
        type: 'select'
      }
    },
    variant: {
      options: ['blocked', 'default', 'disabled'],
      defaultValue: 'default',
      control: {
        type: 'select'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof RoundedIconButton>

export const Blocked: Story = {
  tags: ['autodocs'],
  args: {
    icon: <BlockedIcon />,
    variant: 'blocked'
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      <RoundedIconButton size="lg" {...args} />
      <RoundedIconButton size="sm" {...args} />
    </div>
  )
}

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    icon: <BlockedIcon />,
    variant: 'default'
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      <RoundedIconButton size="lg" {...args} />
      <RoundedIconButton size="sm" {...args} />
    </div>
  )
}

export const Disabled: Story = {
  tags: ['autodocs'],
  args: {
    icon: <BlockedIcon />,
    variant: 'disabled'
  },
  render: (args) => (
    <div className="flex gap-2 items-center">
      <RoundedIconButton size="lg" {...args} />
      <RoundedIconButton size="sm" {...args} />
    </div>
  )
}
