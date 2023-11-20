import { Chip, Typography } from '@equinor/eds-core-react'
import { FC } from 'react'
import { formatDate } from '../../../helpers/dateFormattingHelpers'
import { WorkflowResponse } from '../../../services/apiTypes'

type ChipStatusProps = {
    workflow: WorkflowResponse
}

export const ChipStatus: FC<ChipStatusProps> = ({ workflow }) => {
    const formattedUpdateDate = formatDate(workflow?.updatedDate ?? '')

    switch (workflow.status) {
        case 'Sent':
            return (
                <>
                    <Chip
                        style={{
                            margin: '0',

                            textAlign: 'center',
                        }}
                        variant="default"
                    >
                        Sent
                    </Chip>
                    <Typography
                        variant="caption"
                        style={{ margin: '0', paddingLeft: '10px' }}
                        token={{
                            lineHeight: '2rem',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )
        case 'Committed':
            return (
                <>
                    <Chip
                        variant="active"
                        style={{
                            margin: '0',

                            textAlign: 'center',
                        }}
                    >
                        Committed
                    </Chip>
                    <Typography
                        variant="caption"
                        style={{ margin: '0', paddingLeft: '10px' }}
                        token={{
                            lineHeight: '2rem',
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )

        case 'Done':
            return (
                <>
                    <Chip
                        disabled
                        style={{
                            margin: '0',

                            textAlign: 'center',
                        }}
                    >
                        Completed{' '}
                    </Chip>
                    <Typography
                        style={{ margin: '0' }}
                        variant="caption"
                        token={{
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )

        case 'Rejected':
            return (
                <>
                    <Chip style={{}} variant="error">
                        Rejected{' '}
                    </Chip>
                    <Typography
                        style={{ margin: '0' }}
                        variant="caption"
                        token={{
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
                    <Chip variant="error">pending</Chip>
                    <Typography
                        style={{ margin: '0' }}
                        variant="caption"
                        token={{
                            fontSize: '0.7rem',
                        }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )
    }
}
