import { IconData } from '@equinor/eds-icons'

export type PunchEntity = {
    id: string
    active: number
    checklistWorkflowId: string
    createdBy: string
    createdDate: string
    punchDescription: string
    severity: number
    status: string
    updatedDate: string | null
    checklistTask: {
        checklistTaskId: string
        checklistWorkflowId: string
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
    severity: number
    color: string
    icon: IconData
}
