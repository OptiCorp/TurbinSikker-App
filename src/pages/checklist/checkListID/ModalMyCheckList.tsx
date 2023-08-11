import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Button, Dialog } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'

import { useApiContext } from '../../context/apiContextProvider'

import { ButtonWrap, MakeTitleField, StyledDialog } from './styles'

type Props = {
    setIsOpen: (isOpen: boolean) => void
    isOpen: boolean
    handleClose: () => void
}

export const ModalMyCheckList = ({ setIsOpen, isOpen, handleClose }: Props) => {
    const [title, setTitle] = useState('')

    const { handleSubmit } = useApiContext()
    const { openSnackbar } = useContext(SnackbarContext)

    const handleCreateChecklist = async () => {
        try {
            handleSubmit({
                title,
            })
            setIsOpen(false)
            if (openSnackbar) {
                openSnackbar(`CheckList Created`)
            }
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    return (
        <>
            <div>
                <Dialog open={isOpen}>
                    <>
                        <Dialog.Header>
                            <Dialog.Title>Title of CheckList</Dialog.Title>
                        </Dialog.Header>
                        <StyledDialog>
                            <MakeTitleField
                                id="storybook-readonly"
                                placeholder="name"
                                label=""
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setTitle(event.target.value)
                                }}
                                style={{
                                    borderBottom: '1px solid #243746',
                                    background: '#F7F7F7',
                                }}
                            />
                        </StyledDialog>{' '}
                    </>

                    <Dialog.Actions>
                        <ButtonWrap>
                            <Button variant="ghost" onClick={handleClose}>
                                Cancel
                            </Button>

                            <Button onClick={handleCreateChecklist}>
                                Save
                            </Button>
                        </ButtonWrap>
                    </Dialog.Actions>
                </Dialog>
            </div>
        </>
    )
}
