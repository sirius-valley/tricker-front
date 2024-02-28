// import { Layout } from '@components/Layout/Layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'

const queryClient = new QueryClient()

function App(): JSX.Element {
  const { showSnackBar } = useSnackBar()

  const handleError = (): void => {
    showSnackBar('El usuario no pertenece a la org', 'error')
  }
  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={handleError}>Show Error Snackbar</button>
    </QueryClientProvider>
  )
}
export default App
