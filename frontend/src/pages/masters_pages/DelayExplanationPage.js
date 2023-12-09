import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { ListDelayExplanation, CreateDelayExplanation, EditDelayExplanation } from "../../sections/@dashboard/masters/delay_explanation";

export default function DelayExplanationPage(props){
    const {userData}=props;

    const [delayExpId,setDelayExpId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickCreate = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEdit = (idToEdit=null) =>{
        setDelayExpId(idToEdit);
        handleOptionChange('canEdit',!optionState.canEdit);
    }

    return(
        <Container >
          <ListDelayExplanation handleClickCreate={handleClickCreate} handleClickEdit={handleClickEdit} userData={userData}/>
          {optionState.canCreate && <CreateDelayExplanation  handleClickCreate={handleClickCreate} optionState={optionState} userData={userData}/>}
          {optionState.canEdit && <EditDelayExplanation handleClickEdit={handleClickEdit} optionState={optionState} idToEdit={delayExpId} userData={userData}/>}
        </Container>
    );
}