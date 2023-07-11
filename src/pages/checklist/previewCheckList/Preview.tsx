import { Button, Card, TextField } from '@equinor/eds-core-react'

import { InfoHeader, Wrapper } from './styles'

import { useState } from 'react'
import { useLocation } from 'react-router'

import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'
import { AddTasks } from '../../../components/addtasks/AddTasks'

import { PreviewList } from './PreviewList'
import { PreviewNav } from './PreviewNav'

export const PreviewCheckList = () => {
    const location = useLocation()

    const { checkListId, sortedTasks } = useAddTaskForm()
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(true)
    }

    return (
        <div style={{ backgroundColor: '#f0f3f3' }}>
            {checkListId && (
                <div key={checkListId.id}>
                    <InfoHeader>
                        <Card>
                            <Card.Header
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    margin: '0 auto',
                                }}
                            >
                                <TextField
                                    id="storybook-readonly"
                                    placeholder={checkListId.title}
                                    label=""
                                    readOnly
                                    style={{
                                        borderBottom: '1px solid #243746',
                                    }}
                                />
                                <Button onClick={handleOpen}>add task</Button>
                            </Card.Header>
                        </Card>
                    </InfoHeader>

                    <Wrapper>
                        {isOpen && <AddTasks />}
                        <PreviewList
                            key={checkListId.id}
                            tasks={checkListId}
                            sortedTasks={sortedTasks}
                        />{' '}
                    </Wrapper>
                </div>
            )}
            {location.pathname.includes('PreviewCheckList/') ? (
                <PreviewNav />
            ) : null}
        </div>
    )
}
