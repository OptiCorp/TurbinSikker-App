import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Task, Workflow } from '../../services/apiTypes'
import { PreviewWrapper } from '../checklist/previewCheckList/styles'

import { useParams } from 'react-router'

import apiService from '../../services/api'
import { useFillOutCheckList } from './FillOutCheckListHook'
import { FillOutList } from './FillOutList'
import { AddPunchHeader, StyledCard, StyledCardHeader } from './styles'

export const FillOutCheckList = () => {
    const [workflow, setWorkFlow] = useState<Workflow>()
    const [tasks, setTasks] = useState<Task[]>([])
    const { workflowId } = useParams() as { workflowId: string }
    const { methods, onUpdate } = useFillOutCheckList()
    const { handleSubmit } = methods
    const api = apiService()

    useEffect(() => {
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getWorkflow(workflowId)

                setWorkFlow(workFlowData)
                setTasks(workFlowData.checklist.checklistTasks)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

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

                        <PreviewWrapper>
                            {workflow?.checklist?.checklistTasks?.map(
                                (task) => (
                                    <>
                                        <FillOutList
                                            key={task.id}
                                            workFlow={workflow}
                                            onUpdate={onUpdate}
                                            tasks={tasks}
                                        />
                                    </>
                                )
                            )}
                        </PreviewWrapper>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
