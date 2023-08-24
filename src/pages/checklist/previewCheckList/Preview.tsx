import { useAddTaskForm } from '@components/addtasks/hooks/useAddTaskForm'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { Button, Card, TextField, Typography } from '@equinor/eds-core-react'
import { useNavigate } from 'react-router-dom'
import { TaskCategoryContextProvider } from '../../../components/addtasks/context/addTaskCategoryContextProvider'
import { PreviewList } from './PreviewList'
import { InfoHeader, Wrapper } from './styles'

export const PreviewCheckList = () => {
    const clickHandler = (id: string) => {
        navigate(`/EditCheckList/${id}`)
    }
    const { checkListId, sortedTasks } = useAddTaskForm()
    const navigate = useNavigate()
    return (
        <>
            <TaskCategoryContextProvider>
                <div style={{ backgroundColor: '#f0f3f3' }}>
                    {checkListId && (
                        <div key={checkListId.id}>
                            <InfoHeader>
                                <Card style={{ background: 'white' }}>
                                    <Card.Header
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <TextField
                                            id="storybook-readonly"
                                            placeholder={checkListId.title}
                                            label=""
                                            readOnly
                                            style={{
                                                borderBottom:
                                                    '1px solid #243746',
                                                background: '#F7F7F7',
                                            }}
                                        />
                                    </Card.Header>
                                </Card>
                            </InfoHeader>
                            <Wrapper>
                                {checkListId?.tasks.length === 0 ? (
                                    <>
                                        <Typography variant="body_short_bold">
                                            No tasks added yet!
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                navigate(
                                                    `/EditCheckList/${checkListId.id}`
                                                )
                                            }}
                                        >
                                            Add some tasks here!
                                        </Button>
                                    </>
                                ) : (
                                    <PreviewList
                                        key={checkListId.id}
                                        tasks={checkListId}
                                        sortedTasks={sortedTasks}
                                    />
                                )}
                            </Wrapper>
                        </div>
                    )}
                    {checkListId && (
                        <NavActionsComponent
                            buttonColor="primary"
                            secondButtonColor="primary"
                            buttonVariant="outlined"
                            onClick={() => clickHandler(checkListId.id)}
                            isShown={true}
                            ButtonMessage="Edit Checklist"
                            SecondButtonMessage="Send"
                        />
                    )}
                </div>
            </TaskCategoryContextProvider>
        </>
    )
}
