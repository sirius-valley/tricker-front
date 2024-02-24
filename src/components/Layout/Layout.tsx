import { store } from '@redux/store'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ROUTER } from './Router'

export const Layout = (): JSX.Element => {
  return (
    <Provider store={store}>
      <RouterProvider router={ROUTER} />
    </Provider>
  )
}
