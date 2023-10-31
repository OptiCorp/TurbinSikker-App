import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'react-router'
import useSnackBar from '../../components/snackbar/useSnackBar'
import { formatDate } from '../../helpers/dateFormattingHelpers'
import apiService from '../../services/api'
import { Task, Workflow } from '../../services/apiTypes'
import { useRoles } from '../../services/useRoles'
import { UserChip } from '../checklist/inprogressChecklists/UserChip'
import { PreviewWrapper } from '../checklist/previewCheckList/styles'
import { FillOutList } from './FillOutList'
import { ReviewList } from './ReviewList'
import { useFillChecklistForm } from './hooks/useFillChecklist'
import {
    BackgroundWrap,
    Container,
    EditStyledCardHeader,
    InfoHeader,
    List,
    StyledCard,
} from './styles'

export type TaskInfoD = {
    taskInfos: {
        taskId: string
        status: number
    }
}
export const FillOutCheckList = () => {
    useEffect(() => {
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getWorkflow(workflowId)

                setWorkFlow(workFlowData)
                if (workFlowData?.checklist.checklistTasks) {
                    setTasks(workFlowData.checklist.checklistTasks)
                }
                if (workflow?.taskInfos) {
                    setTaskInfos(workFlowData.taskInfos)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const { methods, onSubmit } = useFillChecklistForm()

    const { handleSubmit } = methods
    const { workflowId } = useParams() as { workflowId: string }
    const api = apiService()

    const { isInspector, isLeader } = useRoles()
    const { snackbar, setSnackbarText } = useSnackBar()

    const [workflow, setWorkFlow] = useState<Workflow>()
    const [tasks, setTasks] = useState<Task[]>([])
    const [taskInfos, setTaskInfos] = useState<TaskInfoD>([{}])

    const formattedUpdateDate = formatDate(workflow?.updatedDate || '')
    return (
        <FormProvider {...methods}>
            {snackbar}
            <form onSubmit={handleSubmit(onSubmit)} id="fill-checklist">
                <BackgroundWrap>
                    {workflow && isLeader && (
                        <InfoHeader>
                            {' '}
                            <StyledCard>
                                <EditStyledCardHeader>
                                    {workflow?.checklist.title}{' '}
                                </EditStyledCardHeader>

                                <List>
                                    <Container>
                                        <Typography
                                            variant="caption"
                                            token={{
                                                fontSize: '1rem',
                                            }}
                                        >
                                            {' '}
                                            Delivered by{' '}
                                        </Typography>
                                        <UserChip workflow={workflow} />
                                    </Container>

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
                    <>
                        <PreviewWrapper>
                            <>
                                {workflow && isInspector ? (
                                    <>
                                        {taskInfos.map((taskInfo) => (
                                            <FillOutList
                                                workflow={workflow}
                                                tasks={tasks}
                                                key={workflow.id}
                                                taskInfo={taskInfo}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {workflow && (
                                            <>
                                                <ReviewList
                                                    workflow={workflow}
                                                    tasks={tasks}
                                                    key={workflow.id}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        </PreviewWrapper>
                    </>
                </BackgroundWrap>
            </form>
        </FormProvider>
    )
}
