import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { SetStateAction, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { API_URL } from '../../../config'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { Punch } from '../types'

export const useAddPunch = () => {
    const { currentUser } = useUserContext()

    const methods = useForm<FormValuesPunchEntity>()
    const { handleSubmit, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { setRefreshList } = useCheckListContext()
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const { workflowId, punchId, taskId } = useParams()
    type FormValuesPunchEntity = {
        id: string
        createdBy: string
        taskId: string
        description: string
        severity: string
        checklistTaskId: string
        workflowId: string
    }

    const [description, setDescription] = useState('')
    const [severity, setSeverity] = useState<SetStateAction<string>>('Minor')

    const onSubmit: SubmitHandler<FormValuesPunchEntity> = () => {
        if (punchId) {
            updatePunch()
        } else {
            postPunch()
        }
    }

    const updatePunch = async () => {
        const res = await fetch(`${API_URL}/UpdatePunch?id=${punchId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                id: punchId,
                description: description,
                workflowId: workflowId,
                severity: severity,
                status: 'Pending',
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)
        setPositiveOpen(false)
        navigate('/Checklist')
        if (openSnackbar) openSnackbar('Punch updated!')
    }

    const postPunch = async () => {
        if (!accessToken) return

        const res = await fetch(`${API_URL}/AddPunch`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                creatorId: currentUser?.id,
                description: description,
                severity: severity,
                checkListTaskId: taskId,
                workflowId: workflowId,
            }),
        })

        if (res.ok) {
            const json: Promise<Punch> = res.json()
            navigate(`/workflow/${workflowId}/punch/${(await json).id}`)
        }

        if (openSnackbar) {
            openSnackbar(`Punch created`)
        }
    }

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        severity,
        description,
        setDescription,
        positiveOpen,
        setSeverity,
        handleOpen,
        clearAndClose,

        postPunch,
    }
}
