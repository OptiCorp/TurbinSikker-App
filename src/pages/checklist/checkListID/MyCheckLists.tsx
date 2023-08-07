import { Table } from '@equinor/eds-core-react'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { ApiContext } from '../../context/apiContextProvider'
import { CheckListUserIDRow } from './CheckListIDrow'
import { MyCheckListNav } from './MyCheckListNav'
import {
    BackgroundWrap,
    HeadCell,
    ListWrapperCheckMyList,
    Styledh3,
} from './styles'

export const MyCheckLists = () => {
    const { userIdCheckList } = useContext(ApiContext)
    const location = useLocation()
    const [activeRow, setActiveRow] = useState(false)
    return (
        <>
            <BackgroundWrap>
                <ListWrapperCheckMyList>
                    <Table>
                        <Table.Head sticky>
                            <Table.Row>
                                <HeadCell>
                                    <Styledh3>Name</Styledh3>
                                </HeadCell>
                                <HeadCell>
                                    <Styledh3>Status</Styledh3>
                                </HeadCell>
                                <HeadCell>
                                    <Styledh3>Last Update</Styledh3>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {userIdCheckList?.map((userIdCheckList) => (
                                <CheckListUserIDRow
                                    userIdCheckList={userIdCheckList}
                                    key={userIdCheckList.id}
                                    setActiveRow={setActiveRow}
                                    activeRow={activeRow}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </ListWrapperCheckMyList>
            </BackgroundWrap>
            {location.pathname.includes('MyCheckLists') ? (
                <MyCheckListNav activeRow={activeRow} />
            ) : null}
        </>
    )
}
