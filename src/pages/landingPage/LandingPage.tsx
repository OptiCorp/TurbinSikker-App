import { Typography } from '@equinor/eds-core-react'
import { Info } from '../profile/styles'
import { UserEntity } from '../users/context/models/UserEntity'

export const LandingPage = ({
    users,
    currentUser,
    accounts,
    accountname,
    inProgress,
}: {
    currentUser: UserEntity | null
    users: UserEntity
    accounts: any
    inProgress: any
    accountname: string
}) => {
    /* if (!users) {
    return <Navigate to="/404" replace />;
  } */

    //useEffect(() => {}, [accountname, accounts]);

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
                        </Typography>
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
