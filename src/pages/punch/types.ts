import { IconData } from '@equinor/eds-icons'

export type PunchSeverity = {
    severity: string
    color: string
    icon: IconData
}

export interface Punch {
    id: string
    workflowId: string
    checklistTask: ChecklistTask
    user: User
    status: string
    createdDate: string
    updatedDate: string | null
    description: string | undefined
    severity: string
    active: number
    message: string
    uploads: string[] | null
}

export interface ChecklistTask {
    id: string
    categoryId: string
    description: string
    category: Category | null
}

export interface Category {
    id: string
    name: string
}

export interface User {
    id: string
    azureAdUserId: string
    userRoleId: string
    firstName: string
    lastName: string
    email: string
    username: string
    userRole: UserRole
    status: number
    createdDate: string
    updatedDate: string
}

export interface UserRole {
    id: string
    name: string
}
