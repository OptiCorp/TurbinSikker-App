import { Task, TaskInfos, Workflow } from '../../services/apiTypes'

export type FillOutListProps = {
    workflow: Workflow
    tasks: Task[]
    taskInfo: TaskInfos
}
export type ReviewProps = {
    workflow: Workflow
    tasks: Task[]
}
