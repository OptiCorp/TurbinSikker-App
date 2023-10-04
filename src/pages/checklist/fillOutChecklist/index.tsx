import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { ApiStatus, Workflow } from '../../../services/apiTypes'
import { Wrapper } from '../previewCheckList/styles'

import { useParams } from 'react-router'
import useAuth from '../../../context/AuthContextProvider'
import apiService from '../../../services/api'
import { useFillOutCheckList } from './FillOutCheckListHook'
import { FillOutList } from './FillOutList'
import { AddPunchHeader, StyledCard, StyledCardHeader } from './styles'

export const FillOutCheckList = () => {
    const [workflow, setWorkFlow] = useState<Workflow>()
    const [workflowStatus, setWorkflowStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )
    const { workflowId } = useParams()
    const { accessToken } = useAuth()
    const { methods, onUpdate } = useFillOutCheckList()
    const { handleSubmit } = methods

    const api = apiService(accessToken)
    useEffect(() => {
        if (!accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getWorkflow(workflowId)

                setWorkFlow(workFlowData)
                setWorkflowStatus(ApiStatus.SUCCESS)
            } catch (error) {
                setWorkflowStatus(ApiStatus.ERROR)
            }
        })()
    }, [accessToken])

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onUpdate)} id="fill-out-checklist">
                    <div style={{ backgroundColor: '#f0f3f3' }}>
                        <div>
                            <AddPunchHeader>
                                <StyledCard>
                                    <StyledCardHeader></StyledCardHeader>
                                </StyledCard>
                            </AddPunchHeader>
                        </div>

                        <Wrapper>
                            {workflow?.checklist.checklistTasks.map((task) => (
                                <>
                                    <FillOutList
                                        key={task.id}
                                        workFlowById={workflow}
                                        onUpdate={onUpdate}
                                        task={task}
                                    />
                                </>
                            ))}
                        </Wrapper>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
