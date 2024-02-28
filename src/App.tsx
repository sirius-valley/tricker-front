import { Layout } from '@components/Layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  )
}
export default App
