export enum ApiStatus {
    LOADING,
    SUCCESS,
    ERROR,
}

export type UserEntity = {
    id: string
    username: string
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
    user: UserEntity
    // checklistTask: ChecklistTaskEntity
    // uploads: UploadEntity
}
