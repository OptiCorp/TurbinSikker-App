import { Table } from '@equinor/eds-core-react'
import { useContext } from 'react'
import { ApiContext } from '../../context/apiContextProvider'

import { CheckListUserIDRow } from './CheckListIDrow'
import {
    BackgroundWrap,
    HeadCell,
    ListWrapperCheckMyList,
    Styledh3,
} from './styles'

export const MyCheckLists = () => {
    const { userIdCheckList } = useContext(ApiContext)

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
                                    <Styledh3>Date</Styledh3>
                                </HeadCell>
                            </Table.Row>
                        </Table.Head>

                        <Table.Body>
                            {userIdCheckList?.map((userIdCheckList) => (
                                <CheckListUserIDRow
                                    userIdCheckList={userIdCheckList}
                                    key={userIdCheckList.id}
                                />
                            ))}
                        </Table.Body>
                    </Table>
                </ListWrapperCheckMyList>
            </BackgroundWrap>
        </>
    )
}
