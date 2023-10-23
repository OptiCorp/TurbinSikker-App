import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FC } from 'react'
import { Workflow } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
import { COLORS } from '../../../style/GlobalStyles'
import { StyledChip } from './styles'
type UserChip = {
    workflow: Workflow
}

export const UserChip: FC<UserChip> = ({ workflow }) => {
    const { isInspector } = useRoles()

    return (
        <div>
            <StyledChip variant="default">
                <Icon data={assignment_user} color={COLORS.primary} />
                <Typography
                    variant="caption"
                    token={{
                        fontSize: '0.8rem',
                    }}
                >
                    {isInspector ? (
                        <>
                            {workflow.creator?.firstName}{' '}
                            {workflow.creator?.lastName}
                        </>
                    ) : (
                        <>
                            {workflow.user?.firstName} {workflow.user?.lastName}
                        </>
                    )}
                </Typography>
            </StyledChip>
        </div>
    )
}
