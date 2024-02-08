import { type Meta, type StoryObj } from '@storybook/react'
import LabeledButton from './LabeledButton'

const meta: Meta<typeof LabeledButton> = {
  title: 'Components/LabeledButton',
  component: LabeledButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      defaultValue: 'filter',
      description: 'The text inside of the button.',
      control: {
        type: 'text'
      }
    },
    disabled: {
      defaultValue: false,
      description: 'Whether the button is disabled or not.',
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof LabeledButton>

export const Filter: Story = {
  tags: ['autodocs'],
  args: {
    label: 'Filter',
    iconName: 'FilterIcon',
    disabled: false
  },
  render: (args) => <LabeledButton {...args} />
}

export const Add: Story = {
  tags: ['autodocs'],
  args: {
    iconName: 'AddTimeIcon',
    disabled: false
  },
  render: (args) => <LabeledButton {...args} />
}
