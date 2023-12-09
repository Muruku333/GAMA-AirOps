import { forwardRef, useState, Fragment } from "react";
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
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Divider,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from "@mui/material/Slide";
// @mui-icons ------------------------------------------------
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
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

export default function CreateDSD(props) {
  const { handleTabChange, userData } = props;

  const [dutyStatusList, setDutyStatusList] = useState(['status 1','status 2']);
  const [onDutyAsList, setOnDutyAsList]= useState(['duty 1', 'duty 2']);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickAlert=()=>{
    setOpenAlert(!openAlert);
  }

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmitDSD = (event) => {
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
      Duty Status Detail
    </Typography>,
    <Typography key="4" color="text.disabled">
      New Duty Status Detail
    </Typography>,
  ];

  return (
    <>
      <Helmet>
        <title> Duty Status Detail Create | GAMA AirOps </title>
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
              Create&nbsp;a&nbsp;new&nbsp;duty&nbsp;status&nbsp;detail
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
          <Box p={5} sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
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
                  id="DSD_duty_status"
                  options={dutyStatusList}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Duty Status"
                      // error={Boolean(validationErrors.model)}
                      // helperText={validationErrors.model}
                       />
                       )}
                       />
              </Grid>
              <Grid item xs={false} sm={6} md={6}>

              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="DSD_name"
                  size="small"
                  fullWidth
                  required
                  label="Name"
                  placeholder="Name"
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
                  id="DSD_description"
                  size="small"
                  fullWidth
                  label="Description"
                  placeholder="Description"
                  // value={aircraftData.reg_no}
                  // onChange={(event) => {
                  //   handleInputChange("reg_no", event.target.value);
                  // }}
                  // error={Boolean(validationErrors.reg_no)}
                  // helperText={validationErrors.reg_no}
                />
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
              <FormControl>
                  <FormLabel id="DSD_time_format">
                    Time Format
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="DSD_time_format"
                    name="DSD_time_format_radio_group"
                    // value={modelData.wing_type}
                    // onChange={handleChangeWingType}
                  >
                    <FormControlLabel
                      value='Local'
                      control={<Radio />}
                      label="Local"
                    />
                    <FormControlLabel
                    value='UTC'
                      control={<Radio />}
                      label="UTC"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={2} sm={2} md={2} display={'flex'} justifyContent={"right"}>
              <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Prev Day"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
              <TextField
                  id="DSD_from_time"
                  size="small"
                  fullWidth
                  label="From Time"
                  placeholder="From Time"
                  // value={modelData.model_name}
                  // onChange={(event) => {
                  //   handleInputChange("model_name", event.target.value);
                  // }}
                  // error={Boolean(validationErrors.model_name)}
                  // helperText={validationErrors.model_name}
                />
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="DSD_to_time"
                  size="small"
                  fullWidth
                  label="To Time"
                  placeholder="To Time"
                  // value={modelData.model_name}
                  // onChange={(event) => {
                  //   handleInputChange("model_name", event.target.value);
                  // }}
                  // error={Boolean(validationErrors.model_name)}
                  // helperText={validationErrors.model_name}
                />
                </Grid>
                <Grid item xs={2} sm={2} md={2} >
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Next Day"
                  />
                </FormGroup>
                </Grid>
                <Grid item xs={4} sm={6} md={6}>
                <TextField
                  id="DSD_total_time"
                  size="small"
                  label="Total Time"
                  placeholder="Total Time (hrs.)"
                  // value={modelData.model_name}
                  // onChange={(event) => {
                  //   handleInputChange("model_name", event.target.value);
                  // }}
                  // error={Boolean(validationErrors.model_name)}
                  // helperText={validationErrors.model_name}
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
                  id="DSD_on_duty_as"
                  options={onDutyAsList}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="On Duty As"
                      // error={Boolean(validationErrors.model)}
                      // helperText={validationErrors.model}
                       />
                       )}
                       />
                </Grid>
                {/* <Grid item xs={false} sm={8} md={8}>

                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                <SubmitButton
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmitAircraft}
              >
                Save
                </SubmitButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                <Fragment>
                <Button
                fullWidth
               variant="contained"
               color="error"
              //  onClick={handleClickAlert}
              onClick={()=>{handleTabChange('1')}}
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
          Created data and Changes you where made can't be save..!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={()=>{handleTabChange('1');handleClickAlert();}}>Ok</Button>
          <Button onClick={handleClickAlert}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
                </Grid> */}
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
                    onClick={handleSubmitDSD}
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
