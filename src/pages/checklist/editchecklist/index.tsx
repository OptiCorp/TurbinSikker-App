import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import {
    Button,
    Card,
    Dialog,
    Switch,
    TextField,
    Typography,
} from '@equinor/eds-core-react'
import { useLocation } from 'react-router'

import { AddTasks } from '../../../components/addtasks/AddTasks'
import { ButtonWrap, MakeTitleField } from '../checkListID/styles'
import { InfoHeader, Wrapper } from '../previewCheckList/styles'
import { EditList } from './EditList/EditList'
import { EditNav } from './EditNav/EditNav'
import { useEditTaskForm } from './hooks/useEditTaskForm'
import { StyledDialog } from './styles'

export const EditCheckList = () => {
    const appLocation = useLocation()

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
    } = useEditTaskForm()

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
                                        defaultValue={checkListId.status}
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
            {appLocation.pathname.includes('EditCheckList') ? (
                <EditNav
                    status={convertStatusToString(checked)}
                    title={title}
                    handleSubmit={() => {
                        handleSave({
                            title: changeTitle,
                            status: convertStatusToString(checked),
                        })
                    }}
                />
            ) : null}
        </div>
    )
}
