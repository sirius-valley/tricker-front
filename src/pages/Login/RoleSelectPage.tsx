import WrapperPage from '@components/Wrapper/WrapperPage'
import { useNavigate } from 'react-router-dom'
import useScreenSize from '@hooks/useScreenSize'
import RoleButton from '@components/RoleButton/RoleButton'
import Icon from '@components/Icon/Icon'
import Subtitle from '@utils/typography/subtitle/subtitle'
import { setCurrentStep } from '@redux/user'
import { useAppDispatch, useUser } from '@redux/hooks'
import { useGetUserProjects } from '@data-provider/query'
import { useEffect } from 'react'
import { removeLoginCookies } from '@data-provider/Cookies'

const RoleSelectPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data, error } = useGetUserProjects()

  useEffect(() => {
    if (error) navigate('login')
    if (data && data.projectsRoleAssigned.length !== 0) navigate('/')
  }, [data, error, navigate])

  const user = useUser()
  // const screenWidth = useScreenSize().width
  dispatch(setCurrentStep(0))

  useEffect(() => {
    if (user.id === '' || !data) {
      navigate('/login')
    }
    if (user.projectsRoleAssigned.length !== 0) {
      navigate('/')
    }
  }, [user, navigate])

  const handlePmClick = (): void => {
    navigate('/setup')
  }

  const handleMemberClick = (): void => {
    navigate('/login/non-invited')
  }

  const handleLogoutClick = (): void => {
    removeLoginCookies()
    navigate('/login')
  }

  return (
    <WrapperPage>
      {useScreenSize().width < 768 && (
        <button onClick={handleLogoutClick} className="text-white">
          <div className="-rotate-90 top-[2px] absolute left-6 hover:bg-gray-500 rounded-full">
            <Icon name="CaretUpIcon" width="32" height="32" />
          </div>
        </button>
      )}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-center text-2xl font-normal md:hidden flex mb-10">
          What&apos;s your role?
        </h1>
        {useScreenSize().width >= 768 && (
          <div className="flex justify-center self-start pr-2 hover:bg-gray-500 rounded-full mb-4">
            <button
              onClick={handleLogoutClick}
              className="text-white flex items-center gap-2 justify-center"
            >
              <div className="-rotate-90">
                <Icon name="CaretUpIcon" width="32" height="32" />
              </div>
              <Subtitle className="text-xl">Log Out</Subtitle>
            </button>
          </div>
        )}
        <div>
          <div className="flex justify-center w-full md:gap-12 gap-6 md:flex-row flex-col">
            <RoleButton handleClick={handlePmClick}>
              I&apos;m a Project Manager
            </RoleButton>
            <RoleButton handleClick={handleMemberClick}>
              I&apos;m a Team Member
            </RoleButton>
          </div>
        </div>
      </div>
    </WrapperPage>
  )
}

export default RoleSelectPage
