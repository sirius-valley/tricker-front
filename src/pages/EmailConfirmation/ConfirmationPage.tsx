import Icon from '@components/Icon/Icon'
import WrapperPage from '@components/Wrapper/WrapperPage'
import Body1 from '@utils/typography/body1/body1'
import H2 from '@utils/typography/h2/h2'

interface ConfirmationPageProps {
  decline?: boolean
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  decline = false
}: ConfirmationPageProps): JSX.Element => {
  const username = 'Victoria Capurro'
  // const userImage = null
  const project = 'We Can'
  // const projectImage = null

  return (
    <WrapperPage>
      <div className="flex flex-col md:mb-36">
        <div className="border flex flex-col lg:w-[1000px] md:w-[750px] w-[329px] h-fit bg-gray-600 border-primary-400 p-6 lg:px-[136px] gap-4 rounded-xl shadow-2 items-center justify-center">
          <div className="flex gap-4 items-center justify-center">
            <div
              className={`w-20 h-20 rounded-[40px] bg-primary-200 flex items-center justify-center text-primary-700 p-2`}
            >
              <Body1 className="text-[36px] font-medium leading-[43.57px]">
                {
                  // userImage ||
                  username
                    .split(' ')
                    .map((name) => name.charAt(0).toUpperCase())
                    .join('')
                }
              </Body1>
            </div>
            <Icon name={decline ? 'DeclineIcon' : 'AcceptIcon'} />
            <div
              className={`w-20 h-20 rounded-[40px] bg-primary-200 flex items-center justify-center text-primary-700 p-2`}
            >
              <Body1 className="text-[36px] font-medium leading-[43.57px]">
                {
                  // projectImage ||
                  project
                    .split(' ')
                    .map((name) => name.charAt(0).toUpperCase())
                    .join('')
                }
              </Body1>
            </div>
          </div>
          <H2 className="md:text-[34px] md:leading-[41.15px] w-fit text-xl leading-[24.2px] text-center text-white font-medium">
            You&apos;ve {decline ? 'declined' : 'accepted'} {username}&apos;s
            request to add WeCan to Tricker
          </H2>
          <Body1 className="md:text-[22px] leading-[26.63px] text-center text-gray-300 font-medium">
            We&apos;ll notify her {!decline && 'the next steps'} via email
          </Body1>
        </div>
      </div>
    </WrapperPage>
  )
}

export default ConfirmationPage
