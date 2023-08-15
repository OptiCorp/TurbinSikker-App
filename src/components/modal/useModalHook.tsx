import { Button, Dialog } from '@equinor/eds-core-react'
import { DialogContent } from '@equinor/eds-core-react/dist/types/components/Dialog/DialogContent'
import { BtnWrap, StyledContent } from './styles'

interface DialogProps {
    title: string
    positiveButtonText: string
    negativeButtonText: string
    positiveButtonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    negativeButtonOnClick: () => void
    isOpen: boolean
    onClose?: () => void
    children?: React.ReactNode
    buttonColor?: 'primary' | 'secondary' | 'danger'
    positiveButtonColor?: 'primary' | 'secondary' | 'danger'
    buttonVariant?: 'contained' | 'outlined' | 'ghost'
    positiveButtonVariant?: 'contained' | 'outlined' | 'ghost'
    type?: 'submit' | 'reset' | 'button'
    form?: string
}

const CustomDialog: React.FC<DialogProps> = ({
    title,
    positiveButtonText,
    negativeButtonText,
    positiveButtonOnClick,
    negativeButtonOnClick,
    isOpen,
    onClose,
    children,
    buttonColor,
    positiveButtonColor,
    buttonVariant,
    positiveButtonVariant,
    type,
    form,
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <StyledContent>{children}</StyledContent>
            <Dialog.Actions>
                <BtnWrap>
                    <Button
                        onClick={negativeButtonOnClick}
                        color={buttonColor}
                        variant={buttonVariant}
                    >
                        {negativeButtonText}
                    </Button>

                    <Button
                        onClick={positiveButtonOnClick}
                        color={positiveButtonColor}
                        variant={positiveButtonVariant}
                        type={type}
                        form={form}
                    >
                        {positiveButtonText}
                    </Button>
                </BtnWrap>
            </Dialog.Actions>
        </Dialog>
    )
}

export default CustomDialog
