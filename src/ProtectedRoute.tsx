import { Navigate } from 'react-router'
import { useRoles } from './services/useRoles'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isInspector } = useRoles()

    if (isInspector) {
        return <Navigate to="/" replace />
    } else {
        return <>{children}</>
    }
}
