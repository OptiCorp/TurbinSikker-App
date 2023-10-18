import { useEffect, useState } from 'react'
import { Task, Workflow } from '../../services/apiTypes'

import { useParams } from 'react-router'

import apiService from '../../services/api'
import { PreviewWrapper } from '../checklist/previewCheckList/styles'
import { FillOutList } from './FillOutList'

export const FillOutCheckList = () => {
    const [workflow, setWorkFlow] = useState<Workflow>()
    const [tasks, setTasks] = useState<Task[]>([])
    const { workflowId } = useParams() as { workflowId: string }
    const api = apiService()

    useEffect(() => {
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getWorkflow(workflowId)

                setWorkFlow(workFlowData)
                if (workFlowData?.checklist.checklistTasks) {
                    setTasks(workFlowData.checklist.checklistTasks)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    console.log(workflow)
    return (
        <>
            <div style={{ backgroundColor: '#f0f3f3' }}>
                <PreviewWrapper>
                    <>
                        {workflow && (
                            <FillOutList workflow={workflow} tasks={tasks} />
                        )}
                    </>
                </PreviewWrapper>
            </div>
        </>
    )
}
