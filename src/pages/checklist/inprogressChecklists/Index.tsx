import { Table, Typography } from "@equinor/eds-core-react";
import { DefaultNavigation } from "../../../components/navigation/hooks/DefaultNavigation";

import { useEffect, useState } from "react";
import useGlobal from "../../../context/globalContextProvider";
import apiService from "../../../services/api";
import { Checklist, WorkflowResponse } from "../../../services/apiTypes";
import { useRoles } from "../../../services/useRoles";

import { InspectorOutgoingCheckLists } from "./inspectorOutgoingChecklists";
import { LeaderInprogressChecklists } from "./LeaderInprogressChecklists";
import { Wrap } from "./styles";

export const ChecklistComponent = () => {
  const { currentUser, refreshList } = useGlobal();

  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [workflows, setWorkFlows] = useState<WorkflowResponse[]>([]);

  const api = apiService();

  const { isInspector } = useRoles();

  useEffect(() => {
    if (!currentUser?.id) return;
    (async (): Promise<void> => {
      try {
        const checklistData = await api.getAllChecklistsByUserId(
          currentUser.id,
        );

        setChecklists(checklistData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser?.id, refreshList]);

  useEffect(() => {
    if (!currentUser) return;
    (async (): Promise<void> => {
      try {
        const workFlowData = await api.getAllWorkflowsByUserId(currentUser.id);

        setWorkFlows(workFlowData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser?.id, refreshList]);

  return (
    <>
      <Wrap>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell>
                <Typography variant="body_long_bold">Title </Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography variant="body_long_bold">
                  {isInspector ? <>Assigned by</> : <>Assigned</>}
                </Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography variant="body_long_bold">Status</Typography>
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <>
              {isInspector ? (
                <>
                  {workflows?.map((workFlow) => (
                    <InspectorOutgoingCheckLists
                      WorkFlow={workFlow}
                      key={workFlow.id}
                    />
                  ))}
                </>
              ) : (
                <>
                  {checklists?.map((checklist) => (
                    <LeaderInprogressChecklists
                      workflow={checklist}
                      key={checklist.id}
                    />
                  ))}
                </>
              )}
            </>
          </Table.Body>
        </Table>
      </Wrap>
      <DefaultNavigation hideNavbar={false} />
    </>
  );
};
