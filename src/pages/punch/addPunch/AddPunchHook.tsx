import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { SetStateAction, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
import { API_URL } from '../../../config'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { AddUpload } from '../../../Upload'
import { usePunchContext } from '../context/PunchContextProvider'

export const useAddPunch = () => {
    const { currentUser } = useUserContext()
    const { id } = useParams()
    const { punch } = usePunchContext()
    const appLocation = useLocation()
    const methods = useForm<FormValuesPunchEntity>()
    const { handleSubmit, control } = methods
    const { openSnackbar } = useContext(SnackbarContext)
    const { setRefreshList } = useCheckListContext()
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [positiveOpen, setPositiveOpen] = useState(false)

    type FormValuesPunchEntity = {
        creatorId: string
        description: string
        severity: string
        checklistTaskId: string
        workflowId: string
    }

    const [description, setDescription] = useState('')
    const [severity, setSeverity] = useState<SetStateAction<string>>(punch?.severity || 'Minor')
    const [file, setFile] = useState<File | undefined>()

    const onSubmit: SubmitHandler<FormValuesPunchEntity> = async () => {
        if (appLocation.pathname === '/addPunch') {
            setDescription('')
            await postPunch()
            await AddUpload(accessToken, punch.id, file)
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
                    workflowId: '287f5297-bfa5-49be-8c56-3bfe9ec98227',
                    description: description,
                    severity: severity,
                }),
            })
            if (res.ok) setRefreshList((prev) => !prev)
            setPositiveOpen(false)
            navigate(`/punch/${id}`)
            if (openSnackbar) openSnackbar('Punch updated!')
        }
    }

    async function postPunch() {
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
                checklistTaskId: '482f2505-c02d-47a0-8c00-e9b757662d0d',
                workflowId: '95b927b4-1e8d-48c3-a254-7ca1b8f501c2',
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
        setFile,
        file,
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
    }
}
