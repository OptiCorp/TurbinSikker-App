import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router'
import { API_URL } from '../../../config'
import { useCheckListContext } from '../../../pages/context/CheckListContextProvider'
import useAuth from '../../../pages/landingPage/context/LandingPageContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'

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

    type FormValuesPunchEntity = {
        createdBy: string
        punchDescription: string
        severity: string
        checklistTaskId: string
        checklistWorkFlowId: string
    }

    const [description, setDescription] = useState('')
    const [severity, setSeverity] = useState<SetStateAction<string>>('Minor')

    const onSubmit: SubmitHandler<FormValuesPunchEntity> = async (data) => {
        if (appLocation.pathname === '/addPunch') {
            setDescription('')
            await postPunch()
        } else {
            const res = await fetch(`${API_URL}/UpdatePunch?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(data),
            })
            if (res.ok) setRefreshList((prev) => !prev)
            setPositiveOpen(false)
            navigate('/Checklist')
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
                createdBy: currentUser?.id,
                punchDescription: description,
                severity: severity,
                checklistTaskId: '482f2505-c02d-47a0-8c00-e9b757662d0d',
                checklistWorkFlowId: '4c782512-b9ed-4e4c-b5f2-8f0411a30340',
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
    }
}
