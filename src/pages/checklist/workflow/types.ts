import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import { UserEntity } from 'src/pages/users/context/models/UserEntity'

export type WorkFlow = {
    id: string

    userId: string
    status: string
    createdById: string
    createdDate: string
    updatedDate: string
    formattedUpdateDate: string
    checklist: CheckList
    user: UserEntity
    creator: Creator
}

export type AllWorkFlows = {
    id: string

    userId: string
    createdById: string
    status: string
    createdDate: string
    updatedDate: string
    formattedUpdateDate: string
    checklist: CheckList
    user: UserEntity
    creator: Creator
}

export type CheckList = {
    azureAdUserId: string
    email: string
    createdBy: string
    firstName: string
    id: string
    lastName: string
    status: string
    title: string
    userRoleId: string
    username: string
    createdByUser: CreatedByUser
    checklistTasks: TaskEntity[]
    createdDate: string
}

export type CreatedByUser = {
    id: string
    azureAdUserId: string
    email: string
    firstName: string

    lastName: string
    status: string
    userRoleId: string
    userRole: { id: string; name: string }
    username: string
    createdDate: string
    updatedDate: string
}

export type Creator = {
    id: string
    azureAdUserId: string
    userRoleId: string
    userRole: { id: string; name: string }
    email: string
    firstName: string
    lastName: string
    status: string
    createdDate: string
    updatedDate: string
}
