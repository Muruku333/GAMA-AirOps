import { useState, useEffect, forwardRef, Fragment } from "react";
import { Link as RouterLink } from 'react-router-dom';
// @mui ------------------------------------------------------
import {
  Link,
  Typography,
  Stack,
  Button,
  Box,
  Breadcrumbs,
  Container,
  Card,
  Grid,
  TextField,
  Autocomplete,
  Switch,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  styled,
  Tooltip,
  Divider,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from '@mui/icons-material/Add';
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enIN from "date-fns/locale/en-IN";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SubmitButton = styled(Button)(({theme})=>({
  backgroundColor:theme.palette.success.dark,
  color:theme.palette.common.white,
  "&:hover":{
    backgroundColor:theme.palette.success.darker,
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateAircraft(props) {

  const { handleTabChange, setStatus, loggedUser } = props;

  const [operators, setOperators] = useState([]);
  const [models, setModels] = useState([]);
  const [timeFormats, setTimeFormats] = useState(["Local Time", "UTC"]);
  const [units, setUnits] = useState(['Kilo Grams', 'Pounds'])
  const [aircraftData, setAircraftData] = useState({
    operatorId: "OP-0001",
    regNo: "",
    modelId: null,
    minCabinCrew: 0,
    minFlightCrew: 0,
    noOfCaptain: 0,
    noOfFo: 0,
    noOfFe: 0,
    cClsCapacity: 0,
    yClsCapacity: 0,
    seatingCapacity: 0,
    timeFormat: null,
    // local_time: 0,
    // utc_time: 0,
    blockOpeningHrs: "0:00",
    timeInAirOpeningHrs: "0:00",
    notInService: false,
    notInServiceFrom:null,
    freightCapacity: 0.00,
    unit: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert]= useState(false);

  useEffect( ()=>{
    const fetchModels= async()=>{
      try {
        await axios.get(`${API_URL}/api/aircraft_models`).then((response)=>{
          // console.log(response.data);
          setModels(response.data.results);
        });
      } catch (error) {
        setModels([]);
      }
    }
    const fetchOperators = async()=>{
      try {
        await axios.get(`${API_URL}/api/operators`).then((response)=>{
          // console.log(response.data);
          setOperators(response.data.results);
        });
      } catch (error) {
        setOperators([]);
      }
    }
    fetchOperators();
    fetchModels();
  },[]);

  const handleClickAlert=()=>{
    setOpenAlert(!openAlert);
  }

  const handleInputChange = (field, value) => {
    const updatedAircraftData = { ...aircraftData };
    updatedAircraftData[field] = value;
    setAircraftData(updatedAircraftData);
    setValidationErrors({});
  };

  const validateAircraftData=()=>{
    let errors={};

    if(!Boolean(aircraftData.operatorId))
      errors.operatorId="Operator is required.";
    if(!Boolean(aircraftData.regNo))
      errors.regNo="Reg. No is required.";
    if (!Boolean(aircraftData.modelId))
      errors.modelId="Model is required.";
    if (!Boolean(aircraftData.minFlightCrew))
      errors.minFlightCrew="Min. Flight Crew is required.";
    if (!Boolean(aircraftData.timeFormat))
      errors.timeFormat="Time Formate is required.";

    return errors;
  }

  const handleSubmitAircraft = async (event) => {
    // console.log('It worked');
    const errors=validateAircraftData();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    // console.log(aircraftData);
    try {
      await axios.post(`${API_URL}/api/aircrafts`,{...aircraftData,createdBy:loggedUser.user_id}).then((response)=>{
        // console.log(response);
        setStatus({
          open:true,
          type:'success',
          message:response.data.message
        });
        // setRefresh((prev)=>prev+1);
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
    handleTabChange("1");
  };

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/app/dashboard"
    >
      Dashboard
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/app/masters"
    >
      Masters
    </Link>,
    <Typography key="3" color="text.disabled">
      Aircraft
    </Typography>,
    <Typography key="4" color="text.disabled">
      New Aircraft
    </Typography>,
  ];

  return (
    <>
      <Helmet>
        <title>Aircraft Create | GAMA AirOps </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Create&nbsp;a&nbsp;new&nbsp;aircraft
            </Typography>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{
                color: "text.primary",
                display: { xs: "none", sm: "block" },
              }}
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<ArrowBackIcon fontSize="large" />}
            onClick={() => {
              handleTabChange("1");
            }}
          >
            Back&nbsp;to&nbsp;list
          </Button>
        </Stack>

        <Card sx={{ overflow: "visible" }}>
          <Box
            p={3}
            sx={{ flexGrow: 1 }}
          >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={5}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={6} md={6}>
                <Autocomplete
                  disabled
                  value={operators.find((_op)=>_op.operator_id === aircraftData.operatorId)||null}
                  onChange={(event, newValue) => {
                    if(newValue){
                      handleInputChange("operatorId", newValue.operator_id);
                    }else{
                      handleInputChange("operatorId", null);
                    }
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="aircraft_operator"
                  options={operators}
                  getOptionLabel={(option)=>option.operator_name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Operator"
                      variant="filled"
                      error={Boolean(validationErrors.operatorId)}
                      helperText={validationErrors.operatorId}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={false} sm={6} md={6}></Grid>
              <Grid item xs={4} sm={6} md={6}>
                <TextField
                  id="aircraft_reg_no"
                  size="small"
                  fullWidth
                  required
                  label="Reg. No:"
                  // value={aircraftData.regNo}
                  onChange={(event) => {
                    handleInputChange("regNo", event.target.value);
                  }}
                  error={Boolean(validationErrors.regNo)}
                  helperText={validationErrors.regNo}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
                <Grid container columnSpacing={2} columns={{xs:4, sm:6, md:6}}>
                    <Grid item xs={3.5} sm={5} md={5}>
                    <Autocomplete
                  fullWidth
                  size="small"
                  getOptionLabel={(option)=> option.model_name}
                  // value={models.find((_model)=>_model.model_id===aircraftData.modelId)|| null}
                  onChange={(event, newValue) => {
                    if(newValue){
                      handleInputChange("modelId", newValue.model_id);
                    }else{
                      handleInputChange("modelId", null);
                    }
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="aircraft_model"
                  options={models}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Model"
                      error={Boolean(validationErrors.modelId)}
                      helperText={validationErrors.modelId}
                       />
                  )}
                />
                    </Grid>
                    <Grid item xs={0.5} sm={1} md={1}>
                      <Tooltip title="New Model">
                    <Button variant="contained" color="info" component={RouterLink} to={'/app/masters/aircraft_model'}>
                  <AddIcon/>
                </Button>
                </Tooltip>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
                <TextField
                  id="aircraft_min_cabin_crew"
                  size="small"
                  fullWidth
                  label="Min. Cabin Crew"
                  value={aircraftData.minCabinCrew}
                  onChange={(event) => {
                    handleInputChange("minCabinCrew", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
                <TextField
                  id="aircraft_min_flight_crew"
                  required
                  size="small"
                  fullWidth
                  label="Min. Flight Crew"
                  value={aircraftData.minFlightCrew}
                  onChange={(event) => {
                    handleInputChange("minFlightCrew", event.target.value);
                  }}
                  error={Boolean(validationErrors.minFlightCrew)}
                  helperText={validationErrors.minFlightCrew}
                />
              </Grid>
            </Grid>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={4}
              alignItems="center"
              justify="center"
              mt={3}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_no_of_captains"
                  size="small"
                  fullWidth
                  label="No. of Captain(s)"
                  value={aircraftData.noOfCaptain}
                  onChange={(event) => {
                    handleInputChange("noOfCaptain", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_no_of_fos"
                  size="small"
                  fullWidth
                  label="No. of FO(s)"
                  value={aircraftData.noOfFo}
                  onChange={(event) => {
                    handleInputChange("noOfFo", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_no_of_fes"
                  size="small"
                  fullWidth
                  label="No. of FE(s)"
                  value={aircraftData.noOfFe}
                  onChange={(event) => {
                    handleInputChange("noOfFe", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_c_cls_capacity"
                  size="small"
                  fullWidth
                  label="cCls Capacity"
                  value={aircraftData.cClsCapacity}
                  onChange={(event) => {
                    handleInputChange("cClsCapacity", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_y_cls_capacity"
                  size="small"
                  fullWidth
                  label="yCls Capacity"
                  value={aircraftData.yClsCapacity}
                  onChange={(event) => {
                    handleInputChange("yClsCapacity", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_seating_capacity"
                  size="small"
                  fullWidth
                  label="Seating Capacity"
                  value={aircraftData.seatingCapacity}
                  onChange={(event) => {
                    handleInputChange("seatingCapacity", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <Autocomplete
                  size="small"
                  value={aircraftData.timeFormat}
                  onChange={(event, newValue) => {
                    handleInputChange("timeFormat", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="aircraft_time_format"
                  options={timeFormats}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Time Format"
                      error={Boolean(validationErrors.timeFormat)}
                      helperText={validationErrors.timeFormat}
                      />
                  )}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_block_opening_hrs"
                  size="small"
                  fullWidth
                  label="Block Opening Hrs"
                  value={aircraftData.blockOpeningHrs}
                  onChange={(event) => {
                    handleInputChange("blockOpeningHrs", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_time_in_air_opening_hrs"
                  size="small"
                  fullWidth
                  label="Time In Air Opening Hrs"
                  value={aircraftData.timeInAirOpeningHrs}
                  onChange={(event) => {
                    handleInputChange(
                      "timeInAirOpeningHrs",
                      event.target.value
                    );
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                {/* <Switch
                    checked={aircraftData.not_in_service}
                    onChange={() => {
                      handleInputChange(
                        "not_in_service",
                        !aircraftData.not_in_service
                      );
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  /> */}
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">
                    Not&nbsp;In&nbsp;Service
                  </FormLabel>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="top"
                      control={
                        <>
                          <Switch
                          disabled
                            color="primary"
                            checked={aircraftData.notInService}
                            onChange={() => {
                              handleInputChange(
                                "notInService",
                                !aircraftData.notInService
                              );
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                          <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            adapterLocale={enIN}
                          >
                            <DemoContainer components={["DatePicker"]}>
                              <DemoItem>
                                <DatePicker
                                  disabled={!aircraftData.notInService}
                                  value={aircraftData.notInService ? aircraftData.notInServiceFrom : null}
                                  slotProps={{
                                    textField: {
                                      fullWidth:true,
                                      disabled:!aircraftData.notInService,
                                      size: "small",
                                      placeholder: "From",
                                    },
                                  }}
                                  onChange={(newValue)=>{
                                    handleInputChange('notInServiceFrom', newValue);
                                  }}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        </>
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
              <Typography
                              variant="body2"
                              color={"text.secondary"}
                              gutterBottom
                            >
                              &nbsp;
                            </Typography>
                <Box display={"flex"} justifyContent={"center"}>
              <TextField
                  sx={{mr:1}}
                  id="aircraft_freight_capacity"
                  size="small"
                  fullWidth
                  label="Freight Capacity"
                  value={aircraftData.freightCapacity}
                  onChange={(event) => {
                    handleInputChange(
                      "freightCapacity",
                      event.target.value
                    );
                  }}
                />
                <Autocomplete
                  size="small"
                  sx={{width:200}}
                  value={aircraftData.unit}
                  onChange={(event, newValue) => {
                    handleInputChange("unit", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="aircraft_unit"
                  options={units}
                  renderInput={(params) => (
                    <TextField {...params} label="Unit" />
                  )}
                />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
            <Box flexGrow={1} p={2}>
              <Grid container columnSpacing={3}>
                <Grid item xs={6} md={8}></Grid>
                <Grid item xs={3} md={2}>
                  <SubmitButton
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSubmitAircraft}
                  >
                    Save
                  </SubmitButton>
                </Grid>
                <Grid item xs={3} md={2}>
                  <Fragment>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      //  onClick={handleClickAlert}
                      onClick={() => {
                        handleTabChange("1");
                      }}
                    >
                      Close
                    </Button>
                    <Dialog
                      open={openAlert}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClickAlert}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Are you sure?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Created data and Changes you where made can't be
                          save..!
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => {
                            handleTabChange("1");
                            handleClickAlert();
                          }}
                        >
                          Ok
                        </Button>
                        <Button variant="outlined" onClick={handleClickAlert}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                  </Fragment>
                </Grid>
              </Grid>
            </Box>
        </Card>
      </Container>
    </>
  );
}
