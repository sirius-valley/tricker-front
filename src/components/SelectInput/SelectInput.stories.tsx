import { type Meta, type Story } from '@storybook/react'
import SelectInput, { type SelectInputProps } from './SelectInput'

const meta: Meta<SelectInputProps> = {
  title: 'Components/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      defaultValue: 'default',
      options: ['default', 'error', 'disabled'],
      control: { type: 'select' }
    },
    label: {
      defaultValue: 'Select Label Text',
      control: { type: 'text' }
    },
    required: {
      defaultValue: true,
      control: { type: 'boolean' }
    },
    helperText: {
      defaultValue: 'Select Helper Text',
      control: { type: 'text' }
    }
  }
}

export default meta

const Template: Story<SelectInputProps> = (args) => <SelectInput {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'default',
  label: 'Input Label Text',
  required: true,
  helperText: 'Select Helper Text',
  icon: 'CaretDownIcon',
  options: [
    { value: 'Selected item title 1', label: 'Selected item title 1' },
    { value: 'Selected item title 2', label: 'Selected item title 2' },
    { value: 'Selected item title 3', label: 'Selected item title 3' }
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  variant: 'disabled',
  label: 'Input Label Text',
  required: true,
  helperText: 'Select Helper Text',
  icon: 'CaretDownIcon',
  options: [
    { value: 'option1', label: 'Selected item title 1' },
    { value: 'option2', label: 'Selected item title 2' },
    { value: 'option3', label: 'Selected item title 3' }
  ]
}

export const Error = Template.bind({})
Error.args = {
  variant: 'error',
  label: 'Input Label Text',
  required: true,
  helperText: 'Select Helper Text',
  icon: 'CaretDownIcon',
  options: [
    { value: 'option1', label: 'Selected item title 1' },
    { value: 'option2', label: 'Selected item title 2' },
    { value: 'option3', label: 'Selected item title 3' }
  ]
}
