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
    },
    variant: {
      defaultValue: 'desktop',
      options: ['desktop', 'mobile'],
      control: {
        type: 'radio'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'desktop'
  },
  render: (args) => <SearchBar {...args} />
}
