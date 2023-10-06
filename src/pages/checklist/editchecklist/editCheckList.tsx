import { Typography } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import { useAddTaskForm } from '../../../components/addtasks/hooks/useAddTaskForm'
import CustomDialog from '../../../components/modal/useModalHook'
import { NavActionsComponent } from '../../../components/navigation/hooks/useNavActionBtn'
import { useGetChecklistById } from '../../../services/hooks/useGetChecklistById'
import { Wrapper } from '../previewCheckList/styles'
import { EditHeader } from './EditHeader'
import { EditList } from './EditList/EditList'
import { useEditCheckListContext } from './context/editCheckListContextProvider'

export const EditCheckList = () => {
    const navigate = useNavigate()
    const [dialogDelete, setDialogDelete] = useState(false)
    const [dialogShowing, setDialogShowing] = useState(false)
    const { id } = useParams() as { id: string }

    const handleDeleteChecklist = async () => {
        try {
            handleDelete(id)
            setDialogDelete(false)
            navigate('/MyChecklists')
        } catch (error) {
            console.error('Error creating checklist:', error)
        }
    }

    const handleCloseDelete = () => {
        setDialogDelete(false)
    }

    const handleClose = () => {
        setDialogShowing(false)
    }

    const [title, setTitle] = useState('')
    const { tasks } = useAddTaskForm()
    const {
        handleSave,

        isOpenn,
        setIsOpenn,
        handleDelete,
    } = useEditCheckListContext()

    const { data: checklist } = useGetChecklistById(id)

    const [checked, setChecked] = useState(!!checklist?.status)

    useEffect(() => {
        setChecked(checklist?.status === 'Active')
    }, [checklist])

    function convertStatusToString(status: boolean): 'Active' | 'Inactive' {
        return status ? 'Active' : 'Inactive'
    }
    console.log(tasks)
    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checklist && (
                <>
                    <div key={checklist.id}>
                        <EditHeader
                            dialogShowing={dialogShowing}
                            setDialogShowing={setDialogShowing}
                            isOpenn={isOpenn}
                            setIsOpenn={setIsOpenn}
                            handleClose={handleClose}
                            title={title}
                            setTitle={setTitle}
                            checked={checked}
                            setChecked={setChecked}
                        />

                        <Wrapper>
                            {isOpenn && <AddTasks />}

                            <EditList key={checklist.id} tasks={tasks} />
                        </Wrapper>
                    </div>

                    <CustomDialog
                        title="Delete checklist?"
                        negativeButtonText="Cancel"
                        positiveButtonText="Delete"
                        positiveButtonColor="danger"
                        positiveButtonOnClick={handleDeleteChecklist}
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
