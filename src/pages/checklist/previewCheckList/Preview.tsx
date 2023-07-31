import { Card, TextField } from '@equinor/eds-core-react'

import { InfoHeader, Wrapper } from './styles'

import { useContext } from 'react'

import { useAddTaskForm } from '@components/addtasks/useAddTaskForm'

import { ApiContext } from '../../context/apiContextProvider'
import { PreviewList } from './PreviewList'
import { PreviewNav } from './PreviewNav'

export const PreviewCheckList = () => {
    const { userIdCheckList } = useContext(ApiContext)
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
                                    placeholder={checkListId.title}
                                    label=""
                                    readOnly
                                    style={{
                                        borderBottom: '1px solid #243746',
                                        background: '#F7F7F7',
                                    }}
                                />
                            </Card.Header>
                        </Card>
                    </InfoHeader>

                    <Wrapper>
                        <PreviewList
                            key={checkListId.id}
                            tasks={checkListId}
                            sortedTasks={sortedTasks}
                        />
                    </Wrapper>
                </div>
            )}

            {userIdCheckList?.map((userIdCheckList) => (
                <PreviewNav key={userIdCheckList.id} />
            ))}
        </div>
    )
}
