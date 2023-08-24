import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { SelectComponent } from './SelectComponent'
import { SendBackgroundWrap } from './styles'
import { useNavigate } from 'react-router'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import { useAddWorkFlowForm } from './hooks/useAddWorkFlowForm'

// export type SendingFormValuesEntity = {
   
//     checklistId: string
//     userId: string
  
// }

export const SendCheckList = () => {
    // const methods = useForm<SendingFormValuesEntity>()
    // const [positiveOpen, setPositiveOpen] = useState(false)
    // const { handleSubmit } = methods
    const navigate = useNavigate()
    // const { idToken } = useAuth()
   

   

    const {methods, onSubmit, handleOpen,clearAndClose,positiveOpen} = useAddWorkFlowForm()
    const {handleSubmit} = methods
    // const { refreshList, setRefreshList } = useCheckListContext()

    // const onSubmit: SubmitHandler<SendingFormValuesEntity> = async (data) => {

    //     const res = await fetch(
    //         `https://localhost:7290/api/CreateChecklistWorkFlow`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 Authorization: `Bearer ${idToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 checklistId: data.checklistId,
    //                 userId: data.userId
    //             }),
    //         }
    //     )
    //     if (res.ok) {
    //         setRefreshList((prev) => !prev)
    //     }
    //     setPositiveOpen(false)
    //     navigate('/Checklist')


    //     if (openSnackbar) {
    //         openSnackbar('Checklist sendt!')
    //     }
    // }
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
                    onClick={() => { navigate(-1)}}
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
