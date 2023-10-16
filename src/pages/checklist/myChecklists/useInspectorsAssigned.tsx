import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, Workflow } from '../../../services/apiTypes'

export const useInspectorsAssigned = () => {
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const [allWorkflows, setAllWorkFlows] = useState<Workflow[]>([])
    const api = apiService()
    const { accessToken, currentUser } = useGlobal()
    useEffect(() => {
        if (!currentUser || !accessToken) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflows()
                setAllWorkFlows(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        if (!currentUser?.id) return
        ;(async (): Promise<void> => {
            try {
                const checklistData = await api.getAllChecklistsByUserId(
                    currentUser.id
                )

                setChecklists(checklistData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [accessToken, currentUser?.id])

    const inspectorCounts = checklists.map((checklist) => {
        const title = checklist.title
        const count = allWorkflows.filter(
            (workflow) => workflow.checklist.title === title
        ).length
        return { title, count }
    })

    return {
        inspectorCounts,
    }
}
