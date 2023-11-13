import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import apiService from '../../services/api'
import { ApiStatus, Upload } from '../../services/apiTypes'

export function usePunch() {
    const api = apiService()
    const { punchId } = useParams() as { punchId: string }
    const methods = useForm()
    const [status, setStatus] = useState('')
    const [uploads, setUploads] = useState<Upload[]>([])
    const [positiveOpen, setPositiveOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetchUploadStatus, setFetchUploadStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }

    useEffect(() => {
        setLoading(true)
        if (!punchId) return
        ;(async () => {
            const uploadFromApi = await api.getUploadByPunchId(punchId)
            setUploads(uploadFromApi)
            setFetchUploadStatus(ApiStatus.SUCCESS)
        })()
    }, [])

    return {
        setStatus,

        positiveOpen,
        handleOpen,
        clearAndClose,
        loading,
        fetchUploadStatus,
        uploads,
        methods,
    }
}
