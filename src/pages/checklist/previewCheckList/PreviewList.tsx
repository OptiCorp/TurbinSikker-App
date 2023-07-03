import { CheckListEntity } from 'src/models/CheckListEntity'
import { PreviewListPoints, PreviewListWrap, StyledCard } from './styles'

type Props = {
    tasks: CheckListEntity
}

export const PreviewList = ({ tasks }: Props) => {
    return (
        <>
            <PreviewListWrap>
                {tasks.tasks.map((task) => (
                    <>
                        <p>{task.category.name}</p>
                        <StyledCard
                            style={{
                                width: '100%',
                            }}
                        >
                            <PreviewListPoints
                                key={task.id}
                                id="storybook-multi-readonly"
                                label=""
                                placeholder={task.description}
                                multiline
                                readOnly
                                rows={3}
                            />
                        </StyledCard>
                    </>
                ))}
            </PreviewListWrap>
        </>
    )
}
