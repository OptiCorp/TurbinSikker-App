import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { SetStateAction, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { API_URL } from '../../../config'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { usePunchContext } from '../context/PunchContextProvider'
import { Punch } from '../types'
import { addUpload } from '../../../Upload'
import { useHasPermission } from '../../../pages/users/hooks/useHasPermission'

type FormValuesPunchEntity = {
    creatorId: string
    description: string
    severity: string
    checklistTaskId: string
    workflowId: string
}

type UserInput = {
    severity: string | undefined
    description: string | undefined
}

export const useAddPunch = () => {
    const { currentUser } = useUserContext()

    const { accessToken } = useAuth()
    const { punch } = usePunchContext()
    const { workflowId, punchId, taskId } = useParams()
    const { hasPermission } = useHasPermission()
    const navigate = useNavigate()
    const { setRefreshList } = useCheckListContext()
    const methods = useForm<FormValuesPunchEntity>()
    const { handleSubmit, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const [positiveOpen, setPositiveOpen] = useState(false)
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [userInput, setUserInput] = useState<UserInput>({
        description: punch?.description,
        severity: punch?.severity,
    })
    /* const [severity, setSeverity] = useState<SetStateAction<string>>(punch?.severity || 'Minor') */
    const [file, setFile] = useState<File | undefined>()
    const [message, setMessage] = useState<SetStateAction<string>>()
    const [status, setStatus] = useState('')
    const onSubmit: SubmitHandler<FormValuesPunchEntity> = () => {
        if (hasPermission) {
            updatePunchLeader()
        } else if (punchId && !hasPermission) {
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
                description: userInput.description,
                workflowId: workflowId,
                severity: userInput.severity,
                status: 'Pending',
                message: message,
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)
        if (file) {
            await addUpload(accessToken, punchId, file)
        }
        setRejectDialogOpen(false)
        setPositiveOpen(false)
        navigate(`/workflow/${workflowId}/punch/${punchId}`)
        if (openSnackbar) openSnackbar('Punch updated!')
    }

    const updatePunchLeader = async () => {
        const res = await fetch(`${API_URL}/UpdatePunch?id=${punchId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                id: punchId,
                workflowId: workflowId,
                status: status,
                message: message,
            }),
        })
        if (res.ok) setRefreshList((prev) => !prev)
        if (file) {
            await addUpload(accessToken, punchId, file)
        }
        setRejectDialogOpen(false)
        navigate(`/workflow/${workflowId}/punch/${punchId}`)
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
                description: userInput.description,
                severity: userInput.severity,
                checkListTaskId: taskId,
                workflowId: workflowId,
            }),
        })

        if (res.ok) {
            const json: Promise<Punch> = res.json()
            const id = (await json).id
            if (file) {
                await addUpload(accessToken, id, file)
            }
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
    const handleRejectOpen = () => {
        setRejectDialogOpen(true)
    }
    const handleRejectClose = () => {
        setRejectDialogOpen(false)
    }

    return {
        setFile,
        file,
        methods,
        onSubmit,
        control,
        handleSubmit,
        userInput,
        setUserInput,
        positiveOpen,
        handleOpen,
        clearAndClose,
        rejectDialogOpen,
        handleRejectOpen,
        handleRejectClose,
        setMessage,
        setStatus,
        postPunch,
    }
}
