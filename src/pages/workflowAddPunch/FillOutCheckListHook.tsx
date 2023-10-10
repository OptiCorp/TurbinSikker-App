import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { API_URL } from '../../config'
import useGlobal from '../../context/globalContextProvider'

import apiService from '../../services/api'
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
    // const { setRefreshList } = apiService()

    const { accessToken } = useGlobal()

    const [positiveOpen, setPositiveOpen] = useState(false)

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }
    const api = apiService()
    const { workflowId } = useParams()
    const { currentUser } = useGlobal()
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
        // try {
        //     await api.updateWorkflow(data.id)
        // } catch (error) {
        //     if (error) return
        //     console.log(error)
        // } finally {
        //     console.log('Success updating workflow')
        // }

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
