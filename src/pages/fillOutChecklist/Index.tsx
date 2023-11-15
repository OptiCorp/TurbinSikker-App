import { Typography } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'
import useSnackBar from '../../components/snackbar/useSnackBar'
import { formatDate } from '../../helpers/dateFormattingHelpers'
import { useRoles } from '../../services/useRoles'
import { UserChip } from '../checklist/inprogressChecklists/UserChip'
import { PreviewWrapper } from '../checklist/previewCheckList/styles'
import { FillOutList } from './FillOutList'

import { ReviewList } from './ReviewList'
import { useFillChecklistForm } from './hooks/useFillChecklist'
import { BackgroundWrap, InfoHeader, List } from './styles'

export const FillOutCheckList = () => {
    const {
        methods,
        onSubmit,
        workflow,
        setSubmitDialogShowing,
        submitDialogShowing,
    } = useFillChecklistForm()

    const { handleSubmit } = methods

    const { isInspector, isLeader } = useRoles()
    const { snackbar, setSnackbarText } = useSnackBar()

    const formattedUpdateDate = formatDate(workflow?.updatedDate || '')

    return (
        <FormProvider {...methods}>
            {snackbar}
            <form
                onSubmit={handleSubmit(onSubmit, () =>
                    setSubmitDialogShowing(false)
                )}
                id="fill-checklist"
            >
                <BackgroundWrap>
                    {workflow && isLeader && (
                        <InfoHeader>
                            <Typography
                                variant="caption"
                                token={{
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                }}
                            >
                                {' '}
                                checklist:{' '}
                            </Typography>{' '}
                            {workflow?.checklist.title}
                            <List>
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

                                <Typography
                                    variant="caption"
                                    token={{
                                        fontSize: '1rem',
                                    }}
                                >
                                    at {formattedUpdateDate}{' '}
                                </Typography>
                            </List>
                        </InfoHeader>
                    )}
                    s
                    <>
                        <PreviewWrapper>
                            <>
                                {workflow && isInspector ? (
                                    <>
                                        <FillOutList
                                            workflow={workflow}
                                            setSubmitDialogShowing={
                                                setSubmitDialogShowing
                                            }
                                            submitDialogShowing={
                                                submitDialogShowing
                                            }
                                            key={workflow.id}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {workflow && (
                                            <ReviewList workflow={workflow} />
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
