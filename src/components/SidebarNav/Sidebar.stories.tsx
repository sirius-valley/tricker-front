import { type Meta, type StoryObj } from '@storybook/react'
import { SidebarNav } from './SidebarNav'
import { MemoryRouter } from 'react-router-dom'
import {
  type User,
  type TimeTracking,
  type Issue,
  type DropdownOption
} from '@utils/types'

const dropdownOptions: DropdownOption[] = [
  { id: '1', title: 'Option 1', image: 'https://imageplaceholder.net/20x20' },
  { id: '2', title: 'Option 2', image: 'https://imageplaceholder.net/20x20' },
  { id: '3', title: 'Option 3', image: 'https://imageplaceholder.net/20x20' },
  { id: '4', title: 'Option 4', image: 'https://imageplaceholder.net/20x20' }
]

const user: User = {
  name: 'Victoria Capurro',
  email: 'victoriacapurro@sirius.com.ar',
  id: '123',
  projectsRoleAssigned: []
}

const handleDropdownSelect = (option: DropdownOption): void => {
  console.log(option)
}

const timeTracking: TimeTracking = {
  id: 'TKT-123',
  issueId: '',
  startTime: 0,
  endTime: 0,
  issue: {} as Issue
}

const preSelectedOption: DropdownOption = {
  id: '2',
  title: 'Option 2',
  image: 'https://imageplaceholder.net/20x20'
}

const meta: Meta<typeof SidebarNav> = {
  title: 'Components/SidebarNav',
  component: SidebarNav,
  decorators: [
    (story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ],
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'User information.',
      defaultValue: user
    },
    dropdownOptions: {
      description: 'Options for the dropdown.',
      defaultValue: dropdownOptions
    },
    preSelectedOption: {
      description: 'Pre selected option',
      defaultValue: preSelectedOption
    },
    handleDropdownSelect: {
      description: 'Function to handle the dropdown select.',
      action: 'handleDropdownSelect',
      defaultValue: handleDropdownSelect
    },
    variant: {
      description: 'The variant of the sidebar.',
      control: {
        type: 'select'
      },
      options: ['pm', 'dev']
    },
    timeTracking: {
      description: 'The time tracking information.',
      control: {
        type: 'object'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof SidebarNav>

export const DevView: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'dev',
    user,
    dropdownOptions,
    handleDropdownSelect,
    preSelectedOption,
    timeTracking
  },
  render: (args) => <SidebarNav {...args} />
}

export const PMView: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'pm',
    user,
    dropdownOptions,
    handleDropdownSelect,
    preSelectedOption,
    timeTracking
  },
  render: (args) => <SidebarNav {...args} />
}
