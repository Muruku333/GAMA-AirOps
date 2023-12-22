import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Aircraft Components
import {
  CreateAircraft,
  ListAircraft,
  EditAircraft,
  ViewAircraft,
  DeleteAircraft,
} from "../../sections/@dashboard/masters/aircraft";

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AircraftPage(props) {
  const { userData } = props;

  const [value, setValue] = useState("1");
  const [aircraftId, setAircraftId] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [canDelete, setCanDelete] = useState(false);
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

  const handleTabChange = (tabChange) => {
    // *****************
    setValue(tabChange);
  };

  const handleClickEdit = (idToEdit = null) => {
    setAircraftId(idToEdit);
    setValue("3");
  };

  const handleClickDelete = (idToDelete = null) => {
    setAircraftId(idToDelete);
    setCanDelete((prev) => !prev);
  };

  // const handleViewClick=(customerId)=>{
  //   setCustomerId(customerId);
  //   setValue("4");
  // }

  return (
    <Container maxWidth="xl">
      <TabContext value={value} sx={{ padding: 0 }}>
        <TabPanel value="1" sx={{ padding: 0 }}>
          <ListAircraft
            handleTabChange={handleTabChange}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            refresh={refresh}
            setStatus={setStatus}
            loggedUser={userData}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <CreateAircraft
            handleTabChange={handleTabChange}
            setStatus={setStatus}
            loggedUser={userData}
          />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0 }}>
          <EditAircraft
            handleTabChange={handleTabChange}
            idToEdit={aircraftId}
            setStatus={setStatus}
            loggedUser={userData}
          />
        </TabPanel>
        {/* <TabPanel value="4" sx={{padding:0}}>
            <ViewAircraft handleTabChange={handleTabChange} customerIdToView={customerId} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>
          </TabPanel> */}
      </TabContext>
      {canDelete && (
        <DeleteAircraft
          handleClickDelete={handleClickDelete}
          canDelete={canDelete}
          idToDelete={aircraftId}
          setRefresh={setRefresh}
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
