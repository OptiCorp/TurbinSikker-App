import { API_URL } from '../config'
import { PunchItem, User } from './apiTypes'

const apiService = (token: string) => {
    //Generic function for get requests
    const getByFetch = async (url: string): Promise<any> => {
        const GetOperation = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        }
        const res = await fetch(`${API_URL}/${url}`, GetOperation)
        if (res.ok) {
            const jsonResult = await res.json()
            const resultObj = jsonResult

            return resultObj
        } else {
            console.error('Get by fetch failed. Url=' + url, res)
        }
    }

    //Generic function for post requests
    const postByFetch = async (url: string, bodyData?: any): Promise<any> => {
        const postOperation = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
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
    }

    const putByFetch = async (url: string, bodyData: any): Promise<any> => {
        const putOperations = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
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
    }

    //Generic function for delete requests
    const deleteByFetch = async (url: string): Promise<any> => {
        const deleteOperation = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
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
    }

    // User

    const getAllUsers = async (): Promise<User> => {
        const data = await getByFetch('GetAllUsers')

        return data
    }

    const getAllUsersAdmin = async () => {
        const data = await getByFetch('GetAllUsersAdmin')

        return data
    }

    const getUser = async (id: string) => {
        const data = await getByFetch(`GetUser?id=${id}`)

        return data
    }

    const getUserByAzureAdUserId = async (id: string) => {
        const data = await getByFetch(`GetUserByAzureAdUserId?id=${id}`)

        return data
    }

    const getUserByUserName = async (username: string) => {
        const data = await getByFetch(`GetUserByUserName?username=${username}`)

        return data
    }

    const addUser = async (
        username: string,
        azureAdUserId: string,
        firstName: string,
        lastName: string,
        email: string,
        userRoleId: string
    ): Promise<void> => {
        await postByFetch('AddUser', {
            username: username,
            azureAdUserId: azureAdUserId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            userRoleId: userRoleId,
        })
    }

    const updateUser = async (
        id: string,
        firstName: string,
        lastName: string,
        userRoleId?: string,
        status?: string,
        username?: string,
        email?: string
    ): Promise<void> => {
        await postByFetch('UpdateUser', {
            id: id,
            firstName: firstName,
            lastName: lastName,
            userRoleId: userRoleId,
            status: status,
            username: username,
            email: email,
        })
    }

    const softDeleteUser = async (id: string): Promise<void> => {
        await deleteByFetch(`SoftDeleteUser?id=${id}`)
    }

    const hardDeleteUser = async (id: string): Promise<void> => {
        await deleteByFetch(`HardDeleteUser?id=${id}`)
    }

    // user role

    const getAllUserRoles = async () => {
        const data = await getByFetch('GetAllUserRoles')

        return data
    }

    const getUserRole = async (id: string) => {
        const data = await getByFetch(`GetUserRole?id=${id}`)

        return data
    }

    const addUserRole = async (name: string): Promise<void> => {
        await postByFetch('AddUserRole', {
            name: name,
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

    const getAllCheckLists = async () => {
        const data = await getByFetch(`GetAllChecklists`)
        return data
    }

    const getChecklist = async (checklistId: string) => {
        const data = await getByFetch(`GetChecklist?id=${checklistId}`)
        if (!checklistId) {
            throw new Error('An error occurred, please try again')
        }

        return data
    }

    const getAllChecklistsByUserId = async (userId: string) => {
        const data = await getByFetch(`GetAllChecklistsByUserId?id=${userId}`)
        if (!userId) {
            throw new Error('An error occurred, please try again')
        }

        return data
    }

    const getChecklistByName = async (searchString: string) => {
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
    ): Promise<void> => {
        await postByFetch('AddChecklist', {
            creatorId: creatorId,
            title: title,
        })
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

    //Workflow

    const getAllWorkflows = async () => {
        const data = await getByFetch('GetAllWorkflows')

        return data
    }

    const getWorkflow = async (id: string) => {
        const data = await getByFetch(`GetWorkflow?id=${id}`)

        return data
    }

    const getAllWorkflowsByUserId = async (userId: string) => {
        const data = await getByFetch(
            `GetAllWorkflowsByUserId?userId=${userId}`
        )

        return data
    }

    const createWorkflow = async (
        checklistId: string,
        userIds: [],
        creatorId: string
    ): Promise<void> => {
        await postByFetch('CreateWorkflow', {
            checklistId: checklistId,
            userIds: userIds,
            creatorId: creatorId,
        })
    }

    const updateWorkflow = async (
        id: string,
        userId: string,
        status: string
    ): Promise<void> => {
        await putByFetch('UpdateWorkflow', {
            id: id,
            userId: userId,
            status: status,
        })
    }

    const deleteWorkflow = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteWorkflow?id=${id}`)
    }

    //Checklist Task

    const getAllTaks = async () => {
        const data = await getByFetch('GetAllTasks')

        return data
    }

    const getTask = async (id: string) => {
        const data = await getByFetch(`GetTask?id=${id}`)

        return data
    }

    const getAllTasksByCategoryId = async (id: string) => {
        const data = await getByFetch(`GetAllTasksByCategoryId?id=${id}`)

        return data
    }

    const getAllTasksByChecklistId = async (id: string) => {
        const data = await getByFetch(`GetAllTasksByChecklistId?id=${id}`)

        return data
    }

    const getTasksByDescription = async (searchString: string) => {
        const data = await getByFetch(
            `GetTasksByDescription?searchString=${searchString}`
        )

        return data
    }

    const addTask = async (
        categoryId: string,
        description: string
    ): Promise<void> => {
        await postByFetch('AddTask', {
            categoryId: categoryId,
            description: description,
        })
    }

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

    const deleteTask = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteTask?id=${id}`)
    }

    // Category

    const getAllCategories = async () => {
        const data = await getByFetch('GetAllCategories')

        return data
    }

    const getCategory = async (id: string) => {
        const data = await getByFetch(`GetCategory?id=${id}`)

        return data
    }

    const getCategoriesByName = async (searchString: string) => {
        const data = await getByFetch(
            `GetCategoriesByName?searchString=${searchString}`
        )

        return data
    }

    const addCategory = async (name: string): Promise<void> => {
        await postByFetch(`AddCategory`, {
            name: name,
        })
    }

    const updateCategory = async (id: string, name: string): Promise<void> => {
        await postByFetch('UpdateCategory', {
            id: id,
            name: name,
        })
    }

    const deleteCategory = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteCategory?id=${id}`)
    }

    // punch
    const getAllPunches = async () => {
        const data = await getByFetch('GetAllPunches')

        return data
    }

    const getPunch = async (id: string): Promise<PunchItem> => {
        const data = await getByFetch(`GetPunch?id=${id}`)
        return data
    }

    const getPunchesByWorkflowId = async (id: string) => {
        const data = await getByFetch(`GetPunchesByWorkflowId?workflowId=${id}`)
        return data
    }

    const getPunchInspectorId = async (id: string) => {
        const data = await getByFetch(`GetPunchesByInspectorId?id=${id}`)
        return data
    }

    const getPunchByLeaderId = async (id: string) => {
        const data = await getByFetch(`GetPunchesByLeaderId?id=${id}`)
        return data
    }

    const addPunch = async (
        creatorId: string,
        description: string,
        workflowId: string,
        checklistTaskId: string,
        severity: string
    ): Promise<void> => {
        await postByFetch('AddPunch', {
            creatorId: creatorId,
            description: description,
            workflowId: workflowId,
            checklistTaskId: checklistTaskId,
            severity: severity,
        })
    }

    const updatePunch = async (
        id: string,
        workflowId: string,
        severity?: string,
        message?: string,
        description?: string
    ): Promise<void> => {
        await postByFetch('UpdatePunch', {
            id: id,
            workflowId: workflowId,
            severity: severity,
            message: message,
            description: description,
        })
    }

    const deletePunch = async (id: string): Promise<void> => {
        await deleteByFetch(`DeletePunch?id=${id}`)
    }

    //Upload

    const getUpload = async (id: string) => {
        const data = await getByFetch(`GetUpload?id=${id}`)

        return data
    }

    const getUploadByPunchId = async (punchId: string) => {
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

    const updateUpload = async (id: string, punchId: string): Promise<void> => {
        await postByFetch("UpdateUpload", {
            id: id,
            punchId: punchId
        })
    }

    const deleteUpload = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteUpload?id=${id}`)
    }

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
        getAllWorkflows,
        getWorkflow,
        getAllWorkflowsByUserId,
        createWorkflow,
        updateWorkflow,
        getUpload,
        getUploadByPunchId,
        addUpload,
        updateUpload,
        deleteUpload
    }
}

export type ApiService = ReturnType<typeof apiService>

export default apiService
