import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import {
    Button,
    Card,
    Switch,
    TextField,
    Typography,
} from '@equinor/eds-core-react'

import { useEffect, useState } from 'react'

import CustomDialog from '@components/modal/useModalHook'
import { MakeTitleField } from '../checkListID/styles'
import { InfoHeader } from '../previewCheckList/styles'
import { useEditCheckList } from './hooks/useEditCheckList'

type Props = {
    dialogShowing: boolean
    setDialogShowing: (dialogShowing: boolean) => void
    handleClose: () => void
    isOpenn: boolean
    setIsOpenn: (isOpenn: boolean) => void
    setTitle: (title: string) => void
    title: string
}

export const EditHeader = ({
    setDialogShowing,
    dialogShowing,
    isOpenn,
    setIsOpenn,
    handleClose,
    title,
    setTitle,
}: Props) => {
    const { checkListId } = useAddTaskForm()
    const { checked, setChecked } = useEditCheckList()

    const [changeTitle, setChangeTitle] = useState('')

    useEffect(() => {
        setTitle(changeTitle)
    })

    return (
        <>
            {checkListId && (
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
                                    value={checkListId.status}
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
                                    value={title || checkListId.title}
                                    key={checkListId.id}
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
                                defaultValue={changeTitle || checkListId.title}
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
