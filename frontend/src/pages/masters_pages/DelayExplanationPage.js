import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Explanation Component
import {
  ListDelayExplanation,
  CreateDelayExplanation,
  EditDelayExplanation,
  DeleteDelayExplanation,
} from "../../sections/@dashboard/masters/delay_explanation";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DelayExplanationPage(props) {
  const { userData } = props;

  const [delayExpId, setDelayExpId] = useState(null);
  const [refresh, setRefresh]= useState(0);
  const [optionState, setOptionState] = useState({
    canCreate: false,
    canEdit: false,
    canView: false,
    canDelete: false,
  });
  const [status, setStatus] = useState({
    open: false,
    type: "error",
    message: "None",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus((prev) => ({
      open: false,
      type: prev.type,
      message: prev.message,
    }));
  };

  const handleOptionChange = (key, value) => {
    setOptionState((pre) => {
      return { ...pre, [key]: value };
    });
  };

  const handleClickCreate = () => {
    handleOptionChange("canCreate", !optionState.canCreate);
  };

  const handleClickEdit = (idToEdit = null) => {
    setDelayExpId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  const handleClickDelete = async (idToDelete = null) => {
    setDelayExpId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container>
      <ListDelayExplanation
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        refresh={refresh}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateDelayExplanation
        handleClickCreate={handleClickCreate}
        optionState={optionState}
        setRefresh={setRefresh}
        setStatus={setStatus}
        loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditDelayExplanation
        handleClickEdit={handleClickEdit}
        optionState={optionState}
        idToEdit={delayExpId}
        setRefresh={setRefresh}
        setStatus={setStatus}
        loggedUser={userData}
        />
      )}
      {optionState.canDelete && (
        <DeleteDelayExplanation
        handleClickDelete={handleClickDelete}
        optionState={optionState}
        setRefresh={setRefresh}
        idToDelete={delayExpId}
        setStatus={setStatus}
        loggedUser={userData}
        />
      )}
            <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={status.open}
        TransitionComponent={TransitionLeft}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={status.type}
          sx={{ width: "100%" }}
        >
          {status.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
