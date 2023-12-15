import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Country Component
import {
  CreateModel,
  EditModel,
  ListModel,
  DeletModel
} from "../../sections/@dashboard/masters/aircraft_model";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AircraftModelPage(props) {
  const { userData } = props;

  const [modelId, setModelId] = useState(null);

  const [optionState, setOptionState] = useState({
    canCreate: false,
    canEdit: false,
    canView: false,
    canDelete:false,
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

  const handleClickNewModel = () => {
    handleOptionChange("canCreate", !optionState.canCreate);
  };

  const handleClickEditModel = (idToEdit = null) => {
    setModelId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  const handleClickDelete = async (idToDelete=null)=>{
    setModelId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  }

  // const handleClickViewModel = (idToView) =>{
  //     setCustomerId(idToEdit);
  //     handleOptionChange('canView',true);
  // }

  // const handleClickDeletModel = (idToDelete) =>{

  // }

  return (
    <Container>
      <ListModel
        handleClickNewModel={handleClickNewModel}
        handleClickEditModel={handleClickEditModel}
        handleClickDelete={handleClickDelete}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateModel
          handleClickNewModel={handleClickNewModel}
          optionState={optionState}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditModel
          handleClickEditModel={handleClickEditModel}
          optionState={optionState}
          setStatus={setStatus}
          idToEdit={modelId}
          loggedUser={userData}
        />
      )}
      {
        optionState.canDelete && (
          <DeletModel
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setStatus={setStatus}
          idToDelete={modelId}
          loggedUser={userData}
          />
        )
      }

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
