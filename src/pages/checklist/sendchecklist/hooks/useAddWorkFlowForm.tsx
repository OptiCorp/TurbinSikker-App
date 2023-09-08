import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { API_URL } from '../../../../config'
import { useCheckListContext } from '../../../../pages/context/CheckListContextProvider'
import useAuth from '../../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../../pages/users/context/userContextProvider'

export type SendingFormValuesEntity = {
    checklistId: string
    userIds: {
        value: string
        label: string
    }[]
    status: string
}
export const useAddWorkFlowForm = () => {
    const methods = useForm<SendingFormValuesEntity>()
    const { openSnackbar } = useContext(SnackbarContext)
    const { handleSubmit, control } = methods
    const navigate = useNavigate()
    const { accessToken } = useAuth()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const { setRefreshList } = useCheckListContext()
    const { currentUser } = useUserContext()
    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    const onSubmit: SubmitHandler<SendingFormValuesEntity> = async (data) => {
        const res = await fetch(`${API_URL}/CreateChecklistWorkFlow`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                checklistId: data.checklistId,
                userIds: data.userIds,

                createdById: currentUser?.id,
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)
        setPositiveOpen(false)
        navigate('/Checklist')
        if (openSnackbar) openSnackbar('Checklist sendt!')
    }

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        handleOpen,
        clearAndClose,
        positiveOpen,
    }
}
