import { TaskEntity } from './TaskEntity'
import { UserEntity } from './UserEntity'

export type CheckListEntity = {
    id: string
    title: string
    status: string
    createdDate: string
    user: UserEntity
    tasks: TaskEntity[]
}
