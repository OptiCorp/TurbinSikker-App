import { useWorkflowContext } from '../../../pages/checklist/workflow/context/workFlowContextProvider'
import { StyledChip } from '../styles'

export function NotificationBadge({ name }: { name: string }) {
    const { WorkFlows } = useWorkflowContext()
    const committedWorkflows = WorkFlows.filter((workflow) => workflow.status === 'Committed')

    const count = committedWorkflows.length
    if (name === 'Checklists')
        return (
            <>
                {count > 0 && (
                    <StyledChip variant="error">
                        {count} {count === 1 ? '  New' : ' New'}
                    </StyledChip>
                )}
            </>
        )
    return <></>
}
