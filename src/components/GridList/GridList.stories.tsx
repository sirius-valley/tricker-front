import { type Meta, type StoryObj } from '@storybook/react'
import { GridList } from './GridList'

const meta: Meta<typeof GridList> = {
  title: 'Components/GridList',
  component: GridList,
  tags: ['autodocs'],
  argTypes: {
    onChecked: {
      control: {
        type: 'function'
      },
      description: 'Callback function to be called when the switch is toggled'
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    checked: {
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof GridList>

export const GridListButton: Story = {
  tags: ['autodocs'],
  args: {},
  render: (args) => <GridList {...args} />
}
