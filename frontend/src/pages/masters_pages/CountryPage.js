import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { ListCountry, CreateCountry, EditCountry } from "../../sections/@dashboard/masters/country";

export default function CountryPage(props){

    const [customerId,setCustomerId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickNewCountry = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEditCountry = (idToEdit=null) =>{
        setCustomerId(idToEdit);
        handleOptionChange('canEdit',!optionState.canEdit);
    }

    // const handleClickViewModel = (idToView) =>{
    //     setCustomerId(idToEdit);
    //     handleOptionChange('canView',true);
    // }

    // const handleClickDeletModel = (idToDelete) =>{
        
    // }

    return(
        <Container >
          <ListCountry handleClickNewCountry={handleClickNewCountry} handleClickEditCountry={handleClickEditCountry} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>
          {optionState.canCreate && <CreateCountry  handleClickNewCountry={handleClickNewCountry} optionState={optionState} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>}
          {optionState.canEdit && <EditCountry handleClickEditCountry={handleClickEditCountry} optionState={optionState} idToEdit={customerId} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>}
        </Container>
    );
}