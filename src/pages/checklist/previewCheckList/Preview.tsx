import { Card, TextField } from '@equinor/eds-core-react'

import { InfoHeader, Wrapper } from './styles'

import { useLocation } from 'react-router'

import { PreviewList } from './PreviewList'
import { PreviewNav } from './PreviewNav'
import { usePreviewList } from './hooks/usePreviewList'

export const PreviewCheckList = () => {
    const location = useLocation()
    const { checkListId, sortedTasks } = usePreviewList()

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

                                <TextField
                                    id="storybook-readonly"
                                    placeholder="category"
                                    label=""
                                    readOnly
                                    style={{
                                        borderBottom: '1px solid #243746',
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
            {location.pathname.includes('PreviewCheckList/') ? (
                <PreviewNav />
            ) : null}
        </div>
    )
}
