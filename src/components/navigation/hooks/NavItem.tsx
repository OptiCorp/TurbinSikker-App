import { Icon, Typography } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { Link } from 'react-router-dom'
import { ImageContainer, ImageContainerActive, Test } from '../styles'
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
        <>
        <Link to={to} style={{ textDecoration: 'none' }}>
            {isActive ? (
                <ImageContainerActive>
                    <Test>
                        <NotificationBadge name={name} />
                    </Test>
                    <Icon data={icon} size={24} color="#73b1b5" />
                    <Typography variant="caption" color={'#73b1b5'}>
                        {name}
                    </Typography>
                </ImageContainerActive>
            ) : (
                <ImageContainer>
                    <Test>
                        <NotificationBadge name={name} />
                    </Test>
                    <Icon data={icon} size={24} color="white" />
                    <Typography variant="caption" color={'white'}>
                        {name}
                    </Typography>
                </ImageContainer>
            )}
        </Link>
    </>)
}
