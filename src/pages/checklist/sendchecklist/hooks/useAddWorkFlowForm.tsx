import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { useCheckListContext } from '../../../../pages/context/CheckListContextProvider'
import useAuth from '../../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../../pages/users/context/userContextProvider'

export type SendingFormValuesEntity = {
    checklistId: string
    userId: string
    status: number
}

export const useAddWorkFlowForm = () => {
    const methods = useForm<SendingFormValuesEntity>()
    const { openSnackbar } = useContext(SnackbarContext)
    const { handleSubmit, control } = methods
    const navigate = useNavigate()
    const { idToken } = useAuth()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const { refreshList, setRefreshList } = useCheckListContext()
    const appLocation = useLocation()
    const { currentUser } = useUserContext()
    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    const onSubmit: SubmitHandler<SendingFormValuesEntity> = async (data) => {
        const res = await fetch(
            `https://turbinsikker-api-lin-prod.azurewebsites.net/api/CreateChecklistWorkFlow`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checklistId: data.checklistId,
                    userId: data.userId,
                    status: 0,
                    createdById: currentUser?.id,
                }),
            }
        )
        if (res.ok) {
            setRefreshList((prev) => !prev)
        }
        setPositiveOpen(false)
        navigate('/Checklist')

        if (openSnackbar) {
            openSnackbar('Checklist sendt!')
        }
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
