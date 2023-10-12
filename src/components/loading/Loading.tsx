import { Progress, Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

export const Loading = ({ text }: { text?: string }) => {
    return (
        <LoadingContainer>
            <Progress.Circular />
            <Typography>{text}</Typography>
        </LoadingContainer>
    )
}
