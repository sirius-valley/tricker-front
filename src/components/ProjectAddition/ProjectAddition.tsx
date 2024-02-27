import Input from '@components/Input/Input'
import SelectInput from '@components/SelectInput/SelectInput'
import H2 from '@utils/typography/h2/h2'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

interface ProjectAdditionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ProjectAddition: React.FC<
  ProjectAdditionProps
> = (): JSX.Element => {
  const [token, setToken] = React.useState<string>('')
  return (
    <div className="flex flex-col items-center justify-center w-[1048px] bg-gray-600 border border-primary-400 py-20 px-[140px] gap-10 rounded-xl">
      <div className="gap-2">
        <H2 className="text-white leading-[41.15px] text-[34px] font-semibold">
          Initial Setup{token}
        </H2>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white leading-[19.36px] text-semibold">
            First, select the Project Management Tool
          </Subtitle>
          <div className="flex flex-col w-full gap-2">
            <SelectInput
              options={[]}
              label="Project Management Tool"
              required
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <Subtitle className="text-white leading-[19.36px] text-semibold">
            Second, add the user token to connect to the API
          </Subtitle>
          <Input
            handleValue={setToken}
            label="User Token"
            required
            className="h-[69px]"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
        </div>
      </div>
    </div>
  )
}
