import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { API_URL } from '../../../../config'
import { default as useGlobal } from '../../../../context/globalContextProvider'

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

    const { handleSubmit, control, getValues } = methods
    const navigate = useNavigate()
    const { accessToken } = useGlobal()
    const [positiveOpen, setPositiveOpen] = useState(false)
    // const { setRefreshList } = apiService()
    const { currentUser } = useGlobal()

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    const onSubmit: SubmitHandler<SendingFormValuesEntity> = async (data) => {
        const res = await fetch(`${API_URL}/CreateWorkFlow`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                checklistId: data.checklistId,
                userIds: data.userIds,

                creatorId: currentUser?.id,
            }),
        })
        // if (res.ok) setRefreshList((prev) => !prev)
        setPositiveOpen(false)
        navigate('/Checklist')
        // if (openSnackbar) {
        //     openSnackbar('Workflow created!')
        // }
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
