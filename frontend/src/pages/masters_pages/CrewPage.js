import { useState, forwardRef } from "react";
// @mui
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// Crew Components
import { ListCrew, CreateCrew, EditCrew, DeleteCrew } from '../../sections/@dashboard/masters/crew';

const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DutyStatusDetailPage(props){

    const {userData} = props;

    const [value, setValue] = useState("1");
    const [crewId,setCrewId]=useState(null);
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
        setCrewId(idToEdit);
        setValue("3");
      };

      const handleClickDelete = (idToDelete = null) => {
        setCrewId(idToDelete);
        setCanDelete((prev) => !prev);
      };

    return(
        <Container>
        <TabContext value={value} sx={{padding:0}}>
          <TabPanel value="1" sx={{padding:0}}> 
          <ListCrew
            handleTabChange={handleTabChange}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
            refresh={refresh}
            setStatus={setStatus}
            loggedUser={userData}
          />
          </TabPanel>
          <TabPanel value="2" sx={{padding:0}}>
          <CreateCrew
            handleTabChange={handleTabChange}
            setStatus={setStatus}
            loggedUser={userData}
          />
          </TabPanel>
          <TabPanel value="3" sx={{padding:0}}>
            <EditCrew handleTabChange={handleTabChange} idToEdit={crewId} userData={userData}/>
          </TabPanel>
        </TabContext>
        {canDelete && (
        <DeleteCrew
          handleClickDelete={handleClickDelete}
          canDelete={canDelete}
          idToDelete={crewId}
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