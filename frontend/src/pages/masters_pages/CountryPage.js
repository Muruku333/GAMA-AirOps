import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Country Component
import {
  ListCountry,
  CreateCountry,
  EditCountry,
  DeleteCountry,
} from "../../sections/@dashboard/masters/country";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CountryPage(props) {
  const { userData } = props;

  const [countryId, setCountryId] = useState(null);
  const [refreshed, setRefreshed]= useState(0);
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
    setCountryId(idToEdit);
    handleOptionChange("canEdit", !optionState.canEdit);
  };

  const handleClickDelete = async (idToDelete=null)=>{
    setCountryId(idToDelete);
    handleOptionChange("canDelete", !optionState.canDelete);
  };

  return (
    <Container>
      <ListCountry
        handleClickCreate={handleClickCreate}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleClickDelete}
        refreshed={refreshed}
        setStatus={setStatus}
        loggedUser={userData}
      />
      {optionState.canCreate && (
        <CreateCountry
          handleClickCreate={handleClickCreate}
          optionState={optionState}
          setRefreshed={setRefreshed}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canEdit && (
        <EditCountry
          handleClickEdit={handleClickEdit}
          optionState={optionState}
          setRefreshed={setRefreshed}
          idToEdit={countryId}
          setStatus={setStatus}
          loggedUser={userData}
        />
      )}
      {optionState.canDelete && (
        <DeleteCountry
          handleClickDelete={handleClickDelete}
          optionState={optionState}
          setRefreshed={setRefreshed}
          idToDelete={countryId}
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
