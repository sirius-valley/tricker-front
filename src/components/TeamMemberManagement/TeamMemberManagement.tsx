import ModalRemove from '@components/ModalRemove/ModalRemove'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { ProfileButton } from '@components/ProfileButton/ProfileButton'
import TrashIcon from '@utils/icons/TrashIcon'
import { type MemberPreIntegrated } from '@utils/types'
import H2 from '@utils/typography/h2/h2'
import HelperText from '@utils/typography/helpertext/helpertext'
import Subtitle from '@utils/typography/subtitle/subtitle'
import React, { useEffect } from 'react'
import { useGetPreIntegratedMembers } from '@data-provider/query'
import Body1 from '@utils/typography/body1/body1'
import NotificationBadge from '@components/NotificationBadge/NotificationBadge'

interface TeamMemberManagementProps
  extends React.HTMLAttributes<HTMLDivElement> {
  handleRemainingUsers: (users: MemberPreIntegrated[]) => void
  projectName: string
  actualUser: MemberPreIntegrated
}

export const TeamMemberManagement: React.FC<TeamMemberManagementProps> = ({
  handleRemainingUsers,
  projectName,
  actualUser
}): JSX.Element => {
  const { data, isLoading, error } = useGetPreIntegratedMembers(projectName)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [userToRemove, setUserToRemove] = React.useState<string>('')
  const [members, setMembers] = React.useState<MemberPreIntegrated[]>([])

  const handleRemove = (userEmail: string): void => {
    if (!data) return
    const index = data?.findIndex(
      (member: MemberPreIntegrated) => member.email === userEmail
    )
    if (index !== -1) {
      data?.splice(index, 1)
    }
    handleRemainingUsers(members)
  }

  useEffect(() => {
    setMembers(data || [])
    handleRemainingUsers(data || [])
  }, [data, handleRemainingUsers])

  const handleOnClick = (userId: string): void => {
    setUserToRemove(userId)
    setOpenModal(!openModal)
  }

  return (
    <>
      {isLoading && <Body1 className="text-white">Loading...</Body1>}
      {!isLoading && (
        <div className="text-white flex flex-col items-center justify-center mx-8 max-h-[505px] md:w-fit lg:w-[1032px] bg-gray-600 shadow-2 md:shadow-none border border-primary-400 py-10 px-6 md:py-20 md:px-[140px] gap-8 md:gap-10 rounded-xl">
          {isLoading && <Body1 className="text-white">Loading...</Body1>}
          {members.length !== 0 && (
            <H2 className="md:leading-[41.15px] md:text-[34px] whitespace-nowrap md:whitespace-normal font-semibold">
              Team Members
            </H2>
          )}
          <div className="flex flex-col w-full items-center">
            {members.length === 0 && !isLoading && !error && (
              <Body1 className="text-white">No members found</Body1>
            )}
            {error && (
              <NotificationBadge
                variant="error"
                className="md:text-[15px] text-[13px]"
              >
                {
                  'Error fetching the members, please try again later or contact support'
                }
              </NotificationBadge>
            )}
            {members.length !== 0 && !isLoading && (
              <div className="flex flex-col w-full gap-4">
                <Subtitle className="whitespace-pre-wrap md:text-base leading-[19.36px] text-semibold">
                  Remove those who shouldn&apos;t have access to Tricker
                </Subtitle>
                <div className="flex flex-col w-full max-h-[233px] overflow-y-scroll">
                  <div className="flex flex-col w-full gap-2">
                    {members
                      ?.filter((member: MemberPreIntegrated) =>
                        member.email.endsWith('@sirius.com.ar')
                      )
                      .map((member: MemberPreIntegrated) => (
                        <div
                          className="flex items-center w-full p-2 rounded-lg bg-gray-500"
                          key={member.email}
                        >
                          <div className="flex w-full gap-4 items-center">
                            {member.profileImage ? (
                              <ProfileButton img={member.profileImage} />
                            ) : (
                              <NoAvatarProject
                                text={member.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                            )}
                            <div className="flex flex-col w-full gap-1">
                              <Subtitle className="text-sm">
                                {member.name}
                              </Subtitle>
                              <HelperText className="text-sm truncate max-w-40 md:max-w-none">
                                {member.email}
                              </HelperText>
                            </div>
                          </div>
                          {member.email !== actualUser.email && (
                            <button
                              className="hover:bg-gray-400 rounded-full p-0.5"
                              onClick={() => {
                                handleOnClick(member.email)
                              }}
                            >
                              <TrashIcon />
                              <ModalRemove
                                memberName={member.name}
                                projectName={projectName}
                                onRemove={() => {
                                  handleRemove(member.email)
                                }}
                                onClose={() => {
                                  setOpenModal(false)
                                }}
                                show={
                                  openModal && userToRemove === member.email
                                }
                              />
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
