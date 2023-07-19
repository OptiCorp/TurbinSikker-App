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
