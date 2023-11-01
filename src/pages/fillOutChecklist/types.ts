import { ChecklistTaskInfo, Workflow } from '../../services/apiTypes'

export type ReviewProps = {
    workflow: Workflow
    tasks: ChecklistTaskInfo[]
}
