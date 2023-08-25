import { Button, Card } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'

import { CategorySelector } from './CategoryList'
import { StyledCard, TitleHeader } from './styles'
import { useAddTaskForm } from './hooks/useAddTaskForm'

export const AddTasks = () => {
    const { methods, onSubmit } = useAddTaskForm()
    const { handleSubmit } = methods
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TitleHeader>
                    <StyledCard>
                        <Card.Content>
                            <CategorySelector />
                        </Card.Content>
                        <Button type="submit">Add Task</Button>
                    </StyledCard>
                </TitleHeader>
            </form>
        </FormProvider>
    )
}
