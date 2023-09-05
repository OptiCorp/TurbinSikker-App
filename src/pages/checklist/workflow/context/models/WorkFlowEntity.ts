export type WorkFlow = {
    id: string
    checklistId: string
    userId: string
    status: number | null
    createdById: string
    updateDate: string
    formattedUpdateDate: string
    checklist: CheckList
}

export type CheckList = {
    azureAdUserId: string
    email: string
    createdBy: string
    firstName: string
    id: string
    lastName: string
    status: number
    title: string
    userRoleId: string
    username: string
    createdByUser: CreatedByUser
    createdDate: string
}

export type CreatedByUser = {
    azureAdUserId: string
    email: string
    firstName: string
    id: string
    lastName: string
    status: number
    userRoleId: string
    username: string
}
