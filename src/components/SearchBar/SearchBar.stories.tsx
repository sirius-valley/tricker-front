import { type Meta, type StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    handleValue: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description: 'Callback when the input value changes.'
    }
  }
}

export default meta

type Story = StoryObj<typeof SearchBar>

export const Desktop: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'desktop'
  },
  render: (args) => <SearchBar {...args} />
}
