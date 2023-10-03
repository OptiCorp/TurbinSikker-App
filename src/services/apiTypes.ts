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
    userRole: {
        id: string
        name: string
    }
    status: string
    createdDate: string
    updatedDate: string | null
    // rest
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
    // checklistTask: ChecklistTaskEntity
    // uploads: UploadEntity
}
