import { Table, Typography } from "@equinor/eds-core-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { DefaultNavigation } from "../../../components/navigation/hooks/DefaultNavigation";
import useGlobal from "../../../context/globalContextProvider";
import apiService from "../../../services/api";
import { WorkflowResponse } from "../../../services/apiTypes";
import { ForReviewList } from "./forReviewList";
import { BackgroundWrapCompleted } from "./styles";

export const ForReviewChecklists = () => {
  const api = apiService();

  const location = useLocation();
  const state = location.state;
  const { accessToken, currentUser } = useGlobal();
  const [allWorkflows, setAllWorkFlows] = useState<WorkflowResponse[]>([]);
  const [workflows, setWorkFlows] = useState<WorkflowResponse[]>([]);

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
  }, [currentUser?.id]);

  useEffect(() => {
    if (!currentUser) return;
    (async (): Promise<void> => {
      try {
        const workFlowData = await api.getAllWorkflows();
        setAllWorkFlows(workFlowData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentUser?.id]);

  return (
    <>
      <BackgroundWrapCompleted>
        <Table>
          <Table.Head sticky>
            <Table.Row>
              <Table.Cell>
                <Typography variant="body_long_bold">Title</Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography variant="body_long_bold">Assigned</Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography variant="body_long_bold">Status</Typography>
              </Table.Cell>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <>
              {allWorkflows?.map((workflow) => (
                <ForReviewList WorkFlow={workflow} key={workflow.id} />
              ))}
            </>
          </Table.Body>
        </Table>
      </BackgroundWrapCompleted>

      <DefaultNavigation hideNavbar={state?.isFromCompletedList} />
    </>
  );
};
