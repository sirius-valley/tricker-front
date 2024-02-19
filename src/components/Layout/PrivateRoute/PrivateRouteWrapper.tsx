import { Navigate, Outlet } from 'react-router-dom'

interface PageWrapperProps {
  isLoading: boolean
  isAuthorized: boolean
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  isLoading,
  isAuthorized
}: PageWrapperProps): JSX.Element => {
  if (isLoading) {
    // return <Loader />
  }
  return isAuthorized ? <Outlet /> : <Navigate to="/sign-in" replace />
}

export default PageWrapper
