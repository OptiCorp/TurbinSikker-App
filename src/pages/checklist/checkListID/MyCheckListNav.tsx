import { FooterContainer } from '@components/navigation/styles'
import { Button } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { BtnWrapper } from '../../users/addUser/styles'

export const MyCheckListNav = () => {
    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button
                        variant="outlined"
                        as={Link}
                        to="/AddCheckList/"
                        style={{ color: 'white', borderColor: 'white' }}
                    >
                        New CheckList
                    </Button>

                    <div>
                        <Button color="primary">Send CheckList</Button>
                    </div>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
