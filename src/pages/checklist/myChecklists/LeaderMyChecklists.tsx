import { FunctionComponent } from "react";

import { Chip, Icon, Table, Typography } from "@equinor/eds-core-react";
import { assignment_user } from "@equinor/eds-icons";
import { useNavigate } from "react-router";

import { Checklist } from "../../../services/apiTypes";
import { COLORS } from "../../../style/GlobalStyles";
import { CellContentMyList, StyledChip, StyledTableRow } from "./styles";

interface CheckListRowProps {
  checklist: Checklist;
  activeRow: boolean;
  setActiveRow: (open: boolean) => void;
}

export const LeaderMyChecklist: FunctionComponent<CheckListRowProps> = ({
  checklist,
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "No updates";
    }
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB");
  };

  const navigate = useNavigate();
  const formattedCreatedDate = formatDate(checklist.createdDate || "");

  const clickHandler = (id: string) => {
    navigate(`/PreviewCheckList/${id}`);
  };

  const count = () => {
    const length = checklist.workflows.length;
    if (checklist.workflows.length > 1) {
      return `${length} Inspectors`;
    } else if (checklist.workflows.length === 1) {
      return `${length} Inspector`;
    } else {
      return "none";
    }
  };

  return (
    <>
      {checklist?.id && (
        <StyledTableRow onClick={() => clickHandler(checklist.id || "")}>
          <Table.Cell>
            <CellContentMyList>
              <Typography variant="body_long_bold">
                {checklist.title}
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
            </CellContentMyList>
          </Table.Cell>
          <Table.Cell>
            <CellContentMyList>
              <StyledChip>
                <Icon
                  data={assignment_user}
                  color={COLORS.secondary}
                  style={{ height: "15px" }}
                />
                <Typography
                  variant="caption"
                  token={{
                    fontSize: "0.8rem",
                  }}
                >
                  {count()}
                </Typography>
              </StyledChip>
            </CellContentMyList>
          </Table.Cell>

          <Table.Cell>
            {" "}
            <Chip> {checklist.status} </Chip>{" "}
          </Table.Cell>
        </StyledTableRow>
      )}
    </>
  );
};
