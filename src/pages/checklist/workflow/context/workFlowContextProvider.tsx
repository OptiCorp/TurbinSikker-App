import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'

import { CheckList, WorkFlow } from './models/WorkFlowEntity'
import { AllWorkFlows } from './models/AllWorkFlowEntity'
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
    const [testData, setTestData] = useState<string>()
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }

    useEffect(() => {
        const fetchCheckListWorkFlow = async () => {
            try {
                const res = await fetch(
                    'https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetAllChecklistWorkflowsByUserId?userId=634c61d6-ede8-49cf-ab70-ebc412de7499'
                    // `https://turbinsikker-api-lin-prod.azurewebsites.net/api/GetAllChecklistWorkflowsByUserId?userId=${currentUser?.id}`
                    ,
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
                const data = (await res.json()) as WorkFlow[]
                data.map((item) => ({
                    ...item,
                    formattedUpdateDate: formatDate(item.updateDate),
                }))
                setChecklistWorkFlow(data)
       
            } catch (error) {
                console.error('Error fetching checklist workflow:', error)
            }
        }
        fetchCheckListWorkFlow()
    }, [accessToken])
    // }, [currentUser])

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
    }, [accessToken])
    // }, [currentUser])

 
    

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
