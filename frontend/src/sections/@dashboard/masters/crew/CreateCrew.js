import { forwardRef, useState, useRef, Fragment } from "react";
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
  const { handleTabChange, userData } = props;

  const fileInputRef = useRef(null);
  const [operators, setOperators] = useState(["Sparzana Aviation Pvt Ltd"]);
  const [countries, setCountries] = useState(["India", "China"]);
  const [cities, setCities] = useState(["city 1", "city 2"]);
  const [designations, setDesignations] = useState([
    "Air Hostess",
    "First Offiecer",
    "Pilot",
  ]);
  const [models,setModels]=useState([{title:'Hawker 800XP (Fixed Wing)'},{title:'Hawker 900XP (Fixed Wing)'}]);
  const [onDutyAs, setOnDutyAs] = useState(["Captain", "First Officer"]);
  const [countryCodes, setCountryCodes] = useState(["code 1", "code 2"]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [value, setValue] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  const handleClickAlert = () => {
    setOpenAlert(!openAlert);
  };

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmitAircraft = (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
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
            <Card sx={{ py:14,px:5, overflow: "visible" }}>
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
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date Of Birth"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
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
                      value={"Sparzana Aviation Pvt Ltd"}
                      // onChange={(event, newValue) => {
                      //   handleInputChange("operator", newValue);
                      // }}
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
                          // error={Boolean(validationErrors.operator)}
                          // helperText={validationErrors.operator}
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
                      // value={aircraftData.reg_no}
                      // onChange={(event) => {
                      //   handleInputChange("reg_no", event.target.value);
                      // }}
                      // error={Boolean(validationErrors.reg_no)}
                      // helperText={validationErrors.reg_no}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <TextField
                      id="crew_code"
                      size="small"
                      fullWidth
                      required
                      label="Code"
                      // value={aircraftData.reg_no}
                      // onChange={(event) => {
                      //   handleInputChange("reg_no", event.target.value);
                      // }}
                      // error={Boolean(validationErrors.reg_no)}
                      // helperText={validationErrors.reg_no}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={aircraftData.model}
                      // onChange={(event, newValue) => {
                      //   handleInputChange("model", newValue);
                      // }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="crew_nationality"
                      options={countries}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Nationality"
                          // error={Boolean(validationErrors.model)}
                          // helperText={validationErrors.model}
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
                          // value={aircraftData.model}
                          // onChange={(event, newValue) => {
                          //   handleInputChange("model", newValue);
                          // }}
                          // inputValue={inputValue}
                          // onInputChange={(event, newInputValue) => {
                          //   setInputValue(newInputValue);
                          // }}
                          id="crew_cities"
                          options={cities}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              required
                              label="City"
                              // error={Boolean(validationErrors.model)}
                              // helperText={validationErrors.model}
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
                      // value={aircraftData.model}
                      // onChange={(event, newValue) => {
                      //   handleInputChange("model", newValue);
                      // }}
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
                          // error={Boolean(validationErrors.model)}
                          // helperText={validationErrors.model}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={aircraftData.model}
                      // onChange={(event, newValue) => {
                      //   handleInputChange("model", newValue);
                      // }}
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
                          // error={Boolean(validationErrors.model)}
                          // helperText={validationErrors.model}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={1.5} sm={2.5} md={2.5}>
                    <Autocomplete
                      fullWidth
                      size="small"
                      // value={aircraftData.model}
                      // onChange={(event, newValue) => {
                      //   handleInputChange("model", newValue);
                      // }}
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
                          // error={Boolean(validationErrors.model)}
                          // helperText={validationErrors.model}
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
                      // value={aircraftData.reg_no}
                      // onChange={(event) => {
                      //   handleInputChange("reg_no", event.target.value);
                      // }}
                      // error={Boolean(validationErrors.reg_no)}
                      // helperText={validationErrors.reg_no}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <TextField
                      id="crew_email"
                      size="small"
                      fullWidth
                      label="Email"
                      // value={aircraftData.reg_no}
                      // onChange={(event) => {
                      //   handleInputChange("reg_no", event.target.value);
                      // }}
                      // error={Boolean(validationErrors.reg_no)}
                      // helperText={validationErrors.reg_no}
                    />
                  </Grid>
                  <Grid item xs={4} sm={6} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ p: 0, overflow: "visible" }}
                      >
                        <DatePicker
                          label="Date Of Joining"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
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
                      // value={aircraftData.reg_no}
                      // onChange={(event) => {
                      //   handleInputChange("reg_no", event.target.value);
                      // }}
                      // error={Boolean(validationErrors.reg_no)}
                      // helperText={validationErrors.reg_no}
                    />
                  </Grid>
                  <Grid item xs={4} sm={12} md={12}>
                    <Stack gap={'12px'}>
                          <Typography variant="subtitle2">
                            Applicable Models
                          </Typography>
                          <Autocomplete
        multiple
        id="tags-standard"
        options={models}
        getOptionLabel={(option) => option.title}
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
                  <Stack gap={'12px'}>
                          <Typography variant="subtitle2">
                            Applicable Critical Airports
                          </Typography>
                          <Autocomplete
        multiple
        id="tags-standard"
        options={models}
        getOptionLabel={(option) => option.title}
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
            <Card sx={{overflow:'visible'}}>
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
