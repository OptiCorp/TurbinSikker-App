import { Chip, Typography } from '@equinor/eds-core-react'
import { FC } from 'react'
import { formatDate } from '../../../helpers/dateFormattingHelpers'
import { Workflow } from '../../../services/apiTypes'

type ChipStatusProps = {
    workflow: Workflow
}

export const ChipStatus: FC<ChipStatusProps> = ({ workflow }) => {
    const formattedUpdateDate = formatDate(workflow?.updatedDate ?? '')
    switch (workflow.status) {
        case 'Sent':
            return (
                <>
                    <Chip variant="default">Sent</Chip>
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
        case 'Committed':
            return <Chip variant="active">Committed</Chip>

        case 'Done':
            return (
                <>
                    <Chip disabled>Completed </Chip>
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
                    <Chip variant="error">pending</Chip>
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                            fontSize: '0.7rem',
                        }}
                        style={{ margin: '10px' }}
                    >
                        {formattedUpdateDate}
                    </Typography>
                </>
            )
    }
}
