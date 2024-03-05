import Icon from '@components/Icon/Icon'
import WrapperPage from '@components/Wrapper/WrapperPage'
import useScreenSize from '@hooks/useScreenSize'
import H2 from '@utils/typography/h2/h2'
import Subtitle from '@utils/typography/subtitle/subtitle'
import { Link } from 'react-router-dom'

const EmptyProjectPage = (): JSX.Element => {
  return (
    <WrapperPage>
      {useScreenSize().width < 768 && (
        <Link to="/login/role" className="text-white">
          <button className="-rotate-90 top-[32px] absolute left-6 hover:bg-gray-500 rounded-full">
            <Icon name="CaretUpIcon" width="32" height="32" />
          </button>
        </Link>
      )}
      <div className="flex flex-col md:mb-36">
        {useScreenSize().width >= 768 && (
          <div className="flex relative -top-[179px] justify-center self-start pr-2 hover:bg-gray-500 rounded-full">
            <Link
              to="/login/role"
              className="text-white flex items-center gap-2 justify-center"
            >
              <button className="-rotate-90">
                <Icon name="CaretUpIcon" width="32" height="32" />
              </button>
              <Subtitle className="text-xl">Back</Subtitle>
            </Link>
          </div>
        )}
        <div className="border flex lg:w-[1048px] lg:h-[162px] md:w-[800px] w-[329px] h-[120px] bg-gray-600 border-primary-400 p-6 gap-2 rounded-xl shadow-2 items-center justify-center">
          <H2 className="md:text-[34px] md:leading-[41.15px] max-w-[650px] w-fit text-xl leading-[24.2px] text-center text-white font-medium">
            Looks like there are no projects with you as a team member yet
          </H2>
        </div>
      </div>
    </WrapperPage>
  )
}

export default EmptyProjectPage
