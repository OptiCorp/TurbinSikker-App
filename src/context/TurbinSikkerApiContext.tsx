import React, { useEffect, useState } from 'react'
import apiService, { ApiService } from '../services/api'
import { ApiStatus } from '../services/apiTypes'

import { Progress, Typography } from '@equinor/eds-core-react'
import PageNotFound from '../pages/PageNotFound'
import { useUserContext } from '../pages/users/context/userContextProvider'
import useAuth, { AuthContextType } from './AuthContextProvider'
import { Loading } from '@components/loading/Loading'

const TurbinSikkerApiContext = React.createContext({} as TurbinSikkerApiProps)

type TurbinSikkerApiProps = {
    api: ApiService
    auth?: AuthContextType
    authenticatedUser?: ApiStatus
    accessToken: string
}
const TurbinSikkerApiContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticatedStatus, setIsAuthenticatedStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const [authenticatedUser, setAuthenticatedUser] = useState()
    const { currentUser } = useUserContext()
    const { accessToken } = useAuth()
    console.log(isAuthenticatedStatus)

    const api = apiService(accessToken)

    useEffect(() => {
        if (!accessToken || !currentUser.azureAdUserId) return
        ;(async (): Promise<void> => {
            setIsAuthenticatedStatus(ApiStatus.LOADING)
            try {
                const authenticatedUserFromApi = await api.getUserByAzureAdUserId(
                    currentUser?.azureAdUserId
                )
                setAuthenticatedUser(authenticatedUserFromApi)
                setIsAuthenticatedStatus(ApiStatus.SUCCESS)
            } catch (error) {
                setIsAuthenticatedStatus(ApiStatus.ERROR)
            }
        })()
    }, [ApiStatus, currentUser])

    if (isAuthenticatedStatus === ApiStatus.LOADING) {
        return <Loading text={'Loading ..'} />
    }
    if (isAuthenticatedStatus === ApiStatus.ERROR) {
        return <PageNotFound />
    }

    return (
        <TurbinSikkerApiContext.Provider
            value={{ api, accessToken, authenticatedUser: isAuthenticatedStatus }}
        >
            {children}
        </TurbinSikkerApiContext.Provider>
    )
}

export { TurbinSikkerApiContext, TurbinSikkerApiContextProvider }
