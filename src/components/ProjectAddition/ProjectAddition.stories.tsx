import { type Meta, type StoryObj } from '@storybook/react'
import { ProjectAddition } from './ProjectAddition'
import WrapperPage from '@components/Wrapper/WrapperPage'

const providers = ['Linear', 'Trello', 'Asana', 'Jira']

const meta: Meta<typeof ProjectAddition> = {
  title: 'Components/ProjectAddition',
  component: ProjectAddition,
  tags: ['autodocs'],
  argTypes: {
    handleToken: {
      control: {
        type: 'function'
      },
      description: 'This function manages the token value'
    },
    handleSelectedProvider: {
      control: {
        type: 'function'
      },
      description: 'This function manages the selected provider value'
    },
    providers: {
      control: {
        type: 'array'
      },
      defaultValue: providers,
      description: 'A list of providers between the user can choose'
    }
  }
}

export default meta

type Story = StoryObj<typeof ProjectAddition>

export const ProjectAdditions: Story = {
  tags: ['autodocs'],
  args: {
    handleToken: () => {},
    handleSelectedProvider: () => {},
    providers
  },
  render: (args) => (
    <WrapperPage>
      <ProjectAddition {...args} />
    </WrapperPage>
  )
}
