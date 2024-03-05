import { Navigate, Outlet } from 'react-router-dom'
import Spinner from '@components/Spinner/Spinner'

interface PageWrapperProps {
  isLoading: boolean
  isAuthorized: boolean
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  isLoading,
  isAuthorized
}: PageWrapperProps): JSX.Element => {
  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gray-700 flex items-center justify-center">
        <Spinner variant="primary" size={80} />
      </div>
    )
  }
  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />
}

export default PageWrapper
