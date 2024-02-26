import { type Meta, type StoryObj } from '@storybook/react'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
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
        'UserIcon'
      ]
    }
  }
}

export default meta

type Story = StoryObj<typeof Icon>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    name: 'HomeIcon',
    width: '24',
    height: '24',
    fillColor: 'white'
  },
  render: (args) => <Icon {...args} />
}
