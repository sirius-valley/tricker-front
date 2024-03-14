// SearchButton.stories.tsx
import { type Meta, type StoryObj } from '@storybook/react'
import Filter, { type OptionAttr } from './Filter'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  tags: ['autodocs'],
  argTypes: {
    statusOptions: {
      control: {
        type: 'object'
      }
    },
    priorityOptions: {
      control: {
        type: 'object'
      }
    },
    show: {
      control: {
        type: 'boolean'
      }
    },
    handleSelect: {
      action: 'handleSelect'
    },
    variant: {
      options: ['pm', 'dev'],
      defaultValue: 'pm',
      control: {
        type: 'select'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Filter>

export const Default: Story = {
  args: {
    show: true,
    handleSelect: (options: OptionAttr[]) => {
      console.log(options)
    },
    statusOptions: [
      { option: 'Todo', color: colors.white, selected: false },
      {
        option: 'In Progress',
        color: colors.secondary['400'],
        selected: false
      },
      { option: 'In Review', color: colors.tertiary['400'], selected: false },
      { option: 'Completed', color: colors.primary['400'], selected: false },
      {
        option: 'Merged to main',
        color: colors.primary['700'],
        selected: false
      }
    ],
    priorityOptions: [
      { option: 'No priority', icon: 'NoPriorityIcon', selected: false },
      { option: 'Low', icon: 'LowPriorityIcon', selected: false },
      { option: 'Medium', icon: 'MediumPriorityIcon', selected: false },
      { option: 'High', icon: 'HighPriorityIcon', selected: false },
      { option: 'Urgent', icon: 'UrgentIcon', selected: false }
    ],
    variant: 'pm'
  },
  render: (args) => <Filter {...args} />
}
