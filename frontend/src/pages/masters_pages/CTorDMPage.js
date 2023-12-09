import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { ListCTorDM, CreateCTorDM, EditCTorDM} from "../../sections/@dashboard/masters/crew_training_document_master";

export default function CTorDMPage(props){
    const {userData}=props;

    const [crewTDMId,setCrewTDMId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickCreate = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEdit = (idToEdit=null) =>{
        setCrewTDMId(idToEdit);
        handleOptionChange('canEdit',!optionState.canEdit);
    }

    return(
        <Container >
          <ListCTorDM handleClickCreate={handleClickCreate} handleClickEdit={handleClickEdit} userData={userData}/>
          {optionState.canCreate && <CreateCTorDM  handleClickCreate={handleClickCreate} optionState={optionState} userData={userData}/>}
          {optionState.canEdit && <EditCTorDM handleClickEdit={handleClickEdit} optionState={optionState} idToEdit={crewTDMId} userData={userData}/>}
        </Container>
    );
}