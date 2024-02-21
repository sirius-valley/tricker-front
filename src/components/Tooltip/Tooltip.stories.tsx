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
    }
  }
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    children: (
      <div className="w-fit text-white p-2 bg-black rounded-md flex items-center justify-center">
        Hover me to see the tooltip
      </div>
    )
  },
  render: (args) => <Tooltip {...args} />
}
