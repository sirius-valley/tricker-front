import { type Meta, type StoryObj } from '@storybook/react'
import NavButton from './NavButton'

const meta: Meta<typeof NavButton> = {
  title: 'Components/NavButton',
  component: NavButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['stats', 'home', 'projects', 'team', 'profile'],
      defaultValue: 'stats',
      control: {
        type: 'select'
      }
    },
    state: {
      description: 'It indicates whether the button is active or not.',
      options: ['on', 'off'],
      defaultValue: 'on',
      control: {
        type: 'select'
      }
    },
  }
}

export default meta

type Story = StoryObj<typeof NavButton>

export const Stats: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'stats',
    state: 'on'
  },
  render: (args) => <NavButton {...args} />
}

export const Home: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'home',
    state: 'on'
  },
  render: (args) => <NavButton {...args} />
}

export const Projects: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'projects',
    state: 'on'
  },
  render: (args) => <NavButton {...args} />
}

export const Team: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'team',
    state: 'on'
  },
  render: (args) => <NavButton {...args} />
}

export const Profile: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'profile',
    state: 'on'
  },
  render: (args) => <NavButton {...args} />
}
