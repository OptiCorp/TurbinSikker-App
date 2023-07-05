import { FooterContainer } from '@components/navigation/styles'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useApiContext } from '../../context/apiContextProvider'
import { BtnWrapper } from '../addUser/styles'

export const EditUserNav = () => {
    const { id } = useParams()
    const { setRefreshUsers } = useApiContext()
    const navigate = useNavigate()
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
        setIsOpenSecond(false)
    }

    const handleClick = async () => {
        await fetch(`http://20.251.37.226:8080/api/DeleteUser?id=${id}`, {
            method: 'DELETE',
        })

        setRefreshUsers((prevRefresh) => !prevRefresh)

        navigate('/ListUsers')
    }
    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button color="danger" onClick={handleOpenSecond}>
                        Delete User
                    </Button>
                    <Button color="primary" onClick={handleOpen}>
                        Update User
                    </Button>
                    <Dialog open={isOpen}>
                        <Dialog.Header>
                            <Dialog.Title>Update User</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CustomContent>
                            <Typography variant="caption">
                                Are you sure you want to update the account with
                                the provided information?
                            </Typography>
                        </Dialog.CustomContent>
                        <Dialog.Actions>
                            <BtnWrapper>
                                <Button
                                    style={{ fontSize: '0.8rem' }}
                                    type="submit"
                                    form="add-user"
                                    onClick={clearAndClose}
                                >
                                    Update User
                                </Button>
                                <Button
                                    style={{ fontSize: '0.8rem' }}
                                    variant="ghost"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </BtnWrapper>
                        </Dialog.Actions>
                    </Dialog>
                    <Dialog open={isOpenSecond}>
                        <Dialog.Header>
                            <Dialog.Title>Delete User?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.CustomContent>
                            <Typography variant="caption">
                                The user will be deleted permanently from the
                                system
                            </Typography>
                        </Dialog.CustomContent>
                        <Dialog.Actions>
                            <div>
                                <Button
                                    style={{ fontSize: '0.8rem' }}
                                    color="danger"
                                    onClick={handleClick}
                                >
                                    Delete User
                                </Button>{' '}
                                <Button
                                    style={{ fontSize: '0.8rem' }}
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
