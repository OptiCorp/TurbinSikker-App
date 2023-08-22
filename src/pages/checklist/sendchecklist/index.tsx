import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import { CheckListEntity } from '../../../pages/context/models/CheckListEntity'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { SelectComponent } from './SelectComponent'
import { SendBackgroundWrap } from './styles'

export type SendingFormValuesEntity = {
    id: string
    checklistId: string
    userId: {
        value: string
        label: string
    }[]
    status: any
    updatedDate: string
    checklist: CheckListEntity[]
}

export const SendCheckList = () => {
    const methods = useForm<SendingFormValuesEntity>()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const { handleSubmit } = methods
    const { idToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)
    const { currentUser } = useUserContext()
    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    const onSubmit: SubmitHandler<SendingFormValuesEntity> = async (data) => {
        console.log('submitting', data)
        const res = await fetch(
            `https://localhost:7290/api/CreateChecklistWorkFlow`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checklistId: data.checklistId,
                    userId: data.userId.map((x) => x.value),
                }),
            }
        )

        if (openSnackbar) {
            openSnackbar('Checklist sendt!')
        }
    }
    return (
        <>
            <FormProvider {...methods}>
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
                    />
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
