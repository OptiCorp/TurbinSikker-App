import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../../../config'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { PunchEntity } from '../types'

type PunchContext = {
    punches: PunchEntity[]
    punch: PunchEntity
}

const postsContextDefaultValue: PunchContext = {
    punches: [],
    punch: {
        id: '',
        active: 0,
        checklistWorkflowId: '',
        createdBy: '',
        createdDate: '',
        punchDescription: '',
        severity: '',
        status: '',
        updatedDate: null,
        checklistTask: {
            checklistTaskId: '',
            checklistWorkflowId: '',
            description: '',
            category: {
                id: '',
                name: '',
            },
        },
        createdByUser: {
            firstName: '',
            lastName: '',
        },
    },
}

const PunchContext = createContext(postsContextDefaultValue)

function PunchContextProvider({ children }: { children: React.ReactNode }) {
    const { id } = useParams()
    const { accessToken } = useAuth()
    const { currentUser } = useUserContext()
    const [punchData, setPunchData] = useState<PunchEntity[]>([])
    const [punchById, setPunchById] = useState<PunchEntity>()
    const inspector = `${API_URL}/getPunchesByInspectorId?id=${currentUser?.id}`
    const leader = `${API_URL}/getPunchesByLeaderId?id=${currentUser?.id}`
    async function fetchPunchById() {
        if (!accessToken) return
        if (!id) return
        try {
            const response = await fetch(`${API_URL}/getPunch?id=${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            if (!response.ok)
                throw new Error('Failed with HTTP code ' + response.status)
            const data = await response.json()
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

    useEffect(() => {
        fetchPunchById()
    }, [id, accessToken])

    useEffect(() => {
        fetchPunchesForCurrentUser()
    }, [currentUser])

    return (
        <PunchContext.Provider
            value={{
                punches: punchData,
                punch: punchById as PunchEntity,
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
