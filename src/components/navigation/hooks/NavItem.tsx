import { Icon, Typography } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { Link } from 'react-router-dom'
import { ImageContainerActive, Test } from '../styles'
import { NotificationBadge } from './NotificationChip'

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
    return (
        <Link to={to} style={{ textDecoration: 'none' }}>
            <ImageContainerActive>
                <Test>
                    {name === 'Checklists' && isActive ? (
                        <NotificationBadge name={name} />
                    ) : null}
                </Test>
                <Icon
                    data={icon}
                    size={24}
                    color={isActive ? '#73b1b5' : '#fff'}
                />
                <Typography
                    variant="caption"
                    color={isActive ? '#73b1b5' : '#fff'}
                >
                    {name}
                </Typography>
            </ImageContainerActive>
        </Link>
    )
}
