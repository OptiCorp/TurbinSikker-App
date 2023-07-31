import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { Button, Card, TextField, Typography } from '@equinor/eds-core-react'

import { useState } from 'react'

import { useLocation } from 'react-router'
import { AddTasks } from '../../../components/addtasks/AddTasks'
import { useApiContext } from '../../../pages/context/apiContextProvider'
import { InfoHeader, Wrapper } from '../previewCheckList/styles'
import { EditList } from './EditList/EditList'
import { EditNav } from './EditNav/EditNav'

export const EditCheckList = () => {
    const appLocation = useLocation()
    const [isOpenn, setIsOpenn] = useState(false)
    const { checkListId, sortedTasks } = useAddTaskForm()

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checkListId && (
                <div key={checkListId.id}>
                    <InfoHeader>
                        <Card style={{ background: 'white' }}>
                            <Card.Header
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    margin: '0 auto',
                                }}
                            >
                                <TextField
                                    id="storybook-readonly"
                                    defaultValue={checkListId.title}
                                    label=""
                                    readOnly
                                    style={{
                                        borderBottom: '1px solid #243746',
                                        background: '#F7F7F7',
                                    }}
                                />
                                <Button
                                    color="secondary"
                                    onClick={() => setIsOpenn(!isOpenn)}
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

                    <Wrapper>
                        {isOpenn && <AddTasks />}

                        <EditList
                            key={checkListId.id}
                            tasks={checkListId}
                            sortedTasks={sortedTasks}
                        />
                    </Wrapper>
                </div>
            )}
            {appLocation.pathname.includes('EditCheckList') ? (
                <EditNav />
            ) : null}
        </div>
    )
}
