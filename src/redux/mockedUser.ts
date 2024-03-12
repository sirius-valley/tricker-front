import { type User } from '@utils/types'

const mockUser: User = {
  id: 'user123',
  email: 'usuario@example.com',
  name: 'Usuario Ejemplo',
  projectsRoleAssigned: [
    {
      id: 'role1',
      projectId: 'project1',
      project: {
        id: 'project1',
        name: 'Proyecto 1',
        providerId: 'provider123',
        organizationId: 'organization123',
        createdAt: new Date().toISOString(),
        organization: {
          id: 'organization123',
          name: 'Organización 1',
          projects: [],
          administrators: [],
          pendingProjects: []
        },
        usersRoles: [],
        projectStages: [],
        issues: [],
        labels: []
      },
      user: {
        id: 'user123',
        email: 'usuario@example.com',
        name: 'Usuario Ejemplo',
        projectsRoleAssigned: []
      },
      role: {
        id: 'managerRoleId',
        name: 'Project Manager',
        users: []
      }
    },
    {
      id: 'role2',
      projectId: 'project2',
      project: {
        id: 'project2',
        name: 'Proyecto 2',
        providerId: 'provider456',
        organizationId: 'organization456',
        createdAt: new Date().toISOString(),
        organization: {
          id: 'organization456',
          name: 'Organización 2',
          projects: [],
          administrators: [],
          pendingProjects: []
        },
        usersRoles: [],
        projectStages: [],
        issues: [],
        labels: []
      },
      user: {
        id: 'user123',
        email: 'usuario@example.com',
        name: 'Usuario Ejemplo',
        projectsRoleAssigned: []
      },
      role: {
        id: 'managerRoleId',
        name: 'Project Manager',
        users: []
      }
    },
    {
      id: 'role3',
      projectId: 'project3',
      project: {
        id: 'project3',
        name: 'Proyecto 3',
        providerId: 'provider789',
        organizationId: 'organization789',
        createdAt: new Date().toISOString(),
        organization: {
          id: 'organization789',
          name: 'Organización 3',
          projects: [],
          administrators: [],
          pendingProjects: []
        },
        usersRoles: [],
        projectStages: [],
        issues: [],
        labels: []
      },
      user: {
        id: 'user123',
        email: 'usuario@example.com',
        name: 'Usuario Ejemplo',
        projectsRoleAssigned: []
      },
      role: {
        id: 'developerRoleId',
        name: 'Developer',
        users: []
      }
    }
  ]
}

export default mockUser
