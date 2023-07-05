import { FooterContainer } from '@components/navigation/styles'
import { Button } from '@equinor/eds-core-react'
import { BtnWrapper } from '../../users/addUser/styles'

export const PreviewNav = () => {
    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button color="danger">Edit Form</Button>

                    <div>
                        <Button variant="ghost">Cancel</Button>
                    </div>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
