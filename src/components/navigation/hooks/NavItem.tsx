import { Icon, Typography } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { WorkflowResponse } from '../../../services/apiTypes'
import { COLORS } from '../../../style/GlobalStyles'
import { ImageContainerActive } from '../styles'
export const NavItem = ({
    isActive,
    name,
    icon,
    to,
}: {
    isActive: boolean
    name: string
    icon: IconData
    to: string
}) => {
    const [workFlows, setWorkFlow] = useState<WorkflowResponse[]>([])
    const api = apiService()
    const { currentUser } = useGlobal()

    useEffect(() => {
        if (!currentUser) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflowsByUserId(
                    currentUser.id
                )

                setWorkFlow(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id])

    const countCommittedWorkflows = (userId: string) => {
        const userWorkflows = workFlows.filter(
            (workflow) => workflow.user.id === userId
        )
        return userWorkflows.filter(
            (workflow) => workflow.status === 'Committed'
        ).length
    }

    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <ImageContainerActive>
                <Icon
                    data={icon}
                    size={24}
                    color={isActive ? COLORS.activeNavTab : COLORS.white}
                />
                <Typography
                    variant="caption"
                    color={isActive ? COLORS.activeNavTab : COLORS.white}
                >
                    {name}
                </Typography>
            </ImageContainerActive>
        </Link>
    )
}
