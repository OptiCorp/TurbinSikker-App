import { TaskEntity } from '../../../components/addtasks/context/models/TaskEntity'
import {
    CategoryName,
    Container,
    PreviewListPoints,
    PreviewListWrap,
    StyledCard,
} from './styles'

type Props = {
    tasks: TaskEntity
}

export const PreviewList = ({ tasks }: Props) => {
 

    return (
        <PreviewListWrap>
            return (
            <Container key={tasks.id}>
                <CategoryName>{tasks.category.name}</CategoryName>
                <StyledCard
                    style={{
                        width: '100%',
                    }}
                >
                    <PreviewListPoints
                        label=""
                        key={tasks.id}
                        id="storybook-multi-readonly"
                        defaultValue={tasks.description}
                        multiline
                        readOnly
                        rows={3}
                    />
                </StyledCard>
            </Container>
            )
        </PreviewListWrap>
    )
}
