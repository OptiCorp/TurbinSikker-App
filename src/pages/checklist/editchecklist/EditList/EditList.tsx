import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import CustomDialog from '@components/modal/useModalHook'
import { useState } from 'react'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'
import { useEditCheckListContext } from '../context/editCheckListContextProvider'
import { EditListPoints } from '../styles'

type Props = {
    tasks: TaskEntity[]
    sortedTasks: TaskEntity[]
}

export const EditList = (props: Props) => {
    let lastCategoryName = ''
    const [content, setContent] = useState('')
    const [dialogShowing, setDialogShowing] = useState(false)
    const { task, setTask, updateCheckListTask } = useEditCheckListContext()

    const handleSubmit = () => {
        updateCheckListTask({
            description: content,
            categoryId: task?.categoryId ?? '',
            taskId: task?.id ?? '',
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
                                        key={task.id}
                                        id="storybook-multi-readonly"
                                        placeholder={task.description}
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
                    )
          
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
