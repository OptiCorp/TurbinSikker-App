import { useQuery } from '@tanstack/react-query'
import useAuth from '../../context/AuthContextProvider'
import { useUserContext } from '../../pages/users/context/userContextProvider'
import apiService from '../api'

export const useGetAllWorkflows = () => {
    const { currentUser } = useUserContext()
    const { accessToken } = useAuth()
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['allWorkflows'],
        queryFn: () => apiService(accessToken).getAllWorkflows(),
        enabled: !!currentUser?.id && !!accessToken,
    })

    return {
        data,
        isLoading,
        isFetching,
    }
}
