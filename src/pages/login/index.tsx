import { Button, Progress } from '@equinor/eds-core-react'
import {
    BackgroundContainer,
    ButtonWrapper,
    Header,
    Infotext,
    LoginContainer,
    TitleHeader,
} from './styles'

import { Typography } from '@equinor/eds-core-react'
import { useState } from 'react'

import { useMsal } from '@azure/msal-react'

export const Login = () => {
    const { instance } = useMsal()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const onSubmit = () => {
        setIsSubmitting(true)
        instance.loginPopup()
    }

    return (
        <BackgroundContainer>
            <LoginContainer>
                <Header>
                    <TitleHeader>Sign in to your Account</TitleHeader>
                </Header>
                <ButtonWrapper>
                    <Button
                        type="submit"
                        aria-disabled={isSubmitting ? true : false}
                        aria-label={isSubmitting ? 'loading data' : ''}
                        onClick={onSubmit}
                    >
                        {isSubmitting ? (
                            <Progress.Dots color={'primary'} />
                        ) : (
                            'Log in'
                        )}
                    </Button>
                </ButtonWrapper>
                <Infotext>
                    Cant get access to your account?
                    <Typography
                        color="white"
                        link
                        href="https://passwordreset.microsoftonline.com/"
                        token={{ fontWeight: '500', fontSize: '0.9rem' }}
                    >
                        Contact Support
                    </Typography>
                </Infotext>
            </LoginContainer>
        </BackgroundContainer>
    )
}
