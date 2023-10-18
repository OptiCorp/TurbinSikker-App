import { Button, TextField, Typography } from '@equinor/eds-core-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, Task } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
import { COLORS } from '../../../style/GlobalStyles'
import { PreviewList } from './PreviewList'
import {
    BackgroundContainer,
    EditStyledCardHeader,
    InfoHeader,
    NoTaskContainer,
    StyledCard,
} from './styles'
export const PreviewCheckList = () => {
    const location = useLocation()
    const api = apiService()
    const { accessToken, currentUser } = useGlobal()
    const state = location.state
    const [checklist, setChecklist] = useState<Checklist>()
    const [tasks, setTasks] = useState<Task[]>([])

    const { id } = useParams() as { id: string }
    const clickHandler = (id: string) => {
        navigate(`/EditCheckList/${id}`)
    }
    const { isInspector } = useRoles()
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
            <BackgroundContainer>
                {checklist && (
                    <div key={checklist.id}>
                        <InfoHeader>
                            <StyledCard>
                                <EditStyledCardHeader>
                                    <TextField
                                        id="storybook-readonly"
                                        placeholder={checklist.title}
                                        label=""
                                        readOnly
                                        style={{
                                            borderBottom: '1px solid #243746',
                                            background: COLORS.white,
                                        }}
                                    />
                                </EditStyledCardHeader>
                            </StyledCard>
                        </InfoHeader>

                        {checklist?.checklistTasks?.length === 0 ? (
                            <NoTaskContainer>
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
                            </NoTaskContainer>
                        ) : (
                            <PreviewList key={checklist.id} tasks={tasks} />
                        )}
                    </div>
                )}
                <>
                    {isInspector ? (
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
                                    secondOnClick={() => {
                                        navigate(
                                            `/SendChecklist/${checklist.id}`
                                        )
                                    }}
                                    isShown={true}
                                    ButtonMessage="Edit Checklist"
                                    SecondButtonMessage="Send"
                                />
                            )}
                        </>
                    )}
                </>
            </BackgroundContainer>
        </>
    )
}
