import { Button, Typography } from '@equinor/eds-core-react'
import { FooterContainer } from '../../../components/navigation/styles'
import { ApiContext } from '../context/apiContextProvider'
import { Dialog } from '@equinor/eds-core-react'
import { BtnWrapper } from '../addUser/styles'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

interface IEditUser {
    user: undefined
    onClick?(): void
    deleteUser: (params: any) => any
}

export const EditUserNav = ({ deleteUser }: IEditUser) => {
    const { result } = useContext(ApiContext)
    const { id } = useParams()
    const user = result.find((x) => x.id === id)
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

    const handleClick = () => {
        deleteUser(user.id)
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
                            <div>
                                <Button
                                    type="submit"
                                    form="add-user"
                                    onClick={clearAndClose}
                                >
                                    Update User
                                </Button>
                                <Button variant="ghost" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </div>
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
                                <Button color="danger" onClick={handleClick}>
                                    Delete User
                                </Button>{' '}
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
