import { Typography } from '@equinor/eds-core-react'
import { useEffect } from 'react'
import { useApiContext } from '../context/apiContextProvider'
import { Info } from '../profile/styles'
import useAuth from './context/LandingPageContextProvider'
export const LandingPage = () => {
    const {
        accounts,

        accountname,

        inProgress,
    } = useAuth()

    const { currentUser } = useApiContext()

    useEffect(() => {}, [accountname, accounts])

    if (accounts.length > 0) {
        return (
            <>
                <span>
                    <Info>
                        <Typography variant="body_short">
                            There are currently {accounts.length} users signed
                            in!
                        </Typography>
                        <Typography variant="h5">
                            <p> {currentUser?.username}</p>
                        </Typography>{' '}
                    </Info>
                </span>
            </>
        )
    } else if (inProgress === 'login') {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}
