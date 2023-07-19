import { FooterContainer } from '@components/navigation/styles'
import { Button, Typography } from '@equinor/eds-core-react'
import { BtnWrapper } from '../../../users/addUser/styles'

export const EditNav = () => {
    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button variant="outlined" color="danger">
                        <Typography variant="caption" color="white">
                            Clear
                        </Typography>
                    </Button>

                    <div>
                        <Button>Save</Button>
                    </div>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
