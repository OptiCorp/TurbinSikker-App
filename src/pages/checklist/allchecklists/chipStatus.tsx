import { Chip, Typography } from '@equinor/eds-core-react'
import { FC } from 'react'
import { formatDate } from '../../../Helpers'
import { AllWorkFlows } from '../workflow/types'

type ChipStatusProps = {
    workflow: AllWorkFlows
}

export const ChipStatus: FC<ChipStatusProps> = ({ workflow }) => {
    const formattedUpdateDate = formatDate(workflow?.updatedDate ?? '')
    switch (workflow.status) {
        case 0:
            return (
                <>
                    <Chip style={{ margin: '0 auto' }} variant="default">
                        in progress
                    </Chip>
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )
        case 1:
            return (
                <Chip style={{ margin: '0 auto' }} variant="active">
                    Ready for review
                </Chip>
            )

        case 2:
            return (
                <>
                    <Chip style={{ margin: '0 auto' }} disabled>
                        completed
                    </Chip>
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )

        default:
            return (
                <>
                    <Chip style={{ margin: '0 auto' }} variant="error">
                        pending
                    </Chip>
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )
    }
}
