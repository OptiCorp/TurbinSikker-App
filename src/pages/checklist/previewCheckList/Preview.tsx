import { useAddTaskForm } from '@components/addtasks/hooks/useAddTaskForm'
import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { Button, Card, TextField, Typography } from '@equinor/eds-core-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TaskCategoryContextProvider } from '../../../components/addtasks/context/addTaskCategoryContextProvider'
import { useUserContext } from '../../../pages/users/context/userContextProvider'
import { PreviewList } from './PreviewList'
import { InfoHeader, Wrapper } from './styles'

export const PreviewCheckList = () => {
    const clickHandler = (id: string) => {
        navigate(`/EditCheckList/${id}`)
    }
    const location = useLocation()
    const state = location.state
    const { checkListById, sortedTasks } = useAddTaskForm()

    const navigate = useNavigate()
    const { currentUser } = useUserContext()
    return (
        <>
            <TaskCategoryContextProvider>
                <div style={{ backgroundColor: '#f0f3f3' }}>
                    {checkListById && (
                        <div key={checkListById.id}>
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
                                            placeholder={checkListById.title}
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
                                {checkListById?.tasks.length === 0 ? (
                                    <>
                                        <Typography variant="body_short_bold">
                                            No tasks added yet!
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                navigate(
                                                    `/EditCheckList/${checkListById.id}`
                                                )
                                            }}
                                        >
                                            Add some tasks here!
                                        </Button>
                                    </>
                                ) : (
                                    <PreviewList
                                        key={checkListById.id}
                                        tasks={checkListById}
                                        sortedTasks={sortedTasks}
                                    />
                                )}
                            </Wrapper>
                        </div>
                    )}
                    <>
                        {currentUser?.userRole.name === 'Inspector' ? (
                            <DefaultNavigation hideNavbar={false} />
                        ) : (
                            <>
                                {checkListById && (
                                    <NavActionsComponent
                                        disabled={
                                            state?.isFromCompletedList
                                                ? true
                                                : false
                                        }
                                        buttonColor="primary"
                                        secondButtonColor="primary"
                                        buttonVariant="outlined"
                                        onClick={() =>
                                            clickHandler(checkListById.id)
                                        }
                                        isShown={true}
                                        ButtonMessage="Edit Checklist"
                                        SecondButtonMessage="Send"
                                    />
                                )}
                            </>
                        )}
                    </>
                </div>
            </TaskCategoryContextProvider>
        </>
    )
}
