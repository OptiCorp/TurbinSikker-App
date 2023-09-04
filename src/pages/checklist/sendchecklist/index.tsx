import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { FormProvider } from 'react-hook-form'

import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { SelectComponent } from './SelectComponent'
import { SendBackgroundWrap } from './styles'
import { useNavigate } from 'react-router'

import { useAddWorkFlowForm } from './hooks/useAddWorkFlowForm'



export const SendCheckList = () => {
  
    const navigate = useNavigate()
  
   

   

    const {methods, onSubmit, handleOpen,clearAndClose,positiveOpen} = useAddWorkFlowForm()
    const {handleSubmit} = methods

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
