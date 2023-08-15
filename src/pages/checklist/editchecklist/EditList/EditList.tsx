import CustomDialog from '@components/modal/useModalHook'
import { useState } from 'react'
import { CheckListEntity } from 'src/models/CheckListEntity'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'
import { useEditCheckList } from '../hooks/useEditCheckList'
import { EditListPoints } from '../styles'

type Props = {
    tasks: CheckListEntity
    sortedTasks: CheckListEntity['tasks']
}

export const EditList = (props: Props) => {
    let lastCategoryName = ''
    const [content, setContent] = useState('')
    const [dialogShowing, setDialogShowing] = useState(false)
    const { task, setTask, updateCheckListTask } = useEditCheckList()

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
                {props.sortedTasks.map((task) => {
                    const categoryName =
                        task.category.name !== lastCategoryName
                            ? task.category.name
                            : ''

                    lastCategoryName = task.category.name

                    return (
                        <>
                            <Container>
                                <CategoryName>{categoryName}</CategoryName>
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
                })}
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
