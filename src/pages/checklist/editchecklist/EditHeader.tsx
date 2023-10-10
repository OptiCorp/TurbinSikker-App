import {
    Button,
    Card,
    Switch,
    TextField,
    Typography,
} from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CustomDialog from '../../../components/modal/useModalHook'
import useGlobal from '../../../context/globalContextProvider'
import apiService from '../../../services/api'
import { Checklist } from '../../../services/apiTypes'
import { MakeTitleField } from '../myChecklists/styles'
import { InfoHeader } from '../previewCheckList/styles'

type Props = {
    dialogShowing: boolean
    setDialogShowing: (dialogShowing: boolean) => void
    handleClose: () => void
    isOpenn: boolean
    setIsOpenn: (isOpenn: boolean) => void
    setTitle: (title: string) => void
    title: string
    checked: any
    setChecked: any
}

export const EditHeader = ({
    setDialogShowing,
    dialogShowing,
    isOpenn,
    setIsOpenn,
    handleClose,
    title,
    setTitle,
    checked,
    setChecked,
}: Props) => {
    const [changeTitle, setChangeTitle] = useState('')

    useEffect(() => {
        setTitle(changeTitle)
    })
    const { id } = useParams() as { id: string }
    const [checklist, setChecklist] = useState<Checklist>()
    const api = apiService()
    const { accessToken, currentUser } = useGlobal()
    useEffect(() => {
        if (!currentUser?.id || !accessToken || !id) return

        const fetchChecklist = async () => {
            try {
                const checklistData = await api.getChecklist(id)

                setChecklist(checklistData)
                if (checklistData?.checklistTasks) {
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchChecklist()
    }, [accessToken, currentUser?.id, id])

    return (
        <>
            {checklist && (
                <>
                    <InfoHeader>
                        <Card style={{ background: 'white' }}>
                            <Card.Header
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    margin: '0 auto',
                                }}
                            >
                                <Switch
                                    checked={checked}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        margin: '0 auto',

                                        top: '0',
                                    }}
                                    value={checklist?.status}
                                    onChange={(e) => {
                                        setChecked(e.target.checked)

                                        e.target.checked ? 'Active' : 'Inactive'
                                    }}
                                    label={`checklist is ${
                                        checked ? 'Active' : 'Inactive'
                                    }`}
                                />

                                <TextField
                                    id="storybook-readonly"
                                    value={title || checklist?.title}
                                    key={checklist?.id}
                                    label=""
                                    readOnly
                                    style={{
                                        borderBottom: '1px solid #243746',
                                        background: '#F7F7F7',
                                    }}
                                    onClick={() => setDialogShowing(true)}
                                />
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        setIsOpenn(!isOpenn)
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        token={{
                                            textAlign: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        Add Task
                                    </Typography>
                                </Button>
                            </Card.Header>
                        </Card>
                    </InfoHeader>
                    <>
                        <CustomDialog
                            title="Edit title of checklist"
                            buttonVariant="ghost"
                            negativeButtonOnClick={handleClose}
                            negativeButtonText="Cancel"
                            positiveButtonText="Save"
                            positiveButtonOnClick={() => {
                                if (changeTitle) {
                                    setTitle(changeTitle)
                                }
                                setDialogShowing(false)
                            }}
                            isOpen={dialogShowing}
                        >
                            <MakeTitleField
                                id="storybook-readonly"
                                placeholder="name"
                                defaultValue={changeTitle || checklist?.title}
                                label=""
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setChangeTitle(event.target.value)
                                }}
                                style={{
                                    borderBottom: '1px solid #243746',
                                    background: '#F7F7F7',
                                }}
                            />
                        </CustomDialog>
                    </>
                </>
            )}
        </>
    )
}
