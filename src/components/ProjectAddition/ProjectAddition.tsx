import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import useScreenSize from '@hooks/useScreenSize'
import { type Screen } from '@utils/types'
import H2 from '@utils/typography/h2/h2'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

interface ProjectAdditionProps extends React.HTMLAttributes<HTMLDivElement> {
  handleToken: (token: string | null) => void
  handleSelectedProvider: (provider: string) => void
  providers: string[]
}

export const ProjectAddition: React.FC<ProjectAdditionProps> = ({
  handleToken,
  handleSelectedProvider,
  providers
}): JSX.Element => {
  const screen: Screen = useScreenSize()
  const handleInputValue = (token: string | null): void => {
    handleToken(token)
  }
  return (
    <div className="flex flex-col items-center justify-center mx-8 max-h-[420px] md:w-[570px] lg:w-[1000px] bg-gray-600 shadow-2 md:shadow-none border border-primary-400 py-10 px-6 md:py-10 md:px-20 gap-8 md:gap-10 rounded-xl">
      <H2 className="text-white md:leading-[41.15px] text-[24px] md:text-[34px] whitespace-nowrap md:whitespace-normal font-semibold">
        Initial Setup
      </H2>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
            First, select the Project Management Tool
          </Subtitle>
          <div className="flex flex-col w-full gap-2">
            <SelectInput
              handleSelectedOption={handleSelectedProvider}
              options={providers.map((provider: string) => ({
                value: provider,
                label: provider
              }))}
              label="Project Management Tool"
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
            Second, add the user token to connect to the API
          </Subtitle>
          <Input
            handleValue={handleInputValue}
            label="User Token"
            required
            tooltip={`${screen.width >= 768 ? 'You can find this under Team Settings > My Account > API > Personal Api Keys' : ''}`}
            helpertext={`${screen.width < 768 ? 'You can find this under Team Settings > My Account > API > Personal Api Keys' : ''}`}
            className="h-10 md:h-[69px]"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
        </div>
      </div>
    </div>
  )
}
