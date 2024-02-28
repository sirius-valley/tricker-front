import ModalRemove from '@components/ModalRemove/ModalRemove'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { ProfileButton } from '@components/ProfileButton/ProfileButton'
import TrashIcon from '@utils/icons/TrashIcon'
import { type User } from '@utils/types'
import H2 from '@utils/typography/h2/h2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React from 'react'

interface TeamMemberManagementProps
  extends React.HTMLAttributes<HTMLDivElement> {
  handleRemainingUsers: (users: User[]) => void
  teamMembers: User[]
  projectName: string
}

export const TeamMemberManagement: React.FC<TeamMemberManagementProps> = ({
  handleRemainingUsers,
  teamMembers,
  projectName
}): JSX.Element => {
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const handleRemove = (userId: string): void => {
    const index = teamMembers.findIndex((member: User) => member.id === userId)
    if (index !== -1) {
      teamMembers.splice(index, 1)
    }
    handleRemainingUsers(teamMembers)
  }
  return (
    <div className="flex flex-col items-center justify-center w-[320px] md:w-fit lg:w-[1032px] bg-gray-600 border border-primary-400 py-4 px-4 md:py-20 md:px-[140px] gap-10 rounded-xl">
      <div className="flex gap-2">
        <H2 className="text-white md:leading-[41.15px] text-[20px] md:text-[34px] whitespace-nowrap md:whitespace-normal font-semibold">
          Team Members
        </H2>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <Subtitle className="text-white text-[14px] whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
              Remove those who shouldn&apos;t have access to Tricker
            </Subtitle>
          </div>
          <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col w-full gap-2">
              {teamMembers.map((member: User) => (
                <div
                  className="flex items-center w-full p-2 gap-4 rounded-lg bg-gray-500"
                  key={member.id}
                >
                  <div className="flex w-full gap-4">
                    {member.profileImage ? (
                      <ProfileButton img={member.profileImage} />
                    ) : (
                      <NoAvatarProject
                        text={member.username}
                        className="w-8 h-8"
                      />
                    )}
                    <div className="flex flex-col w-full gap-1">
                      <Subtitle className="text-white">
                        {member.username}
                      </Subtitle>
                      <HelperText className="text-white truncate max-w-44 md:max-w-none">
                        {member.username.replace(/\s+/g, '').toLowerCase()}
                        @sirius.com.ar
                      </HelperText>
                    </div>
                  </div>
                  <button
                    className="hover:bg-gray-400 rounded-full p-0.5"
                    onClick={() => {
                      setOpenModal(!openModal)
                    }}
                  >
                    <TrashIcon />
                    <ModalRemove
                      memberName={member.username}
                      projectName={projectName}
                      onRemove={() => {
                        handleRemove(member.id)
                      }}
                      onClose={() => {
                        setOpenModal(false)
                      }}
                      show={openModal}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
