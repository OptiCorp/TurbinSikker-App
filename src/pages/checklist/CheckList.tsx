import { Table } from '@equinor/eds-core-react'
import { useContext } from 'react'
import { ApiContext } from '../context/apiContextProvider'
import { CheckListUserRow } from './CheckListRowAll'

import { HeadCell } from './checkListID/styles'
import { ListWrapperCheckL, StyledTableh3, Wrap } from './styles'

export const CheckList = () => {
    const { allCheckList } = useContext(ApiContext)

    return (
        <Wrap>
            <ListWrapperCheckL>
                <Table>
                    <Table.Head sticky>
                        <Table.Row>
                            <HeadCell>
                                <StyledTableh3>Name</StyledTableh3>
                            </HeadCell>
                            <HeadCell>
                                <StyledTableh3>Send in by</StyledTableh3>
                            </HeadCell>
                            <HeadCell>
                                <StyledTableh3>Date Issued</StyledTableh3>
                            </HeadCell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {allCheckList?.map((allCheckList) => (
                            <CheckListUserRow
                                allCheckList={allCheckList}
                                key={allCheckList.id}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </ListWrapperCheckL>
        </Wrap>
    )
}
