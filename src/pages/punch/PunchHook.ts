import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'

import { API_URL } from '../../config'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../../services/api'
import { Upload } from '../../services/apiTypes'

export function usePunch() {
    const api = apiService()
    const { id } = useParams() as { id: string }
    const methods = useForm()
    const { getUploadByPunchId } = apiService()
    const { accessToken } = useGlobal()

    const [status, setStatus] = useState('')
    const [uploads, setUploads] = useState<Upload[]>([])
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
            // if (res.ok) setRefreshList((prev) => !prev)
            setPositiveOpen(false)
            // if (openSnackbar) openSnackbar(`Punch ${status}`)
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
        ;async () => {
            const uploadFromApi = await api.getUploadByPunchId(id)
            setUploads(uploadFromApi)
            setLoading(false)
        }
    }, [accessToken, id])

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
