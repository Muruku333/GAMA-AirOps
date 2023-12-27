import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Airport Components
import {CreateAirport, ListAirport, EditAirport, DeleteAirport } from '../../sections/@dashboard/masters/airport';

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AirportPage(props){

    const {userData} = props;

    const [value, setValue] = useState("1");
    const [airportId,setAirportId]=useState(null);
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

    const handleTabChange = (tabChange) => {   // *****************
        setValue(tabChange);
      };

      const handleClickEdit=(idToEdit)=>{
        setAirportId(idToEdit);
        setValue("3");
      };

      const handleClickDelete = (idToDelete = null) => {
        setAirportId(idToDelete);
        setCanDelete((prev) => !prev);
      };


    return(
        <Container maxWidth='xl'>
        <TabContext value={value} sx={{padding:0}}>
          <TabPanel value="1" sx={{padding:0}}> 
          <ListAirport
            handleTabChange={handleTabChange}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            refresh={refresh}
            setStatus={setStatus}
            loggedUser={userData}
          />
          </TabPanel>
          <TabPanel value="2" sx={{padding:0}}>
            <CreateAirport handleTabChange={handleTabChange} userData={userData} />
          </TabPanel>
          <TabPanel value="3" sx={{padding:0}}>
            <EditAirport handleTabChange={handleTabChange} idToEdit={airportId} userData={userData}/>
          </TabPanel>
        </TabContext>
        {canDelete && (
        <DeleteAirport
          handleClickDelete={handleClickDelete}
          canDelete={canDelete}
          idToDelete={airportId}
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