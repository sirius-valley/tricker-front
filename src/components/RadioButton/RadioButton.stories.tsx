import { type Meta, type StoryObj } from '@storybook/react'
import { RadioButton } from './RadioButton'

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
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
      description: 'Callback when the RadioButton is toggled, returning a boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof RadioButton>

export const Primary: Story = {
  tags: ['autodocs'],
  render: (args) => <RadioButton {...args} />
}
