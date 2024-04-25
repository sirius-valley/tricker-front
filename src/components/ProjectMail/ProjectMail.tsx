import H1 from '@utils/typography/h1/h1'
import H2 from '@utils/typography/h2/h2'

export interface ProjectMailProps {
  projectName: string
  isAdmin: boolean
}

export const ProjectMail: React.FC<ProjectMailProps> = ({
  projectName,
  isAdmin
}: ProjectMailProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center w-[329px] md:w-fit lg:w-[1048px] bg-gray-600 gap-12 md:gap-10 ">
      <div className="flex w-full shadow-2 bg-gray-600/30 border border-primary-400 py-10 px-2 md:py-10 md:px-2 rounded-xl">
        <div className="flex flex-col w-full gap-4 px-4 lg:px-[136px]">
          <H1 className="lg:text-[34px] leading-[41.15px] text-center text-white font-medium">
            We&apos;ve{' '}
            {isAdmin ? `started integrating ` : `sent your request to add `}
            {projectName} into Tricker!
          </H1>
          <H2 className="text-lg lg:text-[22px] leading-[26.63px] text-center text-gray-300 font-medium">
            We&apos;ll notify you via email once the{' '}
            {isAdmin
              ? 'project finish integrating'
              : 'admin approves your request'}
          </H2>
        </div>
      </div>
    </div>
  )
}
