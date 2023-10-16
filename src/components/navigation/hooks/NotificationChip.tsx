import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Workflow } from '../../../services/apiTypes'
import { StyledChip } from '../styles'

export function NotificationBadge({ name }: { name: string }) {
    const api = apiService()
    const { currentUser } = useGlobal()
    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const { accessToken } = useGlobal()
    useEffect(() => {
        if (!currentUser?.id || !accessToken || name !== 'Checklists')
            (async (): Promise<void> => {
                try {
                    const workFlowData = await api.getAllWorkflows()
                    setAllWorkFlows(workFlowData)
                } catch (error) {
                    console.log(error)
                }
            })()
    }, [accessToken, currentUser?.id])

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
