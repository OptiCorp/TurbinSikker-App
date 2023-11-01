import { Typography } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'
import { useParams } from 'react-router'
import useSnackBar from '../../components/snackbar/useSnackBar'
import useGlobal from '../../context/globalContextProvider'
import { formatDate } from '../../helpers/dateFormattingHelpers'
import apiService from '../../services/api'
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

export const FillOutCheckList = () => {
    const { methods, onSubmit, workflow, checklistTasks } =
        useFillChecklistForm()

    const { handleSubmit } = methods
    const { workflowId } = useParams() as { workflowId: string }
    const api = apiService()

    const { isInspector, isLeader } = useRoles()
    const { snackbar, setSnackbarText } = useSnackBar()
    const { currentUser, openSnackbar, setRefreshList } = useGlobal()

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
                                        <FillOutList
                                            workflow={workflow}
                                            tasks={checklistTasks}
                                            key={workflow.id}
                                            // taskInfo={taskDataSets}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {workflow && (
                                            <>
                                                <ReviewList
                                                    workflow={workflow}
                                                    tasks={checklistTasks}
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
