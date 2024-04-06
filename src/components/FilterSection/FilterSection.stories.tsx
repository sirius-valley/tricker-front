import { type Meta, type StoryObj } from '@storybook/react'
import FilterSection from './FilterSection'
import { type OptionalIssueFilters } from '@utils/types'

const meta: Meta<typeof FilterSection> = {
  title: 'Components/FilterSection',
  component: FilterSection,
  tags: ['autodocs'],
  argTypes: {
    handleFilters: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage selected filters.'
    },
    handleSearch: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage searched ticket.'
    },
    handleOutOfEstimation: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage out of estimation filter.'
    },
    handleView: {
      control: {
        type: 'function'
      },
      description: 'Callback to manage grid or list view.'
    }
  }
}

export default meta

type Story = StoryObj<typeof FilterSection>

export const DefaultFilterSection: Story = {
  tags: ['autodocs'],
  args: {
    handleFilters: function (filters: OptionalIssueFilters): void {
      console.log(filters)
    },
    handleSearch: function (searchedValue: string): void {
      console.log(searchedValue)
    },
    handleOutOfEstimation: function (isOutOfEst: boolean): void {
      console.log(isOutOfEst)
    },
    handleView: function (view: 'grid' | 'list'): void {
      console.log(view)
    }
  },
  render: (args) => (
    <div className="h-screen w-screen bg-gray-700">
      <FilterSection {...args} />
    </div>
  )
}
