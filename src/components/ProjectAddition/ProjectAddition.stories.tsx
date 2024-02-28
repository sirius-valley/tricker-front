import { type Meta, type StoryObj } from '@storybook/react'
import { ProjectAddition } from './ProjectAddition'
import WrapperPage from '@components/Wrapper/WrapperPage'

const projects = [
  {
    id: '1',
    name: 'Project 1',
    providerId: '',
    organizationId: '',
    image: '',
    createdAt: new Date(),
    organization: {
      id: '',
      name: '',
      projects: [],
      administrators: [],
      pendingProjects: []
    },
    usersRoles: [],
    projectStages: [],
    issues: [],
    labels: []
  },
  {
    id: '2',
    name: 'Project 2',
    providerId: '',
    organizationId: '',
    image: '',
    createdAt: new Date(),
    organization: {
      id: '',
      name: '',
      projects: [],
      administrators: [],
      pendingProjects: []
    },
    usersRoles: [],
    projectStages: [],
    issues: [],
    labels: []
  },
  {
    id: '3',
    name: 'Project 3',
    providerId: '',
    organizationId: '',
    image: '',
    createdAt: new Date(),
    organization: {
      id: '',
      name: '',
      projects: [],
      administrators: [],
      pendingProjects: []
    },
    usersRoles: [],
    projectStages: [],
    issues: [],
    labels: []
  }
]

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
    handleSelectedProject: {
      control: {
        type: 'function'
      },
      description: 'This function manages the selected projectId value'
    },
    projects: {
      control: {
        type: 'array'
      },
      defaultValue: projects,
      description: 'A list of projects between the user can choose'
    }
  }
}

export default meta

type Story = StoryObj<typeof ProjectAddition>

export const ProjectAdditions: Story = {
  tags: ['autodocs'],
  args: {
    handleToken: () => {},
    handleSelectedProject: () => {},
    projects
  },
  render: (args) => (
    <WrapperPage>
      <ProjectAddition {...args} />
    </WrapperPage>
  )
}
