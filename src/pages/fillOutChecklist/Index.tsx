import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { formatDate } from '../../helpers/dateFormattingHelpers'
import apiService from '../../services/api'
import { Task, Workflow } from '../../services/apiTypes'
import { useRoles } from '../../services/useRoles'
import { PreviewWrapper } from '../checklist/previewCheckList/styles'
import { FillOutList } from './FillOutList'
import { ReviewList } from './ReviewList'
import {
    BackgroundWrap,
    EditStyledCardHeader,
    InfoHeader,
    List,
    StyledCard,
} from './styles'

export const FillOutCheckList = () => {
    const [workflow, setWorkFlow] = useState<Workflow>()
    const [tasks, setTasks] = useState<Task[]>([])
    const { workflowId } = useParams() as { workflowId: string }
    const api = apiService()
    const formattedUpdateDate = formatDate(workflow?.updatedDate || '')
    const { isInspector, isLeader } = useRoles()
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

    return (
        <>
            <BackgroundWrap>
                {isLeader && (
                    <InfoHeader>
                        {' '}
                        <StyledCard>
                            <EditStyledCardHeader>
                                {workflow?.checklist.title}{' '}
                            </EditStyledCardHeader>
                            <List>
                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    {' '}
                                    Delivered by {workflow?.user.username}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    at {formattedUpdateDate}{' '}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    {' '}
                                </Typography>
                            </List>
                        </StyledCard>
                    </InfoHeader>
                )}
                <PreviewWrapper>
                    <>
                        {workflow && isInspector ? (
                            <FillOutList
                                workflow={workflow}
                                tasks={tasks}
                                key={workflow.id}
                            />
                        ) : (
                            workflow && (
                                <ReviewList
                                    workflow={workflow}
                                    tasks={tasks}
                                    key={workflow.id}
                                />
                            )
                        )}
                    </>
                </PreviewWrapper>
            </BackgroundWrap>
        </>
    )
}
