import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FC } from 'react'
import { Workflow } from '../../../services/apiTypes'

import useGlobal from '../../../context/globalContextProvider'
import { StyledChip } from './styles'

type UserChip = {
    workflow: Workflow
}

export const UserChip: FC<UserChip> = ({ workflow }) => {
    const { currentUser } = useGlobal()

    return (
        <div>
            <StyledChip variant="default">
                <Icon data={assignment_user} color="#243746" />
                <Typography
                    variant="caption"
                    token={{
                        fontSize: '0.8rem',
                    }}
                >
                    {currentUser?.userRole.name === 'Inspector' ? (
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
