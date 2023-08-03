import { Button, Dialog } from '@equinor/eds-core-react'

import { useState } from 'react'

import { EditListPoints, StyledDialog, Wrapper } from './styles'

export const DialogTask = ({
    isOpen = false,
    handleClose,
    handleSubmit,
    taskId,
    taskDescription,
}: {
    isOpen?: boolean
    handleClose: () => void
    handleSubmit: (data: { content: string }) => void
    taskId: string
    taskDescription: string
}) => {
    const [content, setContent] = useState('')

    return (
        <Dialog open={isOpen}>
            <Dialog.Header>
                <Dialog.Title>Edit Task</Dialog.Title>
            </Dialog.Header>

            <StyledDialog>
                <EditListPoints
                    label=""
                    key={taskId}
                    id="storybook-multi-readonly"
                    defaultValue={taskDescription}
                    multiline
                    rows={5}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setContent(event.target.value)
                    }}
                />
            </StyledDialog>

            <Dialog.Actions>
                <Wrapper>
                    <Button variant="ghost" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleSubmit({
                                content: content,
                            })
                        }}
                    >
                        Save
                    </Button>
                </Wrapper>
            </Dialog.Actions>
        </Dialog>
    )
}
