import { useQuery } from '@tanstack/react-query'
import useAuth from '../../context/AuthContextProvider'
import { useUserContext } from '../../pages/users/context/userContextProvider'
import apiService from '../api'

export const useGetWorkflowByUserId = () => {
    const { currentUser } = useUserContext()
    const { accessToken } = useAuth()
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['workflows', currentUser?.id],
        queryFn: () =>
            apiService(accessToken).getAllWorkflowsByUserId(
                currentUser?.id || ''
            ),
        enabled: !!currentUser?.id,
    })

    return {
        data,
        isLoading,
        isFetching,
    }
}
