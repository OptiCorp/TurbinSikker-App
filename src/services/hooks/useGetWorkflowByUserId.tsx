import { useQuery } from '@tanstack/react-query'

import useGlobal from '../../context/globalContextProvider'
import apiService from '../api'

export const useGetWorkflowByUserId = () => {
    const { currentUser, accessToken } = useGlobal()

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['workflows', currentUser?.id],
        queryFn: () =>
            apiService().getAllWorkflowsByUserId(currentUser?.id || ''),
        enabled: !!currentUser?.id && !!accessToken,
    })

    return {
        data,
        isLoading,
        isFetching,
    }
}
