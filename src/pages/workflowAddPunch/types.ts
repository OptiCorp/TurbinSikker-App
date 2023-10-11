import { Task, Workflow } from '../../services/apiTypes'

export type UpdatingWorkFlowEntity = {
    id: string
    status: string

    userId: string
}

export type FillOutForm = {
    checklistId: string
    userIds: {
        value: string
        label: string
    }[]
    status: string
}

export type FillOutListProps = {
    workFlow: Workflow
    tasks: Task[]

    onUpdate: (data: {
        id: string

        userId: string
        status: string
    }) => void
}
