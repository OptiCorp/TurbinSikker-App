import { Button, Progress } from '@equinor/eds-core-react'
import {
    LoginContainer,
    BackgroundContainer,
    TitleHeader,
    Infotext,
    Header,
    ButtonWrapper } from './styles'

import { useState } from 'react'
import { Typography } from '@equinor/eds-core-react'

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
                    <Typography
                        color="white"
                        link
                        href="#"
                        token={{ fontWeight: '500', fontSize: '0.9rem' }}
                    >
                        Or get access here
                    </Typography>
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
                    Having Trouble with your account?
                    <Typography
                        color="white"
                        link
                        href="#"
                        token={{ fontWeight: '500', fontSize: '0.9rem' }}
                    >
                        Contact Support
                    </Typography>
                </Infotext>
            </LoginContainer>
        </BackgroundContainer>
    )
}
