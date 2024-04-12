import { type Meta, type StoryObj } from '@storybook/react'
import { MyProjectSelect } from './MyProjectSelection'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const meta: Meta<typeof MyProjectSelect> = {
  title: 'Components/MyProjectSelection',
  component: MyProjectSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    )
  ],
  argTypes: {
    options: {
      control: {
        type: 'array'
      },
      description: 'Projects that the user belongs.'
    },
    preselectedOption: {
      control: {
        type: 'object'
      },
      description: "Preselected project when you enter to 'My Projects'."
    },
    handleSelect: {
      control: {
        type: 'function'
      },
      description: 'Callback to select a project.'
    }
  }
}

export default meta

type Story = StoryObj<typeof MyProjectSelect>

export const Primary: Story = {
  tags: ['autodocs'],
  args: {
    options: [
      {
        id: '1',
        title: 'WeCan',
        image: 'https://via.placeholder.com/20'
      },
      {
        id: '2',
        title: 'Bonterms',
        image: 'https://via.placeholder.com/20'
      },
      {
        id: '3',
        title: 'Tricker',
        image: 'https://via.placeholder.com/20'
      },
      {
        id: '4',
        title: 'Hospital Patagonia',
        image: 'https://via.placeholder.com/20'
      }
    ],
    preselectedOption: {
      id: '1',
      title: 'WeCan',
      image: 'https://via.placeholder.com/20'
    },
    handleSelect: () => {}
  },
  render: (args) => (
    <Provider store={store}>
      <MyProjectSelect {...args} />
    </Provider>
  )
}
