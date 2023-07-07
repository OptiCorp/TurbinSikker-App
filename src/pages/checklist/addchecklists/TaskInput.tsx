import { Button } from '@equinor/eds-core-react'
import { useState } from 'react'
import { usePreviewList } from '../previewCheckList/hooks/usePreviewList'
import {
    Container,
    PreviewListWrap,
    StyledCard,
} from '../previewCheckList/styles'

interface TaskEntity extends Task {
    categoryId: string
    category: string
}

interface Task {
    id: string
    description: string
    createdBy: string
}

export const TaskInput: React.FC = () => {
    const [task, setTask] = useState<Task>({
        id: '',
        description: '',
        createdBy: '',
    })
    const [tasks, setTasks] = useState<TaskEntity[]>([])
    const { checkListId } = usePreviewList()

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask((prevTask) => ({
            ...prevTask,
            [event.target.name]: event.target.value,
        }))
    }

    const handleAddTask = () => {
        const newTask: TaskEntity = {
            ...task,
            categoryId: '',
            category: '',
        }

        setTasks((prevTasks) => [...prevTasks, newTask])
        setTask({ id: '', description: '', createdBy: '' })
    }

    return (
        <>
            <PreviewListWrap>
                <Container>
                    <StyledCard>
                        <input
                            type="text"
                            name="id"
                            value={task.id}
                            onChange={handleTaskChange}
                            placeholder="Task ID"
                        />
                        <input
                            type="text"
                            name="description"
                            value={task.description}
                            onChange={handleTaskChange}
                            placeholder="Task Description"
                        />{' '}
                        <input
                            type="text"
                            name="CreatedBy"
                            value={checkListId?.user.id}
                            onChange={handleTaskChange}
                            placeholder="send in by"
                        />
                    </StyledCard>
                </Container>
                <Button type="button" onClick={handleAddTask}>
                    Add Task
                </Button>
            </PreviewListWrap>
        </>
    )
}
