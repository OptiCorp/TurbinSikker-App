import { useEffect } from 'react'

import { useLandingPageContext } from './context/LandingPageContextProvider'
import useAuth from './context/LandingPageContextProvider'
export const LandingPage = () => {
    const { apiData, setApiData } = useLandingPageContext()
    const { accounts, inProgress } = useAuth()

    setApiData('hella')

    useEffect(() => {}, [apiData])

    if (accounts.length > 0) {
        return (
            <>
                <span>
                    There are currently {accounts.length} users signed in!
                </span>
                {apiData && (
                    <span>
                        Data retrieved from API: {JSON.stringify(apiData)}
                    </span>
                )}
            </>
        )
    } else if (inProgress === 'login') {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}
