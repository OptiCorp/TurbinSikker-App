import { Button, Typography } from '@equinor/eds-core-react'

import { ElementType, FunctionComponent } from 'react'
import { BtnWrapper } from '../../../pages/users/addUser/styles'
import { FooterContainer } from '../styles'

interface NavProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    secondOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    children?: React.ReactNode
    buttonColor?: 'primary' | 'secondary' | 'danger'
    isShown: boolean
    secondButtonColor?: 'primary' | 'secondary' | 'danger'
    buttonVariant?: 'contained' | 'outlined' | 'ghost'
    secondButtonVariant?: 'contained' | 'outlined' | 'ghost'
    ButtonMessage: string
    SecondButtonMessage: string
    as?: ElementType
    href?: string
}

export const NavActionsComponent: FunctionComponent<NavProps> = ({
    onClick,
    secondOnClick,
    children,
    buttonColor,
    isShown,
    as,
    href,
    secondButtonColor,
    buttonVariant,
    secondButtonVariant,
    ButtonMessage,
    SecondButtonMessage,
}) => {
    console.log(secondOnClick)
    return (
        <>
            {isShown ? (
                <FooterContainer>
                    <BtnWrapper>
                        <Button
                            variant={buttonVariant}
                            color={buttonColor}
                            onClick={onClick}
                        >
                            {children}
                            <Typography variant="caption" color="white">
                                {ButtonMessage}
                            </Typography>
                        </Button>
                        <div>
                            <Button
                                variant={secondButtonVariant}
                                color={secondButtonColor}
                                onClick={secondOnClick}
                                as={as}
                                href={href}
                            >
                                <Typography variant="caption" color="white">
                                    {SecondButtonMessage}
                                </Typography>
                            </Button>
                        </div>
                    </BtnWrapper>
                </FooterContainer>
            ) : null}
        </>
    )
}
