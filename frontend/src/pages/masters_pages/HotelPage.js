import { useState } from "react";
// @mui
import {TabContext, TabPanel} from "@mui/lab";
import {Box, Container} from "@mui/material";
// Country Component
import { ListHotel, CreateHotel, EditHotel} from "../../sections/@dashboard/masters/hotel";

export default function DelayCategoryPage(props){
    const {userData}=props;

    const [hotelId,setHotelId]=useState(null);
    const [optionState, setOptionState]= useState({canCreate:false, canEdit: false, canView: false});

    const handleOptionChange =(key,value)=>{
        setOptionState((pre)=>{return {...pre,[key]:value}});
    }

    const handleClickCreate = () =>{
        handleOptionChange('canCreate', !optionState.canCreate);
    }

    const handleClickEdit = (idToEdit=null) =>{
        setHotelId(idToEdit);
        handleOptionChange('canEdit',!optionState.canEdit);
    }

    return(
        <Container >
          <ListHotel handleClickCreate={handleClickCreate} handleClickEdit={handleClickEdit} userData={userData}/>
          {optionState.canCreate && <CreateHotel  handleClickCreate={handleClickCreate} optionState={optionState} userData={userData}/>}
          {optionState.canEdit && <EditHotel handleClickEdit={handleClickEdit} optionState={optionState} idToEdit={hotelId} userData={userData}/>}
        </Container>
    );
}