// SearchButton.stories.tsx
import { type Meta, type Story } from '@storybook/react'
import SearchButton, { type SearchButtonProps } from './SearchFilter'

const meta: Meta<typeof SearchButton> = {
  title: 'Components/SearchButton',
  component: SearchButton,
  tags: ['autodocs']
}

export default meta

const Template: Story<SearchButtonProps> = (args) => <SearchButton {...args} />

export const Default = Template.bind({})
Default.args = {
  searchIcon: 'SearchIcon',
  statusIcon: 'LoaderIcon',
  priorityIcon: 'MediumPriorityIcon',
  checkboxIcon: 'CheckIcon',
  statusOptions: ['Todo', 'In Progress', 'In Review', 'Done', 'Merged to main'],
  priorityOptions: ['High', 'Medium', 'Low']
}
