import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import CustomDialog from '../../../components/modal/useModalHook'

import { NavActionsComponent } from '../../../components/navigation/hooks/NavActionBtn'
import { EditHeader } from './EditHeader'
import { EditList } from './editList/EditList'
import { useEditChecklist } from './hooks/useEditChecklist'
import { BackgroundContainer, ScrollWrapper } from './styles'

export const EditCheckList = () => {
    const [dialogShowing, setDialogShowing] = useState(false)

    const {
        handleDelete,
        setDialogDelete,
        setHeaderOpen,
        headerOpen,
        checklist,
        handleSave,
        tasks,
        dialogDelete,
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
        if (checklist) {
            setTitle(checklist.title)
        }
    }, [checklist])

    useEffect(() => {
        setChecked(checklist?.status === 'Active')
    }, [checklist])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }

    return (
        <BackgroundContainer>
            <>
                {checklist && (
                    <>
                        <>
                            <EditHeader
                                dialogShowing={dialogShowing}
                                setDialogShowing={setDialogShowing}
                                headerOpen={headerOpen}
                                setHeaderOpen={setHeaderOpen}
                                handleClose={handleClose}
                                checked={checked}
                                setChecked={setChecked}
                                title={title}
                                checklist={checklist}
                                setTitle={setTitle}
                            />
                        </>
                        <ScrollWrapper key={checklist?.id}>
                            {headerOpen && <AddTasks />}
                            {checklist && (
                                <>
                                    <EditList
                                        key={checklist?.id}
                                        checklist={checklist}
                                        tasks={tasks}
                                    />
                                </>
                            )}
                        </ScrollWrapper>
                    </>
                )}

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
