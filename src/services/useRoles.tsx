import { useMsal } from '@azure/msal-react'

export const useRoles = () => {
    const { accounts } = useMsal()

    const isInspector =
        accounts[0].idTokenClaims?.roles?.some(
            (role) => role === 'inspector'
        ) || false

    const isLeader =
        accounts[0].idTokenClaims?.roles?.some((role) => role === 'leader') ||
        false

    return {
        isLeader,
        isInspector,
    }
}
