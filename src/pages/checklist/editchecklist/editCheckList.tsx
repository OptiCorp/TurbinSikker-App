import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import CustomDialog from '../../../components/modal/useModalHook'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import { EditHeader } from './EditHeader'
import { EditList } from './EditList/EditList'
import { useEditChecklist } from './hooks/useEditChecklist'
import { BackgroundContainer, EditWrapper, ScrollWrapper } from './styles'

export const EditCheckList = () => {
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)

    const {
        handleDelete,
        setHeaderOpen,
        headerOpen,
        checklist,
        handleSave,
        tasks,
    } = useEditChecklist()

    const handleCloseDelete = () => {
        setDialogDelete(false)
    }

    const handleClose = () => {
        setDialogShowing(false)
    }

    const [title, setTitle] = useState('')

    const [checked, setChecked] = useState(!!checklist?.status)

    useEffect(() => {
        setChecked(checklist?.status === 'Active')
    }, [checklist])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }

    return (
        <BackgroundContainer>
            <>
                <ScrollWrapper key={checklist?.id}>
                    <EditHeader
                        dialogShowing={dialogShowing}
                        setDialogShowing={setDialogShowing}
                        headerOpen={headerOpen}
                        setHeaderOpen={setHeaderOpen}
                        handleClose={handleClose}
                        title={title}
                        setTitle={setTitle}
                        checked={checked}
                        setChecked={setChecked}
                    />

                    <EditWrapper>
                        {headerOpen && <AddTasks />}
                        {checklist && (
                            <EditList
                                key={checklist?.id}
                                checklist={checklist}
                                tasks={tasks}
                            />
                        )}
                    </EditWrapper>
                </ScrollWrapper>

                <CustomDialog
                    title="Delete checklist?"
                    negativeButtonText="Cancel"
                    positiveButtonText="Delete"
                    positiveButtonColor="danger"
                    positiveButtonOnClick={handleDelete}
                    negativeButtonOnClick={handleCloseDelete}
                    isOpen={dialogDelete}
                >
                    <Typography
                        variant="caption"
                        token={{
                            textAlign: 'center',
                        }}
                    >
                        You sure you want to delete {checklist?.title}?
                    </Typography>
                </CustomDialog>

                <NavActionsComponent
                    buttonColor="danger"
                    secondButtonColor="primary"
                    onClick={() => {
                        setDialogDelete(true)
                    }}
                    secondOnClick={() => {
                        handleSave({
                            title: title,
                            status: convertStatusToString(checked),
                        })
                    }}
                    ButtonMessage="Delete"
                    SecondButtonMessage="Save"
                    isShown={true}
                />
            </>
        </BackgroundContainer>
    )
}
