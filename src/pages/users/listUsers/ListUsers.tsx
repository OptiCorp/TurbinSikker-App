import { useContext, useState } from "react";

import { Button, Icon, Table } from "@equinor/eds-core-react";
import { visibility, visibility_off } from "@equinor/eds-icons";
import { Link } from "react-router-dom";
import { ApiContext } from "../../context/apiContextProvider";
import { useHasPermission } from "../hooks/useHasPermission";
import {
  CellSize,
  ContainerForm,
  ListWrapper,
  StyledTable,
  StyledTableCell,
} from "./styles";
import { UserRow } from "./userRow";

export const ListUsers = () => {
  const { result: users } = useContext(ApiContext);
  const { hasPermission } = useHasPermission();

  const [showInactiveUsers, setShowInactiveUsers] = useState(false);

  const handleClick = () => {
    setShowInactiveUsers(!showInactiveUsers);
  };

  const filteredUsers = showInactiveUsers
    ? users
    : users.filter((user) => user.status === "Active");

  return (
    <ListWrapper>
      <ContainerForm>
        <StyledTable>
          <Table.Head sticky>
            <Table.Row>
              <StyledTableCell>
                <CellSize>
                  Name /<div>Email</div>
                </CellSize>
              </StyledTableCell>

              <StyledTableCell>
                <CellSize>Role</CellSize>
              </StyledTableCell>
              <StyledTableCell>
                <CellSize>
                  {!hasPermission ? (
                    <p>Status</p>
                  ) : (
                    <Button
                      style={{
                        margin: "0 auto",
                        width: "80px",
                        height: "25px",

                        fontSize: "0.7rem",
                      }}
                      onClick={handleClick}
                    >
                      Status
                      {showInactiveUsers ? (
                        <Icon
                          size={16}
                          data={visibility}
                          onClick={handleClick}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <Icon
                          size={16}
                          data={visibility_off}
                          onClick={handleClick}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </Button>
                  )}
                </CellSize>
              </StyledTableCell>
              <StyledTableCell> </StyledTableCell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {filteredUsers.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </Table.Body>
        </StyledTable>{" "}
      </ContainerForm>
      {hasPermission && (
        <Button
          style={{
            maxHeight: "30px",
            width: "30%",
            marginTop: "2rem",
          }}
          as={Link}
          to="/AddUser/"
        >
          AddUser
        </Button>
      )}
    </ListWrapper>
  );
};
