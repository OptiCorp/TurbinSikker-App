import { createContext, useContext, useEffect, useState } from 'react'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { PunchEntity } from '../types'

type PunchContext = {
    Punches: PunchEntity[]
    checklist?: CheckListEntity[]
}

const postsContextDefaultValue: PunchContext = {
    Punches: [],
    checklist: [],
}

const PunchContext = createContext(postsContextDefaultValue)

function PunchContextProvider({ children }: { children: React.ReactNode }) {
    const { accessToken } = useAuth()
    const { currentUser } = useUserContext()
    const [punchData, setPunchData] = useState<PunchEntity[]>([])
    const [currentChecklistData, setCurrentChecklistData] = useState<
        CheckListEntity[]
    >([])

    /* const checklistWorkfklowId = punchData.map(
        (punch) => punch.checklistWorkflowId
    ) */
    async function fetchChecklist() {
        if (!accessToken) return
        try {
            const response = await fetch(
                `https://turbinsikker-api-lin-prod.azurewebsites.net/api/getChecklist?id=${checklistWorkfklowId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()
            setCurrentChecklistData(data)
        } catch (err) {
            console.error((err as Error).message)
        }
    }
    async function fetchPunchesForCurrentUser() {
        if (!accessToken) return
        try {
            const response = await fetch(
                `https://localhost:7290/api/getPunchesByInspectorId?id=${currentUser?.id}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
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
        fetchChecklist()
    }, [])
    useEffect(() => {
        fetchPunchesForCurrentUser()
    }, [currentUser])

    console.log('punchData: ', punchData)

    return (
        <PunchContext.Provider
            value={{
                Punches: punchData,
                checklist: currentChecklistData,
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
