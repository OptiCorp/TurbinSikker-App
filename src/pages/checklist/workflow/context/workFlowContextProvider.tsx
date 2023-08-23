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
    userRoleId: string
    username: string
    createdByUser: CreatedByUser[]
}

export type WorkFlow = {
    id: string
    checklistId: string
    userId: string
    status: number | null
    updateDate: string
    checklists: CheckList[]
}

type WorkflowContext = {
    WorkFlows: WorkFlow[]
    checklist?: CheckList
    testData?: string
}

const postsContextDefaultValue: WorkflowContext = {
    WorkFlows: [],
    testData: '',
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
    const [checklistData, setChecklistData] = useState<CheckListEntity[]>([])
    const [date, setDate] = useState<string>()
    const [testData, setTestData] = useState<string>()

    useEffect(() => {
        const fetchCheckListWorkFlow = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7290/api/GetAllChecklistWorkflowsByUserId?userId=${currentUser?.id}`
                )
                if (!res.ok)
                    throw new Error('Failed with HTTP code ' + res.status)
                const data = (await res.json()) as WorkFlow[]

                setChecklistWorkFlow(data)
            } catch (error) {
                console.error('Error fetching checklist workflow:', error)
            }
        }
        fetchCheckListWorkFlow()
    }, [currentUser])

    useEffect(() => {
        checklistWorkFlows.forEach((workFlow) => {
            workFlow.checklists.forEach((checklist) => {
                const createdBy = checklist.createdBy
                // Do something with the createdBy value
                setTestData(createdBy)
            })
        })
    }, [])

    return (
        // the Provider gives access to the context to its children
        <WorkflowContext.Provider
            value={{
                WorkFlows: checklistWorkFlows,
                testData: testData,
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
