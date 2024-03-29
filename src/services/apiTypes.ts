export enum ApiStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export enum Status {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
}

export type User = {
    id: string
    azureAdUserId: string
    firstName: string
    lastName: string
    email: string
    username: string
    userRole: string
    status: string
    createdDate: string
    updatedDate: string | null
}

export type PunchItem = {
    id: string
    workflowId: string
    description?: string
    status: string
    severity?: string
    message: string
    createdDate: string
    updatedDate: null | string
    user: User
    checklistTask: {
        id?: string
        description?: string
    }
}

export type Category = {
    id: string
    name: string
    value: string
    label: string
}

export type Checklist = {
    id: string
    workflows: WorkflowResponse[]
    title: string
    status: string
    createdDate: string
    updatedDate: null | string
    user: User
    value: string
    label: string
    checklistTasks: ChecklistTaskInfo[]
}

export type Task = {
    id: string
    description: string
    category: Category
    value: string
    estAvgCompletionTime: number
}

export type ChecklistTaskInfo = {
    id: string
    categoryId: string
    description: string
    category: {
        id: string
        name: string
    }
    estAvgCompletionTime: number
    value?: string
}

export type TaskPicker = {
    id: string
    tasks: Task[]
    value: string
    categoryId: string
    description: string
    category: { id: string; name: string }
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

    user: User
    completionTimeMinutes: string
    taskInfos: {
        taskId: string
        status: string
    }[]
    creator: User
}

export type WorkflowResponse = {
    id: string
    status: string
    createdDate: string
    updatedDate: null | string
    checklist: {
        id: string
        workflows: WorkflowResponse[]
        title: string
        status: string
        createdDate: string
        updatedDate: null | string
        user: User
        value: string
        label: string
        checklistTasks: ChecklistTaskInfo[]
    }
    user: User
    completionTimeMinutes: number
    taskInfos: TaskInfos
    creator: User
    comment: string
}

export type TaskInfos = { [key: string]: string }

export type Invoice = {
    id: string
    title: string
    number: number
    sender: string
    receiver: string
    status: string
    createdDate: string
    sentDate: string
    updatedDate: null | string
    amount: number
    pdf: null | string
    pdfBlobLink: string
    workflows: Workflow[]
    message: string
}

export type Notifications = {
    id: string
    message: string
    notificationStatus: string
    createdDate: string
    updatedDate: string
    notificationType: string
}

export type pubSubToken = {
    token: string
}
