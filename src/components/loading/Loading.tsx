import { Progress, Typography } from '@equinor/eds-core-react'
import { LoadingContainer } from './styles'

export const Loading = ({ text }: { text: string }) => {
    return (
        <LoadingContainer>
            <Progress.Circular />
            <Typography variant="h4" as="h2">
                {text}
            </Typography>
        </LoadingContainer>
    )
}
