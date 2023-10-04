import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { SnackbarContext } from '../../../components/snackbar/SnackBarContext'
import { API_URL } from '../../../config'
import useAuth from '../../../context/AuthContextProvider'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { UpdatingWorkFlowEntity } from './types'

export type FillOutForm = {
    checklistId: string
    userIds: {
        value: string
        label: string
    }[]
    status: string
}
export const useFillOutCheckList = () => {
    const { setRefreshList } = useCheckListContext()

    const { accessToken } = useAuth()
    const { openSnackbar } = useContext(SnackbarContext)

    const [positiveOpen, setPositiveOpen] = useState(false)

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }
    const { workflowId } = useParams()
    const { currentUser } = useUserContext()
    const methods = useForm<UpdatingWorkFlowEntity>()
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = methods

    const onUpdate: SubmitHandler<UpdatingWorkFlowEntity> = async (data: {
        id: string
    }) => {
        const tasks = methods.watch()

        const res = await fetch(`${API_URL}/UpdateWorkflow`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                id: workflowId,
                status: 'Committed',
                userId: currentUser?.id,
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)

        if (openSnackbar) {
            openSnackbar(`Checklist sent`)
        }
    }

    return {
        methods,
        onUpdate,
        control,
        handleSubmit,
        handleOpen,
        getValues,
        clearAndClose,
        positiveOpen,
        formState: { errors },
    }
}
