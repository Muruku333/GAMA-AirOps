import { useState, useEffect, forwardRef } from "react";
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
  styled
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

export default function EditModel(props) {
  const  {optionState,  handleClickEditModel, idToEdit, DB_URL, loggedInUserId } = props;
  const [modelData, setModelData] = useState({
    model_name: "",
    single_engine: false,
    wing_type: "Fixed Wing",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    // const updatedModelData = { ...modelData };
    // updatedModelData[field] = value;
    setModelData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleChangeWingType = (event) => {
    handleInputChange("wing_type", event.target.value);
  };

  const handleClose = (event, reason) => {
    if ( reason && ( reason == "backdropClick" || reason == "escapeKeyDown" ) )
        return;
        handleClickEditModel();
}

const validateAircraftModelData=()=>{
    let errors={};

    if(!Boolean(modelData.model_name))
      errors.model_name="Model Name is required.";

    return errors;
  }

  const handleSubmitAircraftModel =(event)=>{
        // console.log('It worked');
        const errors=validateAircraftModelData();
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
  }

  return (
    <>
      <Helmet>
        <title> Aircraft Model Edit | GAMA AirOps</title>
      </Helmet>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={optionState.canEdot}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Aircraft Model Edit"}</DialogTitle>
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
                  id="aircraft_model_name"
                  size="small"
                  fullWidth
                  required
                  label="Model Name"
                  value={modelData.model_name}
                  onChange={(event) => {
                    handleInputChange("model_name", event.target.value);
                  }}
                  error={Boolean(validationErrors.model_name)}
                  helperText={validationErrors.model_name}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={5}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={modelData.single_engine} onChange={(e)=>{handleInputChange('single_engine',!modelData.single_engine)}}/>}
                    label="Single Engine"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={4} sm={8} md={7}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Wing Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={modelData.wing_type}
                    onChange={handleChangeWingType}
                  >
                    <FormControlLabel
                      value="Fixed Wing"
                      control={<Radio />}
                      label="Fixed Wing"
                    />
                    <FormControlLabel
                      value="Rotary Wing"
                      control={<Radio />}
                      label="Rotary Wing"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton color="success" variant="contained">Save</SubmitButton>
          <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
