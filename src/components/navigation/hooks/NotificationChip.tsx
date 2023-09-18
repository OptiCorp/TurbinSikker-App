import { useWorkflowContext } from '../../../pages/checklist/workflow/context/workFlowContextProvider'
import { StyledChip } from '../styles'

export const NotificationBadge: React.FC<{ name: string }> = ({ name }) => {
    const { WorkFlows, allWorkFlows } = useWorkflowContext()
    const committedWorkflows = WorkFlows.filter(
        (workflow) => workflow.status === 'Committed'
    )

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
}
