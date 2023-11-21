import {
    Button,
    Dialog,
    Icon,
    Label,
    Typography,
} from '@equinor/eds-core-react'
import { close } from '@equinor/eds-icons'
import { useState } from 'react'
import { useParams } from 'react-router'
import CustomDialog from '../../../../components/modal/useModalHook'
import useGlobal from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist, ChecklistTaskInfo } from '../../../../services/apiTypes'
import { PreviewListPoints } from '../../previewCheckList/styles'
import { useEditChecklist } from '../hooks/useEditChecklist'
import { Delete, EditListPoints, EditWrapper, StyledCard } from '../styles'

type Props = {
    checklist: Checklist
    tasks: ChecklistTaskInfo[]
}

export const EditList = ({ tasks }: Props) => {
    const [content, setContent] = useState('')
    const [dialogShowing, setDialogShowing] = useState(false)
    const { handleUpdateTask } = useEditChecklist()
    const { openSnackbar, refreshList, setRefreshList } = useGlobal()
    const { id } = useParams() as { id: string }
    const [task, setTask] = useState<ChecklistTaskInfo>()
    const [dialogDelete, setDialogDelete] = useState(false)
    const api = apiService()
    const handleSubmit = () => {
        const categoryId = task?.category.id
        const taskId = task?.id

        if (!categoryId || !taskId) return
        handleUpdateTask({
            categoryId,
            checklistId: id,

            description: content,

            estAvgCompletionTime: 10,
            taskId,
        })
        setDialogShowing(false)
    }

    const deleteTask = async () => {
        if (!task?.id) return
        try {
            const res = await api.removeTaskFromChecklist(task.id, id)

            if (res.ok) {
                if (openSnackbar) openSnackbar('Task removed')
                setDialogDelete(false)
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    const handleDeletePermanently = async () => {
        if (!task?.id) return

        try {
            const res = await api.deleteTask(task.id)
          
            if (res.ok) {
                if (openSnackbar) openSnackbar('Task deleted')
                setDialogDelete(false)
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    const handleClose = () => {
        setDialogDelete(false)
    }
    const sortedTasks = [...tasks].sort((a, b) =>
        a.category.name.localeCompare(b.category.name)
    )
    return (
        <>
            <EditWrapper>
                {sortedTasks.map((task) => (
                    <StyledCard elevation="raised" key={task.id}>
                        {' '}
                        <Delete>
                            <Button
                                variant="ghost"
                                style={{
                                    margin: '0.5rem 0.2rem 0',
                                    fontSize: '1rem',
                                    height: '2rem',
                                }}
                                color="danger"
                                onClick={() => {
                                    setTask(task)
                                    setDialogDelete(true)
                                }}
                            >
                                remove task{' '}
                            </Button>
                        </Delete>
                        <Label
                            htmlFor="storybook-multi-readonly"
                            label={task.category.name}
                            style={{
                                height: '0',
                                fontWeight: '600',
                                fontSize: '1rem',
                            }}
                        />{' '}
                        <PreviewListPoints
                            style={{ maxWidth: '700px' }}
                            key={task?.id}
                            id="storybook-multi-readonly"
                            placeholder={task?.description}
                            readOnly
                            multiline={true}
                            rowsMax={3}
                            helperText="click to edit"
                            onClick={() => {
                                setTask(task)

                                setDialogShowing(true)
                            }}
                        />{' '}
                    </StyledCard>
                ))}

                <CustomDialog
                    isOpen={dialogShowing}
                    negativeButtonOnClick={() => setDialogShowing(false)}
                    title="Edit task"
                    negativeButtonText="Cancel"
                    positiveButtonText="Save"
                    buttonVariant="ghost"
                    positiveButtonOnClick={handleSubmit}
                >
                    <EditListPoints
                        label=""
                        key={task?.id ?? ''}
                        id="storybook-multi-readonly"
                        defaultValue={task?.description ?? ''}
                        multiline
                        rows={5}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setContent(event.target.value)
                        }}
                    />
                </CustomDialog>
            </EditWrapper>
            <>
                <Dialog open={dialogDelete}>
                    <Dialog.Header>
                        <Dialog.Title>Delete task?</Dialog.Title>
                        <Button
                            variant="ghost_icon"
                            aria-label="save action"
                            onClick={handleClose}
                        >
                            <Icon data={close}></Icon>
                        </Button>
                    </Dialog.Header>
                    <Dialog.CustomContent>
                        <Typography
                            group="input"
                            variant="text"
                            token={{ textAlign: 'left' }}
                        >
                            how do you want to delete {task?.description}
                        </Typography>
                    </Dialog.CustomContent>
                    <Dialog.Actions
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignContent: 'space-evenly',
                            gap: '1rem',
                        }}
                    >
                        <Button
                            color="danger"
                            onClick={() => {
                                handleDeletePermanently()
                            }}
                        >
                            Delete permanently
                        </Button>
                        <Button
                            onClick={() => {
                                deleteTask()
                            }}
                        >
                            Delete from checklist
                        </Button>
                    </Dialog.Actions>
                </Dialog>{' '}
            </>
        </>
    )
}
