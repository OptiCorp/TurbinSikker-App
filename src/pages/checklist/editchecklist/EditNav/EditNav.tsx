import { FooterContainer } from '@components/navigation/styles'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useApiContext } from '../../../context/apiContextProvider'
import { BtnWrapper } from '../../../users/addUser/styles'
import { ButtonWrap } from '../../checkListID/styles'

export const EditNav = ({
    handleSubmit,
    title,
    status,
}: {
    handleSubmit: (data: { title: string; status: string }) => void
    title: string
    status: string
}) => {
    const { openSnackbar } = useContext(SnackbarContext)
    const { id } = useParams()
    const { handleDelete } = useApiContext()
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const handleDeleteChecklist = async () => {
        try {
            handleDelete(id)
            setIsOpen(false)
            navigate('/MyChecklists')
            if (openSnackbar) {
                openSnackbar(`CheckList deleted`)
            }
        } catch (error) {
            // Handle error
            console.error('Error creating checklist:', error)
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
                        <Button
                            onClick={() => {
                                handleSubmit({
                                    title: title,
                                    status: status,
                                })
                            }}
                        >
                            Save
                        </Button>
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
                                <Button
                                    color="danger"
                                    onClick={handleDeleteChecklist}
                                >
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
