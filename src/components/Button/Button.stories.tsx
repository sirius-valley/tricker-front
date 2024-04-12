import { type Meta, type Story } from '@storybook/react'
import Button, { type ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      defaultValue: 'medium',
      options: ['large', 'medium'],
      control: {
        type: 'radio'
      }
    },
    variant: {
      defaultValue: 'filled',
      options: ['filled', 'outline', 'ghost', 'error'],
      control: {
        type: 'radio'
      }
    },
    icon: {
      control: {
        type: 'select'
      }
    },
    left: {
      control: {
        type: 'boolean'
      },
      description: 'Displays icon to the left of the text.'
    },
    right: {
      control: {
        type: 'boolean'
      },
      description: 'Displays icon to the right of the text.'
    }
  }
}

export default meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default: Story<ButtonProps> = Template.bind({})
Default.args = {
  children: 'Add time',
  icon: undefined
}

export const CustomVariant: Story<ButtonProps> = Template.bind({})
CustomVariant.args = {
  children: 'Add time',
  variant: 'outline',
  icon: 'FeatureIcon'
}

export const Disabled: Story<ButtonProps> = Template.bind({})
Disabled.args = {
  children: 'Add time',
  disabled: true,
  icon: 'FeatureIcon'
}
