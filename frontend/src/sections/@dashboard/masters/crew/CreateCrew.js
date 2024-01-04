import { forwardRef, useEffect, useState, useRef, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui ------------------------------------------------------
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  Typography,
  styled,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Autocomplete,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// @mui-icons ------------------------------------------------
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import Iconify from "../../../../components/iconify";
import axios from "axios";
import dayjs from "dayjs";

const API_URL = process.env.REACT_APP_API_URL;

const PhotoBox = styled(Box)(({ theme }) => ({
  padding: 8,
  margin: "auto",
  width: 200,
  height: 200,
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "50%",
  border: "1px dashed rgba(145, 158, 171, 0.2)",
  "&:hover": {
    ".upload-placeholder": {
      opacity: 1,
      // backgroundColor:theme.palette.action.hover,
    },
  },
}));

const PhotoStack = styled(Stack)(({ theme, selectedPhoto }) => ({
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 9,
  borderRadius: "50%",
  position: "absolute",
  transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  opacity: selectedPhoto ? 0 : 0.8,
  backgroundColor: theme.palette.action.hover,
}));

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

export default function CreateCrew(props) {
  const { handleTabChange, setStatus, loggedUser } = props;

  const fileInputRef = useRef(null);
  const [operators, setOperators] = useState([]);
  const [models, setModels] = useState([]);
  const [criticalAirports, setCriticalAirports] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [designations, setDesignations] = useState([
    "Air Hostess",
    "First Offiecer",
    "Pilot",
  ]);
  const [onDutyAs, setOnDutyAs] = useState(["Captain", "First Officer"]);
  const [countryCodes, setCountryCodes] = useState(["+91", "+1"]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoB64, setPhotoB64]=useState(null);
  const [crewData, setCrewData] = useState({
    operatorId: "OP-0001",
    photo: null,
    name: "",
    gender:"Male",
    code: "",
    nationality: "",
    city: "",
    designation: "",
    onDutyAs: "",
    countryCode: "",
    mobileNo: "",
    dateOfBirth: null,
    dateOfJoining: null,
    email: "",
    passportNo: "",
    notInService: false,
    notInServiceFrom: null,
  });
  const [selectedModels, setSelectedModels]=useState([]);
  const [selectedAirports, setSelectedAirports]=useState([]);
  const [value, setValue] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        await axios.get(`${API_URL}/api/operators`).then((response) => {
          // console.log(response.data);
          setOperators(response.data.results);
        });
      } catch (error) {
        setOperators([]);
      }
    };
    const fetchCountries = async () => {
      try {
        await axios.get(`${API_URL}/api/countries`).then((response) => {
          // console.log(response.data);
          setCountries(response.data.results);
        });
      } catch (error) {
        setCountries([]);
      }
    };
    const fetchCities = async () => {
      try {
        await axios.get(`${API_URL}/api/cities`).then((response) => {
          // console.log(response.data);
          setCities(response.data.results);
        });
      } catch (error) {
        setCities([]);
      }
    };
    const fetchModels = async () => {
      try {
        await axios.get(`${API_URL}/api/aircraft_models`).then((response) => {
          // console.log(response.data);
          setModels(response.data.results);
        });
      } catch (error) {
        setModels([]);
      }
    };
    const fetchCriticalAirports = async () => {
      try {
        await axios.get(`${API_URL}/api/critical_airports`).then((response) => {
          // console.log(response.data);
          setCriticalAirports(response.data.results);
        });
      } catch (error) {
        setCriticalAirports([]);
      }
    };
    fetchOperators();
    fetchCountries();
    fetchCities();
    fetchModels();
    fetchCriticalAirports();
  }, []);

  const handleInputChange = (field, value) => {
    const updatedCrewData = { ...crewData };
    updatedCrewData[field] = value;
    setCrewData(updatedCrewData);
    setValidationErrors({});
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedPhoto(file);
    let reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(e)=>{
      setPhotoB64(e.target.result);
      // console.log(e.target.result)
    }
  };

  const handleClickAlert = () => {
    setOpenAlert(!openAlert);
  };

  const validate = () => {
    let errors = {};

    if(!Boolean(crewData.operatorId))
    errors.operatorId="Operator is required.";
    if(!Boolean(crewData.name))
    errors.name="Name is required";
    if(!Boolean(crewData.code))
    errors.code="Code is required";
    if(!Boolean(crewData.nationality))
    errors.nationality="Nationality is required";
    if(!Boolean(crewData.city))
    errors.city="City is required";
    if(!Boolean(crewData.designation))
    errors.designation="Designation is required";

    return errors;
  };

  const handleSubmitAircraft = async (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    console.log({...crewData,photo: selectedPhoto, createdBy:loggedUser.user_id});
    try {
      await axios.post(`${API_URL}/api/crews`,{...crewData,photo:photoB64,models:selectedModels,criticalAirports:selectedAirports,createdBy:loggedUser.user_id}).then((response)=>{
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
    <Link underline="hover" key="1" color="inherit" href="/app/dashboard">
      Dashboard
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/app/masters">
      Masters
    </Link>,
    <Typography key="3" color="text.disabled">
      Crew
    </Typography>,
    <Typography key="4" color="text.disabled">
      New Crew
    </Typography>,
  ];

  return (
    <>
      <Helmet>
        <title> Crew Create | GAMA AirOps </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Create&nbsp;a&nbsp;new&nbsp;crew
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

      <Box flexGrow={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 14, px: 5, overflow: "visible" }}>
              <Box mb={5}>
                <div>
                  <PhotoBox
                    onClick={handleClick}
                    role="presentation"
                    tabIndex={0}
                    component={"div"}
                  >
                    <input
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      type="file"
                      tabIndex={-1}
                      style={{ display: "none" }}
                    />
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: "50%",
                        position: "relative",
                      }}
                    >
                      {selectedPhoto && (
                        <Box
                          component={"img"}
                          alt="Crew Photo"
                          src={
                            selectedPhoto
                              ? URL.createObjectURL(selectedPhoto)
                              : ""
                          }
                          sx={{
                            overflow: "hidden",
                            position: "relative",
                            verticalAlign: "bottom",
                            display: "inline-block",
                            borderRadius: "50%",
                            height: "100%",
                            width: "100%",
                          }}
                        />
                      )}
                      <PhotoStack
                        gap={1}
                        className="upload-placeholder"
                        selectedPhoto={selectedPhoto}
                      >
                        <Iconify icon={"solar:camera-add-bold"} width={42} />
                        <Typography
                          display={"block"}
                          textAlign={"center"}
                          variant="caption"
                        >
                          Update photo
                        </Typography>
                      </PhotoStack>
                    </Box>
                  </PhotoBox>
                  <Typography
                    mt={3}
                    display={"block"}
                    textAlign={"center"}
                    variant="caption"
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    max size of 3.1 MB
                  </Typography>
                </div>
              </Box>
              <Stack gap={2} alignItems={"center"}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={crewData.gender}
                    onChange={(event) => {
                      handleInputChange("gender", event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      label="Date Of Birth"
                      // value={crewData.dateOfBirth}
                      onChange={(newValue) => handleInputChange("dateOfBirth",dayjs(newValue.$d).format('YYYY-MM-DD'))}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ overflow: "visible" }}>
              <Box p={3} sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={{ xs: 4, sm: 12, md: 12 }}>
                  <Grid item xs={4} sm={6} md={6}>
                    <Autocomplete
                      disabled
                      value={operators.find((_op)=>_op.operator_id === crewData.operatorId)||null}
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
                      getOptionLabel={(option) => option.operator_name}
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
                      id="crew_name"
                      size="small"
                      fullWidth
                      required
                      label="Name"
                      value={crewData.name}
                      onChange={(event) => {
                        handleInputChange("name", event.target.value);
                      }}
                      error={Boolean(validationErrors.name)}
                      helperText={validationErrors.name}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <TextField
                      id="crew_code"
                      size="small"
                      fullWidth
                      required
                      label="Code"
                      value={crewData.code}
                      onChange={(event) => {
                        handleInputChange("code", event.target.value);
                      }}
                      error={Boolean(validationErrors.code)}
                      helperText={validationErrors.code}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={countries.find((_country)=>_country.country_name = crewData.nationality)||null}
                      onChange={(event, newValue) => {
                        if(newValue){
                          handleInputChange("nationality", newValue.country_name);
                        }else{
                          handleInputChange("nationality", null);
                        }
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="crew_nationality"
                      options={countries}
                      getOptionLabel={(option) => option.country_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Nationality"
                          error={Boolean(validationErrors.nationality)}
                          helperText={validationErrors.nationality}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Grid
                      container
                      spacing={1.7}
                      columns={{ xs: 4, sm: 6, md: 6 }}
                    >
                      <Grid item xs={3.5} md={4.7}>
                        <Autocomplete
                          fullWidth
                          size="small"
                          value={cities.find((_city)=>_city.city_name === crewData.city)||null}
                          onChange={(event, newValue) => {
                            if(newValue){
                              handleInputChange("city", newValue.city_name);
                            }else{
                              handleInputChange("city", null);
                            }
                          }}
                          // inputValue={inputValue}
                          // onInputChange={(event, newInputValue) => {
                          //   setInputValue(newInputValue);
                          // }}
                          id="crew_cities"
                          options={cities}
                          getOptionLabel={(option) => option.city_name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="City"
                              error={Boolean(validationErrors.city)}
                              helperText={validationErrors.city}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={0.5} md={1}>
                        <Tooltip title="New City">
                          <Button
                            variant="contained"
                            color="info"
                            component={RouterLink}
                            to={"/app/masters/city"}
                          >
                            <AddIcon />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={crewData.designation}
                      onChange={(event, newValue) => {
                        handleInputChange("designation", newValue);
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="crew_designation"
                      options={designations}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Designation"
                          error={Boolean(validationErrors.designation)}
                          helperText={validationErrors.designation}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={crewData.onDutyAs}
                      onChange={(event, newValue) => {
                        handleInputChange("onDutyAs", newValue);
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="crew_on_duty_as"
                      options={onDutyAs}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="On Duty As"
                          // error={Boolean(validationErrors.onDutyAs)}
                          // helperText={validationErrors.onDutyAs}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1.5} sm={2.5} md={2.5}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={crewData.countryCode}
                      onChange={(event, newValue) => {
                        handleInputChange("countryCode", newValue);
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="crew_country_code"
                      options={countryCodes}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country Codes"
                          // error={Boolean(validationErrors.countryCode)}
                          // helperText={validationErrors.countryCode}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2.5} sm={3.5} md={3.5}>
                    <TextField
                      id="crew_mobile_no"
                      size="small"
                      fullWidth
                      label="Mobile No"
                      // value={crewData.mobileNo}
                      onChange={(event) => {
                        handleInputChange("mobileNo", event.target.value);
                      }}
                      // error={Boolean(validationErrors.mobileNo)}
                      // helperText={validationErrors.mobileNo}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <TextField
                      id="crew_email"
                      size="small"
                      fullWidth
                      label="Email"
                      value={crewData.email}
                      onChange={(event) => {
                        handleInputChange("email", event.target.value);
                      }}
                      // error={Boolean(validationErrors.email)}
                      // helperText={validationErrors.email}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ p: 0, overflow: "visible" }}
                      >
                        <DatePicker
                        format="DD/MM/YYYY"
                          label="Date Of Joining"
                          // value={crewData.dateOfJoining}
                          onChange={(newValue) => handleInputChange("dateOfJoining",dayjs(newValue.$d).format('YYYY-MM-DD'))}
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <TextField
                      id="crew_passport"
                      size="small"
                      fullWidth
                      label="Passport"
                      // value={crewData.passportNo}
                      onChange={(event) => {
                        handleInputChange("passportNo", event.target.value);
                      }}
                      // error={Boolean(validationErrors.passportNo)}
                      // helperText={validationErrors.passportNo}
                    />
                  </Grid>
                  <Grid item xs={4} sm={12} md={12}>
                    <Stack gap={"12px"}>
                      <Typography variant="subtitle2">
                        Applicable Models
                      </Typography>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={models}
                        getOptionLabel={(option) => option.model_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Models"
                            placeholder="+ Model"
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={4} sm={12} md={12}>
                    <Stack gap={"12px"}>
                      <Typography variant="subtitle2">
                        Applicable Critical Airports
                      </Typography>
                      <Autocomplete
                        multiple
                        id="tags-standard"
                        options={criticalAirports}
                        getOptionLabel={(option) => option.airport_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            // label="Critical Airports"
                            placeholder="+ Critical airport"
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ overflow: "visible" }}>
              {/* <Divider sx={{ borderStyle: "dashed" }} /> */}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
