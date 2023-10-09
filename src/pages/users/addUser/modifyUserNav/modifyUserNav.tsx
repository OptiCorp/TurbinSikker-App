import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import CustomDialog from '../../../../components/modal/useModalHook'
import { NavActionsComponent } from '../../../../components/navigation/hooks/useNavActionBtn'

import { useUser } from '../../context/userContextProvider'
import { useAddUser } from '../hooks/useAddUser'
export const ModifyUserNav = () => {
    const { methods, location } = useAddUser()
    const [positiveOpen, setPositiveOpen] = useState(false)
    const [addNav, setAddNav] = useState(false)
    const [editNav, setEditNav] = useState(false)
    const [negativeOpen, setNegativeOpen] = useState(false)
    const { handleDeleteUser } = useUser()

    const { id } = useParams()
    const navigate = useNavigate()
    const [updateOpen, setUpdateOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    useEffect(() => {
        if (location === '/AddUser/') {
            setAddNav(true)
            setEditNav(false)
        } else {
            setEditNav(true)
            setAddNav(false)
        }
    })

    const handleOpen = () => {
        setPositiveOpen(true)
    }
    const handleOpenSecond = () => {
        setNegativeOpen(true)
    }

    const handleCloseSecond = () => {
        setNegativeOpen(false)
    }

    const clearAndClose = () => {
        methods.reset()

        setPositiveOpen(false)
    }

    const handleUpdate = () => {
        setUpdateOpen(true)
    }
    const handleDelete = () => {
        setDeleteOpen(true)
    }
    const handleUpdateClose = () => {
        setUpdateOpen(false)
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false)
    }

    const clearDeleteClose = () => {
        setDeleteOpen(false)
    }
    const handleDeleteUserFunction = async () => {
        try {
            handleDeleteUser(id)

            // if (openSnackbar) {
            //     navigate('/ListUsers')
            //     openSnackbar(`User deleted`)
            // }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    return (
        <>
            <NavActionsComponent
                onClick={handleOpenSecond}
                buttonVariant="outlined"
                ButtonMessage="Clear"
                secondButtonColor="primary"
                secondOnClick={handleOpen}
                SecondButtonMessage="Create user"
                isShown={addNav}
            />

            <Dialog open={positiveOpen}>
                <Dialog.Header>
                    <Dialog.Title>Create User?</Dialog.Title>
                </Dialog.Header>
                <Dialog.CustomContent>
                    <Typography
                        group="input"
                        variant="text"
                        token={{ textAlign: 'left' }}
                    >
                        Are you sure you want to create a new account with the
                        provided information?
                    </Typography>
                </Dialog.CustomContent>
                <Dialog.Actions>
                    <div>
                        <Button variant="ghost" onClick={clearAndClose}>
                            Cancel
                        </Button>{' '}
                        <Button type="submit" form="add-user">
                            Create User
                        </Button>
                    </div>
                </Dialog.Actions>
            </Dialog>
            <CustomDialog
                isOpen={negativeOpen}
                title="Clear form?"
                negativeButtonOnClick={clearDeleteClose}
                negativeButtonText="Clear"
                positiveButtonColor="danger"
                positiveButtonVariant="ghost"
                positiveButtonOnClick={handleCloseSecond}
                positiveButtonText="Cancel"
            >
                <Typography
                    group="input"
                    variant="text"
                    token={{ textAlign: 'left' }}
                >
                    Are you sure you want to clear your changes? Any unsaved
                    data will be lost.
                </Typography>
            </CustomDialog>
            <NavActionsComponent
                buttonColor="danger"
                ButtonMessage="Delete user"
                secondButtonColor="primary"
                onClick={handleDelete}
                secondOnClick={handleUpdate}
                isShown={editNav}
                SecondButtonMessage="Update user"
            />

            <CustomDialog
                isOpen={updateOpen}
                title="Update user"
                negativeButtonOnClick={handleUpdateClose}
                negativeButtonText="Cancel"
                positiveButtonText="Update user"
                positiveButtonOnClick={clearAndClose}
                type="submit"
                form="add-user"
            >
                <Typography
                    group="input"
                    variant="text"
                    token={{ textAlign: 'left' }}
                >
                    Are you sure you want to update the account with the
                    provided information?
                </Typography>
            </CustomDialog>
            <CustomDialog
                isOpen={deleteOpen}
                title="Delete user"
                negativeButtonOnClick={handleDeleteClose}
                negativeButtonText="Cancel"
                positiveButtonText="Delete user"
                positiveButtonColor="danger"
                buttonVariant="ghost"
                positiveButtonOnClick={handleDeleteUserFunction}
            >
                <Typography
                    group="input"
                    variant="text"
                    token={{ textAlign: 'left' }}
                >
                    The user will be deleted
                </Typography>
            </CustomDialog>
        </>
    )
}
