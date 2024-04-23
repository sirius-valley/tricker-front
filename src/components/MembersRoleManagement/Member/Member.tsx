import { TrashIcon } from '@components/Icon'
import ModalRemove from '@components/ModalRemove/ModalRemove'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import { useUser } from '@redux/hooks'
import { type TeamMember } from '@utils/types'
import HelperText from '@utils/typography/helpertext/helpertext'
import Subtitle from '@utils/typography/subtitle/subtitle'
import { useEffect, useState } from 'react'
import SelectInput from '@components/SelectInput/SelectInput'
import {
  usePostModifyMemberRole,
  useRemoveTeamMember
} from '@data-provider/query'
import Spinner from '@components/Spinner/Spinner'
import { useSnackBar } from '@components/SnackBarProvider/SnackBarProvider'
import useScreenSize from '@hooks/useScreenSize'

interface MemberProps {
  roles: Array<{
    value: string
    label: string
  }>
  member: TeamMember
  projectName: string
  projectId: string
  handleRemove: (memberId: string) => void
}

const Member: React.FC<MemberProps> = ({
  roles,
  member,
  projectName,
  projectId,
  handleRemove
}: MemberProps): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const actualUser = useUser()

  const { showSnackBar } = useSnackBar()
  const screen = useScreenSize()

  const {
    mutate: mutateRemove,
    isPending: isPendingRemove,
    error: errorRemove,
    isSuccess: isSuccessRemove,
    reset: resetRemove
  } = useRemoveTeamMember()

  const {
    mutate: mutateRole,
    isPending: isPendingRole,
    error: errorRole,
    isSuccess: isSuccessRole,
    reset: resetRole
  } = usePostModifyMemberRole()

  const handleOnClick = (): void => {
    setShowModal(true)
  }

  const handleChangeRole = (roleId: string): void => {
    if (roleId !== '') {
      mutateRole({
        projectId,
        userId: member.id,
        roleId
      })
    }
  }

  const handleRemoveMember = (): void => {
    setShowModal(false)
    mutateRemove({
      projectId,
      userId: member.id
    })
  }

  useEffect(() => {
    if (isSuccessRemove) {
      handleRemove(member.id)
      showSnackBar('Member removed successfully', 'success')
    }
    if (errorRemove) {
      showSnackBar("Member coulnd't be removed", 'error')
    }
    resetRemove()
  }, [isSuccessRemove, errorRemove])

  useEffect(() => {
    if (isSuccessRole) {
      showSnackBar("Member's role updated successfully", 'success')
    }
    if (errorRole) {
      showSnackBar("Member's role coulnd't be updated", 'error')
    }
    resetRole()
  }, [isSuccessRole, errorRole])

  return (
    <div className="flex items-center w-full gap-4 p-2 rounded-lg text-white">
      {isPendingRemove ? (
        <div className="h-[36px] flex w-full items-center justify-center">
          <Spinner variant="white" size={20} />
        </div>
      ) : (
        <>
          <div className="flex w-full gap-4 items-center">
            <div className="min-w-8 min-h-8">
              {member.image ? (
                <ProfilePicture
                  size="md"
                  img={member.image}
                  userName={member.name}
                />
              ) : (
                <NoAvatarProject
                  text={member.name}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Subtitle className="text-sm">{member.name}</Subtitle>
              {screen.width >= 768 && (
                <HelperText className="text-sm truncate">
                  {member.email}
                </HelperText>
              )}
            </div>
          </div>
          {member.email !== actualUser.email && (
            <>
              <div
                className={`${screen.width >= 768 ? 'min-w-[200px]' : 'min-w-[120px]'} h-full flex items-center justify-center`}
              >
                {isPendingRole && <Spinner variant="white" size={20} />}
                <div
                  className="min-w-full h-full items-center flex justify-center"
                  style={isPendingRole ? { display: 'none' } : {}}
                >
                  <SelectInput
                    variant="small"
                    insideLabel={screen.width >= 768 ? 'Role:' : ''}
                    preselectedOption={{
                      value: member.role.id,
                      label: member.role.name
                    }}
                    handleSelectedOption={handleChangeRole}
                    options={roles}
                  />
                </div>
              </div>
              <button
                className="hover:bg-gray-400 rounded-full p-0.5"
                onClick={() => {
                  handleOnClick()
                }}
              >
                <TrashIcon />
              </button>
              <ModalRemove
                memberName={member.name}
                projectName={projectName}
                onRemove={() => {
                  handleRemoveMember()
                }}
                onClose={() => {
                  setShowModal(false)
                }}
                show={showModal}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Member
