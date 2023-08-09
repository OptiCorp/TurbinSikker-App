import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation } from 'react-router'
import { ICheckListUserID } from 'src/models/CheckListUserIdEntity'
import { SelectComponent } from './SelectComponent'
import { SendBackgroundWrap } from './styles'

export const SendCheckList = () => {
    const methods = useForm<ICheckListUserID>()

    return (
        <>
            <FormProvider {...methods}>
                <SendBackgroundWrap>
                    <SelectComponent />
                </SendBackgroundWrap>

                <NavActionsComponent
                    isShown={true}
                    buttonVariant="ghost"
                    ButtonMessage="Cancel"
                    SecondButtonMessage="Send"
                />
            </FormProvider>
        </>
    )
}
