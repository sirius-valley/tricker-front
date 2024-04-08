import WrapperPage from '@components/Wrapper/WrapperPage'
import H2 from '@utils/typography/h2/h2'

interface ConfirmationPageProps {
  decline?: boolean
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  decline = false
}: ConfirmationPageProps): JSX.Element => {
  return (
    <WrapperPage>
      <div className="flex flex-col md:mb-36">
        <div className="border flex lg:w-[1000px] lg:h-[162px] md:w-[750px] w-[329px] h-[120px] bg-gray-600 border-primary-400 p-6 gap-2 rounded-xl shadow-2 items-center justify-center">
          <H2 className="md:text-[34px] md:leading-[41.15px] max-w-[650px] w-fit text-xl leading-[24.2px] text-center text-white font-medium">
            You&apos;ve {decline ? 'declined' : 'accepted'} Victoria
            Capurro&apos;s request to add WeCan to Tricker
          </H2>
        </div>
      </div>
    </WrapperPage>
  )
}

export default ConfirmationPage
