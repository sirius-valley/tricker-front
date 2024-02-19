import { type Meta, type StoryObj } from '@storybook/react'
import NavBar from './NavBar'
import { MemoryRouter } from 'react-router-dom'

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  decorators: [
    (story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ],
  tags: ['autodocs'],
  argTypes: {
    isProjectManager: {
      type: 'boolean',
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    profilePicture: {
      type: 'string',
      control: {
        type: 'text'
      },
      defaultValue: ''
    }
  }
}

export default meta

type Story = StoryObj<typeof NavBar>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    isProjectManager: false
  },
  render: (args) => <NavBar {...args} />
}

export const ProjectManager: Story = {
  tags: ['autodocs'],
  args: {
    isProjectManager: true
  },
  render: (args) => <NavBar {...args} />
}
