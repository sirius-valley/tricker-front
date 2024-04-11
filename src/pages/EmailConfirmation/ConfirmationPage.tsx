import Icon from '@components/Icon/Icon'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import WrapperPage from '@components/Wrapper/WrapperPage'
import { useGetEmailInformation } from '@data-provider/query'
import LoadingPage from '@pages/Loader/LoadingPage'
import Body1 from '@utils/typography/body1/body1'
import H2 from '@utils/typography/h2/h2'
import { useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

interface ConfirmationPageProps {
  decline?: boolean
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  decline = false
}: ConfirmationPageProps): JSX.Element => {
  const { showSnackBar } = useSnackBar()
  const [searchParams] = useSearchParams()

  const projectId = searchParams.get('projectId')
  const token = searchParams.get('token')

  const { data, isLoading, error } = useGetEmailInformation(
    projectId || '',
    token || ''
  )

  useEffect(() => {
    if (error) {
      showSnackBar(
        error.message === 'Request failed with status code 401'
          ? 'Your token to accept/decline the project has expired. Please contact support.'
          : error.message,
        'error'
      )
    }
  }, [error, showSnackBar])

  return isLoading ? (
    <div className="bg-gray-700 w-screen h-screen">
      <LoadingPage />
    </div>
  ) : error || !data ? (
    <Navigate to="/login" replace />
  ) : (
    <WrapperPage>
      <div className="flex flex-col md:mb-36">
        <div className="border flex flex-col lg:w-[1000px] md:w-[750px] w-[329px] h-fit bg-gray-600 border-primary-400 p-6 lg:px-[136px] gap-4 rounded-xl shadow-2 items-center justify-center">
          <div className="flex gap-4 items-center justify-center">
            {data.pmImage && data.pmImage !== '' ? (
              <img
                src={data.pmImage}
                alt={data.pmImage}
                className="w-[20px] h-[20px] rounded-sm"
              />
            ) : (
              <div
                className={`w-20 h-20 rounded-[40px] bg-primary-200 flex items-center justify-center text-primary-700 p-2`}
              >
                <Body1 className="text-4xl font-medium leading-[43.57px]">
                  {data.pmName
                    .split(' ')
                    .map((name) => name.charAt(0).toUpperCase())
                    .join('')}
                </Body1>
              </div>
            )}
            <Icon name={decline ? 'DeclineIcon' : 'AcceptIcon'} />
            {data.projectImage && data.projectImage !== '' ? (
              <img
                src={data.projectImage}
                alt={data.projectImage}
                className="w-20 h-20 rounded-[40px]"
              />
            ) : (
              <div
                className={`w-20 h-20 rounded-[40px] bg-primary-200 flex items-center justify-center text-primary-700 p-2`}
              >
                <Body1 className="text-4xl font-medium leading-[43.57px]">
                  {data.projectName
                    .split(' ')
                    .map((name) => name.charAt(0).toUpperCase())
                    .join('')}
                </Body1>
              </div>
            )}
          </div>
          <H2 className="md:text-[34px] md:leading-[41.15px] w-fit text-xl leading-[24.2px] text-center text-white font-medium">
            You&apos;ve {decline ? 'declined' : 'accepted'} {data.pmName}
            &apos;s request to add {data.projectName} to Tricker
          </H2>
          <Body1 className="md:text-[22px] leading-[26.63px] text-center text-gray-300 font-medium">
            We&apos;ll notify them {!decline && 'the next steps'} via email
          </Body1>
        </div>
      </div>
    </WrapperPage>
  )
}

export default ConfirmationPage
