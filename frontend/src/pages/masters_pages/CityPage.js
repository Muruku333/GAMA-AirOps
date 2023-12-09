import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { ListCity, CreateCity, EditCity } from "../../sections/@dashboard/masters/city";

export default function CityPage(props){
    const {userData}=props;

    const [cityId,setCityId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickCreate = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEdit = (idToEdit=null) =>{
        setCityId(idToEdit);
        handleOptionChange('canEdit',!optionState.canEdit);
    }

    return(
        <Container >
          <ListCity handleClickCreate={handleClickCreate} handleClickEdit={handleClickEdit} userData={userData}/>
          {optionState.canCreate && <CreateCity  handleClickCreate={handleClickCreate} optionState={optionState} userData={userData}/>}
          {optionState.canEdit && <EditCity handleClickEdit={handleClickEdit} optionState={optionState} idToEdit={cityId} userData={userData}/>}
        </Container>
    );
}