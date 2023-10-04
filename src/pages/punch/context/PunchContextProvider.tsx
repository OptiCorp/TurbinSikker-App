import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../../../config'
import useAuth from '../../../context/AuthContextProvider'

import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { Punch } from '../types'

type PunchContext = {
    punches: Punch[]
    punch?: Punch
    taskId: string
    workFlow: string

    setTaskId: (taskId: string) => void
    setWorkFlow: (workflow: string) => void
}

const postsContextDefaultValue: PunchContext = {
    punches: [],
    punch: {
        workflowId: '',
        id: '',
        checklistTask: {
            id: '',
            categoryId: '',
            description: '',
            category: null,
        },
        user: {
            id: '',
            azureAdUserId: '',
            userRoleId: '',
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            userRole: {
                id: '',
                name: '',
            },
            status: 0,
            createdDate: '',
            updatedDate: '',
        },
        status: '',
        createdDate: '',
        updatedDate: null,
        description: '',
        severity: '',
        message: '',
        active: 0,
        uploads: null,
    },
    taskId: '',
    workFlow: '',
    setTaskId: () => {},
    setWorkFlow: () => {},
}

const PunchContext = createContext(postsContextDefaultValue)

function PunchContextProvider({ children }: { children: React.ReactNode }) {
    const { punchId } = useParams()

    const { accessToken } = useAuth()
    const { currentUser } = useUserContext()
    const [punchData, setPunchData] = useState<Punch[]>([])
    const [punchById, setPunchById] = useState<Punch>()

    const inspector = `${API_URL}/getPunchesByInspectorId?id=${currentUser?.id}`
    const leader = `${API_URL}/getPunchesByLeaderId?id=${currentUser?.id}`

    async function fetchPunchById() {
        if (!accessToken || !punchId) return
        try {
            const response = await fetch(`${API_URL}/getPunch?id=${punchId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            if (!response.ok)
                throw new Error('Failed with HTTP code ' + response.status)
            const data = (await response.json()) as Punch
            setPunchById(data)
        } catch (error) {
            console.error('Error fetching punch data:', error)
        }
    }
    async function fetchPunchesForCurrentUser() {
        if (!accessToken) return

        try {
            const response = await fetch(
                `${
                    currentUser?.userRole.name === 'Leader' ? leader : inspector
                }`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            )
            if (!response.ok)
                throw new Error('Failed with HTTP code ' + response.status)

            const data = await response.json()
            setPunchData(data)
        } catch (error) {
            console.error('Error fetching punch', error)
        }
    }

    const [workflow, setWorkFlow] = useState('')
    const [taskId, setTaskId] = useState('')

    useEffect(() => {
        fetchPunchById()
    }, [punchId, accessToken])

    useEffect(() => {
        fetchPunchesForCurrentUser()
    }, [currentUser])

    return (
        <PunchContext.Provider
            value={{
                punches: punchData,
                punch: punchById,
                taskId: taskId,
                setTaskId: setTaskId,
                workFlow: workflow,
                setWorkFlow: setWorkFlow,
            }}
        >
            {children}
        </PunchContext.Provider>
    )
}

function usePunchContext() {
    const context = useContext(PunchContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export { PunchContext, PunchContextProvider, usePunchContext }
