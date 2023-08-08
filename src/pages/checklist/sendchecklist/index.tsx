import {
    Controller,
    FormProvider,
    useForm,
    useFormContext,
} from 'react-hook-form'
import { useLocation } from 'react-router'
import { ICheckListUserID } from 'src/models/CheckListUserIdEntity'
import { SelectComponent } from './SelectComponent'
import { SendCheckListNav } from './SendCheckListNav'
import { SendBackgroundWrap } from './styles'

export const SendCheckList = () => {
    const methods = useForm<ICheckListUserID>()
    const appLocation = useLocation()

    return (
        <>
            <FormProvider {...methods}>
                <SendBackgroundWrap>
                    <SelectComponent />
                </SendBackgroundWrap>
                {appLocation.pathname.includes('SendCheckList') ? (
                    <SendCheckListNav />
                ) : null}
            </FormProvider>
        </>
    )
}
