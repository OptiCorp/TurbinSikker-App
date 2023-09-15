import { Icon, Typography } from '@equinor/eds-core-react'
import { IconData } from '@equinor/eds-icons'
import { ImageContainer, ImageContainerActive, Test } from '../styles'
import { NotificationBadge } from './NotificationChip'

export const Item = ({
    isActive,
    name,
    icon,
}: {
    isActive: boolean
    name: string
    icon: IconData
}) => {
    return (
        <>
            {isActive ? (
                <ImageContainerActive>
                    <Test>
                        <NotificationBadge name={name} />{' '}
                    </Test>
                    <Icon data={icon} size={24} color="#73b1b5" />
                    <Typography variant="caption" color={'#73b1b5'}>
                        {name}
                    </Typography>{' '}
                </ImageContainerActive>
            ) : (
                <ImageContainer>
                    <Test>
                        <NotificationBadge name={name} />
                    </Test>
                    <Icon data={icon} size={24} color="white" />
                    <Typography variant="caption" color={'white'}>
                        {name}
                    </Typography>{' '}
                </ImageContainer>
            )}
        </>
    )
}
