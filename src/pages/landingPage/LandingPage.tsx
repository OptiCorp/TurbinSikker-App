import { Typography } from '@equinor/eds-core-react'
import { Info } from '../profile/styles'
import { UserEntity } from '../users/context/models/UserEntity'
import { useUserContext } from '../users/context/userContextProvider'
import useAuth from './context/LandingPageContextProvider'

export const LandingPage = () => {


    return (<> token down :c</>)
//     const { currentUser, result } = useUserContext()

//     const {
//         accounts,

//         accountname,

//         inProgress,
//     } = useAuth()
//     /* if (!users) {
//     return <Navigate to="/404" replace />;
//   } */

//     //useEffect(() => {}, [accountname, accounts]);

//     if (accounts.length > 0) {
//         return (
//             <>
//                 <span>
//                     <Info>
//                         <Typography variant="body_short">
//                             There are currently {accounts.length} users signed
//                             in!
//                         </Typography>
//                         <Typography variant="h5">
//                             <p> {currentUser?.username}</p>
//                         </Typography>
//                     </Info>
//                 </span>
//             </>
//         )
//     } else if (inProgress === 'login') {
//         return <span>Login is currently in progress!</span>
//     } else {
//         return <span>There are currently no users signed in!</span>
//     }
}
