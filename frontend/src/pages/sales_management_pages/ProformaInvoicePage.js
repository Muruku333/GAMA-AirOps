import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { CreateProformaInvoice, EditProformaInvoice, ListProformaInvoice } from "../../sections/@dashboard/proforma_invoice";
import { Container } from "@mui/material";

export default function ProformaInvoicePage({loggedInUserId,DB_URL}) {

  const [value, setValue] = useState("1");
  const [customerId,setCustomerId]=useState(null);

  const handleTabChange = (tabChange) => {   // *****************
    setValue(tabChange);
  };

  const handleEditClick=(customerId)=>{
    setCustomerId(customerId);
    setValue("3");
  }

  return (
      <Container maxWidth='xl'>
      <TabContext value={value}>
        <TabPanel value="1" sx={{padding:0}}>
         <ListProformaInvoice handleTabChange={handleTabChange} handleEditClick={handleEditClick} DB_URL={DB_URL} />
        </TabPanel>
        <TabPanel value="2" sx={{padding:0}}>
        <CreateProformaInvoice handleTabChange={handleTabChange} DB_URL={DB_URL} />
        </TabPanel>
        <TabPanel value="3" sx={{padding:0}}>
        <EditProformaInvoice handleTabChange={handleTabChange} DB_URL={DB_URL} />
        </TabPanel>
      </TabContext>
      </Container>
  );
}
