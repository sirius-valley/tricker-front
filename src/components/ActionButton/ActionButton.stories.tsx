import { type Meta, type StoryObj } from '@storybook/react'
import ActionButton from './ActionButton'

const meta: Meta<typeof ActionButton> = {
  title: 'Components/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      defaultValue: 'filter',
      description: 'Button type.',
      control: {
        option: ['add', 'filter']
      }
    },
    disabled: {
      defaultValue: false,
      description: 'Whether the button is disabled or not.',
      control: {
        type: 'boolean'
      }
    },
    onClick: {
      table: {
        type: {
          summary: 'function'
        }
      },
      description: 'Callback that is called when the button is clicked.'
    }
  }
}

export default meta

type Story = StoryObj<typeof ActionButton>

export const Filter: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'filter',
    disabled: false
  },
  render: (args) => <ActionButton {...args} />
}

export const Add: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'add',
    disabled: false
  },
  render: (args) => <ActionButton {...args} />
}
