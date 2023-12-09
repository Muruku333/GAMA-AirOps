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

  const { handleTabChange, DB_URL, loggedInUserId } = props;

  const [operators, setOperators] = useState(["Sparzana Aviation Pvt Ltd"]);
  const [models, setModels] = useState(["Hawker 800XP", "Hawker 900XP"]);
  const [timeFormats, setTimeFormats] = useState(["Local Time", "UTC"]);
  const [units, setUnits] = useState(['Kilo Grams', 'Pounds'])
  const [aircraftData, setAircraftData] = useState({
    operator: operators[0],
    reg_no: "",
    model: null,
    min_cabin_crew: 0,
    min_flight_crew: 0,
    no_of_captain: 0,
    no_of_fo: 0,
    no_of_fe: 0,
    c_cls_capacity: 0,
    y_cls_capacity: 0,
    seating_capacity: 0,
    time_formate: null,
    local_time: 0,
    utc_time: 0,
    block_opening_hrs: "0:00",
    time_in_air_opening_hrs: "0:00",
    not_in_service: false,
    not_in_service_from:null,
    freight_capacity: "0.00",
    unit: null,
    created_by: "",
    modified_by: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert]= useState(false);

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

    if(!Boolean(aircraftData.operator))
      errors.operator="Operator is required.";
    if(!Boolean(aircraftData.reg_no))
      errors.reg_no="Reg. No is required.";
    if (!Boolean(aircraftData.model))
      errors.model="Model is required.";
    if (!Boolean(aircraftData.min_flight_crew))
      errors.min_flight_crew="Min. Flight Crew is required.";
    if (!Boolean(aircraftData.time_formate))
      errors.time_formate="Time Formate is required.";

    return errors;
  }

  const handleSubmitAircraft = (event) => {
    // console.log('It worked');
    const errors=validateAircraftData();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    console.log(aircraftData);
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
                  value={aircraftData.operator}
                  onChange={(event, newValue) => {
                    handleInputChange("operator", newValue);
                  }}
                  // inputValue={inputValue}
                  // onInputChange={(event, newInputValue) => {
                  //   setInputValue(newInputValue);
                  // }}
                  id="aircraft_operator"
                  options={operators}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Operator"
                      variant="filled"
                      error={Boolean(validationErrors.operator)}
                      helperText={validationErrors.operator}
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
                  value={aircraftData.reg_no}
                  onChange={(event) => {
                    handleInputChange("reg_no", event.target.value);
                  }}
                  error={Boolean(validationErrors.reg_no)}
                  helperText={validationErrors.reg_no}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
                <Grid container columnSpacing={2} columns={{xs:4, sm:6, md:6}}>
                    <Grid item xs={3.5} sm={5} md={5}>
                    <Autocomplete
                  fullWidth
                  size="small"
                  value={aircraftData.model}
                  onChange={(event, newValue) => {
                    handleInputChange("model", newValue);
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
                      error={Boolean(validationErrors.model)}
                      helperText={validationErrors.model}
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
                  value={aircraftData.min_cabin_crew}
                  onChange={(event) => {
                    handleInputChange("min_cabin_crew", event.target.value);
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
                  value={aircraftData.min_flight_crew}
                  onChange={(event) => {
                    handleInputChange("min_flight_crew", event.target.value);
                  }}
                  error={Boolean(validationErrors.min_flight_crew)}
                  helperText={validationErrors.min_flight_crew}
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
                  value={aircraftData.no_of_captain}
                  onChange={(event) => {
                    handleInputChange("no_of_captain", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_no_of_fos"
                  size="small"
                  fullWidth
                  label="No. of FO(s)"
                  value={aircraftData.no_of_fo}
                  onChange={(event) => {
                    handleInputChange("no_of_fo", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_no_of_fes"
                  size="small"
                  fullWidth
                  label="No. of FE(s)"
                  value={aircraftData.no_of_fe}
                  onChange={(event) => {
                    handleInputChange("no_of_fe", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_c_cls_capacity"
                  size="small"
                  fullWidth
                  label="cCls Capacity"
                  value={aircraftData.c_cls_capacity}
                  onChange={(event) => {
                    handleInputChange("c_cls_capacity", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_y_cls_capacity"
                  size="small"
                  fullWidth
                  label="yCls Capacity"
                  value={aircraftData.y_cls_capacity}
                  onChange={(event) => {
                    handleInputChange("y_cls_capacity", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_seating_capacity"
                  size="small"
                  fullWidth
                  label="Seating Capacity"
                  value={aircraftData.seating_capacity}
                  onChange={(event) => {
                    handleInputChange("seating_capacity", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <Autocomplete
                  size="small"
                  value={aircraftData.time_formate}
                  onChange={(event, newValue) => {
                    handleInputChange("time_formate", newValue);
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
                      error={Boolean(validationErrors.time_formate)}
                      helperText={validationErrors.time_formate}
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
                  value={aircraftData.block_opening_hrs}
                  onChange={(event) => {
                    handleInputChange("block_opening_hrs", event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={4}>
                <TextField
                  id="aircraft_time_in_air_opening_hrs"
                  size="small"
                  fullWidth
                  label="Time In Air Opening Hrs"
                  value={aircraftData.time_in_air_opening_hrs}
                  onChange={(event) => {
                    handleInputChange(
                      "time_in_air_opening_hrs",
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
                            checked={aircraftData.not_in_service}
                            onChange={() => {
                              handleInputChange(
                                "not_in_service",
                                !aircraftData.not_in_service
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
                                  disabled={!aircraftData.not_in_service}
                                  value={aircraftData.not_in_service ? aircraftData.not_in_service_from : null}
                                  slotProps={{
                                    textField: {
                                      fullWidth:true,
                                      disabled:!aircraftData.not_in_service,
                                      size: "small",
                                      placeholder: "From",
                                    },
                                  }}
                                  onChange={(newValue)=>{
                                    handleInputChange('not_in_service_from', newValue);
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
                  value={aircraftData.freight_capacity}
                  onChange={(event) => {
                    handleInputChange(
                      "freight_capacity",
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
                          onClick={() => {
                            handleTabChange("1");
                            handleClickAlert();
                          }}
                        >
                          Ok
                        </Button>
                        <Button onClick={handleClickAlert}>Cancel</Button>
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
