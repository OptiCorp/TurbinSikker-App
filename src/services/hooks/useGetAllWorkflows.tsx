import { useQuery } from '@tanstack/react-query'

import useGlobal from '../../context/globalContextProvider'
import apiService from '../api'

export const useGetAllWorkflows = () => {
    const { currentUser, accessToken } = useGlobal()

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['allWorkflows'],
        queryFn: () => apiService().getAllWorkflows(),
        enabled: !!currentUser?.id && !!accessToken,
    })
  
    return {
        data,
        isLoading,
        isFetching,
    }
}
