import { Layout } from '@components/Layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Provider } from 'react-redux'
import { store } from '@redux/store'

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </QueryClientProvider>
  )
}
export default App
