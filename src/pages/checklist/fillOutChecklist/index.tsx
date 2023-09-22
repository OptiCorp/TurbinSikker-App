import { FormProvider } from 'react-hook-form'
import { Wrapper } from '../previewCheckList/styles'
import { useWorkflowContext } from '../workflow/context/workFlowContextProvider'
import { useFillOutCheckList } from './FillOutCheckListHook'
import { FillOutList } from './FillOutList'
import { AddPunchHeader, StyledCard, StyledCardHeader } from './styles'

export const FillOutCheckList = () => {
    const { workFlowById, WorkFlows } = useWorkflowContext()

    const { methods, onUpdate } = useFillOutCheckList()
    const { handleSubmit } = methods
    console.log(workFlowById?.checklist?.checklistTasks)
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
                            {workFlowById?.checklist?.checklistTasks.map(
                                (task) => (
                                    <>
                                        <FillOutList
                                            key={task.id}
                                            workFlowById={workFlowById}
                                            onUpdate={onUpdate}
                                            task={task} // tasks={workFlowById.checklist.checklistTasks}
                                        />
                                    </>
                                )
                            )}
                        </Wrapper>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
