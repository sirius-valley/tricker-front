import { type Meta, type StoryObj } from '@storybook/react'
import { ProjectDetails } from './ProjectDetails'
import { SnackBarProvider } from '@components/SnackBarProvider/SnackBarProvider'

const meta: Meta<{
  id: string
  url: string
  name: string
  lastSync: Date
  provider: string
}> = {
  title: 'Components/ProjectDetails',
  component: ProjectDetails,
  decorators: [(Story) => <SnackBarProvider>{Story()}</SnackBarProvider>],
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    layout: 'centered'
  },
  argTypes: {
    id: {
      defaultValue: '0',
      control: {
        type: 'text'
      }
    },
    url: {
      defaultValue: 'https://example.com',
      control: {
        type: 'text'
      }
    },
    name: {
      defaultValue: 'Project Name',
      control: {
        type: 'text'
      }
    },
    lastSync: {
      defaultValue: new Date(),
      control: {
        type: 'date'
      }
    },
    provider: {
      defaultValue: 'Linear',
      control: {
        type: 'text'
      }
    }
  }
}

export default meta

type Story = StoryObj<{
  id: string
  url: string
  name: string
  lastSync: Date
  provider: string
}>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    id: 'scxVXCVASDFasd435GFD56sdsaDhyKJYK7SDhgf',
    url: 'https://example.com',
    name: 'Project Name',
    lastSync: new Date(),
    provider: 'Linear'
  },
  render: (args) => (
    <div className="w-[600px]">
      <ProjectDetails {...args} />
    </div>
  )
}
