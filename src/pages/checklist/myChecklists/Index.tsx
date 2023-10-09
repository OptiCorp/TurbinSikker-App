import { Table } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import CustomDialog from '../../../components/modal/useModalHook'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist, Workflow } from '../../../services/apiTypes'
import { InspectorPendingRow } from './InspectorPendingRow'
import { LeaderMyChecklists } from './LeaderMyChecklists'
import {
    BackgroundWrap,
    HeadCell,
    ListWrapperCheckMyList,
    MakeTitleField,
    StyledHeadContents,
    StyledHeadTitle,
} from './styles'

export const MyCheckLists = () => {
    const { accessToken } = useGlobal()
    const api = apiService()
    const [workflow, setWorkFlow] = useState<Workflow[]>([])

    const [checklists, setChecklists] = useState<Checklist[]>([])
    const { currentUser } = useGlobal()

    const handleClose = () => {
        setDialogShowing(false)
    }
    const [title, setTitle] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const [activeRow, setActiveRow] = useState(false)
    const navigate = useNavigate()
    const [checklistData, setChecklistData] = useState<Checklist | string>()
    // const openSnackbar = (message: string) => {
    //     setSnackbarMessage(message)

    //     setIsOpen(true)
    // }

    // const closeSnackbar = () => {
    //     setIsOpen(false)
    // }

    const handleCreateChecklist = async () => {
        try {
            if (!currentUser) return
            const res = await api.addChecklist(currentUser.id, title)
            setChecklistData(res.id)
            setDialogShowing(false)
            {
                navigate(`/EditCheckList/${checklistData}`)
            }
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
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
    }, [accessToken, currentUser?.id])

    useEffect(() => {
        if (!currentUser?.id || !accessToken) return
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
    }, [accessToken, currentUser?.id])

    // useEffect(() => {
    //     if (!currentUser?.id || !accessToken) return
    //     ;async (): Promise<void> => {
    //         try {
    //             const checklistData = await api.getChecklist(id)
    //             setChecklist(checklistData)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }, [accessToken, currentUser?.id])

    return (
        <>
            <BackgroundWrap>
                <ListWrapperCheckMyList>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <StyledHeadTitle>Title</StyledHeadTitle>
                                </HeadCell>
                                <HeadCell>
                                    <StyledHeadContents>
                                        Assigned
                                    </StyledHeadContents>
                                </HeadCell>
                                <HeadCell>
                                    <StyledHeadContents>
                                        Status
                                    </StyledHeadContents>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            <>
                                {currentUser?.userRole.name === 'Inspector' ? (
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
                                            <LeaderMyChecklists
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
                </ListWrapperCheckMyList>
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
            ) : currentUser?.userRole.name === 'Leader' ? (
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
                        borderBottom: '1px solid #243746',
                        background: '#F7F7F7',
                    }}
                />
            </CustomDialog>
        </>
    )
}
