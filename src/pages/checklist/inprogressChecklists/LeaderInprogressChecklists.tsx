import { Table, Typography } from "@equinor/eds-core-react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../helpers/dateFormattingHelpers";
import { Checklist } from "../../../services/apiTypes";
import { StyledTableRow } from "../myChecklists/styles";
import { UserChip } from "./UserChip";
import { ChipStatus } from "./chipStatus";
import { CellContent, CellStatus } from "./styles";

interface CheckListRowProps {
  workflow: Checklist;
}

export const LeaderInprogressChecklists: FunctionComponent<
  CheckListRowProps
> = ({ workflow }) => {
  const navigate = useNavigate();
  const clickHandler = (id: string | undefined) => {
    navigate(`/PreviewCheckList/${id}`);
  };

  const formattedCreatedDate = formatDate(workflow.createdDate || "");

  return (
    <>
      {workflow.workflows.map((workflow) => (
        <>
          {workflow.status === "Sent" && (
            <StyledTableRow onClick={() => clickHandler(workflow.checklist.id)}>
              <Table.Cell>
                <CellContent>
                  <Typography variant="body_long_bold">
                    {workflow.checklist.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    token={{
                      fontSize: "0.8rem",
                    }}
                    style={{ height: "1rem" }}
                  >
                    Created {formattedCreatedDate}
                  </Typography>
                </CellContent>
              </Table.Cell>
              <Table.Cell>
                <CellContent>
                  <UserChip workflow={workflow} />
                </CellContent>
              </Table.Cell>
              <Table.Cell>
                <CellStatus>
                  <ChipStatus workflow={workflow} />{" "}
                </CellStatus>
              </Table.Cell>
            </StyledTableRow>
          )}
        </>
      ))}
    </>
  );
};
