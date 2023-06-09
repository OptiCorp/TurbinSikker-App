import { FooterContainer } from '@components/navigation/styles'
import { Button } from '@equinor/eds-core-react'
import { Link } from 'react-router-dom'
import { BtnWrapper } from '../../users/addUser/styles'

export const PreviewNav = () => {
    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button color="danger" as={Link} to="/AddCheckList:id/">
                        Edit CheckList
                    </Button>

                    <div>
                        <Button variant="ghost">Cancel</Button>
                    </div>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
