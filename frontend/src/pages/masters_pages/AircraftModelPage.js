import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { CreateModel, EditModel, ListModel } from "../../sections/@dashboard/masters/aircraft_model";

export default function AircraftModelPage(props){

    const [customerId,setCustomerId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickNewModel = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEditModel = (idToEdit=null) =>{
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
        <Container>
            <ListModel handleClickNewModel={handleClickNewModel} handleClickEditModel={handleClickEditModel} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>
            {optionState.canCreate && <CreateModel  handleClickNewModel={handleClickNewModel} optionState={optionState} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>}
            {optionState.canEdit && <EditModel handleClickEditModel={handleClickEditModel} optionState={optionState} idToEdit={customerId} DB_URL={props.DB_URL} loggedInUserId={props.loggedInUserId}/>}
        </Container>
    );
}