import { API_URL } from '../config'
import { pca } from '../msalconfig'
import {
    Category,
    Checklist,
    PunchItem,
    Task,
    Upload,
    User,
    UserRole,
    Workflow,
} from './apiTypes'

const request = {
    scopes: ['cc0af56e-ee49-46ce-aad6-010dce5bcbb6/User.Read'],
    account: pca.getAllAccounts()[0],
}

const apiService = () => {
    // Generic function for get requests
    const getByFetch = async (url: string): Promise<any> => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const getOperation = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, getOperation)
            if (res.ok) {
                const jsonResult = await res.json()
                const resultObj = jsonResult
                return resultObj
            } else {
                console.error('Get by fetch failed. Url=' + url, res)
            }
        })
    }

    // Generic function for post requests
    const postByFetch = async (url: string, bodyData?: any): Promise<any> => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const postOperation = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(bodyData),
            }
            const res = await fetch(`${API_URL}/${url}`, postOperation)
            if (res.ok) {
                const jsonResult = await res.json()
                const resultObj = jsonResult
                return resultObj
            } else {
                console.error('Post by fetch failed. Url=' + url, res)
            }
        })
    }

    // Generic function for put requests
    const putByFetch = async (url: string, bodyData: any): Promise<any> => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const putOperations = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(bodyData),
            }
            const res = await fetch(`${API_URL}/${url}`, putOperations)
            if (res.ok) {
                const jsonResult = await res.json()
                const resultObj = jsonResult
                return resultObj
            } else {
                console.error('Put by fetch failed. Url=' + url, res)
            }
        })
    }

    // Generic function for delete requests
    const deleteByFetch = async (url: string): Promise<any> => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const deleteOperation = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, deleteOperation)
            if (res.ok) {
                const jsonResult = await res.json()
                const resultObj = jsonResult
                return resultObj
            } else {
                console.error('Delete by fetch failed. Url=' + url, res)
            }
        })
    }

    // User

    const getAllUsers = async (): Promise<User> => {
        const data = await getByFetch('GetAllUsers')
        return data
    }

    const getAllUsersAdmin = async (): Promise<User> => {
        const data = await getByFetch('GetAllUsersAdmin')
        return data
    }

    const getUser = async (id: string): Promise<User> => {
        const data = await getByFetch(`GetUser?id=${id}`)
        return data
    }

    const getUserByAzureAdUserId = async (id: string) => {
        const data = await getByFetch(
            `GetUserByAzureAdUserId?azureAdUserId=${id}`
        )
        return data
    }

    const getUserByUserName = async (username: string): Promise<User> => {
        const data = await getByFetch(`GetUserByUserName?username=${username}`)
        return data
    }

    const addUser = async (
        user: Omit<
            User,
            'id' | 'status' | 'userRole' | 'createdDate' | 'updatedDate'
        >
    ): Promise<void> => {
        await postByFetch('AddUser', {
            user,
        })
    }

    const updateUser = async (
        id: string,
        firstName: string,
        lastName: string,
        update: Partial<
            Omit<
                User,
                'id' | 'firstName' | 'lastName' | 'createdDate' | 'updateDate'
            >
        >
    ): Promise<void> => {
        await postByFetch('UpdateUser', {
            id: id,
            firstName: firstName,
            lastName: lastName,
            ...update,
        })
    }

    const softDeleteUser = async (id: string): Promise<void> => {
        await deleteByFetch(`SoftDeleteUser?id=${id}`)
    }

    const hardDeleteUser = async (id: string): Promise<void> => {
        await deleteByFetch(`HardDeleteUser?id=${id}`)
    }

    // user role

    const getAllUserRoles = async (): Promise<UserRole> => {
        const data = await getByFetch('GetAllUserRoles')
        return data
    }

    const getUserRole = async (id: string): Promise<UserRole> => {
        const data = await getByFetch(`GetUserRole?id=${id}`)
        return data
    }

    const addUserRole = async (
        userRole: Pick<UserRole, 'name'>
    ): Promise<void> => {
        await postByFetch('AddUserRole', {
            userRole,
        })
    }

    const updateUserRole = async (id: string, name: string): Promise<void> => {
        await postByFetch('UpdateUserRole', {
            id: id,
            name: name,
        })
    }

    const deleteUserRole = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteUserRole?id=${id}`)
    }

    // checklist

    const getAllCheckLists = async (): Promise<Checklist> => {
        const data = await getByFetch(`GetAllChecklists`)
        return data
    }

    const getChecklist = async (checklistId: string): Promise<Checklist> => {
        const data = await getByFetch(`GetChecklist?id=${checklistId}`)
        if (!checklistId) {
            throw new Error('An error occurred, please try again')
        }
        return data
    }

    const getAllChecklistsByUserId = async (
        userId: string
    ): Promise<Checklist[]> => {
        const data = await getByFetch(`GetAllChecklistsByUserId?id=${userId}`)
        if (!userId) {
            throw new Error('An error occurred, please try again')
        }
        return data
    }

    const getChecklistByName = async (
        searchString: string
    ): Promise<Checklist> => {
        const data = await getByFetch(
            `GetChecklistsByName?searchString=${searchString}`
        )
        if (!searchString) {
            throw new Error('An error occurred, please try again')
        }
        return data
    }

    const addChecklist = async (
        creatorId: string,
        title: string
    ): Promise<{ id: string }> => {
        try {
            const response = await postByFetch('AddChecklist', {
                creatorId: creatorId,
                title: title,
            })

            return response
        } catch (error) {
            console.error('Error creating checklist:', error)
            throw error
        }
    }
    // AddChecklistWithTasks

    const updateChecklist = async (
        id: string,
        title: string,
        status: string
    ): Promise<void> => {
        await postByFetch('UpdateChecklist', {
            id: id,
            title: title,
            status: status,
        })
    }

    const deleteChecklist = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteChecklist?id=${id}`)
    }

    // Workflow

    const getAllWorkflows = async (): Promise<Workflow[]> => {
        const data = await getByFetch('GetAllWorkflows')

        return data
    }

    const getWorkflow = async (workflowId: string): Promise<Workflow> => {
        const data = await getByFetch(`GetWorkflow?id=${workflowId}`)

        if (!workflowId) {
            throw new Error('An error occurred, please try again')
        }
        return data
    }

    const getAllWorkflowsByUserId = async (
        userId: string
    ): Promise<Workflow[]> => {
        const data = await getByFetch(
            `GetAllWorkflowsByUserId?userId=${userId}`
        )
        return data
    }

    const createWorkflow = async (
        workflow: Pick<Workflow, 'checklist' | 'creator'>,
        userIds: string[]
        /* checklistId: string,
        userIds: [],
        creatorId: string */
    ): Promise<void> => {
        await postByFetch('CreateWorkflow', {
            workflow,
            userIds: userIds,
            /* checklistId: checklistId,
            userIds: userIds,
            creatorId: creatorId, */
        })
    }

    const updateWorkflow = async (id: string): Promise<void> => {
        await postByFetch('Update', {
            id: id,
        })
    }

    // const updateWorkflow = async (
    //     update: Pick<Workflow, 'id' | 'user' | 'status'>
    // ): Promise<void> => {
    //     await putByFetch('UpdateWorkflow', {
    //         update,
    //     })
    // }

    const deleteWorkflow = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteWorkflow?id=${id}`)
    }

    // Checklist Task

    const getAllTasks = async (): Promise<Task> => {
        const data = await getByFetch('GetAllTasks')
        return data
    }

    const getTask = async (id: string): Promise<Task> => {
        const data = await getByFetch(`GetTask?id=${id}`)
        return data
    }

    const getAllTasksByCategoryId = async (
        categoryId: string
    ): Promise<Task[]> => {
        const response = await getByFetch(
            `GetAllTasksByCategoryId?id=${categoryId}`
        )
        return response
    }

    const getAllTasksByChecklistId = async (id: string): Promise<Task> => {
        const data = await getByFetch(`GetAllTasksByChecklistId?id=${id}`)
        return data
    }

    const getTasksByDescription = async (
        searchString: string
    ): Promise<Task> => {
        const data = await getByFetch(
            `GetTasksByDescription?searchString=${searchString}`
        )
        return data
    }

    // const addTask = async (
    //     task: Pick<Task, 'category' | 'description'>
    // ): Promise<void> => {
    //     await postByFetch('AddTask', {
    //         task,
    //     })
    // }

    const addTask = async (
        categoryId: string,
        description: string
    ): Promise<void> => {
        await postByFetch('AddTask', {
            categoryId: categoryId,
            description: description,
        })
    }

    // const updateTask = async (
    //     // checklistId: string,
    //     //  update: Task
    //     id: string,
    //     categoryId: string,
    //     description: string
    //     // checklistId: string
    // ): Promise<void> => {
    //     await postByFetch('UpdateTask', {
    //         checklistId: checklistId,
    //         ...update,
    //         /* id: id,
    //         categoryId: categoryId,
    //         description: description,
    //         checklistId: checklistId, */
    //     })
    // }

    const updateTask = async (
        id: string,
        categoryId: string,
        description: string,
        checklistId: string
    ): Promise<void> => {
        await postByFetch('UpdateTask', {
            id: id,
            categoryId: categoryId,
            description: description,
            checklistId: checklistId,
        })
    }

    const addTaskToChecklist = async (
        id: string,
        checklistId: string
    ): Promise<void> => {
        await postByFetch('AddTaskToChecklist', {
            id: id,
            checklistId: checklistId,
        })

    }

    // const addTaskToChecklist = async (
    //     checklistId: string,
    //     task: Pick<Task, 'id'> /* id: string, checklistId: string */
    // ): Promise<void> => {
    //     await postByFetch('AddTaskToChecklist', {
    //         checklistId: checklistId,
    //         ...task,
    //         /* id: id,
    //         checklistId: checklistId, */
    //     })
    // }

    const deleteTask = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteTask?id=${id}`)
    }

    // Category

    const getAllCategories = async (): Promise<Category[]> => {
        const data = await getByFetch('GetAllCategories')
        return data
    }

    const getCategory = async (id: string): Promise<Category> => {
        const data = await getByFetch(`GetCategory?id=${id}`)
        return data
    }

    const getCategoriesByName = async (
        searchString: string
    ): Promise<Category> => {
        const data = await getByFetch(
            `GetCategoriesByName?searchString=${searchString}`
        )
        return data
    }

    const addCategory = async (
        category: Pick<Category, 'name'> /* name: string */
    ): Promise<void> => {
        await postByFetch(`AddCategory`, {
            category,
            /* name: name, */
        })
    }

    const updateCategory = async (update: Category): Promise<void> => {
        await postByFetch('UpdateCategory', {
            update,
        })
    }

    const deleteCategory = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteCategory?id=${id}`)
    }

    // punch
    const getAllPunches = async (): Promise<PunchItem> => {
        const data = await getByFetch('GetAllPunches')
        return data
    }

    const getPunch = async (id: string): Promise<PunchItem> => {
        const data = await getByFetch(`GetPunch?id=${id}`)
        return data
    }

    const getPunchesByWorkflowId = async (id: string): Promise<PunchItem> => {
        const data = await getByFetch(`GetPunchesByWorkflowId?workflowId=${id}`)
        return data
    }

    const getPunchInspectorId = async (id: string): Promise<PunchItem[]> => {
        const data = await getByFetch(`GetPunchesByInspectorId?id=${id}`)
        return data
    }

    const getPunchByLeaderId = async (id: string): Promise<PunchItem[]> => {
        const data = await getByFetch(`GetPunchesByLeaderId?id=${id}`)
        return data
    }

    const addPunch = async (
        creatorId: string,
        punch: Omit<
            PunchItem,
            'id' | 'status' | 'message' | 'createdDate' | 'updatedDate' | 'user'
        >
    ): Promise<void> => {
        await postByFetch('AddPunch', {
            creatorId: creatorId,
            ...punch,
        })
    }

    const updatePunch = async (
        id: string,
        workflowId: string,
        update: Partial<
            Omit<
                PunchItem,
                | 'id'
                | 'workflowId'
                | 'createdDate'
                | 'updatedDate'
                | 'user'
                | 'checklistTask'
            >
        >
    ): Promise<void> => {
        await postByFetch('UpdatePunch', {
            id: id,
            workflowId: workflowId,
            ...update,
        })
    }

    const deletePunch = async (id: string): Promise<void> => {
        await deleteByFetch(`DeletePunch?id=${id}`)
    }

    // Upload

    const getUpload = async (id: string): Promise<Upload> => {
        const data = await getByFetch(`GetUpload?id=${id}`)
        return data
    }

    const getUploadByPunchId = async (punchId: string): Promise<Upload[]> => {
        const data = await getByFetch(`GetUploadByPunchId?punchId=${punchId}`)
        return data
    }

    const addUpload = async (punchId: string, file: File): Promise<void> => {
        const formData = new FormData()
        formData.append('punchId', punchId)
        formData.append('file', file)
        await postByFetch('AddUpload', {
            formData,
        })
    }

    const updateUpload = async (
        update: Pick<Upload, 'id' | 'punchId'>
    ): Promise<void> => {
        await postByFetch('UpdateUpload', {
            update,
        })
    }

    const deleteUpload = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteUpload?id=${id}`)
    }

    // const sdasdsa = () => {
    //     const Location = useLocation()
    //     const refreshCheckLists = Location.state
    //         ? Location.state?.refreshCheckLists
    //         : null
    //     const [refreshList, setRefreshList] = React.useState<boolean>(false)
    // }

    return {
        getAllUsers,
        getAllUsersAdmin,
        getUserByAzureAdUserId,
        getUser,
        getUserByUserName,
        addUser,
        updateUser,
        softDeleteUser,
        hardDeleteUser,
        getAllUserRoles,
        getUserRole,
        addUserRole,
        updateUserRole,
        deleteUserRole,
        getAllCategories,
        getCategory,
        getCategoriesByName,
        addCategory,
        updateCategory,
        deleteCategory,
        getAllPunches,
        getPunch,
        getPunchesByWorkflowId,
        getPunchInspectorId,
        getPunchByLeaderId,
        addPunch,
        updatePunch,
        deletePunch,
        getAllCheckLists,
        getChecklist,
        getAllChecklistsByUserId,
        getChecklistByName,
        addChecklist,
        updateChecklist,
        deleteChecklist,
        getAllTasks,
        getTask,
        getAllTasksByCategoryId,
        getAllTasksByChecklistId,
        getTasksByDescription,
        addTask,
        updateTask,
        addTaskToChecklist,
        deleteTask,
        getAllWorkflows,
        getWorkflow,
        getAllWorkflowsByUserId,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow,
        getUpload,
        getUploadByPunchId,
        addUpload,
        updateUpload,

        deleteUpload,
    }
}

export type ApiService = ReturnType<typeof apiService>

export default apiService
