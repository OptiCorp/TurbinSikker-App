import { Button, Chip, Icon } from '@equinor/eds-core-react'
import { remove_outlined } from '@equinor/eds-icons'
import { useState } from 'react'
import { useParams } from 'react-router'
import CustomDialog from '../../../../components/modal/useModalHook'
import useGlobal from '../../../../context/globalContextProvider'
import apiService from '../../../../services/api'
import { Checklist, ChecklistTaskInfo } from '../../../../services/apiTypes'
import { PreviewListPoints } from '../../previewCheckList/styles'
import { useEditChecklist } from '../hooks/useEditChecklist'
import {
    ActionHeader,
    CategoryName,
    Container,
    Delete,
    EditListPoints,
    EditWrapper,
    StyledCard,
} from '../styles'

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
                if (openSnackbar) openSnackbar('Task deleted')
                setDialogShowing(false)
                setRefreshList((prev) => !prev)
            }
        } catch (error) {
            if (error) return
            console.log(error)
        }
    }

    return (
        <EditWrapper>
            {tasks.map((task) => (
                <Container key={task.id}>
                    <CategoryName>{task.category.name}</CategoryName>
                    <StyledCard>
                        {' '}
                        <ActionHeader>
                            <Button
                                style={{ color: 'red' }}
                                variant="ghost_icon"
                                color="danger"
                                aria-label="add action"
                            >
                                <Icon
                                    color="danger"
                                    data={remove_outlined}
                                    size={24}
                                ></Icon>
                            </Button>
                        </ActionHeader>
                        <PreviewListPoints
                            label=""
                            key={task?.id}
                            id="storybook-multi-readonly"
                            placeholder={task?.description}
                            multiline
                            rows={3}
                            onClick={() => {
                                setTask(task)
                                setDialogShowing(true)
                            }}
                        />{' '}
                    </StyledCard>
                </Container>
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
                <Delete>
                    {' '}
                    <Chip
                        variant="error"
                        onClick={() => {
                            deleteTask()
                        }}
                    >
                        delete task{' '}
                    </Chip>
                </Delete>
                <EditListPoints
                    label=""
                    key={task?.id ?? ''}
                    id="storybook-multi-readonly"
                    defaultValue={task?.description ?? ''}
                    multiline
                    rows={5}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setContent(event.target.value)
                    }}
                />
            </CustomDialog>
        </EditWrapper>
    )
}
