import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import useAuth from '../landingPage/context/LandingPageContextProvider'
import { API_URL } from '../../config'
import { useContext, useEffect, useState } from 'react'
import { useCheckListContext } from '../context/CheckListContextProvider'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { getUploadByPunchId } from '../../Upload'
import { usePunchContext } from './context/PunchContextProvider'

export function usePunch() {
    const { id } = useParams()
    const { punch } = usePunchContext()
    const methods = useForm()
    const { accessToken } = useAuth()
    const { setRefreshList } = useCheckListContext()
    const { openSnackbar } = useContext(SnackbarContext)
    const [status, setStatus] = useState('')
    const [uploads, setUploads] = useState([])
    const [positiveOpen, setPositiveOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            const res = await fetch(`${API_URL}/updatePunch?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    status: status,
                    id: id,
                    workflowId: '95b927b4-1e8d-48c3-a254-7ca1b8f501c2',
                }),
            })
            if (res.ok) setRefreshList((prev) => !prev)
            setPositiveOpen(false)
            if (openSnackbar) openSnackbar(`Punch ${status}`)
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

    useEffect(() => {
        setLoading(true)
        const uploads = getUploadByPunchId(punch?.id, accessToken)
        uploads.then((data) => {
            setUploads(data)
            setLoading(false)
        })
    }, [accessToken, punch?.id])

    return {
        setStatus,
        onSubmit,
        positiveOpen,
        handleOpen,
        clearAndClose,
        loading,
        uploads,
        methods,
    }
}
