import { useGetAllWorkflows } from '../../../services/hooks/useGetAllWorkflows'
import { StyledChip } from '../styles'

export function NotificationBadge({ name }: { name: string }) {
    const { data: allWorkflows, isFetching, isLoading } = useGetAllWorkflows()

    const committedWorkflows = allWorkflows?.filter(
        (workflow: any) => workflow.status === 'Committed'
    )

    const count = committedWorkflows?.length
    if (name === 'Checklists')
        return (
            <>
                {count! > 0 && (
                    <StyledChip variant="error">
                        {count} {count === 1 ? '  New' : ' New'}
                    </StyledChip>
                )}
            </>
        )
    return <></>
}
