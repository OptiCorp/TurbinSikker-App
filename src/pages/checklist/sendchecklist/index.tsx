import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { NavActionsComponent } from '../../../components/navigation/hooks/NavActionBtn'
import useSnackBar from '../../../components/snackbar/useSnackBar'
import { SelectComponent } from './SelectComponent'
import { useAddWorkFlowForm } from './hooks/useAddWorkFlowForm'
import { SendBackgroundWrap } from './styles'

export const SendCheckList = () => {
    const {
        methods,
        onSubmit,
        handleOpen,
        clearAndClose,
        positiveOpen,
        checklistAlreadySent,
    } = useAddWorkFlowForm()

    const { handleSubmit } = methods
    const navigate = useNavigate()
    const { snackbar } = useSnackBar()
    console.log(checklistAlreadySent)
    return (
        <>
            <FormProvider {...methods}>
                {snackbar}
                <form onSubmit={handleSubmit(onSubmit)} id="send-checklist">
                    <SendBackgroundWrap>
                        <SelectComponent />
                    </SendBackgroundWrap>

                    <NavActionsComponent
                        isShown={true}
                        buttonVariant="ghost"
                        ButtonMessage="Cancel"
                        SecondButtonMessage="Send"
                        type="button"
                        secondOnClick={handleOpen}
                        onClick={() => {
                            navigate('/')
                        }}
                    />
                    {checklistAlreadySent ? <span>error</span> : null}
                    <Dialog open={positiveOpen}>
                        <Dialog.Header>
                            <Dialog.Title>Send checklist?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CustomContent>
                            <Typography
                                group="input"
                                variant="text"
                                token={{ textAlign: 'left' }}
                            >
                                Send Checklist to these users?
                            </Typography>
                        </Dialog.CustomContent>
                        <Dialog.Actions>
                            <div>
                                <Button variant="ghost" onClick={clearAndClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" form="send-checklist">
                                    Send CheckList
                                </Button>
                            </div>
                        </Dialog.Actions>
                    </Dialog>
                </form>
            </FormProvider>
        </>
    )
}
