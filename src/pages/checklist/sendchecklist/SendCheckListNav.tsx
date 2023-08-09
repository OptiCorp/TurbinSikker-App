import { FooterContainer } from '@components/navigation/styles'
import { Button, Typography } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router'
import { BtnWrapper } from '../../users/addUser/styles'

export const SendCheckListNav = () => {
    const navigate = useNavigate()

    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button variant="ghost">
                        <Typography variant="caption" color="white">
                            Cancel
                        </Typography>
                    </Button>
                    <div>
                        <Button>
                            <Typography variant="caption" color="white">
                                Send
                            </Typography>
                        </Button>
                    </div>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
