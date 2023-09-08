import { Navigate } from 'react-router'

import { useUserContext } from '../pages/users/context/userContextProvider'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useUserContext()

    if (currentUser?.userRole.name === 'Inspector') {
        return <Navigate to="/" replace />
    }
    return children
}
