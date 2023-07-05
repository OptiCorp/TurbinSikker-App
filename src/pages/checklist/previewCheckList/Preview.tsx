import { useEffect, useState } from 'react'

import { Card, TextField } from '@equinor/eds-core-react'
import { useParams } from 'react-router'

import { InfoHeader, Wrapper } from './styles'

import { useLocation } from 'react-router'
import { CheckListEntity } from 'src/models/CheckListEntity'
import { TaskEntity } from 'src/models/TaskEntity'
import { PreviewList } from './PreviewList'
import { PreviewNav } from './PreviewNav'

export const PreviewCheckList = () => {
    const [checkListId, setCheckListId] = useState<CheckListEntity | null>(null)
    const { id } = useParams()
    const [sortedTasks, setSortedTasks] = useState<TaskEntity[]>([])
    const location = useLocation()

    useEffect(() => {
        const fetchAllChechLists = async () => {
            const res = await fetch(
                `http://20.251.37.226:8080/api/GetChecklist?id=${id}`
            )
            if (!res.ok) throw new Error('Failed with HTTP code ' + res.status)
            const data = await res.json()
            const sorted = data.tasks.sort((a: any, b: any) => {
                // Compare the category names
                if (a.category.name < b.category.name) {
                    return -1
                } else if (a.category.name > b.category.name) {
                    return 1
                } else {
                    return 0
                }
            })

            setSortedTasks(sorted)
            setCheckListId(data)
        }

        console.log(checkListId)
        fetchAllChechLists()
    }, [])

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
