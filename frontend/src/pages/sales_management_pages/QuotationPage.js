import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Quotation Components
import { CreateQuotation, EditQuotation, ListQuotation, ViewQuotation} from "../../sections/@dashboard/quotation";

export default function QuotationPage({DB_URL, loggedInUserId}) {
  
  const [value, setValue] = useState("1");
  const [customerId,setCustomerId]=useState(null);

  const handleTabChange = (tabChange) => {   // *****************
    setValue(tabChange);
  };

  const handleEditClick=(customerId)=>{
    setCustomerId(customerId);
    setValue("3");
  }

  const handleViewClick=(customerId)=>{
    setCustomerId(customerId);
    setValue("4");
  }

  return (
    <Container maxWidth='xl'>
      <TabContext value={value} sx={{padding:0}}>
        <TabPanel value="1" sx={{padding:0}}>
          <ListQuotation handleTabChange={handleTabChange} handleViewClick={handleViewClick} handleEditClick={handleEditClick} DB_URL={DB_URL} loggedInUserId={loggedInUserId}/>
        </TabPanel>
        <TabPanel value="2" sx={{padding:0}}>
          <CreateQuotation handleTabChange={handleTabChange} DB_URL={DB_URL} loggedInUserId={loggedInUserId} />
        </TabPanel>
        <TabPanel value="3" sx={{padding:0}}>
          <EditQuotation handleTabChange={handleTabChange} customerIdToEdit={customerId} DB_URL={DB_URL} loggedInUserId={loggedInUserId}/>
        </TabPanel>
        <TabPanel value="4" sx={{padding:0}}>
          <ViewQuotation handleTabChange={handleTabChange} customerIdToView={customerId} DB_URL={DB_URL} loggedInUserId={loggedInUserId}/>
        </TabPanel>
      </TabContext>
    </Container>
  );
}
