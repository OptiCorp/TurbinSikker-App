import { TaskEntity } from '../../../components/addtasks/context/models/TaskEntity'
import { UserEntity } from '../../users/context/models/UserEntity'

export type CheckListEntity = {
    id: string
    title: string
    status: string
    createdDate: string
    updatedDate: string
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
