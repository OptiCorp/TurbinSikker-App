import { Task } from '../../../services/apiTypes'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from './styles'

type Props = {
    tasks: Task[]
}

export const PreviewList = ({ tasks }: Props) => {
    return (
        <PreviewListWrap>
            {tasks.map((task) => (
                <Container key={task.id}>
                    <CategoryName>{task.category.name}</CategoryName>
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
            ))}
        </PreviewListWrap>
    )
}
