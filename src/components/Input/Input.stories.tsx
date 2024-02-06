import { type Meta, type StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      defaultValue: 'default',
      options: ['default', 'error', 'disabled'],
      control: {
        type: 'select'
      }
    },
    type: {
      defaultValue: ['text'],
      options: ['text', 'password'],
      control: {
        type: 'radio'
      }
    },
    label: {
      defaultValue: 'Input Label Text',
      control: {
        type: 'text'
      }
    },
    helpertext: {
      defaultValue: 'Input Helper Text',
      control: {
        type: 'text'
      }
    },
    placeholder: {
      defaultValue: 'This input is quite long',
      control: {
        type: 'text'
      }
    },
    required: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'default',
    label: 'Input Label Text',
    placeholder: 'This input is quite long',
    helpertext: 'Input Label Text',
    type: 'text',
    required: true,
    icon: ''
  },
  render: (args) => <Input {...args} />
}

export const Disabled: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'disabled',
    label: 'Input Label Text',
    placeholder: 'This input is quite long',
    helpertext: 'Input Label Text',
    type: 'text',
    required: true,
    icon: ''
  },
  render: (args) => <Input {...args} />
}

export const Error: Story = {
  tags: ['autodocs'],
  args: {
    variant: 'error',
    label: 'Input Label Text',
    placeholder: 'This input is quite long',
    helpertext: 'Input Label Text',
    type: 'text',
    required: true,
    icon: ''
  },
  render: (args) => <Input {...args} />
}
