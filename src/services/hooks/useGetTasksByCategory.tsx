import { useQuery } from '@tanstack/react-query'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../api'

export const useGetTasksByCategoryId = (categoryId: string) => {
    const { accessToken } = useGlobal()
    const { data, isLoading, isError, isFetched } = useQuery({
        queryKey: ['tasksByCategory', categoryId],
        queryFn: () => apiService().getAllTasksByCategoryId(categoryId),
        enabled: !!accessToken,
    })

    return {
        data,
        isError,
        isLoading,
        isFetched,
    }
}
