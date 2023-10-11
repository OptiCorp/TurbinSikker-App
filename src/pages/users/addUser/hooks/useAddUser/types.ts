import { Option } from '../../../context/models/OptionsEntity'

export type IUser = {
    status: string
    email: string
    firstName: string
    lastName: string
    id: string
    userRole: { id: string; name: string }
    username: string
    createdDate: string
    updatedDate: string | null
}

export type FormValues = {
    firstName: string
    lastName: string
    userRoleId: string
    email: string
    options: Option
    username: string
    status: string
}
