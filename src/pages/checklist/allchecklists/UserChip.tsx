import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FC } from 'react'
import { formatDate } from '../../../Helpers'
import { AllWorkFlows } from '../workflow/types'
import { useUserContext } from './../../../pages/users/context/userContextProvider'
import { StyledChip } from './styles'

type UserChip = {
    workflow: AllWorkFlows
}

export const UserChip: FC<UserChip> = ({ workflow }) => {
    const { currentUser } = useUserContext()
    const formattedDate = formatDate(workflow?.createdDate ?? '')
    switch (currentUser?.userRole.name) {
        case 'Inspector':
            return (
                <>
                    <StyledChip variant="default">
                        <Icon data={assignment_user} color="#243746" />
                        <Typography
                            variant="caption"
                            token={{
                                fontSize: '0.8rem',
                            }}
                        >
                            {workflow.creator.firstName}{' '}
                            {workflow.creator.lastName}
                        </Typography>{' '}
                    </StyledChip>
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedDate}
                    </Typography>
                </>
            )
        case 'Leader':
            return (
                <>
                    <StyledChip variant="default">
                        <Icon data={assignment_user} color="#243746" />
                        <Typography
                            variant="caption"
                            token={{
                                fontSize: '0.8rem',
                            }}
                        >
                            {workflow.user.firstName} {workflow.user.lastName}
                        </Typography>
                    </StyledChip>{' '}
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedDate}
                    </Typography>
                </>
            )
    }
}
