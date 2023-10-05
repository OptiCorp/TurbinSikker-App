import { useQuery } from '@tanstack/react-query'
import useAuth from '../../context/AuthContextProvider'
import apiService from '../api'

export const useGetChecklistById = (id: string) => {
    const { accessToken } = useAuth()
    const { data, isLoading, isError, isFetched } = useQuery({
        queryKey: ['checklist', id],
        queryFn: () => apiService(accessToken).getChecklist(id),
        enabled: !!accessToken,
    })

    return {
        data,
        isError,
        isLoading,
        isFetched,
    }
}
