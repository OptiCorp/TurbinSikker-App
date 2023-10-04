import CustomDialog from '@components/modal/useModalHook'
import { DefaultNavigation } from '@components/navigation/hooks/DefaultNavigation'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Table } from '@equinor/eds-core-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useApiHooks } from '../../../Helpers/useApiHooks'
import { ApiStatus } from '../../../services/apiTypes'
import { useCheckListContext } from '../../context/CheckListContextProvider'
import { WorkFlow } from '../workflow/types'
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
    const { openSnackbar } = useContext(SnackbarContext)
    const [workflow, setWorkFlow] = useState<WorkFlow[]>([])
    const [workflowStatus, setWorkflowStatus] = useState<ApiStatus>(ApiStatus.LOADING)
    const {currentUserId, currentUser,api, accessToken} = useApiHooks()
    const navigate = useNavigate()
    const handleClose = () => {
        setDialogShowing(false)
    }
    const [title, setTitle] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { userIdCheckList } = useCheckListContext()

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
        if (!currentUserId || !accessToken) return
        (async (): Promise<void> => {
            try {
        const workFlowData = await api.getAllWorkflowsByUserId(currentUserId)
        setWorkFlow(workFlowData)
        setWorkflowStatus(ApiStatus.SUCCESS);
    } catch (error) {
        setWorkflowStatus(ApiStatus.ERROR); }
})();


}, [accessToken, currentUserId])

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
