import { type Meta, type StoryObj } from '@storybook/react'
import Filter from './Filter'
import config from '../../../tailwind.config'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { type OptionalIssueFilters } from '@utils/types'

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
    handleFilters: {
      action: 'handleFilters'
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
    handleFilters: (filters: OptionalIssueFilters) => {
      console.log(filters)
    },
    handleOutOfEstimation: (value: boolean) => {
      console.log('out of estimation ' + value)
    },
    statusOptions: [
      { id: '1', option: 'Todo', color: colors.white, selected: false },
      {
        id: '2',
        option: 'In Progress',
        color: '#ccc',
        selected: false
      },
      { id: '3', option: 'In Review', color: '#dedeff', selected: false },
      { id: '4 ', option: 'Completed', color: '#cacaca', selected: false },
      {
        id: '5',
        option: 'Merged to main',
        color: '#193123',
        selected: false
      }
    ],
    priorityOptions: [
      {
        id: '6',
        option: 'No priority',
        icon: 'NoPriorityIcon',
        selected: false
      },
      { id: '7', option: 'Low', icon: 'LowPriorityIcon', selected: false },
      {
        id: '8',
        option: 'Medium',
        icon: 'MediumPriorityIcon',
        selected: false
      },
      { id: '9', option: 'High', icon: 'HighPriorityIcon', selected: false },
      { id: '10', option: 'Urgent', icon: 'UrgentIcon', selected: false }
    ],
    assigneeOptions: [
      { id: '11', option: 'Federico Martucci', selected: false },
      { id: '12', option: 'Matias Pizzi', selected: false },
      { id: '13', option: 'Nicolas Flores', selected: false },
      { id: '14', option: 'Juan Bianchi', selected: false },
      { id: '15', option: 'Ignacio Ferrari', selected: false }
    ]
  },
  render: (args) => (
    <Provider store={store}>
      <Filter {...args} />
    </Provider>
  )
}
