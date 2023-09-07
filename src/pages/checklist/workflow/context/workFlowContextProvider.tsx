import React, { createContext, useContext, useEffect, useState } from 'react'
import { API_URL } from '../../../../config'
import { useUserContext } from '../../../../pages/users/context/userContextProvider'
import useAuth from '../../../landingPage/context/LandingPageContextProvider'
import { AllWorkFlows, WorkFlow } from '../types'
import { getChecklistWorkflowById } from './api'

import { TWorkflowContext } from './types'
///

const postsContextDefaultValue: TWorkflowContext = {
    WorkFlows: [],
    testData: '',
    allWorkFlows: [],
}

const WorkflowContext = createContext<TWorkflowContext>(
    postsContextDefaultValue
)

const WorkflowContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { accessToken } = useAuth()

    const [checklistWorkFlows, setChecklistWorkFlow] = useState<WorkFlow[]>([])
    const [allWorkFlows, setAllWorkFlows] = useState<AllWorkFlows[]>([])

    const { currentUser } = useUserContext()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    useEffect(() => {
        ;(async function () {
            if (!currentUser?.id || !accessToken) return
            const workFlows = await getChecklistWorkflowById(
                currentUser.id,
                accessToken
            )

            setChecklistWorkFlow(workFlows)
        })()
    }, [currentUser, accessToken])

    useEffect(() => {
        const fetchAllCheckListWorkFlow = async () => {
            if (!accessToken) return
            try {
                const res = await fetch(`${API_URL}/GetAllChecklistWorkflows`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as AllWorkFlows[]
                data.map((item) => ({
                    ...item,
                    formattedUpdateDate: formatDate(item.updatedDate),
                }))
                setAllWorkFlows(data)
            } catch (error) {
                console.error('Error fetching checklist workflow:', error)
            }
        }
        fetchAllCheckListWorkFlow()
    }, [currentUser, accessToken])

    return (
        <WorkflowContext.Provider
            value={{
                WorkFlows: checklistWorkFlows,

                allWorkFlows: allWorkFlows,
            }}
        >
            {children}
        </WorkflowContext.Provider>
    )
}

function useWorkflowContext() {
    const context = useContext(WorkflowContext)
    if (!context) {
        throw new Error('error')
    }
    return context
}

export { WorkflowContext, WorkflowContextProvider, useWorkflowContext }
