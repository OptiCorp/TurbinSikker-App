import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Workflow } from '../../services/apiTypes'

import { useParams } from 'react-router'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { useFillOutCheckList } from './FillOutCheckListHook'
import { FillOutList } from './FillOutList'
import { AddPunchHeader, StyledCard, StyledCardHeader } from './styles'

export const FillOutCheckList = () => {
    const [workflow, setWorkFlow] = useState<Workflow>()

    const { workflowId } = useParams() as { workflowId: string }

    const { methods, onUpdate } = useFillOutCheckList()
    const { handleSubmit } = methods

    const { accessToken } = useGlobal()

    const api = apiService()

    useEffect(() => {
        if (!accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getWorkflow(workflowId)

                setWorkFlow(workFlowData)
            } catch (error) {
                console.log(error)
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

                        {workflow?.checklist?.checklistTasks?.map((task) => (
                            <>
                                <FillOutList
                                    key={task.id}
                                    workFlow={workflow}
                                    onUpdate={onUpdate}
                                    task={task}
                                />
                            </>
                        ))}
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
