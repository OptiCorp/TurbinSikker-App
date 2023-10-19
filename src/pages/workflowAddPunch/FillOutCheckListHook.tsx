import { useState } from 'react'

import apiService from '../../services/api'

export const useFillOutCheckList = () => {
    const [positiveOpen, setPositiveOpen] = useState(false)

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const clearAndClose = () => {
        setPositiveOpen(false)
    }
    const api = apiService()

    return {
        handleOpen,

        clearAndClose,
        positiveOpen,
    }
}
