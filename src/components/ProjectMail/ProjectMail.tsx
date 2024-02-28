import { useProjectName } from '@redux/hooks'
import H1 from '@utils/typography/h1/h1'
import H2 from '@utils/typography/h2/h2'

export const ProjectAddition = (): JSX.Element => {
  const projectName: string = useProjectName()
  return (
    <div className="flex flex-col items-center justify-center w-[329px] md:w-fit lg:w-[1048px] bg-gray-600 gap-12 md:gap-10 ">
      <div className="flex w-full shadow-2 bg-gray-600/30 border border-primary-400 py-10 px-2 md:py-10 md:px-2 rounded-xl">
        <div className="flex w-full gap-4 px-[136px]">
          <H1 className="lg:text-[34px] leading-[41.15px] text-center text-white font-medium">
            We&apos;ve sent your request to add {projectName} to Tricker!
          </H1>
          <H2 className="text-lg lg:text-[22px] leading-[26.63px] text-center text-white font-medium">
            We&apos;ll notify you by email once the admin approves your request
          </H2>
        </div>
      </div>
    </div>
  )
}
