// SearchButton.stories.tsx
import { type Meta, type StoryObj } from '@storybook/react'
import Filter, { type OptionAttr } from './Filter'
import config from '../../../tailwind.config'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const colors = config.theme.extend.colors

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: {
        type: 'boolean'
      }
    },
    statusOptions: {
      control: {
        type: 'object'
      }
    },
    priorityOptions: {
      control: {
        type: 'object'
      }
    },
    handleSelect: {
      action: 'handleSelect'
    },
    handleOutOfEstimation: {
      action: 'handleOutOfEstimation'
    }
  }
}

export default meta

type Story = StoryObj<typeof Filter>

export const Default: Story = {
  args: {
    show: true,
    handleSelect: (options: OptionAttr[]) => {
      console.log(options)
    },
    handleOutOfEstimation: (value: boolean) => {
      console.log('out of estimation ' + value)
    },
    statusOptions: [
      { option: 'Todo', color: colors.white, selected: false },
      {
        option: 'In Progress',
        color: colors.secondary['400'],
        selected: false
      },
      { option: 'In Review', color: colors.tertiary['400'], selected: false },
      { option: 'Completed', color: colors.primary['400'], selected: false },
      {
        option: 'Merged to main',
        color: colors.primary['700'],
        selected: false
      }
    ],
    priorityOptions: [
      { option: 'No priority', icon: 'NoPriorityIcon', selected: false },
      { option: 'Low', icon: 'LowPriorityIcon', selected: false },
      { option: 'Medium', icon: 'MediumPriorityIcon', selected: false },
      { option: 'High', icon: 'HighPriorityIcon', selected: false },
      { option: 'Urgent', icon: 'UrgentIcon', selected: false }
    ],
    asigneeOptions: [
      { option: 'Federico Martucci', selected: false },
      { option: 'Matias Pizzi', selected: false },
      { option: 'Nicolas Flores', selected: false },
      { option: 'Juan Bianchi', selected: false },
      { option: 'Ignacio Ferrari', selected: false }
    ]
  },
  render: (args) => (
    <Provider store={store}>
      <Filter {...args} />
    </Provider>
  )
}
