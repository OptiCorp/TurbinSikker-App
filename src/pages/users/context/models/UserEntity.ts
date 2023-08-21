export type UserEntity = {
    checklistWorkFlow: {
        id: string
        checklistId: string
        status: string
        updatedDate: string
        userId: string
    }

    createdDate: string
    email: string
    firstName: string
    id: string
    lastName: string
    status: string
    updatedDate: string
    userRole: { id: string; name: string }
    userRoleId: string
    AzureAdUser: string
    username: string
}
