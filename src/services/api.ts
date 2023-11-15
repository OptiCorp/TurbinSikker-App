import { API_URL } from '../config'
import { pca } from '../msalconfig'
import {
    Category,
    Checklist,
    Invoice,
    Notifications,
    PunchItem,
    Task,
    Upload,
    User,
    WorkflowResponse,
    pubSubToken,
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
    const postByFetch = async (url: string, bodyData?: any) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
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
            return res
            /*   if (res.ok) {
                const contentType = res.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    const jsonResult = await res.json()
                    const resultObj = jsonResult
                    return resultObj
                }
            } else {
                console.error('Post by fetch failed. Url=' + url, res)
            } */
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
        /* 
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
        }) */
    }

    const postFileByFetch = async (url: string, file: FormData) => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const postOperation = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Access-Control-Allow-Origin': '*',
                },
                body: file,
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
    const putByFetch = async (url: string, bodyData: any) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
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

            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // Generic function for delete requests
    const deleteByFetch = async (url: string) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const deleteOperation = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, deleteOperation)

            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // User

    const getAllUsers = async (): Promise<User[]> => {
        const data = await getByFetch('GetAllUsers')
        return data
    }

    const getAllUsersAdmin = async (): Promise<User[]> => {
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

    // checklist

    const getAllCheckLists = async (): Promise<Checklist> => {
        const data = await getByFetch(`GetAllChecklists`)
        return data
    }

    const getChecklist = async (id: string): Promise<Checklist> => {
        const data = await getByFetch(`GetChecklist?id=${id}`)
        if (!id) {
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

    const addChecklist = async (creatorId: string, title: string) => {
        try {
            const response = await postByFetch('AddChecklist', {
                creatorId: creatorId,
                title: title,
            })

            return response.json()
        } catch (error) {
            console.error('Error creating checklist:', error)
            throw error
        }
    }
    // TODO: AddChecklistWithTasks

    const updateChecklist = async (
        id: string,
        title: string,
        status: string
    ) => {
        return postByFetch('UpdateChecklist', {
            id: id,
            title: title,
            status: status,
        })
    }

    const deleteChecklist = async (id: string) => {
        return deleteByFetch(`DeleteChecklist?id=${id}`)
    }

    // Workflow

    const getAllWorkflows = async (): Promise<WorkflowResponse[]> => {
        const data = await getByFetch('GetAllWorkflows')

        return data
    }

    const getWorkflow = async (
        workflowId: string
    ): Promise<WorkflowResponse> => {
        const data = await getByFetch(`GetWorkflow?id=${workflowId}`)

        if (!workflowId) {
            throw new Error('An error occurred, please try again')
        }
        return data
    }

    const getAllWorkflowsByUserId = async (
        userId: string
    ): Promise<WorkflowResponse[]> => {
        const data = await getByFetch(
            `GetAllWorkflowsByUserId?userId=${userId}`
        )
        return data
    }

    const getAllCompletedWorkflows = async (): Promise<WorkflowResponse[]> => {
        const data = await getByFetch(`GetAllCompletedWorkflows`)
        return data
    }

    const createWorkflow = async (
        checklistId: string,
        userIds: string[],
        creatorId: string
    ) => {
        return postByFetch('CreateWorkflow', {
            checklistId: checklistId,
            userIds: userIds,
            creatorId: creatorId,
        })
    }

    const updateWorkflow = async (
        id: string,
        userId: string,
        status: string,
        completionTimeMinutes: number,
        taskInfos: { taskId: string; status: string }[],
        comment: string
    ) => {
        return putByFetch('UpdateWorkflow', {
            id: id,
            userId: userId,
            status: status,
            completionTimeMinutes: completionTimeMinutes,
            taskInfos: taskInfos,
            comment: comment,
        })
    }

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

    const getAllTasksByChecklistId = async (id: string): Promise<Task[]> => {
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

    const addTask = async (
        categoryId: string,
        description: string,
        EstAvgCompletionTime: number
    ) => {
        const response = await postByFetch('AddTask', {
            categoryId: categoryId,
            description: description,
            EstAvgCompletionTime: EstAvgCompletionTime,
        })
        return response.json()
    }

    const updateTask = async (
        id: string,
        categoryId: string,
        description: string,
        checklistId: string,
        estAvgCompletionTime: number
    ): Promise<void> => {
        await postByFetch('UpdateTask', {
            id: id,
            categoryId: categoryId,
            description: description,
            checklistId: checklistId,
            estAvgCompletionTime: estAvgCompletionTime,
        })
    }

    const addTaskToChecklist = async (taskId: string, checklistId: string) => {
        return postByFetch('AddTaskToChecklist', {
            taskId: taskId,
            checklistId: checklistId,
        })
    }

    const removeTaskFromChecklist = async (
        taskId: string,
        checklistId: string
    ) => {
        return postByFetch('removeTaskFromChecklist ', {
            taskId: taskId,
            checklistId: checklistId,
        })
    }

    const deleteTask = async (id: string) => {
        return deleteByFetch(`DeleteTask?id=${id}`)
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

    // const addCategory = async (
    //     category: Pick<Category, 'name'> /* name: string */
    // ): Promise<void> => {
    //     await postByFetch(`AddCategory`, {
    //         category,
    //         /* name: name, */
    //     })
    // }

    const addCategory = async (name: string) => {
        const response = await postByFetch('AddCategory', {
            name: name,
        })
        return response.json()
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
        checklistTaskId: string,
        punch: Omit<
            PunchItem,
            | 'id'
            | 'status'
            | 'message'
            | 'createdDate'
            | 'updatedDate'
            | 'user'
            | 'checklistTask'
        >
    ): Promise<Response> => {
        return await postByFetch('AddPunch', {
            creatorId: creatorId,
            checklistTaskId: checklistTaskId,
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
    ) => {
        return postByFetch('UpdatePunch', {
            ...update,
            id: id,
            workflowId: workflowId,
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
        const data = await getByFetch(`GetUploadsByPunchId?punchId=${punchId}`)
        return data
    }

    const addUpload = async (punchId: string, file: File): Promise<void> => {
        const formData = new FormData()
        formData.append('punchId', punchId)
        formData.append('file', file)

        await postFileByFetch('AddUpload', formData)
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

    // Invoice

    const getAllInvoices = async (): Promise<Invoice[]> => {
        const data = await getByFetch('GetAllInvoices')
        return data
    }

    const getInvoice = async (id: string): Promise<Invoice> => {
        const data = await getByFetch(`GetInvoice?id=${id}`)
        return data
    }

    const getInvoicePdfByInvoiceId = async (id: string): Promise<Invoice> => {
        const data = await getByFetch(`GetInvoicePdfByInvoiceId?id=${id}`)
        return data
    }

    const addInvoice = async (
        title: string,
        receiver: string,
        workflowIds: string[],
        hourlyRate: number,
        sender: string
    ): Promise<Response> => {
        return await postByFetch('AddInvoice', {
            title: title,
            receiver: receiver,
            workflowIds: workflowIds,
            hourlyRate: hourlyRate,
            sender: sender,
        })
    }

    const updateInvoice = async (
        id: string,
        status: string,
        message: string
    ): Promise<void> => {
        await postByFetch('UpdateInvoice', {
            id: id,
            status: status,
            message: message,
        })
    }

    const deleteInvoice = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteInvoice?id=${id}`)
    }

    const getPubSubAccessToken = async (): Promise<pubSubToken> => {
        const data = await getByFetch('GetPubSubAccessToken')
        return data
    }

    const getAllNotifications = async (): Promise<Notifications[]> => {
        const data = await getByFetch(`GetAllNotifications`)
        return data
    }

    const getNotificationsByUser = async (
        id: string
    ): Promise<Notifications[]> => {
        const data = await getByFetch(`GetNotificationByUserId?id=${id}`)
        return data
    }

    const updateNotification = async (
        id: string,
        notificationStatus: string
    ): Promise<void> => {
        await postByFetch('UpdateNotififcation', {
            id: id,
            notificationStatus: notificationStatus,
        })
    }

    return {
        getAllUsers,
        getAllUsersAdmin,
        getUserByAzureAdUserId,
        getUser,
        getUserByUserName,

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
        removeTaskFromChecklist,
        deleteTask,
        getAllWorkflows,
        getWorkflow,
        getAllWorkflowsByUserId,
        getAllCompletedWorkflows,
        createWorkflow,
        updateWorkflow,
        deleteWorkflow,
        getUpload,
        getUploadByPunchId,
        addUpload,
        updateUpload,
        deleteUpload,
        getAllInvoices,
        // getAllInvoicePdfs,
        getInvoice,
        getInvoicePdfByInvoiceId,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        getPubSubAccessToken,
        getAllNotifications,
        getNotificationsByUser,
        updateNotification,
    }
}

export type ApiService = ReturnType<typeof apiService>

export default apiService
