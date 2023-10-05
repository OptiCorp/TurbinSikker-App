export enum ApiStatus {
    LOADING,
    SUCCESS,
    ERROR,
}

export type User = {
    id: string
    azureAdUserId: string
    firstName: string
    lastName: string
    email: string
    username: string
    userRole: UserRole
    status: string
    createdDate: string
    updatedDate: string | null
}

export type UserRole = {
    id: string
    name: string
}

export type PunchItem = {
    id: string
    workflowId: string
    description: string
    status: string
    severity: string
    message: string
    createdDate: string
    updatedDate: null | string
    user: User
    checklistTask: Task
    // checklistTask: ChecklistTaskEntity
    // uploads: UploadEntity
}

export type Category = {
    id: string
    name: string
}

export type Checklist = {
    id: string
    title: string
    status: string
    createdDate: string
    updatedDate: null | string
    user: User
    task: Task
}

export type Task = {
    id: string
    description: string
    category: Category
}

export type Upload = {
    id: string
    punchId: string
    blobRef: string
    contentType: string
    bytes: string
}

export type Workflow = {
    id: string
    status: string
    createdDate: string
    updatedDate: null | string
    checklist: Checklist
    task: Task
    user: User
    creator: User
}
