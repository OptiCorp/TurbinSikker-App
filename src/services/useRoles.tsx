import { useMsal } from '@azure/msal-react'
import useGlobal from '../context/globalContextProvider'

export const useRoles = () => {
    const { currentUser } = useGlobal()
    const { accounts } = useMsal()

    const isInspector =
        // accounts[0].idTokenClaims?.roles?.some(
        //     (role) => role === 'inspector'
        // ) || false

        currentUser?.userRole === 'Inspector' || false

    const isLeader =
        // accounts[0].idTokenClaims?.roles?.some((role) => role === 'leader') ||
        // false

        currentUser?.userRole === 'Leader' || false

    return {
        isLeader,
        isInspector,
    }
}
