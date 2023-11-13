import { Button, Card } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'

import { CategorySelector } from './CategoryList'
import { useAddTaskForm } from './hooks/useAddTaskForm'
import { StyledCard, TitleHeader } from './styles'

export const AddTasks = () => {
    const { methods, onSubmit } = useAddTaskForm()
    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id="addTask">
                <TitleHeader>
                    <StyledCard>
                        <Card.Content
                            style={{
                                width: '300px',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                            }}
                        >
                            <CategorySelector />{' '}
                        </Card.Content>
                        <Card.Actions>
                            <Button id="addTask" type="submit" form="addTask">
                                Add Task
                            </Button>
                        </Card.Actions>
                    </StyledCard>
                </TitleHeader>
            </form>
        </FormProvider>
    )
}
