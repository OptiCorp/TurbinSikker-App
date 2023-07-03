import { useContext } from 'react'
import { Table } from '@equinor/eds-core-react'
import { ApiContext } from '../../context/apiContextProvider'

import { ListWrapperCheckMyList, StyledTableh3 } from '../styles'
import { CheckListUserIDRow } from './CheckListIDrow'

export const MyCheckLists = () => {
    const { userIdCheckList } = useContext(ApiContext)

    return (
        <>
            <ListWrapperCheckMyList>
                <Table style={{ marginTop: '30px' }}>
                    <Table.Head>
                        <Table.Row>
                            <Table.Cell>
                                <StyledTableh3>Name</StyledTableh3>
                            </Table.Cell>
                            <Table.Cell>
                                <StyledTableh3>Category</StyledTableh3>
                            </Table.Cell>
                            <Table.Cell>
                                <StyledTableh3>Date</StyledTableh3>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Head>

                    <Table.Body>
                        {userIdCheckList?.map((userIdCheckList) => (
                            <CheckListUserIDRow
                                userIdCheckList={userIdCheckList}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </ListWrapperCheckMyList>
        </>
    )
}
