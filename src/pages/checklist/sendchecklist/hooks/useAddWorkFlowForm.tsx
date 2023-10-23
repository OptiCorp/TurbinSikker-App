import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import useSnackBar from '../../../../components/snackbar/useSnackBar'
import { default as useGlobal } from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'

export type SendingFormValuesEntity = {
    checklistId: string
    userIds: string[]
    creatorId: string
}

export type ListEntity = {
    id: string
    title: string
    value: string
    label: string
}

export const useAddWorkFlowForm = () => {
    const methods = useForm<SendingFormValuesEntity>()

    const [list, setList] = useState<ListEntity[]>([])
    const { id } = useParams() as { id: string }
    const defaultChecklist = list.find((item) => item.value === id)

    const { handleSubmit, control } = methods
    const navigate = useNavigate()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const api = apiService()
    const { currentUser, accessToken, openSnackbar } = useGlobal()
    const creatorId = currentUser?.id
    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    useEffect(() => {
        if (!defaultChecklist) return
        methods.setValue('checklistId', defaultChecklist.id)
    }, [defaultChecklist])

    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
        ;(async (): Promise<void> => {
            try {
                const checklistData = await api.getAllChecklistsByUserId(
                    currentUser.id
                )

                const listData: ListEntity[] = checklistData.map(
                    ({ id, title }) => ({
                        id,
                        title,
                        value: id,
                        label: title,
                    })
                )

                setList(listData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [accessToken, currentUser?.id])

    const onSubmit: SubmitHandler<SendingFormValuesEntity> = async (
        data: SendingFormValuesEntity
    ) => {
        if (!creatorId || !accessToken) return
        try {
            const test = await api.createWorkflow(
                data.checklistId,
                data.userIds,
                creatorId
            )

            if (test.ok) setPositiveOpen(false)

            if (test.ok && openSnackbar) openSnackbar('Checklist sent')
            navigate('/Checklists')
        } catch (error) {
            console.log(error)
        }
    }

    return {
        methods,
        onSubmit,
        control,
        list,
        handleSubmit,
        handleOpen,
        clearAndClose,

        positiveOpen,
    }
}
