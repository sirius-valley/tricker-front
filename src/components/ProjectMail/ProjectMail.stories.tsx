import { type Meta, type StoryObj } from '@storybook/react'
import { ProjectMail } from './ProjectMail'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const meta: Meta<typeof ProjectMail> = {
  title: 'Components/ProjectMail',
  component: ProjectMail,
  tags: ['autodocs'],
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>]
}

export default meta

type Story = StoryObj<typeof ProjectMail>

export const ProjectMails: Story = {
  tags: ['autodocs'],
  render: () => (
    <WrapperPage>
      <ProjectMail />
    </WrapperPage>
  )
}
