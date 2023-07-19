import { CheckListEntity } from 'src/models/CheckListEntity'

import { useState } from 'react'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'

import { TaskEntity } from 'src/models/TaskEntity'

import useAuth from '../../../../pages/landingPage/context/LandingPageContextProvider'

type Props = {
    tasks: CheckListEntity
    sortedTasks: CheckListEntity['tasks']
}

export const EditList = (props: Props) => {
    let lastCategoryName = ''
    const [isOpen, setIsOpen] = useState(false)
    const [task, setTask] = useState<TaskEntity>()

    const updateCheckList = async (data: {
        taskId: string
        description: string
        categoryId: string
    }) => {
        const { idToken } = useAuth()
        const res = await fetch(
            `http://20.251.37.226:8080/api/UpdateChecklistTask?id=${taskId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description: data.description,
                    categoryId: data.categoryId,
                }),
            }
        )
        return res
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
                                            setIsOpen(true)
                                        }}
                                    />
                                </StyledCard>
                            </Container>
                        </>
                    )
                })}
            </PreviewListWrap>
            {/* <DialogTask
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false)
                }}
                taskDescription={task?.description ?? ''}
                taskId={task?.id ?? ''}
                handleSubmit={(data) => {
                    updateCheckList({
                        description: data.content,
                        categoryId: task?.categoryId ?? '',
                        taskId: task?.id ?? '',
                    })
                }}
            /> */}
        </>
    )
}
