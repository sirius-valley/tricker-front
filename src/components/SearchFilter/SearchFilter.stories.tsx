// SearchButton.stories.tsx
import { type Meta, type Story } from '@storybook/react'
import SearchButton, { type SearchButtonProps } from './SearchFilter'
import * as icons from '@components/Icon/index.ts'
import config from '../../../tailwind.config'

const colors = config.theme.extend.colors

const meta: Meta<typeof SearchButton> = {
  title: 'Components/Search',
  component: SearchButton,
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
      { option: 'Todo', color: colors.white },
      { option: 'In Progress', color: colors.secondary['400'] },
      { option: 'In Review', color: colors.tertiary['400'] },
      { option: 'Completed', color: colors.primary['400'] },
      { option: 'Merged to main', color: colors.primary['700'] }
    ],
    priorityOptions: [
      { option: 'No priority', icon: 'NoPriorityIcon' },
      { option: 'Low', icon: 'LowPriorityIcon' },
      { option: 'Medium', icon: 'MediumPriorityIcon' },
      { option: 'High', icon: 'HighPriorityIcon' },
      { option: 'Urgent', icon: 'UrgentIcon' }
    ]
  }
}

export default meta

const Template: Story<SearchButtonProps> = (args) => <SearchButton {...args} />

export const Default = Template.bind({})
