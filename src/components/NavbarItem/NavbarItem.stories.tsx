import { type Meta, type StoryObj } from '@storybook/react'
import { NavbarItem } from './NavbarItem'
import Icon from '../Icon/Icon'

const meta: Meta<typeof NavbarItem> = {
  title: 'Components/NavbarItem',
  component: NavbarItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'selected', 'disabled'],
      defaultValue: 'default',
      control: {
        type: 'select'
      }
    },
    children: {
      defaultValue: 'NavbarItem',
      control: {
        type: 'text'
      }
    },
    icon: {
      control: {
        type: null
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof NavbarItem>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    icon: <Icon name="HomeIcon" width="20" height="20" />,
    children: 'Texto'
  },
  render: (args) => <NavbarItem {...args}>{args.children}</NavbarItem>
}

export const Selected: Story = {
  tags: ['autodocs'],
  args: {
    icon: <Icon name="HomeIcon" width="20" height="20" />,
    children: 'Texto',
    variant: 'selected'
  },
  render: (args) => <NavbarItem {...args}>{args.children}</NavbarItem>
}

export const Disabled: Story = {
  tags: ['autodocs'],
  args: {
    icon: <Icon name="HomeIcon" width="20" height="20" />,
    children: 'Texto',
    variant: 'disabled'
  },
  render: (args) => <NavbarItem {...args}>{args.children}</NavbarItem>
}
