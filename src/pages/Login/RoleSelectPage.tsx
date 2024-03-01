import WrapperPage from '@components/Wrapper/WrapperPage'
import { Link } from 'react-router-dom'
import useScreenSize from '@hooks/useScreenSize'
import RoleButton from '@components/RoleButton/RoleButton'
import Icon from '@components/Icon/Icon'
import Subtitle from '@utils/typography/subtitle/subtitle'

const RoleSelectPage = (): JSX.Element => {
  return (
    <WrapperPage>
      {useScreenSize().width < 768 && (
        <Link to="/login" className="text-white">
          <button className="-rotate-90 top-[32px] absolute left-6 hover:bg-gray-500 rounded-full">
            <Icon name="CaretUpIcon" width="32" height="32" />
          </button>
        </Link>
      )}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-center text-2xl font-normal md:hidden flex mb-10">
          What&apos;s your role?
        </h1>
        {useScreenSize().width >= 768 && (
          <div className="flex justify-center self-start pr-2 hover:bg-gray-500 rounded-full mb-4">
            <Link
              to="/login"
              className="text-white flex items-center gap-2 justify-center"
            >
              <button className="-rotate-90">
                <Icon name="CaretUpIcon" width="32" height="32" />
              </button>
              <Subtitle>Back</Subtitle>
            </Link>
          </div>
        )}
        <div>
          <div className="flex justify-center w-full md:gap-12 gap-6 mb-12 md:flex-row flex-col">
            <Link to="/setup" className="text-white">
              <RoleButton handleClick={() => {}}>
                I&apos;m a Project Manager
              </RoleButton>
            </Link>
            <Link to="/login" className="text-white">
              <RoleButton handleClick={() => {}}>
                I&apos;m a Team Member
              </RoleButton>
            </Link>
          </div>
        </div>
      </div>
    </WrapperPage>
  )
}

export default RoleSelectPage
