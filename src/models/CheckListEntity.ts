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

// export type CheckListEntity = {
//     id: string
//     title: string
//     status: string
//     createdDate: string
//     user: {
//         createdDate: string

//         email: string
//         firstName: string
//         id: string
//         lastName: string
//         status: number
//         updatedDate: string
//         userRole: null
//         userRoleId: string
//         username: string
//     }
// }
