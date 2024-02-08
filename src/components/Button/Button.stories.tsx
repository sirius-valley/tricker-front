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
      options: ['filled', 'outline', 'ghost'],
      control: {
        type: 'radio'
      }
    }
  }
}

export default meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

// Default Button
export const Default: Story<ButtonProps> = Template.bind({})
Default.args = {
  children: 'Add time',
  icon: 'FeatureIcon'
}

// Customize variant
export const CustomVariant: Story<ButtonProps> = Template.bind({})
CustomVariant.args = {
  children: 'Add time',
  variant: 'outline', // Adjust as needed
  icon: 'FeatureIcon'
}

// Disabled Button
export const Disabled: Story<ButtonProps> = Template.bind({})
Disabled.args = {
  children: 'Add time',
  disabled: true,
  icon: 'FeatureIcon'
}
