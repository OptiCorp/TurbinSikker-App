import { Button, Typography } from '@equinor/eds-core-react'

import { ElementType, FunctionComponent } from 'react'

import { BtnWrapper, FooterContainerHook } from '../styles'

interface NavProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    secondOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    children?: React.ReactNode
    buttonColor?: 'primary' | 'secondary' | 'danger'
    isShown: boolean
    disabled?: boolean
    secondButtonColor?: 'primary' | 'secondary' | 'danger'
    buttonVariant?: 'contained' | 'outlined' | 'ghost'
    secondButtonVariant?: 'contained' | 'outlined' | 'ghost'
    ButtonMessage: string
    SecondButtonMessage: string
    as?: ElementType
    href?: string
    type?: 'submit' | 'reset' | 'button' | undefined
    primaryType?: 'submit' | 'reset' | 'button' | undefined
}

export const NavActionsComponent: FunctionComponent<NavProps> = ({
    onClick,
    secondOnClick,
    children,
    buttonColor,
    isShown,
    as,
    href,
    type,
    secondButtonColor,
    disabled,
    buttonVariant,
    secondButtonVariant,
    ButtonMessage,
    SecondButtonMessage,
    primaryType,
}) => {
    return (
        <>
            {isShown ? (
                <FooterContainerHook>
                    <BtnWrapper>
                        <Button
                            disabled={disabled}
                            variant={buttonVariant}
                            color={buttonColor}
                            onClick={onClick}
                            type={primaryType}
                        >
                            {children}
                            <Typography variant="caption" color="white">
                                {ButtonMessage}
                            </Typography>
                        </Button>
                        <div>
                            <Button
                                disabled={disabled}
                                variant={secondButtonVariant}
                                color={secondButtonColor}
                                onClick={secondOnClick}
                                as={as}
                                href={href}
                                type={type}
                            >
                                <Typography variant="caption" color="white">
                                    {SecondButtonMessage}
                                </Typography>
                            </Button>
                        </div>
                    </BtnWrapper>
                </FooterContainerHook>
            ) : null}
        </>
    )
}
