import { IconData } from '@equinor/eds-icons'

export type PunchEntity = {
    id: string
    active: number
    workflowId: string
    creatorId: string
    createdDate: string
    description: string
    severity: string
    status: string
    updatedDate: string | null
    checklistTask: {
        checklistTaskId: string
        checklistWorkflowId: string
        description: string
        category: {
            id: string
            name: string
        }
    }
    createdByUser: {
        firstName: string
        lastName: string
    }
}

export type PunchSeverity = {
    severity: string
    color: string
    icon: IconData
}
