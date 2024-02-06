import { type Meta, type StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'centered'
  },
  argTypes: {
    onChecked: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description: 'Callback when the checkbox is toggled, returning a boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
  tags: ['autodocs'],
  render: (args) => <Checkbox {...args} />
}
