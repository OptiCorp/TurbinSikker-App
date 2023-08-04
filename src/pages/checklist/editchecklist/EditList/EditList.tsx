import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { useContext, useState } from 'react'
import { CheckListEntity } from 'src/models/CheckListEntity'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from '../../previewCheckList/styles'

import { TaskEntity } from 'src/models/TaskEntity'

import useAuth from '../../../../pages/landingPage/context/LandingPageContextProvider'

import { useApiContext } from '../../../context/apiContextProvider'
import { DialogTask } from '../Dialog'

type Props = {
    tasks: CheckListEntity
    sortedTasks: CheckListEntity['tasks']
}

export const EditList = (props: Props) => {
    const { idToken } = useAuth()
    const { setRefreshList } = useApiContext()

    const { openSnackbar } = useContext(SnackbarContext)
    let lastCategoryName = ''
    const [isOpen, setIsOpen] = useState(false)
    const [task, setTask] = useState<TaskEntity>()

    const updateCheckList = async (data: {
        taskId: string
        description: string
        categoryId: string
    }) => {
        const res = await fetch(
            `http://20.251.37.226:8080/api/UpdateChecklistTask?id=${data.taskId}`,
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

        if (res.ok) setRefreshList((prev) => !prev)
        setIsOpen(false)
        if (openSnackbar) {
            openSnackbar(`Task updated`)
        }
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
            <DialogTask
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
            />
        </>
    )
}
