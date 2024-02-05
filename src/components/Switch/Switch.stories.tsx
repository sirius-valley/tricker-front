import { type Meta, type StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
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
      description: 'Callback when the switch is toggled, returns a Boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof Switch>

export const Primary: Story = {
  tags: ['autodocs'],
  render: (args) => <Switch {...args} />
}
