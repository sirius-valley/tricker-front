import { TrashIcon } from '@components/Icon'
import ModalRemove from '@components/ModalRemove/ModalRemove'
import NoAvatarProject from '@components/NoAvatar/NoAvatarProject'
import { ProfilePicture } from '@components/ProfilePicture/ProfilePicture'
import { useUser } from '@redux/hooks'
import { type TeamMember } from '@utils/types'
import HelperText from '@utils/typography/helpertext/helpertext'
import Subtitle from '@utils/typography/subtitle/subtitle'
import { useState } from 'react'

interface MemberProps {
  member: TeamMember
  handleRemove: (email: string) => void
}

const Member: React.FC<MemberProps> = ({
  member,
  handleRemove
}: MemberProps): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [userToRemove, setUserToRemove] = useState<string>('')
  const actualUser = useUser()

  const handleOnClick = (userId: string): void => {
    setUserToRemove(userId)
    setOpenModal(!openModal)
  }

  return (
    <div className="flex items-center w-full p-2 rounded-lg bg-gray-500">
      <div className="flex w-full gap-4 items-center">
        {member.profileImage ? (
          <ProfilePicture img={member.profileImage} userName={member.name} />
        ) : (
          <NoAvatarProject
            text={member.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <div className="flex flex-col w-full gap-1">
          <Subtitle className="text-sm">{member.name}</Subtitle>
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
            projectName={'hola'}
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
  )
}

export default Member
