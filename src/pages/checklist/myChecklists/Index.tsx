import { Table, Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BannerComponent } from '../../../components/banner/useBanner'
import CustomDialog from '../../../components/modal/useModalHook'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, WorkflowResponse } from '../../../services/apiTypes'
import { useRoles } from '../../../services/useRoles'
import { COLORS } from '../../../style/GlobalStyles'
import { InspectorPendingRow } from './InspectorPendingRow'
import { LeaderMyChecklist } from './LeaderMyChecklists'
import { BackgroundWrap, MakeTitleField } from './styles'

export const MyCheckLists = () => {
    const api = apiService()
    const [workflow, setWorkFlow] = useState<WorkflowResponse[]>([])
    const [checklists, setChecklists] = useState<Checklist[]>([])
    const { currentUser, openSnackbar, setRefreshList, refreshList } =
        useGlobal()
    const handleClose = () => {
        setDialogShowing(false)
    }
    const [title, setTitle] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const [activeRow, setActiveRow] = useState(false)
    const navigate = useNavigate()
    const { isLeader, isInspector } = useRoles()

    const handleCreateChecklist = async () => {
        try {
            if (!currentUser) return
            const res = await api.addChecklist(currentUser.id, title)

            if (res.id) setDialogShowing(false)

            if (res.id) navigate(`/EditCheckList/${res.id}`)
            if (res.id && openSnackbar) openSnackbar('Checklist created')
            console.log(res.id)
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    useEffect(() => {
        if (!currentUser) return
        ;(async (): Promise<void> => {
            try {
                const workFlowData = await api.getAllWorkflowsByUserId(
                    currentUser.id
                )

                setWorkFlow(workFlowData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id])

    useEffect(() => {
        if (!currentUser?.id) return
        ;(async (): Promise<void> => {
            try {
                const checklistData = await api.getAllChecklistsByUserId(
                    currentUser.id
                )

                setChecklists(checklistData)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [currentUser?.id, refreshList])

    return (
        <>
            <BackgroundWrap>
                <BannerComponent />
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>
                                <Typography variant="body_long_bold">
                                    Title
                                </Typography>
                            </Table.Cell>
                            <Table.Cell>
                                <Typography variant="body_long_bold">
                                    Assigned
                                </Typography>
                            </Table.Cell>
                            <Table.Cell>
                                <Typography variant="body_long_bold">
                                    Status
                                </Typography>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        <>
                            {isInspector ? (
                                <>
                                    {workflow.map((WorkFlow) => (
                                        <InspectorPendingRow
                                            WorkFlow={WorkFlow}
                                            key={WorkFlow.id}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {checklists?.map((checklist) => (
                                        <LeaderMyChecklist
                                            checklist={checklist}
                                            key={checklist.id}
                                            setActiveRow={setActiveRow}
                                            activeRow={activeRow}
                                        />
                                    ))}
                                </>
                            )}
                        </>
                    </Table.Body>
                </Table>
            </BackgroundWrap>

            {activeRow === true ? (
                <NavActionsComponent
                    buttonColor="danger"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    ButtonMessage="Delete Checklist"
                    secondButtonVariant="outlined"
                    secondOnClick={handleClose}
                    SecondButtonMessage="Cancel"
                    isShown={true}
                />
            ) : isLeader ? (
                <NavActionsComponent
                    buttonVariant="outlined"
                    onClick={() => {
                        setDialogShowing(true)
                    }}
                    ButtonMessage="New Checklist"
                    secondButtonColor="primary"
                    secondOnClick={() => {
                        navigate(`/SendCheckList/`)
                    }}
                    isShown={true}
                    SecondButtonMessage="Send Checklist"
                />
            ) : (
                <DefaultNavigation hideNavbar={false} />
            )}

            <CustomDialog
                title="Title of checklist"
                buttonVariant="ghost"
                positiveButtonText="Save"
                negativeButtonText="Cancel"
                positiveButtonOnClick={handleCreateChecklist}
                negativeButtonOnClick={() => setDialogShowing(false)}
                isOpen={dialogShowing}
            >
                <MakeTitleField
                    id="storybook-readonly"
                    placeholder="name"
                    label=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.target.value)
                    }}
                    style={{
                        borderBottom: `1px solid ${COLORS.secondary}`,
                        background: COLORS.white,
                    }}
                />
            </CustomDialog>
        </>
    )
}
