import { Button, Card, TextField, Typography } from '@equinor/eds-core-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, Task } from '../../../services/apiTypes'
import { PreviewList } from './PreviewList'
import { InfoHeader, Wrapper } from './styles'

export const PreviewCheckList = () => {
    const location = useLocation()
    const api = apiService()
    const { accessToken, currentUser } = useGlobal()
    const state = location.state
    const [checklist, setChecklist] = useState<Checklist>()
    const [tasks, setTasks] = useState<Task[]>([])

    const { id } = useParams() as { id: string }
    const clickHandler = (id: string) => {
        console.log(id)
        navigate(`/EditCheckList/${id}`)
    }

    useEffect(() => {
        if (!currentUser?.id || !accessToken || !id) return

        const fetchChecklist = async () => {
            try {
                const checklistData = await api.getChecklist(id)

                setChecklist(checklistData)
                if (checklistData?.checklistTasks) {
                    setTasks(checklistData.checklistTasks)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchChecklist()
    }, [accessToken, currentUser?.id, id])

    const navigate = useNavigate()

    return (
        <>
            <div style={{ backgroundColor: '#f0f3f3' }}>
                {checklist && (
                    <div key={checklist.id}>
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
                                        placeholder={checklist.title}
                                        label=""
                                        readOnly
                                        style={{
                                            borderBottom: '1px solid #243746',
                                            background: '#F7F7F7',
                                        }}
                                    />
                                </Card.Header>
                            </Card>
                        </InfoHeader>
                        <Wrapper>
                            {checklist?.checklistTasks?.length === 0 ? (
                                <>
                                    <Typography variant="body_short_bold">
                                        No tasks added yet!
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            navigate(
                                                `/EditCheckList/${checklist.id}`
                                            )
                                        }}
                                    >
                                        Add some tasks here!
                                    </Button>
                                </>
                            ) : (
                                <PreviewList key={checklist.id} tasks={tasks} />
                            )}
                        </Wrapper>
                    </div>
                )}
                <>
                    {currentUser?.userRole.name === 'Inspector' ? (
                        <DefaultNavigation hideNavbar={false} />
                    ) : (
                        <>
                            {checklist && (
                                <NavActionsComponent
                                    disabled={
                                        state?.isFromCompletedList
                                            ? true
                                            : false
                                    }
                                    buttonColor="primary"
                                    secondButtonColor="primary"
                                    buttonVariant="outlined"
                                    onClick={() => clickHandler(id)}
                                    isShown={true}
                                    ButtonMessage="Edit Checklist"
                                    SecondButtonMessage="Send"
                                />
                            )}
                        </>
                    )}
                </>
            </div>
        </>
    )
}
