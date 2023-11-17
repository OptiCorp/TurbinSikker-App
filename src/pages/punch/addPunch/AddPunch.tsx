import {
  Button,
  Dialog,
  Icon,
  Progress,
  TextField,
  Typography,
} from "@equinor/eds-core-react";
import { image, upload } from "@equinor/eds-icons";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { DefaultNavigation } from "../../../components/navigation/hooks/DefaultNavigation";
import { NavActionsComponent } from "../../../components/navigation/hooks/NavActionBtn";
import {
  ApiStatus,
  PunchItem,
  Status,
  Upload,
} from "../../../services/apiTypes";
import { useHasPermission } from "../../../services/useHasPermission";
import { COLORS } from "../../../style/GlobalStyles";
import { usePunch } from "../PunchHook";
import SeverityButton from "../severityButton/SeverityButton";
import { PunchUploadContainer } from "../styles";
import { useAddPunch } from "./AddPunchHook";
import { Modal, ModalContent } from "./ImageModal";
import {
  PunchAddContainer,
  PunchAddUploadContainer,
  PunchNoUploadContainer,
  PunchRejectMessageContainer,
  PunchUploadButtonContainer,
  PunchUploadButtonIconContainer,
  PunchUploadButtonLabel,
  PunchUploadFileContainer,
  PunchUploadFilesContainer,
  PunchUploadItemsContainer,
  SeverityButtonWrapper,
  SeverityContainer,
} from "./styles";

export function AddPunch({ punch }: { punch?: PunchItem }) {
  const navigate = useNavigate();
  const {
    onSubmit,
    positiveOpen,
    handleOpen,
    handleSubmit,
    clearAndClose,
    userInput,
    setUserInput,
    setFile,
    file,
    handleRejectOpen,
    handleRejectClose,
    rejectDialogOpen,
    setMessage,
    setStatus,
    fetchStatus,
  } = useAddPunch();
  const { hasPermission } = useHasPermission();
  const { uploads: addedUploads } = usePunch();
  const appLocation = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [rejectMessageDialog, setRejectMessageDialog] = useState(true);
  function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  console.log("fetch status: ", fetchStatus);

  const showModal = () => setIsOpen((prev) => !prev);

  const disabled =
    hasPermission || (!hasPermission && punch?.status === "Pending");
  const path = appLocation.pathname.split("/");
  const lastPathSegment = path[path.length - 1];
  return (
    <form id="punchForm" onSubmit={handleSubmit(onSubmit)}>
      <PunchAddContainer>
        {!(addedUploads?.length > 0) ? (
          <PunchAddUploadContainer>
            <PunchUploadButtonContainer disabled={disabled}>
              <PunchUploadButtonIconContainer disabled={disabled}>
                <Icon
                  data={upload}
                  color={hasPermission ? COLORS.lightGray : COLORS.black}
                  size={48}
                />
              </PunchUploadButtonIconContainer>

              <PunchUploadButtonLabel disabled={disabled} htmlFor="file">
                Upload
              </PunchUploadButtonLabel>

              <input
                id="file"
                type="file"
                disabled={disabled}
                accept="image/*"
                name="image"
                onChange={loadFile}
                style={{ display: "none" }}
              />
            </PunchUploadButtonContainer>

            {!file ? (
              <PunchNoUploadContainer>
                <Typography>No Uploads</Typography>
              </PunchNoUploadContainer>
            ) : (
              <PunchUploadFilesContainer>
                <Typography variant="h5">Upload Files</Typography>

                <PunchUploadFileContainer>
                  {file?.name && (
                    <PunchUploadItemsContainer>
                      <Icon color={COLORS.primary} data={image} />

                      <Typography variant="caption">{file?.name}</Typography>
                    </PunchUploadItemsContainer>
                  )}
                </PunchUploadFileContainer>
              </PunchUploadFilesContainer>
            )}
          </PunchAddUploadContainer>
        ) : (
          <>
            {addedUploads?.map((upload: Upload, idx) => {
              const image = `data:image/png;base64, ${upload.bytes}`;
              return (
                <PunchUploadContainer key={idx}>
                  <Modal
                    onClose={() => setIsOpen(false)}
                    isDismissable
                    onOpen={showModal}
                  >
                    <img src={image} alt="Punch image." />
                  </Modal>
                  {isOpen && (
                    <ModalContent onClose={() => setIsOpen(false)}>
                      <img src={image} alt="Punch image." />
                    </ModalContent>
                  )}
                </PunchUploadContainer>
              );
            })}
          </>
        )}
        {punch?.checklistTask && (
          <>
            <Typography style={{ marginTop: "5px" }} variant="h4">
              Report name
            </Typography>

            <Typography variant="body_short">
              {punch?.checklistTask.description}
            </Typography>
          </>
        )}

        <Typography style={{ marginTop: "10px" }} variant="h4">
          Description
        </Typography>
        {appLocation.pathname === "/AddPunch" ? (
          <TextField
            id=""
            value={!punch?.description ? userInput.description : undefined}
            multiline
            required
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserInput((prevUserInput) => ({
                ...prevUserInput,
                description: event.target.value,
              }));
            }}
          />
        ) : (
          <TextField
            id=""
            multiline
            disabled={
              (Status.REJECTED !== punch?.status &&
                lastPathSegment !== "addpunch") ||
              hasPermission
            }
            key={punch?.id ?? ""}
            required
            defaultValue={punch?.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserInput({
                ...userInput,
                description: event.target.value,
              });
            }}
          />
        )}

        <SeverityContainer>
          <Typography variant="h4">Severity</Typography>
          <SeverityButtonWrapper>
            <SeverityButton
              defaultValue={(punch?.severity as string) || "Minor"}
              userInput={userInput}
              setUserInput={setUserInput}
              punch={punch}
            />
          </SeverityButtonWrapper>
        </SeverityContainer>
      </PunchAddContainer>

      <Dialog open={rejectDialogOpen}>
        <Dialog.Header>
          <Dialog.Title>Reject Punch?</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography
            group="input"
            variant="text"
            token={{ textAlign: "left" }}
          >
            Request will be rejected and returned to sender.
          </Typography>
          <PunchRejectMessageContainer>
            <label htmlFor="comment">Add Message</label>
            <TextField
              id="comment"
              multiline
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
            />
          </PunchRejectMessageContainer>
        </Dialog.CustomContent>

        <Dialog.Actions>
          <Button variant="ghost" color="danger" onClick={handleRejectClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setStatus("Rejected");
              navigate(-1);
            }}
            type="submit"
            form="punchForm"
            color="danger"
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
      {punch?.status === Status.REJECTED && !hasPermission && (
        <Dialog open={rejectMessageDialog}>
          <Dialog.Header>
            <Dialog.Title>Punch Message</Dialog.Title>
          </Dialog.Header>
          <Dialog.CustomContent
            style={{ maxHeight: "50px", overflowY: "auto" }}
          >
            <Typography
              group="input"
              color="disabled"
              variant="text"
              token={{ textAlign: "left" }}
            >
              {punch.message}
            </Typography>
          </Dialog.CustomContent>
          <Dialog.Actions>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={() => setRejectMessageDialog(false)}>
              Update
            </Button>
          </Dialog.Actions>
        </Dialog>
      )}

      <Dialog open={positiveOpen}>
        <Dialog.Header>
          <Dialog.Title>
            {!hasPermission &&
              (lastPathSegment === "addpunch"
                ? "Send punch?"
                : "Update punch?")}
            {hasPermission && "Approve Punch?"}
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography
            group="input"
            variant="text"
            token={{ textAlign: "left" }}
          >
            {!hasPermission &&
              (lastPathSegment === "addpunch"
                ? "Send punch? Request will be sent for further approval and management"
                : "Update punch? Punch will be update and be sent for further approval")}
            {hasPermission && "Punch will be approved"}
          </Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Button variant="ghost" onClick={clearAndClose}>
            Cancel
          </Button>
          {!hasPermission && (
            <Button
              type="submit"
              form="punchForm"
              disabled={fetchStatus === ApiStatus.LOADING}
            >
              {lastPathSegment === "addpunch" &&
                fetchStatus === ApiStatus.SUCCESS &&
                "Send Punch"}
              {lastPathSegment !== "addpunch" &&
                fetchStatus === ApiStatus.SUCCESS &&
                "Update Punch"}
              {fetchStatus === ApiStatus.LOADING && (
                <Progress.Dots color="neutral" />
              )}
            </Button>
          )}
          {hasPermission && (
            <Button
              onClick={() => {
                setStatus("Approved");
                navigate(-1);
              }}
              type="submit"
              form="punchForm"
            >
              Approve
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>

      {lastPathSegment !== "addpunch" && punch?.status !== Status.REJECTED ? (
        <DefaultNavigation hideNavbar={false} />
      ) : !hasPermission ? (
        <NavActionsComponent
          ButtonMessage="Cancel"
          SecondButtonMessage={
            lastPathSegment === "addpunch" ? "Submit punch" : "Update punch"
          }
          secondButtonColor="primary"
          buttonVariant="outlined"
          secondOnClick={handleOpen}
          onClick={() => {
            navigate(`/Punches`);
          }}
          primaryType="button"
          type="button"
          isShown={true}
        />
      ) : (
        <DefaultNavigation hideNavbar={false} />
      )}

      {punch?.status === Status.PENDING && hasPermission && (
        <NavActionsComponent
          ButtonMessage="Reject"
          SecondButtonMessage={"Approve"}
          secondButtonColor="primary"
          buttonVariant="outlined"
          buttonColor="danger"
          secondOnClick={handleOpen}
          onClick={handleRejectOpen}
          type="button"
          primaryType="button"
          isShown={true}
        />
      )}
    </form>
  );
}
