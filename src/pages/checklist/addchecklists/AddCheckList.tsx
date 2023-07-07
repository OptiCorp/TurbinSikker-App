import { Button, Card } from '@equinor/eds-core-react'
import { FormProvider } from 'react-hook-form'

import { InputCheckList } from './InputCheckList'
import { Container, StyledCardContent, TitleHeader } from './styles'

import { CategorySelector } from './CategoryList'
import { useAddCheckList } from './useAddCheckList/Index'

export const AddCheckList = () => {
    const { methods, onSubmit } = useAddCheckList()
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
                        >
                            sdsdsd
                        </Card.Header>
                        <StyledCardContent>
                            <InputCheckList
                                name="title"
                                label=""
                                placeholder="title"
                            />
                            <InputCheckList
                                name="createdBy"
                                label=""
                                placeholder="createdBy"
                            />
                            <CategorySelector />
                        </StyledCardContent>
                    </Card>
                </TitleHeader>
                <Container>
                    <Button type="submit" form="add-checklist">
                        Submit
                    </Button>
                </Container>
            </form>
        </FormProvider>
    )
}
