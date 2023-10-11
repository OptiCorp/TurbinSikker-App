import { useLocation, useNavigate, useParams } from 'react-router'

import useGlobal from '../context/globalContextProvider'

export type apiParams = {
    id: string
    punchId: string
    workflowId: string
    userId: string
    taskId: string
}

export const useApiHooks = () => {
    const { accessToken } = useGlobal()
    const params = useParams<apiParams>()

    // const apii = apiService(accessToken)

    const location = useLocation()

    const { currentUser } = useGlobal()

    const currentUserId: string = currentUser?.id ?? ''

    const navigate = useNavigate()

    return {
        accessToken,
        location,
        params,
        navigate,

        currentUserId,
    }
}
