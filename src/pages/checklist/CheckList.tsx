import { Table } from "@equinor/eds-core-react";
import { useContext } from "react";
import { ApiContext } from "../context/apiContextProvider";
import { CheckListUserRow } from "./CheckListRowAll";
import { ListWrapperCheckL, StyledTableh3 } from "./styles";

export const CheckList = () => {
  const { allCheckList } = useContext(ApiContext);

  return (
    <>
      <ListWrapperCheckL>
        <Table style={{ marginTop: "30px" }}>
          <Table.Head>
            <Table.Row>
              <Table.Cell>
                <StyledTableh3>Name</StyledTableh3>
              </Table.Cell>
              <Table.Cell>
                <StyledTableh3>Send in by</StyledTableh3>
              </Table.Cell>
              <Table.Cell>
                <StyledTableh3>Date Issued</StyledTableh3>
              </Table.Cell>
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
    </>
  );
};
