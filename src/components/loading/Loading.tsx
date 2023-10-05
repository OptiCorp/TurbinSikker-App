import { Progress, Typography } from '@equinor/eds-core-react'
import { LoadingContainer } from './style'

export const Loading = ({ text }: { text: string }) => {
    return (
        <LoadingContainer>
            <Progress.Circular />
            <Typography>{text}</Typography>
        </LoadingContainer>
    )
}
