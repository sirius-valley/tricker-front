// import React from 'react';
import { type Meta, type Story } from '@storybook/react'
import Button, { type ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button
}

export default meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

// Basic Button
export const Basic: Story<ButtonProps> = Template.bind({})
Basic.args = {
  children: 'Add time'
}

// Disabled Button
export const Disabled: Story<ButtonProps> = Template.bind({})
Disabled.args = {
  children: 'Add time',
  disabled: true
}

// Customize variant
export const CustomVariant: Story<ButtonProps> = Template.bind({})
CustomVariant.args = {
  children: 'Add time',
  variant: 'outline' // Adjust as needed
}
