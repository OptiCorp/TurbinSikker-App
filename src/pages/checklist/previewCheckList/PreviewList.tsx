import { Label } from '@equinor/eds-core-react'
import { ChecklistTaskInfo } from '../../../services/apiTypes'
import { PreviewListPoints, PreviewListWrap, StyledCard } from './styles'

type Props = {
    tasks: ChecklistTaskInfo[]
}

export const PreviewList = ({ tasks }: Props) => {
    return (
        <PreviewListWrap>
            {tasks.map((task) => (
                <StyledCard elevation="raised" key={task.id}>
                    <Label
                        htmlFor="storybook-multi-readonly"
                        label={task.category.name}
                        style={{
                            height: '0',
                            fontWeight: '600',
                            fontSize: '1rem',
                        }}
                    />{' '}
                    <PreviewListPoints
                        key={task.id}
                        id="storybook-multi-readonly"
                        defaultValue={task.description}
                        multiline
                        readOnly
                        rowsMax={3}
                    />
                </StyledCard>
            ))}
        </PreviewListWrap>
    )
}
