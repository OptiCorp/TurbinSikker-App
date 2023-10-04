import { Table } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { SnackbarContext } from '../../../components/snackbar/SnackBarContext'
import { ApiStatus, Workflow } from '../../../services/apiTypes'
import { useCheckListContext } from '../../context/CheckListContextProvider'

import CustomDialog from '../../../components/modal/useModalHook'
import { DefaultNavigation } from '../../../components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import useAuth from '../../../context/AuthContextProvider'
import apiService from '../../../services/api'
import { useUserContext } from '../../users/context/userContextProvider'
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
    const { handleSubmit } = useCheckListContext()

    const { accessToken } = useAuth()
    const api = apiService(accessToken)
    const [workflow, setWorkFlow] = useState<Workflow[]>([])
    const [workflowStatus, setWorkflowStatus] = useState<ApiStatus>(
        ApiStatus.LOADING
    )
    const { currentUser } = useUserContext()
    const navigate = useNavigate()
    const handleClose = () => {
        setDialogShowing(false)
    }
    const [title, setTitle] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { userIdCheckList } = useCheckListContext()
    const { openSnackbar } = useContext(SnackbarContext)
    const [activeRow, setActiveRow] = useState(false)

    const handleCreateChecklist = async () => {
        try {
            handleSubmit({
                title,
                creatorId: currentUser?.id ?? '',
            })
            setDialogShowing(false)
            if (openSnackbar) {
                openSnackbar(`CheckList Created`)
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
                setWorkflowStatus(ApiStatus.SUCCESS)
            } catch (error) {
                setWorkflowStatus(ApiStatus.ERROR)
            }
        })()
    }, [accessToken, currentUser?.id])

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
                                        {userIdCheckList?.map(
                                            (userIdCheckList) => (
                                                <LeaderMyChecklists
                                                    userIdCheckList={
                                                        userIdCheckList
                                                    }
                                                    key={userIdCheckList.id}
                                                    setActiveRow={setActiveRow}
                                                    activeRow={activeRow}
                                                />
                                            )
                                        )}
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
