import LoginPage from '@pages/Login/LoginPage'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import NavBar from '@components/NavBar/NavBar'

const WithNav = (): JSX.Element => {
  // add logic to change between navbar and sidebar depending on screen size
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export const ROUTER = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    element: <WithNav />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/'
            // element: <HomePage />,
          }
        ]
      }
    ]
  }
])
