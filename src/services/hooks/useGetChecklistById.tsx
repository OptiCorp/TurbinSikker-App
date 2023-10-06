import { useQuery } from '@tanstack/react-query'
import useGlobal from '../../context/globalContextProvider'
import apiService from '../api'

export const useGetChecklistById = (id: string) => {
    const { accessToken } = useGlobal()
    const { data, isLoading, isError, isFetched } = useQuery({
        queryKey: ['checklist', id],
        queryFn: () => apiService().getChecklist(id),
        enabled: !!accessToken,
    })

    return {
        data,
        isError,
        isLoading,
        isFetched,
    }
}
