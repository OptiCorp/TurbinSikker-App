import { Button, Card } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'

import useSnackBar from '../snackbar/useSnackBar'
import { CategorySelector } from './CategoryList'
import { useAddTaskForm } from './hooks/useAddTaskForm'
import { StyledCard, TitleHeader } from './styles'

export const AddTasks = () => {
    const { methods, onSubmit } = useAddTaskForm()
    const { handleSubmit } = methods
    const { snackbar } = useSnackBar()
    return (
        <FormProvider {...methods}>
            {snackbar}
            <form onSubmit={handleSubmit(onSubmit)} id="addTask">
                <TitleHeader>
                    <StyledCard>
                        <Card.Content>
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
