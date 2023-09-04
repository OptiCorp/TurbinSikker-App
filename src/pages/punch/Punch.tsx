import { Icon } from "@equinor/eds-core-react";
import { error_filled, info_circle, warning_filled } from "@equinor/eds-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../Helpers/index";
import { CheckListEntity } from "../context/models/CheckListEntity";
import {
  PunchButton,
  PunchDateContainer,
  PunchDescriptionContainer,
  PunchHeader,
  PunchUploadContainer,
  PunchWrapper,
  SeverityIconContainer,
} from "./styles";
import { PunchEntity, PunchSeverity } from "./types";

function Punch() {
  const navigate = useNavigate();
  const [punchData, setPunchData] = useState<PunchEntity>();
  const [currentChecklistData, setCurrentChecklistData] =
    useState<CheckListEntity>();
  const createdDate = punchData && formatDate(punchData.createdDate);
  const updatedDate =
    punchData?.updatedDate && formatDate(punchData.updatedDate);
  console.log("update", updatedDate);
  const img = false; //temporary, remove when we have an image (upload)

  const punchSeverity: PunchSeverity[] = [
    {
      severity: "Minor",
      color: "#fbca36",
      icon: info_circle,
    },
    {
      severity: "Major",
      color: "#ed8936",
      icon: warning_filled,
    },
    {
      severity: "Critical",
      color: "#eb0000",
      icon: error_filled,
    },
  ];
  useEffect(() => {
    getPunch();
  }, []);
  useEffect(() => {
    getChecklist();
  }, [punchData]);

  async function getPunch() {
    const response = await fetch(
      "https://localhost:7290/api/getPunch?id=708d8442-415f-4db0-8693-ec712d591cda"
    );

    const data = await response.json();
    setPunchData(data);
  }

  async function getChecklist() {
    if (punchData) {
      try {
        const response = await fetch(
          `https://localhost:7290/api/getChecklist?id=${punchData?.checklistWorkflowId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setCurrentChecklistData(data);
      } catch (err) {
        console.error((err as Error).message);
      }
    }
  }

  function clickHandler(id: string) {
    navigate(`/EditPunch/${id}`);
  }

  return (
    <PunchWrapper>
      <PunchHeader>
        <SeverityIconContainer>
          {punchSeverity.map((severityItem, idx) => {
            if (punchData?.severity === severityItem.severity) {
              return (
                <Icon
                  key={idx}
                  data={severityItem.icon}
                  style={{ color: severityItem.color }}
                />
              );
            }
          })}

          <h4>Ticket-{punchData?.id.split("-")[0]}</h4>
        </SeverityIconContainer>
        <PunchDateContainer>
          <p>{createdDate}</p>
          {createdDate == updatedDate && (
            <p style={{ fontSize: "10px" }}>
              <span style={{ fontWeight: "bold" }}>modified: </span>
              {updatedDate}
            </p>
          )}
        </PunchDateContainer>
      </PunchHeader>
      <PunchUploadContainer>
        {!img ? <span>No Uploads</span> : <img src={img} alt="Punch image" />}
        {/*//TODO Change img src w actual img */}
      </PunchUploadContainer>
      <PunchDescriptionContainer>
        <h4>Report name</h4>
        {!currentChecklistData ? (
          <p>loading ...</p>
        ) : (
          <div style={{ display: "flex", gap: 4 }}>
            <p>{currentChecklistData?.tasks[0].category.name}</p>
            <p>{currentChecklistData?.tasks[0].category.id.split("-")[0]}</p>
          </div>
        )}
        <h4>Description</h4>
        <p>{punchData?.punchDescription}</p>
      </PunchDescriptionContainer>
      {punchData && (
        <PunchButton onClick={() => clickHandler(punchData.id)}>
          Edit Punch
        </PunchButton>
      )}
    </PunchWrapper>
  );
}

export default Punch;
