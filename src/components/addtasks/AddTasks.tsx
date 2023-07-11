import { Button, Card } from '@equinor/eds-core-react'

import { FormProvider } from 'react-hook-form'

import { StyledCard } from '../../pages/checklist/previewCheckList/styles'

import { CategorySelector } from './CategoryList'
import { Container, TitleHeader } from './styles'
import { useAddTaskForm } from './useAddTaskForm'

export const AddTasks = () => {
    const { onSubmit, methods } = useAddTaskForm()

    const { handleSubmit } = methods

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} id="add-checklist">
                <TitleHeader>
                    <Card>
                        <Card.Header
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                margin: '0 auto',
                            }}
                        ></Card.Header>
                    </Card>
                </TitleHeader>
                <Container>
                    <CategorySelector />
                </Container>
                <StyledCard
                    style={{
                        width: '100%',
                    }}
                ></StyledCard>

                <Button type="submit" form="add-checklist">
                    Submit
                </Button>
            </form>
        </FormProvider>
    )
}
