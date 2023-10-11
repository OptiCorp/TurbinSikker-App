import { Navigate } from 'react-router'
import useGlobal from './context/globalContextProvider'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useGlobal()

    if (currentUser?.userRole.name === 'Inspector') {
        return <Navigate to="/" replace />
    } else {
        return <div>{children}</div>
    }
}
