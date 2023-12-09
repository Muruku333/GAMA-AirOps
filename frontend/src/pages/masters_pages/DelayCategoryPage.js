import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { ListDelayCategory, CreateDelayCategory, EditDelayCategory } from "../../sections/@dashboard/masters/delay_category";

export default function DelayCategoryPage(props){
    const {userData}=props;

    const [delayCatId,setDelayCatId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickCreate = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEdit = (idToEdit=null) =>{
        setDelayCatId(idToEdit);
        handleOptionChange('canEdit',!optionState.canEdit);
    }

    return(
        <Container >
          <ListDelayCategory handleClickCreate={handleClickCreate} handleClickEdit={handleClickEdit} userData={userData}/>
          {optionState.canCreate && <CreateDelayCategory  handleClickCreate={handleClickCreate} optionState={optionState} userData={userData}/>}
          {optionState.canEdit && <EditDelayCategory handleClickEdit={handleClickEdit} optionState={optionState} idToEdit={delayCatId} userData={userData}/>}
        </Container>
    );
}