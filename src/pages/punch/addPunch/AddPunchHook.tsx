import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { default as useGlobal } from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { PunchItem } from '../../../services/apiTypes'
import { useHasPermission } from '../../../services/useHasPermission'

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
    const { currentUser, openSnackbar } = useGlobal()
    const api = apiService()
    const { workflowId, punchId, taskId } = useParams() as {
        workflowId: string
        punchId: string
        taskId: string
    }
    const { hasPermission } = useHasPermission()
    const navigate = useNavigate()
    const methods = useForm<FormValuesPunchEntity>()
    const { handleSubmit, control } = methods
    const [positiveOpen, setPositiveOpen] = useState(false)
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
    const [punch, setPunch] = useState<PunchItem>()
    const [userInput, setUserInput] = useState<UserInput>({
        description: punch?.description,
        severity: punch?.severity,
    })
    const [file, setFile] = useState<File | undefined>()
    const [message, setMessage] = useState<string>()
    const [status, setStatus] = useState('')

    useEffect(() => {
        ;async () => {
            const punchFromAPi = await api.getPunch(punchId)
            setPunch(punchFromAPi)
        }
    }, [])
    const onSubmit: SubmitHandler<FormValuesPunchEntity> = () => {
        if (hasPermission) {
            updatePunchLeader()
        } else if (punchId && !hasPermission) {
            updatePunch()
            navigate('/')
        } else {
            postPunch()
        }
    }
    const updatePunch = async () => {
        try {
            const res = await api.updatePunch(punchId, workflowId, {
                description: userInput.description,
                severity: userInput.severity,
                status: 'Pending',
                message: message,
            })
            {
                navigate(`/Punches`)
                setRejectDialogOpen(false)
                setPositiveOpen(false)
            }
            if (file) {
                await api.addUpload(punchId, file)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updatePunchLeader = async () => {
        const res = await api.updatePunch(punchId, workflowId, {
            status: status,
            message: message,
        })

        if (file) {
            await api.addUpload(punchId, file)
        }
        setRejectDialogOpen(false)
        if (res.ok && status === 'Rejected' && openSnackbar) {
            openSnackbar('Punch rejected')
        }
        if (res.ok && status === 'Approved' && openSnackbar) {
            openSnackbar('Punch approved')
        }
        if (res.ok) navigate('/Punches')
    }

    const postPunch = async () => {
        if (!currentUser) return
        try {
            const res = await api.addPunch(currentUser?.id, taskId, {
                description: userInput.description,
                severity: userInput.severity,
                workflowId: workflowId,
            })

            setPositiveOpen(false)
            if (res.ok) {
                if (openSnackbar) openSnackbar('Punch added')
                const json: Promise<PunchItem> = res.json()
                const id = (await json).id
                if (file) {
                    await api.addUpload(id, file)
                }

                navigate(`/workflow/${workflowId}/punch/${(await json).id}`)
            }
        } catch (error) {
            console.error(error)
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
        status,
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
