import { FooterContainer } from '@components/navigation/styles'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useApiContext } from '../../../context/apiContextProvider'
import { BtnWrapper } from '../../../users/addUser/styles'
import { ButtonWrap } from '../../checkListID/styles'

export const EditNav = () => {
    const { openSnackbar } = useContext(SnackbarContext)
    const { setRefreshList } = useApiContext()
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const handleDelete = async () => {
        await fetch(`http://20.251.37.226:8080/api/DeleteChecklist?id=${id}`, {
            method: 'DELETE',
        })
        setRefreshList((prev) => !prev)
        setIsOpen(false)
        navigate('/MyChecklists')

        if (openSnackbar) {
            openSnackbar(`CheckList Deleted`)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <FooterContainer>
                <BtnWrapper>
                    <Button
                        color="danger"
                        onClick={() => {
                            setIsOpen(true)
                        }}
                    >
                        <Typography variant="caption" color="white">
                            Delete
                        </Typography>
                    </Button>

                    <div>
                        <Button>Save</Button>
                    </div>
                </BtnWrapper>
                <div>
                    <Dialog open={isOpen}>
                        <>
                            <Dialog.Header>
                                <Dialog.Title>Delete CheckList?</Dialog.Title>
                            </Dialog.Header>
                        </>

                        <Dialog.Actions>
                            <ButtonWrap>
                                <Button color="danger" onClick={handleDelete}>
                                    Delete
                                </Button>

                                <Button onClick={handleClose}>Cancel</Button>
                            </ButtonWrap>
                        </Dialog.Actions>
                    </Dialog>
                </div>
            </FooterContainer>
        </>
    )
}
