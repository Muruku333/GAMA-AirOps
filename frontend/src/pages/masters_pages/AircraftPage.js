import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Aircraft Components
import {CreateAircraft, ListAircraft, EditAircraft, ViewAircraft} from '../../sections/@dashboard/masters/aircraft';

export default function AircraftPage(props){

    const {userData}=props;

    const [value, setValue] = useState("1");
    const [aircraftId,setAircraftId]=useState(null);

    const handleTabChange = (tabChange) => {   // *****************
        setValue(tabChange);
      };

      const handleEditClick=(idToEdit)=>{
       setAircraftId(idToEdit);
        setValue("3");
      }
    
      // const handleViewClick=(customerId)=>{
      //   setCustomerId(customerId);
      //   setValue("4");
      // }

    return(
        <Container maxWidth='xl'>
        <TabContext value={value} sx={{padding:0}}>
          <TabPanel value="1" sx={{padding:0}}> 
            <ListAircraft handleTabChange={handleTabChange} handleEditClick={handleEditClick} userData={userData}/>
          </TabPanel>
          <TabPanel value="2" sx={{padding:0}}>
            <CreateAircraft handleTabChange={handleTabChange} userData={userData}/>
          </TabPanel>
          <TabPanel value="3" sx={{padding:0}}>
            <EditAircraft handleTabChange={handleTabChange} idToEdit={aircraftId} userData={userData}/>
          </TabPanel>
          {/* <TabPanel value="4" sx={{padding:0}}>
            <ViewAircraft handleTabChange={handleTabChange} customerIdToView={customerId} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>
          </TabPanel> */}
        </TabContext>
      </Container>
    );
}