import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import { useAddTaskForm } from '../../../components/addtasks/hooks/useAddTaskForm'
import CustomDialog from '../../../components/modal/useModalHook'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import { Wrapper } from '../previewCheckList/styles'
import { EditHeader } from './EditHeader'
import { EditList } from './EditList/EditList'
import { useEditChecklist } from './hooks/useEditChecklist'

export const EditCheckList = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { id } = useParams() as { id: string }

    const { handleDelete, setHeaderOpen, headerOpen, handleSave, checklist } =
        useEditChecklist()

    const handleCloseDelete = () => {
        setDialogDelete(false)
    }

    const handleClose = () => {
        setDialogShowing(false)
    }

    const [title, setTitle] = useState('')
    const { tasks } = useAddTaskForm()

    const [checked, setChecked] = useState(!!checklist?.status)

    useEffect(() => {
        setChecked(checklist?.status === 'Active')
    }, [checklist])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checklist && (
                <>
                    <div key={checklist.id}>
                        <EditHeader
                            dialogShowing={dialogShowing}
                            setDialogShowing={setDialogShowing}
                            isOpenn={headerOpen}
                            setIsOpenn={setHeaderOpen}
                            handleClose={handleClose}
                            title={title}
                            setTitle={setTitle}
                            checked={checked}
                            setChecked={setChecked}
                        />

                        <Wrapper>
                            {headerOpen && <AddTasks />}

                            <EditList key={checklist.id} tasks={tasks} />
                        </Wrapper>
                    </div>

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
                            You sure you want to delete {checklist.title}?
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
            )}
        </div>
    )
}
