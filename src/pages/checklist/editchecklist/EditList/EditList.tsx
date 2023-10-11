import { useState } from 'react'
import { useParams } from 'react-router'
import CustomDialog from '../../../../components/modal/useModalHook'
import { Checklist, Task } from '../../../../services/apiTypes'
import {
    CategoryName,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'
import { useEditChecklist } from '../hooks/useEditChecklist'
import { EditListPoints } from '../styles'

type Props = {
    checklist: Checklist
    tasks: Task[]
}

export const EditList = ({ tasks }: Props) => {
    const [content, setContent] = useState('')
    const [dialogShowing, setDialogShowing] = useState(false)
    const { handleUpdateTask } = useEditChecklist()
    const { id } = useParams() as { id: string }
    const [task, setTask] = useState<Task>()
    const handleSubmit = () => {
        const categoryId = task?.category.id
        const taskId = task?.id

        if (!categoryId || !taskId) return
        handleUpdateTask({
            description: content,
            categoryId,
            taskId,
            checklistId: id,
        })
        setDialogShowing(false)
    }

    return (
        <>
            {tasks.map((task) => (
                <>
                    <PreviewListWrap key={task.id}>
                        <CategoryName>{task.category.name}</CategoryName>
                        <StyledCard
                            style={{
                                width: '100%',
                            }}
                        >
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
                    </PreviewListWrap>
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
                </>
            ))}
        </>
    )
}
