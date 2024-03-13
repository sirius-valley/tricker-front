import { type Meta, type StoryObj } from '@storybook/react'
import { SidebarNav } from './SidebarNav'
import { MemoryRouter } from 'react-router-dom'
import { type DropdownOption } from '@components/Dropdown/Dropdown'
import { type TimeTracking, type Issue } from '@utils/types'

const dropdownOptions = [
  { title: 'Option 1', image: 'https://imageplaceholder.net/20x20' },
  { title: 'Option 2', image: 'https://imageplaceholder.net/20x20' },
  { title: 'Option 3', image: 'https://imageplaceholder.net/20x20' },
  { title: 'Option 4', image: 'https://imageplaceholder.net/20x20' }
]

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

const meta: Meta<typeof SidebarNav> = {
  title: 'Components/SidebarNav',
  component: SidebarNav,
  decorators: [
    (story) => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ],
  tags: ['autodocs'],
  argTypes: {
    dropdownOptions: {
      description: 'Options for the dropdown.',
      defaultValue: dropdownOptions
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
    dropdownOptions,
    handleDropdownSelect,
    timeTracking
  },
  render: (args) => <SidebarNav {...args} />
}

export const PMView: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'pm',
    dropdownOptions,
    handleDropdownSelect,
    timeTracking
  },
  render: (args) => <SidebarNav {...args} />
}
