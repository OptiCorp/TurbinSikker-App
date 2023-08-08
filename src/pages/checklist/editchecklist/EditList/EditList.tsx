import { CheckListEntity } from 'src/models/CheckListEntity'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'
import { DialogTask } from '../Dialog'
import { useEditCheckList } from '../hooks/useEditCheckList'

type Props = {
    tasks: CheckListEntity
    sortedTasks: CheckListEntity['tasks']
}

export const EditList = (props: Props) => {
    let lastCategoryName = ''

    const { task, setTask, updateCheckListTask, isOpenTask, setIsOpenTask } =
        useEditCheckList()

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
                                            setIsOpenTask(true)
                                        }}
                                    />
                                </StyledCard>
                            </Container>
                        </>
                    )
                })}
            </PreviewListWrap>
            <DialogTask
                isOpen={isOpenTask}
                handleClose={() => {
                    setIsOpenTask(false)
                }}
                taskDescription={task?.description ?? ''}
                taskId={task?.id ?? ''}
                handleSubmit={(data) => {
                    updateCheckListTask({
                        description: data.content,
                        categoryId: task?.categoryId ?? '',
                        taskId: task?.id ?? '',
                    })
                }}
            />
        </>
    )
}
