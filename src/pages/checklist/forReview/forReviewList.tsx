import { Table, Typography } from "@equinor/eds-core-react";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { UserChip } from "../inprogressChecklists/UserChip";
import { ChipStatus } from "../inprogressChecklists/chipStatus";

import useGlobal from "../../../context/globalContextProvider";
import { WorkflowResponse } from "../../../services/apiTypes";
import { CellStatus } from "../inprogressChecklists/styles";
import { CellContentCompleted, StyledTableRowCompleted } from "./styles";

interface CompletedRowProps {
  WorkFlow: WorkflowResponse;
}

export const ForReviewList: FunctionComponent<CompletedRowProps> = ({
  WorkFlow,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useGlobal();
  const clickHandler = (id: string) => {
    navigate(`/FillOutChecklist/${id}`, {
      state: { isFromCompletedList: true },
    });
  };
  if (WorkFlow?.creator.id !== currentUser?.id) {
    return null;
  }
  if (WorkFlow.status !== "Committed") return null;

  return (
    <>
      <StyledTableRowCompleted onClick={() => clickHandler(WorkFlow.id)}>
        <Table.Cell>
          <CellContentCompleted>
            <Typography variant="body_long_bold">
              {WorkFlow.checklist.title}
            </Typography>
          </CellContentCompleted>
        </Table.Cell>
        <Table.Cell>
          <CellContentCompleted>
            <UserChip workflow={WorkFlow} />
          </CellContentCompleted>
        </Table.Cell>

        <Table.Cell>
          <CellStatus>
            <ChipStatus workflow={WorkFlow} />
          </CellStatus>
        </Table.Cell>
      </StyledTableRowCompleted>
    </>
  );
};
