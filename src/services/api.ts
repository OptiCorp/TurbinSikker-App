import { CheckList } from '../pages/checklist/workflow/types'

import { API_URL } from '../config'
import useAuth from '../pages/landingPage/context/LandingPageContextProvider'
import { UrlString } from '@azure/msal-browser'
import { PunchItem } from './apiTypes'

const apiService = (token: string) => {
    const getByFetch = async (url: string): Promise<any> => {
        const GetOperation = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
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

    const getAllUsers = async () => {
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

    // checklist

    const getAllCheckLists = async (accessToken: string) => {
        const data = await fetch(`${API_URL}/GetAllChecklists`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        return data
    }

    const getChecklist = async (accessToken: string, checklistId: string) => {
        const data = await fetch(`${API_URL}/GetChecklist?id=${checklistId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
        if (!checklistId) {
            throw new Error('An error occurred, please try again')
        }
        return data
    }

    // const getUserChecklist = async (accessToken: string, currentUser: string) => {
    //     const data = await fetch(`${API_URL}/GetAllChecklistsByUserId?id=${currentUser?.id}`, {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //         },
    //     })

    //     return data
    // }

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
    ) => {
        await postByFetch('AddPunch', {
            creatorId: creatorId,
            description: description,
            workflowId: workflowId,
            checklistTaskId: checklistTaskId,
            severity: severity,
        })
    }

    /*const updatePunch = async ({
        id,
        workflowId,
        description,
        severity,
        status,
        message,
    }: {
        id: string
        workflowId: string
        description: string
        severity: string
        status: string
        message: string
    }) => {
        return ''
    } */

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
        getAllPunches,
        getPunch,
        getAllCheckLists,
        getChecklist,
        /* getUserChecklist, */
    }
}
export default apiService
