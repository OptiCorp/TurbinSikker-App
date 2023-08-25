import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { useLocation, useNavigate } from 'react-router'
import { TaskEntity } from 'src/components/addtasks/context/models/TaskEntity'
import { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import { ListEntity } from 'src/pages/users/context/models/ListEntity'
import { SnackbarContext } from '../../../../components/snackbar/SnackBarContext'
import useAuth from '../../../landingPage/context/LandingPageContextProvider'
import { UserEntity } from '../../../users/context/models/UserEntity'
import { useUserContext } from '../../../users/context/userContextProvider'

type CreatedByUser = {
    azureAdUserId: string
    email: string
    firstName: string
    id: string
    lastName: string
    status: number
    userRoleId: string
    username: string
}

type CheckList = {
    azureAdUserId: string
    email: string
    createdBy: string
    firstName: string
    id: string
    lastName: string
    status: number
    title: string
    userRoleId: string
    username: string
    createdByUser: CreatedByUser
    createdDate: string
}

export type WorkFlow = {
    id: string
    checklistId: string
    userId: string
    status: number | null
    updateDate: string
    formattedUpdateDate: string
    checklist: CheckList
}

export type AllWorkFlows = {
    id: string
    checklistId: string
    userId: string
    status: number | null
    updatedDate: string
    formattedUpdateDate: string
    checklist: CheckList
}

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
    const { idToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)
    const { currentUser } = useUserContext()
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
                    `https://localhost:7290/api/GetAllChecklistWorkflowsByUserId?userId=${currentUser?.id}`
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
    }, [currentUser])

    useEffect(() => {
        const fetchAllCheckListWorkFlow = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7290/api/GetAllChecklistWorkflows`
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
