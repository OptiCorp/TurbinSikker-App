import CustomDialog from '@components/modal/useModalHook'
import { NavActionsComponent } from '@components/navigation/hooks/useNavActionBtn'
import { SnackbarContext } from '@components/snackbar/SnackBarContext'
import { Table } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'

import {
    CheckListContext,
    useCheckListContext,
} from '../../context/CheckListContextProvider'
import { CheckListUserIDRow } from './CheckListIDrow'

import {
    BackgroundWrap,
    HeadCell,
    ListWrapperCheckMyList,
    MakeTitleField,
    Styledh3,
} from './styles'

export const MyCheckLists = () => {
    const { handleSubmit } = useCheckListContext()
    const { openSnackbar } = useContext(SnackbarContext)

    const handleCreateChecklist = async () => {
        try {
            handleSubmit({
                title,
            })
            setDialogShowing(false)
            if (openSnackbar) {
                openSnackbar(`CheckList Created`)
            }
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    const navigate = useNavigate()
    const handleClose = () => {
        setDialogShowing(false)
    }
    const [title, setTitle] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { userIdCheckList } = useContext(CheckListContext)

    const [activeRow, setActiveRow] = useState(false)

    return (
        <>
            <BackgroundWrap>
                <ListWrapperCheckMyList>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <Styledh3>Name</Styledh3>
                                </HeadCell>
                                <HeadCell>
                                    <Styledh3>Status</Styledh3>
                                </HeadCell>
                                <HeadCell>
                                    <Styledh3>Last Update</Styledh3>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {userIdCheckList?.map((userIdCheckList) => (
                                <CheckListUserIDRow
                                    userIdCheckList={userIdCheckList}
                                    key={userIdCheckList.id}
                                    setActiveRow={setActiveRow}
                                    activeRow={activeRow}
                                />
                            ))}
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
            ) : (
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
                    as="a"
                    href="/SendCheckList/"
                />
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
