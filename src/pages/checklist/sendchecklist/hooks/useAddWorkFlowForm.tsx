import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { default as useGlobal } from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist } from '../../../../services/apiTypes'
import { ListEntity, SendingFormValuesEntity } from './types'

export const useAddWorkFlowForm = () => {
    const methods = useForm<SendingFormValuesEntity>()

    const [list, setList] = useState<ListEntity[]>([])
    const [checklistsData, setChecklistsData] = useState<Checklist[]>([])
    const { id } = useParams() as { id: string }
    const defaultChecklist = list.find((item) => item.value === id)

    const { handleSubmit, control } = methods
    const navigate = useNavigate()
    const [checklistAlreadySent, setChecklistAlreadySent] = useState(false)
    const [positiveOpen, setPositiveOpen] = useState(false)
    const api = apiService()
    const { currentUser, accessToken, openSnackbar, setRefreshList } =
        useGlobal()
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
                setChecklistsData(checklistData)

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
        const isChecklistAlreadyExists = checklistsData.some((checklist) =>
            checklist.workflows.some(
                (workflow) =>
                    workflow.checklist.id === data.checklistId &&
                    data.userIds.includes(workflow.user.id)
            )
        )

        if (isChecklistAlreadyExists) {
            if (openSnackbar)
                openSnackbar(
                    'The user has already been sent the same checklist'
                )
            return
        }

        if (!creatorId) return

        try {
            const res = await api.createWorkflow(
                data.checklistId,
                data.userIds,
                creatorId
            )

            if (res.ok) {
                setPositiveOpen(false)

                if (openSnackbar) openSnackbar('Checklist sent')

                navigate('/Checklists')
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        methods,
        onSubmit,
        control,
        list,
        checklistAlreadySent,
        handleSubmit,
        handleOpen,
        clearAndClose,

        positiveOpen,
    }
}
