import { Icon, Typography } from '@equinor/eds-core-react'
import { assignment_user } from '@equinor/eds-icons'
import { FC } from 'react'
import { AllWorkFlows } from '../workflow/types'
import { useUserContext } from './../../../pages/users/context/userContextProvider'
import { StyledChip } from './styles'

type UserChip = {
    workflow: AllWorkFlows
}

export const UserChip: FC<UserChip> = ({ workflow }) => {
    const { currentUser } = useUserContext()

    const formattDate = (dateString: string | null) => {
        if (!dateString) {
            return 'No updates'
        }
        const date = new Date(dateString)

        return date.toLocaleDateString('en-GB')
    }

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
                        {formattDate(workflow.createdDate)}
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
                        {formattDate(workflow.updatedDate)}
                    </Typography>
                </>
            )
    }
}
