import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Aircraft Components
import { LisGroup, CreateGroup, EditGroup } from '../../sections/@dashboard/masters/group';

export default function GroupPage(props){

    const {userData} = props;

    const [value, setValue] = useState("1");
    const [groupId,setGroupId]=useState(null);

    const handleTabChange = (tabChange) => {   // *****************
        setValue(tabChange);
      };

      const handleEditClick=(idToEdit)=>{
        setGroupId(idToEdit);
        setValue("3");
      }


    return(
        <Container maxWidth='xl'>
        <TabContext value={value} sx={{padding:0}}>
          <TabPanel value="1" sx={{padding:0}}> 
            <LisGroup handleTabChange={handleTabChange} handleEditClick={handleEditClick} userData={userData}/>
          </TabPanel>
          <TabPanel value="2" sx={{padding:0}}>
            <CreateGroup handleTabChange={handleTabChange} userData={userData} />
          </TabPanel>
          <TabPanel value="3" sx={{padding:0}}>
            <EditGroup handleTabChange={handleTabChange} idToEdit={groupId} userData={userData}/>
          </TabPanel>
        </TabContext>
      </Container>
    );
}