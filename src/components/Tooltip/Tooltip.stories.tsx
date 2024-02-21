import { type Meta, type StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      defaultValue: 'Tooltip content',
      control: {
        type: 'text'
      }
    },
    iconName: {
      control: {
        type: 'select'
      },
      options: [
        'AddTimeIcon',
        'AlarmIcon',
        'BlockedIcon',
        'BugIcon',
        'CaretDownIcon',
        'CaretUpIcon',
        'ChartDonutIcon',
        'CheckIcon',
        'ChevronIcon',
        'CloudIcon',
        'CopyIcon',
        'DismissIcon',
        'EnvelopeIcon',
        'FeatureIcon',
        'FilterIcon',
        'FolderIcon',
        'GraphFilterIcon',
        'GridIcon',
        'HamburgerIcon',
        'HighPriorityIcon',
        'HistoryIcon',
        'HomeIcon',
        'ImprovementIcon',
        'ListIcon',
        'LoaderIcon',
        'LogOutIcon',
        'LowPriorityIcon',
        'MeatBallsIcon',
        'MediumPriorityIcon',
        'NoPriorityIcon',
        'PlayIcon',
        'SearchIcon',
        'SettingsIcon',
        'StatsIcon',
        'StopIcon',
        'TeamIcon',
        'TrashIcon',
        'UrgentIcon',
        'UserIcon',
        'GoogleIcon',
        'QuestionIcon'
      ]
    },
    iconWidth: {
      control: {
        type: 'text'
      },
      defaultValue: '20'
    },
    iconHeight: {
      control: {
        type: 'text'
      },
      defaultValue: '20'
    }
  }
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    iconName: 'QuestionIcon',
    iconWidth: '20',
    iconHeight: '20'
  },
  render: (args) => <Tooltip {...args} />
}
