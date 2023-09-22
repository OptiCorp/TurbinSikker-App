import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { SetStateAction, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
import { API_URL } from '../../../config'
import { useWorkflowContext } from '../../../pages/checklist/workflow/context/workFlowContextProvider'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { usePunchContext } from '../context/PunchContextProvider'

export const useAddPunch = () => {
    const { currentUser } = useUserContext()
    const { id } = useParams()
    const appLocation = useLocation()
    const methods = useForm<FormValuesPunchEntity>()
    const { handleSubmit, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { setRefreshList } = useCheckListContext()
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const { punch, taskId, workFlow, workflowData } = usePunchContext()
    const { workFlowById } = useWorkflowContext()

    const [test, setTest] = useState('')
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

    const onSubmit: SubmitHandler<FormValuesPunchEntity> = async (data: {
        taskId: string
        workflowId: string
    }) => {
        if (appLocation.pathname === '/addPunch') {
            setDescription('')
            // await postPunch()
        } else {
            const res = await fetch(`${API_URL}/UpdatePunch?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    id: id,
                    description: description,
                    workflowId: data.workflowId,
                    severity: severity,
                    status: 'Pending',
                }),
            })
            console.log(workflowData)
            if (res.ok) setRefreshList((prev) => !prev)
            setPositiveOpen(false)
            navigate('/Checklist')
            if (openSnackbar) openSnackbar('Punch updated!')
        }
    }

    const postPunch = async (data: { taskId: string; workFlowId: string }) => {
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
                checkListTaskId: data.taskId,
                workflowId: data.workFlowId,
            }),
        })

        if (res.ok) {
            const responseJson = await res.json()
            if (responseJson && responseJson.id) {
                const punchId = responseJson.id
                navigate(`/Punch/${punchId}`)
            }

            if (openSnackbar) {
                openSnackbar(`Punch created`)
            }
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
