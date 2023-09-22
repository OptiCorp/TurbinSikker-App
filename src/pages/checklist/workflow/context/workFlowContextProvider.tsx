import React, { createContext, useContext, useEffect, useState } from 'react'
import { API_URL } from '../../../../config'
import { useUserContext } from '../../../../pages/users/context/userContextProvider'
import useAuth from '../../../landingPage/context/LandingPageContextProvider'
import { AllWorkFlows, WorkFlow } from '../types'
import { getChecklistWorkflowById } from './api'

import { useLocation, useParams } from 'react-router'
import { usePunchContext } from '../../../../pages/punch/context/PunchContextProvider'
import { TWorkflowContext } from './types'
///

const postsContextDefaultValue: TWorkflowContext = {
    WorkFlows: [],
    testData: '',
    allWorkFlows: [],
    workFlowById: {
        id: '',
        userId: '',
        status: '',
        createdById: '',
        createdDate: '',
        updatedDate: '',
        formattedUpdateDate: '',
        checklist: {
            azureAdUserId: '',
            email: '',
            createdBy: '',
            firstName: '',
            id: '',
            lastName: '',
            status: '',
            title: '',
            userRoleId: '',
            username: '',
            createdByUser: {
                id: '',
                azureAdUserId: '',
                email: '',
                firstName: '',
                lastName: '',
                status: '',
                userRoleId: '',
                userRole: {
                    id: '',
                    name: '',
                },
                username: '',
                createdDate: '',
                updatedDate: '',
            },
            checklistTasks: [
                {
                    id: '',
                    tasks: [],
                    value: '',
                    categoryId: '',
                    description: '',
                    category: {
                        id: '',
                        name: '',
                    },
                },
            ],
            createdDate: '',
        },
        user: {
            checklistWorkFlow: {
                id: '',
                checklistId: '',
                status: '',
                updatedDate: '',
                userId: '',
            },
            createdDate: '',
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
            AzureAdUser: '',
            username: '',
        },
        creator: {
            id: '',
            azureAdUserId: '',
            userRoleId: '',
            userRole: {
                id: '',
                name: '',
            },
            email: '',
            firstName: '',
            lastName: '',
            status: '',
            createdDate: '',
            updatedDate: '',
        },
    },
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
    const [workFlowById, setWorkFlowById] = useState<WorkFlow>()
    const { workflowId } = useParams()

    const { punch, taskId, workFlow } = usePunchContext()
    const { currentUser } = useUserContext()
    const appLocation = useLocation()
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
                const res = await fetch(`${API_URL}/GetAllWorkflows`, {
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

    useEffect(() => {
        const fetchWorkFlowId = async () => {
            if (!accessToken || !workflowId) return

            const res = await fetch(`${API_URL}/GetWorkflow?id=${workflowId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = (await res.json()) as WorkFlow

            setWorkFlowById(data)
        }
        fetchWorkFlowId()
    }, [currentUser, accessToken, workflowId])

    return (
        <WorkflowContext.Provider
            value={{
                WorkFlows: checklistWorkFlows,
                workFlowById: workFlowById as WorkFlow,
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
