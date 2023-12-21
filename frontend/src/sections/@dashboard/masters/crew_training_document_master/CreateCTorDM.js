import { useState, useEffect, forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Tooltip,
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

export default function CreateCTorDM(props) {

  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;

  const [types, setTypes]= useState(['Document','Training','Checks']);
  const [frequencyUnits, setFrequencyUnits] = useState(['Days', 'Months', 'Years']);
  const [renewalPeriods, setRenewalPeriods] = useState(['Date-To-Date', '30 Days', '60 Days', '90 Days']);
  const [CTDMData, setCDTMData]= useState({
    type:"",
    ctdmName:"",
    groupCode:"",
    warningDays:0,
    frequencyUnit:"",
    frequency:0,
    renewalPeriod:"",
  });
  const [validationErrors, setValidationErrors] = useState({});


  const handleInputChange = (field, value) => {
    setCDTMData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    handleClickCreate();
  };

  const validate = () => {

    let errors = {};
      if(!Boolean(CTDMData.ctdmName))
        errors.ctdmName="Name is required";
      if(!Boolean(CTDMData.type))
        errors.type="Type is required";
      if(!Boolean(CTDMData.renewalPeriod))
        errors.renewalPeriod="Renewal Period is required";
      if(isNaN(CTDMData.frequency))
        errors.frequency="Should be a number";
      if(isNaN(CTDMData.warningDays))
        errors.warningDays="Should be a number";
    return errors;
  };

  const handleSubmit = async (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.post(`${API_URL}/api/crew_training_document_master`,{...CTDMData,createdBy:loggedUser.user_id}).then((response)=>{
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
    handleClickCreate();
  };

  return (
    <>
      <Helmet>
        <title> Crew Training/Document Master Create | GAMA AirOps </title>
      </Helmet>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={optionState.canCreate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Create a new crew training/document master"}
        </DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={4} md={4}>
              <Autocomplete
                  fullWidth
                  size="small"
                  // value={CTDMData.type}
                  onChange={(event, newValue) => {
                    handleInputChange("type", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="CTDM_types"
                  options={types}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Type"
                      error={Boolean(validationErrors.type)}
                      helperText={validationErrors.type}
                       />
                       )}
                       />
              </Grid>
              <Grid item xs={4} sm={8} md={8}>
              <TextField
                  id="CTDM_name"
                  size="small"
                  fullWidth
                  required
                  label="Name"
                  // value={CTDMData.ctdmName}
                  onChange={(event) => {
                    handleInputChange("ctdmName", event.target.value);
                  }}
                  error={Boolean(validationErrors.ctdmName)}
                  helperText={validationErrors.ctdmName}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="CTDM_group_code"
                  size="small"
                  fullWidth
                  label="Group Code"
                  placeholder="Group Code"
                  // value={CTDMData.groupCode}
                  onChange={(event) => {
                    handleInputChange("groupCode", event.target.value);
                  }}
                  error={Boolean(validationErrors.groupCode)}
                  helperText={validationErrors.groupCode}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="CTDM_warning_days"
                  size="small"
                  fullWidth
                  label="Warning Days"
                  value={CTDMData.warningDays}
                  onChange={(event) => {
                    handleInputChange("warningDays", event.target.value);
                  }}
                  error={Boolean(validationErrors.warningDays)}
                  helperText={validationErrors.warningDays}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <Autocomplete
                  fullWidth
                  size="small"
                  // value={CTDMData.frequencyUnit}
                  onChange={(event, newValue) => {
                    handleInputChange("frequencyUnit", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="CTDM_frequency_unit"
                  options={frequencyUnits}
                  renderInput={(params) => (
                    <TextField 
                      {...params}
                      label="Frequency Unit"
                      error={Boolean(validationErrors.frequencyUnit)}
                      helperText={validationErrors.frequencyUnit}
                       />
                       )}
                       />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="CTDM_frequency"
                  size="small"
                  fullWidth
                  label="Frequency"
                  value={CTDMData.frequency}
                  onChange={(event) => {
                    handleInputChange("frequency", event.target.value);
                  }}
                  error={Boolean(validationErrors.frequency)}
                  helperText={validationErrors.frequency}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <Autocomplete
                  fullWidth
                  size="small"
                  // value={CTDMData.renewalPeriod}
                  onChange={(event, newValue) => {
                    handleInputChange("renewalPeriod", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="CTDM_renewal_period"
                  options={renewalPeriods}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Renewal Period"
                      error={Boolean(validationErrors.renewalPeriod)}
                      helperText={validationErrors.renewalPeriod}
                       />
                       )}
                       />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>

              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton
            color="success"
            variant="contained"
            onClick={handleSubmit}
          >
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
