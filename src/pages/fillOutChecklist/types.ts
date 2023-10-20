import { Task, Workflow } from '../../services/apiTypes'

export type UpdatingWorkFlowEntity = {
    id: string
    status: string

    userId: string
}

export type FillOutListProps = {
    tasks: Task[]
    workflow: Workflow
}
