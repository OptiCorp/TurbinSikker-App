import { Button, Card } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'

import { CategorySelector } from './CategoryList'
import { StyledCard, StyledCardContent, TitleHeader } from './styles'
import { useAddTaskForm } from './useAddTaskForm'

export const AddTasks = () => {
    const { methods, onSubmit } = useAddTaskForm()
    const { handleSubmit } = methods
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TitleHeader>
                    <StyledCard>
                        <StyledCardContent>
                            <CategorySelector />
                        </StyledCardContent>
                        <Button type="submit">Submit</Button>
                    </StyledCard>
                </TitleHeader>
            </form>
        </FormProvider>
    )
}
