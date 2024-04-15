import React, { useEffect, useState } from 'react'
import { type TeamMember } from '@utils/types'
import Body1 from '@utils/typography/body1/body1'
import HelperText from '@utils/typography/helpertext/helpertext'
import Member from './Member/Member'

interface MembersRoleManagementProps {
  members: TeamMember[]
  projectId: string
  projectName: string
}

const MembersRoleManagement: React.FC<MembersRoleManagementProps> = ({
  members,
  projectId,
  projectName
}) => {
  const [roles, setRoles] = useState<Array<{ value: string; label: string }>>(
    []
  )
  const [thisMembers, setThisMembers] = useState<TeamMember[]>(
    members.sort((a, b) => a.name.localeCompare(b.name))
  )

  useEffect(() => {
    const uniqueRoles = [
      ...new Map(
        members.map((member) => [
          member.role.id,
          { value: member.role.id, label: member.role.name }
        ])
      ).values()
    ]
    setRoles(uniqueRoles)
    console.log('uniqueRoles', uniqueRoles)
  }, [members])

  const handleRemoveMember = (memberId: string): void => {
    setThisMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== memberId)
    )
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Body1>Team members</Body1>
        <HelperText>Who has access to this workspace.</HelperText>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {thisMembers.map((member) => (
          <Member
            handleRemove={handleRemoveMember}
            projectName={projectName}
            projectId={projectId}
            roles={roles}
            member={member}
            key={member.email}
          />
        ))}
      </div>
    </div>
  )
}

export default MembersRoleManagement
