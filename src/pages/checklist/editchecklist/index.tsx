import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import {
    Button,
    Card,
    Dialog,
    Switch,
    TextField,
    Typography,
} from '@equinor/eds-core-react'
import { useNavigate, useParams } from 'react-router'

import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useState } from 'react'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import { useApiContext } from '../../../pages/context/apiContextProvider'
import { ButtonWrap, MakeTitleField } from '../checkListID/styles'
import { InfoHeader, Wrapper } from '../previewCheckList/styles'
import { EditList } from './EditList/EditList'

import { useEditCheckList } from './hooks/useEditCheckList'
import { StyledDialog } from './styles'

export const EditCheckList = () => {
    const navigate = useNavigate()
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const { openSnackbar } = useContext(SnackbarContext)
    const { handleDelete } = useApiContext()
    const { id } = useParams()

    const handleDeleteChecklist = async () => {
        try {
            handleDelete(id)
            setIsOpen(false)
            navigate('/MyChecklists')
            if (openSnackbar) {
                openSnackbar(`CheckList deleted`)
            }
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    const handleCloseDelete = () => {
        setIsOpenDelete(false)
    }

    const { checkListId, sortedTasks } = useAddTaskForm()
    const {
        handleSave,
        title,
        setTitle,
        changeTitle,
        setChangeTitle,
        isOpen,
        setIsOpen,
        handleClose,
        checked,
        setChecked,
        convertStatusToString,
        isOpenn,
        setIsOpenn,
    } = useEditCheckList()

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checkListId && (
                <>
                    <div key={checkListId.id}>
                        <InfoHeader>
                            <Card style={{ background: 'white' }}>
                                <Card.Header
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        margin: '0 auto',
                                    }}
                                >
                                    <Switch
                                        checked={checked}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            margin: '0 auto',

                                            top: '0',
                                        }}
                                        value={checkListId.status}
                                        onChange={(e) => {
                                            setChecked(e.target.checked)

                                            e.target.checked
                                                ? 'Active'
                                                : 'Inactive'
                                        }}
                                        label={`checklist is ${
                                            checked ? 'Active' : 'Inactive'
                                        }`}
                                    />

                                    <TextField
                                        id="storybook-readonly"
                                        value={title || checkListId.title}
                                        key={checkListId.id}
                                        label=""
                                        readOnly
                                        style={{
                                            borderBottom: '1px solid #243746',
                                            background: '#F7F7F7',
                                        }}
                                        onClick={() => {
                                            setIsOpen(true)
                                        }}
                                    />
                                    <Button
                                        color="secondary"
                                        onClick={() => setIsOpenn(!isOpenn)}
                                    >
                                        <Typography
                                            variant="caption"
                                            token={{
                                                textAlign: 'center',
                                                color: 'white',
                                            }}
                                        >
                                            Add Task
                                        </Typography>
                                    </Button>
                                </Card.Header>
                            </Card>
                        </InfoHeader>

                        <Wrapper>
                            {isOpenn && <AddTasks />}

                            <EditList
                                key={checkListId.id}
                                tasks={checkListId}
                                sortedTasks={sortedTasks}
                            />
                        </Wrapper>
                    </div>
                    <Dialog open={isOpen}>
                        <>
                            <Dialog.Header>
                                <Dialog.Title>
                                    Edit Title of CheckList
                                </Dialog.Title>
                            </Dialog.Header>
                            <StyledDialog>
                                <MakeTitleField
                                    id="storybook-readonly"
                                    placeholder="name"
                                    defaultValue={checkListId.title}
                                    label=""
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setChangeTitle(event.target.value)
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

                                <Button
                                    onClick={() => {
                                        if (changeTitle) {
                                            setTitle(changeTitle)
                                        }
                                        setIsOpen(false)
                                    }}
                                >
                                    Save
                                </Button>
                            </ButtonWrap>
                        </Dialog.Actions>
                    </Dialog>
                </>
            )}

            <NavActionsComponent
                buttonColor="danger"
                secondButtonColor="primary"
                onClick={() => {
                    setIsOpenDelete(true)
                }}
                secondOnClick={() =>
                    handleSave({
                        title,
                        status: convertStatusToString(checked),
                    })
                }
                ButtonMessage="Delete"
                SecondButtonMessage="Save"
                isShown={true}
            />

            <Dialog open={isOpenDelete}>
                <>
                    <Dialog.Header>
                        <Dialog.Title>Delete CheckList?</Dialog.Title>
                    </Dialog.Header>
                </>

                <Dialog.Actions>
                    <ButtonWrap>
                        <Button color="danger" onClick={handleDeleteChecklist}>
                            Delete
                        </Button>

                        <Button onClick={handleCloseDelete}>Cancel</Button>
                    </ButtonWrap>
                </Dialog.Actions>
            </Dialog>
        </div>
    )
}
