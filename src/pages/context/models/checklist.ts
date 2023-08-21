import { CheckListEntity } from './CheckListEntity'

export const checkList: CheckListEntity = {
    id: '',
    title: '',
    status: '',
    createdDate: '',
    user: {
        createdDate: '',
        checklistWorkFlow: {
            id: '',
            checklistId: '',
            status: '',
            updatedDate: '',
            userId: '',
        },
        email: '',
        firstName: '',
        id: '',
        lastName: '',
        status: '',
        updatedDate: '',
        userRole: {
            id: '',
            name: '',
        },
        userRoleId: '',
        username: '',
        AzureAdUser: '',
    },
    tasks: [],
    updatedDate: '',
}
