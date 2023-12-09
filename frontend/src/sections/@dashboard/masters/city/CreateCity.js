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

export default function CreateCity(props) {

  const { optionState, handleClickCreate, userData } = props;
  const [cityData, setCityData] = useState({
    city_name: null,
    zone:null,
    country:null,
  });
  const [zones, setZones] = useState(['zone 1', 'zone 2']);
  const [countries, setCountries] = useState(['country 1', 'country 2']);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    setCityData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
      handleClickCreate();
  };

  const validate=()=>{
    let errors={};

    if(!Boolean(cityData.city_name))
      errors.city_name="City Name is required";
    if(!Boolean(cityData.zone))
      errors.zone="Zone is required";
    if(!Boolean(cityData.country))
      errors.country="Country is required";

    return errors;
  }

  const handleSubmit =(event)=> {
    // console.log('It worked');
    const errors=validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    console.log(cityData);
}

  return (
    <>
      <Helmet>
        <title>City Create | GAMA AirOps</title>
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
        <DialogTitle>{"Create a new city"}</DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={5}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={12} md={12}>
              <TextField
                  id="city_name"
                  size="small"
                  fullWidth
                  required
                  label="City Name"
                  value={cityData.city_name}
                  onChange={(event) => {
                    handleInputChange("city_name", event.target.value);
                  }}
                  error={Boolean(validationErrors.city_name)}
                  helperText={validationErrors.city_name}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <Autocomplete
                  fullWidth
                  size="small"
                  value={cityData.zone}
                  onChange={(event, newValue) => {
                    handleInputChange("zone", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="zone"
                  options={zones}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Zone"
                      error={Boolean(validationErrors.zone)}
                      helperText={validationErrors.zone}
                       />
                  )}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <Grid container columnSpacing={2} columns={{xs:4, sm:12, md:12}}>
                <Grid item xs={3.5} sm={10} md={10}>
                <Autocomplete
                  fullWidth
                  size="small"
                  value={cityData.country}
                  onChange={(event, newValue) => {
                    handleInputChange("country", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="country"
                  options={countries}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Country"
                      error={Boolean(validationErrors.country)}
                      helperText={validationErrors.country}
                       />
                  )}
                />
                </Grid>
                <Grid item xs={0.5} sm={2} md={2}>
                <Tooltip title="New Country">
                    <Button to={'/app/masters/country'} fullWidth variant="contained" color="info" component={RouterLink}>
                  <AddIcon/>
                </Button>
                </Tooltip>
                </Grid>
              </Grid>
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
