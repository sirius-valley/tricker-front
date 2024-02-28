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
  const [userToRemove, setUserToRemove] = React.useState<string>('')

  const handleRemove = (userId: string): void => {
    const index = teamMembers.findIndex((member: User) => member.id === userId)
    if (index !== -1) {
      teamMembers.splice(index, 1)
    }
    handleRemainingUsers(teamMembers)
  }

  const handleOnClick = (userId: string): void => {
    setUserToRemove(userId)
    setOpenModal(!openModal)
  }

  return (
    <div className="flex flex-col items-center justify-center w-[329px] h-[443px] md:w-fit lg:w-[1032px] bg-gray-600 border border-primary-400 py-10 px-6 md:py-20 md:px-[140px] gap-5 md:gap-10 shadow-2 md:shadow-none rounded-xl">
      <div className="flex gap-2">
        <H2 className="text-white md:leading-[41.15px] md:text-[34px] whitespace-nowrap md:whitespace-normal font-semibold">
          Team Members
        </H2>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col w-full gap-4">
            <Subtitle className="text-white whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
              Remove those who shouldn&apos;t have access to Tricker
            </Subtitle>
          </div>
          <div className="flex flex-col w-full max-h-[233px] gap-6 overflow-y-scroll">
            <div className="flex flex-col w-full gap-2">
              {teamMembers
                .filter((member: User) =>
                  member.email.endsWith('@sirius.com.ar')
                )
                .map((member: User) => (
                  <div
                    className="flex items-center w-full p-2 gap-4 rounded-lg bg-gray-500"
                    key={member.id}
                  >
                    <div className="flex w-full gap-4">
                      {member.profileImage ? (
                        <ProfileButton img={member.profileImage} />
                      ) : (
                        <NoAvatarProject
                          text={member.name}
                          className="w-8 h-8"
                        />
                      )}
                      <div className="flex flex-col w-full gap-1">
                        <Subtitle className="text-white text-sm">
                          {member.name}
                        </Subtitle>
                        <HelperText className="text-white text-sm truncate max-w-40 md:max-w-none">
                          {member.email}
                        </HelperText>
                      </div>
                    </div>
                    <button
                      className="hover:bg-gray-400 rounded-full p-0.5"
                      onClick={() => {
                        handleOnClick(member.id)
                      }}
                    >
                      <TrashIcon />
                      <ModalRemove
                        memberName={member.name}
                        projectName={projectName}
                        onRemove={() => {
                          handleRemove(member.id)
                        }}
                        onClose={() => {
                          setOpenModal(false)
                        }}
                        show={openModal && userToRemove === member.id}
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
