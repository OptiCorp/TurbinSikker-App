import { TaskEntity } from '@components/addtasks/context/models/TaskEntity'
import type { CheckListEntity } from 'src/pages/context/models/CheckListEntity'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from './styles'

type Props = {
    tasks: CheckListEntity
    sortedTasks: TaskEntity[]
}

export const PreviewList = ({ sortedTasks }: Props) => {
    let lastCategoryName = ''

    return (
        <PreviewListWrap>
            {sortedTasks.map((task) => {
                const categoryName =
                    task.category.name !== lastCategoryName
                        ? task.category.name
                        : ''

                lastCategoryName = task.category.name

                return (
                    <Container key={task.id}>
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
                                defaultValue={task.description}
                                multiline
                                readOnly
                                rows={3}
                            />
                        </StyledCard>
                    </Container>
                )
            })}
        </PreviewListWrap>
    )
}
