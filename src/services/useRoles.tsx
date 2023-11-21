import useGlobal from '../context/globalContextProvider'

export const useRoles = () => {
    const { currentUser } = useGlobal()

    const isInspector = currentUser?.userRole === 'Inspector' || false

    const isLeader = currentUser?.userRole === 'Leader' || false

    return {
        isLeader,
        isInspector,
    }
}
