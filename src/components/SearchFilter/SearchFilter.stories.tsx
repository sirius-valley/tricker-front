// SearchButton.stories.tsx
import { type Meta, type Story } from '@storybook/react'
import SearchFilter, { type SearchButtonProps } from './SearchFilter'
import * as icons from '@components/Icon/index.ts'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors

const meta: Meta<typeof SearchFilter> = {
  title: 'Components/SearchFilter',
  component: SearchFilter,
  tags: ['autodocs'],
  argTypes: {
    searchIcon: {
      control: {
        type: 'select',
        options: Object.keys(icons)
      }
    },
    statusIcon: {
      control: {
        type: 'select',
        options: Object.keys(icons)
      }
    },
    priorityIcon: {
      control: {
        type: 'select',
        options: Object.keys(icons)
      }
    }
  },
  args: {
    searchIcon: 'SearchIcon',
    statusIcon: 'LoaderIcon',
    priorityIcon: 'MediumPriorityIcon',
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
    ]
  }
}

export default meta

const Template: Story<SearchButtonProps> = (args) => <SearchFilter {...args} />

export const Default = Template.bind({})
