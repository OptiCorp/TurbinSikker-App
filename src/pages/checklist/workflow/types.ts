import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import { UserEntity } from 'src/pages/users/context/models/UserEntity'

export type WorkFlow = {
    id: string
    checklistId: string
    userId: string
    status: number | null
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
    checklistId: string
    userId: string
    createdById: string
    status: number | null
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
    status: number
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
    status: number
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
    status: number
    createdDate: string
    updatedDate: string
}
