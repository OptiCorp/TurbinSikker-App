import React, { createContext, useContext, useEffect, useState } from 'react'

import { useUserContext } from '../../../../pages/users/context/userContextProvider'
import { AllWorkFlows } from './models/AllWorkFlowEntity'

import { CheckList, WorkFlow } from './models/WorkFlowEntity'

import useAuth from '../../../landingPage/context/LandingPageContextProvider'




type WorkflowContext = {
    WorkFlows: WorkFlow[]
    checklist?: CheckList
    testData?: string
    allWorkFlows: AllWorkFlows[]
}

const postsContextDefaultValue: WorkflowContext = {
    WorkFlows: [],
    testData: '',
    allWorkFlows: [],
}

const WorkflowContext = createContext<WorkflowContext>(postsContextDefaultValue)

const WorkflowContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {


    const { idToken, accessToken } = useAuth()

    const [checklistWorkFlows, setChecklistWorkFlow] = useState<WorkFlow[]>([])
    const [allWorkFlows, setAllWorkFlows] = useState<AllWorkFlows[]>([])
    const [date, setDate] = useState<string>()
    const { currentUser } = useUserContext()
    const [checkId, setCheckId] = useState<string>('')
    const [testData, setTestData] = useState<string>()
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    useEffect(() => {
        const fetchCheckListWorkFlow = async () => {
            try {
                const res = await fetch( `https://localhost:7290/api/GetAllChecklistWorkflowsByUserId?userId=${currentUser?.id}` )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as WorkFlow[]
                data.map((item) => ({
                    ...item,
                    formattedUpdateDate: formatDate(item.updateDate),
                }))
                setChecklistWorkFlow(data)
                const id = data.map((item) => item.checklistId)
                setCheckId(id[0])
            } catch (error) {
                console.error('Error fetching checklist workflow:', error)
            }
        }
        fetchCheckListWorkFlow()

    }, [currentUser])


    useEffect(() => {
        const fetchAllCheckListWorkFlow = async () => {
            try {
                const res = await fetch(
                    `https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetAllChecklistWorkflows`,
                    {
                        method: "GET",
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                          "Content-Type": "application/json",
                          "Access-Control-Allow-Origin": '*'
                        }}
                )
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

    }, [currentUser])


 

    return (
        <WorkflowContext.Provider
            value={{
                WorkFlows: checklistWorkFlows,
                testData: testData,
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
