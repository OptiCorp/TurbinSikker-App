import { Button } from '@equinor/eds-core-react'
import { FooterContainer } from '../../../../components/navigation/styles'

import { useFormContext } from 'react-hook-form'
import { BtnWrapper } from '../styles'

export const AddUserButtonNavigation = () => {
    const { reset } = useFormContext()
    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button
                        variant="outlined"
                        style={{ color: 'white', borderColor: 'white' }}
                        onClick={() => reset()}
                    >
                        Clear
                    </Button>
                    <Button type="submit" form="add-user">
                        Create User
                    </Button>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
//
