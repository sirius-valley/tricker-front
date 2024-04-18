import '../../index.css'
import React from 'react'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import Body2 from '@utils/typography/body2/body2'
import HelperText from '@utils/typography/helpertext/helpertext'
import { useUser } from '@redux/hooks'
import {
  type MemberPreIntegrated,
  type ProjectPreIntegrated
} from '@utils/types'
import 'react-loading-skeleton/dist/skeleton.css'
import Button from '@components/Button/Button'
import Icon from '@components/Icon/Icon'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import Subtitle from '@utils/typography/subtitle/subtitle'
import ModalRemove from '@components/ModalRemove/ModalRemove'
import TrashIcon from '@utils/icons/TrashIcon'
import Spinner from '@components/Spinner/Spinner'

export interface SelectMembersProps {
  apiKey: { provider: string; value: string }
  project: ProjectPreIntegrated
  members: MemberPreIntegrated[]
  handleContinue: (members: MemberPreIntegrated[]) => void
  onClose: () => void
  goBack: () => void
  isLoading: boolean
}

const SelectMembers: React.FC<SelectMembersProps> = ({
  project,
  members,
  goBack,
  onClose,
  handleContinue,
  isLoading
}) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [userToRemove, setUserToRemove] = React.useState<string>('')
  const [selectedMembers, setSelectedMembers] =
    React.useState<MemberPreIntegrated[]>(members)

  const currentUser = useUser()

  const handleRemove = (userEmail: string): void => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.email !== userEmail)
    )
  }

  const setInitialValues = (): void => {
    setSelectedMembers(members)
  }

  const handleOnClick = (userId: string): void => {
    setUserToRemove(userId)
    setOpenModal(!openModal)
  }

  return (
    <div className="max-w-[539px] w-full min-w-[310px] h-fit bg-gray-500 border border-gray-300 px-8 py-6 rounded-xl shadow-lg text-white items-center">
      {isLoading ? (
        <div className="flex w-full min-h-[350px] items-center justify-center">
          <Spinner variant="primary" size={50} />
        </div>
      ) : (
        <>
          <div className="flex justify-between w-[100%]">
            <h5 className="font-normal mb-2" style={{ fontSize: '24px' }}>
              Add New Project
            </h5>
            <button className="hidden sm:block" onClick={onClose}>
              <Icon name="DismissIcon" />
            </button>
          </div>
          <Body2 className="text-sm font-normal mb-6">
            Disallow access for those who shouldn&apos;t have it on Tricker.
          </Body2>
          <div className="flex flex-col w-full gap-4">
            <div className="overflow-y-scroll max-h-[233px] py-2 rounded-[8px] w-full">
              {selectedMembers
                ?.filter((member: MemberPreIntegrated) =>
                  member.email.endsWith('@sirius.com.ar')
                )
                .map((member: MemberPreIntegrated) => (
                  <div
                    className="flex items-center p-2 w-full gap-2 rounded-lg bg-gray-500"
                    key={member.providerId}
                  >
                    <div className="flex w-full gap-4 items-center">
                      {member.profileImage ? (
                        <div className="min-w-[32px]">
                          <ProfilePicture
                            img={member.profileImage}
                            userName={member.name}
                          />
                        </div>
                      ) : (
                        <div className="min-w-[32px]">
                          <NoAvatarProject
                            text={member.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <div className="flex flex-col w-full gap-1 overflow-auto">
                        <Subtitle className="text-sm truncate">
                          {member.name}
                        </Subtitle>
                        <HelperText className="text-sm truncate">
                          {member.email}
                        </HelperText>
                      </div>
                      {member.email !== currentUser.email && (
                        <button
                          className="hover:bg-gray-400 rounded-full p-0.5"
                          onClick={() => {
                            handleOnClick(member.email)
                          }}
                        >
                          <TrashIcon />
                          <ModalRemove
                            memberName={member.name}
                            projectName={project.name}
                            onRemove={() => {
                              handleRemove(member.email)
                            }}
                            onClose={() => {
                              setOpenModal(false)
                            }}
                            show={openModal && userToRemove === member.email}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-6">
            <Button
              variant="outline"
              size={'large'}
              className="h-[56px] w-[313px]"
              onClick={() => {
                setInitialValues()
                goBack()
              }}
            >
              Back
            </Button>
            <Button
              variant="filled"
              size={'large'}
              className="h-[56px] w-[313px] text-black"
              onClick={() => {
                handleContinue(selectedMembers)
              }}
            >
              Continue to project
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default SelectMembers
