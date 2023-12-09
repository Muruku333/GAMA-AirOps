import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Aircraft Components
import { ListCrew, CreateCrew, EditCrew } from '../../sections/@dashboard/masters/crew';

export default function DutyStatusDetailPage(props){

    const {userData} = props;

    const [value, setValue] = useState("1");
    const [crewId,setCrewId]=useState(null);

    const handleTabChange = (tabChange) => {   // *****************
        setValue(tabChange);
      };

      const handleEditClick=(idToEdit)=>{
        setCrewId(idToEdit);
        setValue("3");
      }


    return(
        <Container>
        <TabContext value={value} sx={{padding:0}}>
          <TabPanel value="1" sx={{padding:0}}> 
            <ListCrew handleTabChange={handleTabChange} handleEditClick={handleEditClick} userData={userData}/>
          </TabPanel>
          <TabPanel value="2" sx={{padding:0}}>
            <CreateCrew handleTabChange={handleTabChange} userData={userData} />
          </TabPanel>
          <TabPanel value="3" sx={{padding:0}}>
            <EditCrew handleTabChange={handleTabChange} idToEdit={crewId} userData={userData}/>
          </TabPanel>
        </TabContext>
      </Container>
    );
}