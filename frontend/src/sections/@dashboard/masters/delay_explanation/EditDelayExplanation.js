import { useState, useEffect, forwardRef } from "react";
import { Link as RouterLink } from 'react-router-dom';
// @mui ------------------------------------------------------
import {
  Link,
  Typography,
  Stack,
  Button,
  Grid,
  TextField,
  Box,
  Breadcrumbs,
  styled,
  Autocomplete,
  Tooltip
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.success.darker,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDelayExplanation(props) {

  const { optionState, handleClickEdit, setRefresh, setStatus, idToEdit, loggedUser } = props;

  const [delayCategories, setDelayCategories] = useState([]);
  const [explanationData, setExplanationData] = useState({
    explanationName:'',
    delayCategoryId:'',
  })
  const [validationErrors, setValidationErrors] = useState({});

  useEffect( ()=>{
    const fetchDelayCategories = async()=>{
      try {
        await axios.get(`${API_URL}/api/delay_categories`).then((response)=>{
          // console.log(response.data);
          setDelayCategories(response.data.results);
        });
      } catch (error) {
        setDelayCategories([]);
      }
    }

    const fetchData = async() =>{
      try {
        await axios.get(`${API_URL}/api/delay_explanations/${idToEdit}`).then((response)=>{
          if(response.data.status){
            const {explanation_name, delay_category} = response.data.results[0];
            setExplanationData({
              explanationName: explanation_name,
              delayCategoryId: delay_category.category_id,
            });
          }
        }).catch((error)=>{
          setStatus({
            open:true,
            type:"error",
            message:error.response.data.message,
          });
        });
      } catch (error) {
        setStatus({
          open:true,
          type:'error',
          message:"Network connection error",
        });
      }
    }

    fetchData();
    fetchDelayCategories ();
    
  },[]);

  const handleInputChange = (field, value) => {
    setExplanationData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
      handleClickEdit();
  };

  const validate=()=>{
    let errors={};
      if(!Boolean(explanationData.explanationName))
        errors.explanationName = "Explanation Name is required";
      if(!Boolean(explanationData.delayCategoryId))
        errors.dealyCategoryId = "Delay category is required";
    return errors;
  }

  const handleSubmit = async (event)=> {
    // console.log('It worked');
    const errors=validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.put(`${API_URL}/api/delay_explanations/${idToEdit}`,{...explanationData,modifiedBy:loggedUser.user_id}).then((response)=>{
        // console.log(response);
        setStatus({
          open:true,
          type:'success',
          message:response.data.message
        });
        setRefresh((prev)=>prev+1);
      }).catch((error)=>{
        // console.log(error);
        setStatus({
          open:true,
          type:'error',
          message:error.response.data.message,
        });
      });
    } catch (error) {
      setStatus({
        open:true,
        type:'error',
        message:"Network connection error",
      });
    }
    handleClickEdit();
}

  return (
    <>
      <Helmet>
        <title>Delay Explanation Edit | GAMA AirOps</title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={optionState.canEdit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Delay Explanation"}</DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="delay_explanation_name"
                  size="small"
                  fullWidth
                  required
                  label="Explanation Name"
                  value={explanationData.explanationName}
                  onChange={(event) => {
                    handleInputChange("explanationName", event.target.value);
                  }}
                  error={Boolean(validationErrors.explanationName)}
                  helperText={validationErrors.explanationName}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <Autocomplete
                  fullWidth
                  size="small"
                  value={delayCategories.find((_cat)=> _cat.category_id === explanationData.delayCategoryId) || null}
                  onChange={(event, newValue) => {
                    if(newValue){
                      handleInputChange("delayCategoryId", newValue.category_id);
                    }else{
                      handleInputChange("delayCategoryId", null);
                    }
                  }}
                  id="delay_explanation_delay_category"
                  options={delayCategories}
                  getOptionLabel={(option)=>option.category_name}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Delay Category"
                      error={Boolean(validationErrors.dealyCategoryId)}
                      helperText={validationErrors.dealyCategoryId}
                       />
                       )}
                       />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton color="success" variant="contained" onClick={handleSubmit} >
            Save
          </SubmitButton>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
