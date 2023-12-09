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

export default function CreateHotel(props) {
  const { optionState, handleClickCreate, userData } = props;

  const [cities, setCities]= useState(['city 1','city 2']);
  const [validationErrors, setValidationErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    handleClickCreate();
  };

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmit = (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Hotel Create | GAMA AirOps</title>
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
        <DialogTitle>{"Create a new hotel"}</DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={12} md={12}>
                <TextField
                  id="hotel_name"
                  size="small"
                  fullWidth
                  required
                  label="Hotel Name"
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
          id="hotel_address"
          label="Address"
          placeholder="Address"
          fullWidth
          multiline
          rows={3}
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
                  id="hotel_city"
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
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="hotel_phone_no"
                  size="small"
                  fullWidth
                  required
                  label="Phone No."
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
                  id="hotel_email"
                  size="small"
                  fullWidth
                  required
                  label="Email"
                  // value={aircraftData.reg_no}
                  // onChange={(event) => {
                  //   handleInputChange("reg_no", event.target.value);
                  // }}
                  // error={Boolean(validationErrors.reg_no)}
                  // helperText={validationErrors.reg_no}
                />
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
