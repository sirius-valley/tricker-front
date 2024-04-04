import { type Meta, type StoryObj } from '@storybook/react'
import DatePicker from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    },
    required: {
      control: {
        type: 'boolean'
      }
    },
    helperText: {
      control: {
        type: 'text'
      }
    },
    handleSelectedDate: {
      action: 'handleSelectedDate'
    }
  }
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  tags: ['autodocs'],
  args: {
    label: 'Date',
    required: true,
    helperText: '',
    handleSelectedDate: () => {}
  },
  render: (args) => (
    <div className="min-h-[380px] flex items-end">
      <DatePicker {...args} />
    </div>
  )
}
