import { type Meta, type StoryObj } from '@storybook/react'
import { RadioButton } from './RadioButton'

const meta: Meta<{
  selectedValue: string
}> = {
  title: 'Components/RadioButton',
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'centered'
  },
  argTypes: {
    selectedValue: {
      defaultValue: '0',
      options: ['0', '1', '2'],
      control: {
        type: 'select'
      }
    }
  }
}

export default meta

type Story = StoryObj<{
  selectedValue: string
}>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    selectedValue: '0'
  },
  render: (args) => (
    <>
      <RadioButton
        id={'0'}
        selectedValue={args.selectedValue}
        handleChecked={() => {}}
      />
      <RadioButton
        id={'1'}
        selectedValue={args.selectedValue}
        handleChecked={() => {}}
      />
      <RadioButton
        id={'2'}
        selectedValue={args.selectedValue}
        handleChecked={() => {}}
      />
    </>
  )
}
