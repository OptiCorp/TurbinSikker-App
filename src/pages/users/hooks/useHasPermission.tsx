import { useEffect, useState } from 'react'
import { useUserContext } from '../context/userContextProvider'

export function useHasPermission() {
    const { currentUser } = useUserContext()
    const [hasPermission, setHasPermission] = useState<boolean | undefined>(
        false
    )
    const userRoleName = currentUser?.userRole.name

    useEffect(() => {
        setHasPermission(
            userRoleName?.includes('Admin') || userRoleName?.includes('Leader')
        )
    }, [userRoleName])

    return { useHasPermission, hasPermission }
}
