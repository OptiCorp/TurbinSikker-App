import { Button, TextField, Typography } from '@equinor/eds-core-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/NavActionBtn'

import { useEffect, useState } from 'react'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, ChecklistTaskInfo } from '../../../services/apiTypes'
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
    const { accessToken, currentUser, refreshList } = useGlobal()
    const state = location.state
    const [checklist, setChecklist] = useState<Checklist>()
    const [tasks, setTasks] = useState<ChecklistTaskInfo[]>([])

    const { id } = useParams() as { id: string }
    const clickHandler = (id: string) => {
        navigate(`/EditCheckList/${id}`)
    }
    const { isInspector, isLeader } = useRoles()

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
    }, [accessToken, currentUser?.id, id, refreshList])

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
                                {isLeader && (
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
                                )}
                            </NoTaskContainer>
                        ) : (
                            <PreviewList key={checklist.id} tasks={tasks} />
                        )}
                    </div>
                )}
            </BackgroundContainer>
            <>
                {state?.isFromCompletedList ? (
                    <DefaultNavigation hideNavbar={false} />
                ) : (
                    <>
                        {checklist && (
                            <NavActionsComponent
                                buttonColor="primary"
                                secondButtonColor="primary"
                                buttonVariant="outlined"
                                onClick={() => clickHandler(id)}
                                secondOnClick={() => {
                                    navigate(`/SendChecklist/${checklist.id}`)
                                }}
                                isShown={true}
                                ButtonMessage="Edit Checklist"
                                SecondButtonMessage="Send"
                            />
                        )}
                    </>
                )}
            </>
        </>
    )
}
