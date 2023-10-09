import { useState } from 'react'
import CustomDialog from '../../../../components/modal/useModalHook'
import { Task } from '../../../../services/apiTypes'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'
import { useEditChecklist } from '../hooks/useEditChecklist'
import { EditListPoints } from '../styles'

type Props = {
    tasks: Task[]
}

export const EditList = (props: Props) => {
    const [content, setContent] = useState('')
    const [dialogShowing, setDialogShowing] = useState(false)
    const { task, setTask, handleUpdateTask,  } = useEditChecklist()

    const handleSubmit = () => {
        const categoryId = task?.category.id
        const taskId = task?.id
        if (!categoryId || !taskId) return
        handleUpdateTask({
            description: content,
            categoryId,
            taskId,
        })
        setDialogShowing(false)
    }

    return (
        <>
            <PreviewListWrap>
                <>
                    <Container>
                        <CategoryName></CategoryName>
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
                            />
                        </StyledCard>
                    </Container>
                </>
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setContent(event.target.value)
                    }}
                />
            </CustomDialog>
        </>
    )
}
