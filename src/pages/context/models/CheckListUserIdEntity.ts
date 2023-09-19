import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'

export type ICheckListUserID = {
    id: string
    title: string
    status: string
    createdDate: string
    updatedDate: string
    checklistTasks: TaskEntity[]
}
