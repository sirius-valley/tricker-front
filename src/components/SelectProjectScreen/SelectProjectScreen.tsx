import '../../index.css'
import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
import { Tooltip } from '@components/Tooltip/Tooltip'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import Body1 from '@utils/typography/body1/body1'
import H1 from '@utils/typography/h1/h1'

export interface SelectProjectScreenProps {
  token: string
}

const mockedData = [
  {
    id: '1',
    name: 'AProject 1',
    picture: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    name: 'AProject 2',
    picture: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    name: 'BProject 3',
    picture: ''
  }
]

const SelectProjectScreen: React.FC<SelectProjectScreenProps> = ({ token }) => {
  // Technical debt: data fetching

  return (
    <div className="flex flex-col max-w-[1032px] min-h-[500px] border border-primary-400 rounded-xl justify-center items-center bg-gray-600">
      <H1 className="text-white">Select Project</H1>
      <div className="flex flex-col gap-4 items-center w-full p-6">
        <div className="flex gap-1 items-center max-w-[752px] w-full">
          <Body2 className="text-white font-semibold self-start flex">
            Now, select the project you would like to start with
          </Body2>
          <Tooltip
            iconHeight="16"
            iconWidth="16"
            content="If you don't see your team, the token is probably from another workspace. Change your workspace and try again."
          />
        </div>
        <div className="border border-gray-300 py-2 rounded-[8px] max-w-[752px] w-full">
          {mockedData.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-500 cursor-pointer"
            >
              {project.picture && project.picture !== '' ? (
                <img
                  src={project.picture}
                  alt={project.name}
                  className="w-[20px] h-[20px] rounded-sm"
                />
              ) : (
                <NoAvatarProject text={project.name} />
              )}

              <Body1 className="text-white">{project.name}</Body1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectProjectScreen
