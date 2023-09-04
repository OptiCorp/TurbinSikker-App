import { IconData } from "@equinor/eds-icons";

export type PunchEntity = {
  id: string;
  active: number;
  checklistWorkflowId: string;
  createdBy: string;
  createdDate: string;
  punchDescription: string;
  severity: string;
  status: string;
  updatedDate: string | null;
};

export type PunchSeverity = {
  severity: string;
  color: string;
  icon: IconData;
};
