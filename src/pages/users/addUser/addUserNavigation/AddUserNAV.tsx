import { Button, Typography } from '@equinor/eds-core-react'
import { FooterContainer } from '../../../../components/navigation/styles'
import { Dialog } from '@equinor/eds-core-react'
import { useFormContext } from 'react-hook-form'
import { BtnWrapper } from '../styles'
import { useState } from 'react'

export const AddUserButtonNavigation = () => {
    const { reset } = useFormContext()

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSecond, setIsOpenSecond] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleOpenSecond = () => {
        setIsOpenSecond(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    const handleCloseSecond = () => {
        setIsOpenSecond(false)
    }

    const clearAndClose = () => {
        reset()

        setIsOpenSecond(false)
    }

    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button
                        variant="outlined"
                        style={{ color: 'white', borderColor: 'white' }}
                        onClick={handleOpenSecond}
                    >
                        Clear
                    </Button>
                    <Button color="primary" onClick={handleOpen}>
                        Create User
                    </Button>
                    <Dialog open={isOpen}>
                        <Dialog.Header>
                            <Dialog.Title>Create User?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CustomContent>
                            <Typography variant="caption">
                                Are you sure you want to create a new account
                                with the provided information?
                            </Typography>
                        </Dialog.CustomContent>
                        <Dialog.Actions>
                            <div>
                                <Button type="submit" form="add-user">
                                    Create User
                                </Button>
                                <Button variant="ghost" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </div>
                        </Dialog.Actions>
                    </Dialog>
                    <Dialog open={isOpenSecond}>
                        <Dialog.Header>
                            <Dialog.Title>Clear form?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CustomContent>
                            <Typography variant="caption">
                                Are you sure you want to clear your changes? Any
                                unsaved data will be lost.
                            </Typography>
                        </Dialog.CustomContent>
                        <Dialog.Actions>
                            <div>
                                <Button color="danger" onClick={clearAndClose}>
                                    Clear
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={handleCloseSecond}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Dialog.Actions>
                    </Dialog>
                </BtnWrapper>
            </FooterContainer>
        </>
    )
}
//
