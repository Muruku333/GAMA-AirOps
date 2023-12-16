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
  styled,
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

export default function CreateModel(props) {
  const { optionState, handleClickNewModel, setRefresh, setStatus, loggedUser} = props;

  const [modelData, setModelData] = useState({
    modelName: "",
    singleEngine: false,
    wingType: "Fixed Wing",
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
    handleInputChange("wingType", event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    handleClickNewModel();
  };

  const validateAircraftModelData=()=>{
    let errors={};

    if(!Boolean(modelData.modelName))
      errors.modelName="Model Name is required.";

    return errors;
  }

  const handleSubmitAircraftModel = async (event)=> {
        // console.log('It worked');
        const errors=validateAircraftModelData();
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
        // console.log(modelData);
        try {
        await axios.post(`${API_URL}/api/aircraft_models`,{...modelData,...{createdBy:loggedUser.user_id}}).then((response)=>{
          // console.log(response);
          setStatus({
            open:true,
            type:'success',
            message:response.data.message
          });
          setRefresh((prev)=>prev+1);
        }).catch((error)=>{
          console.log(error);
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
      handleClickNewModel();
  }

  return (
    <>
      <Helmet>
        <title>Aircraft Model Create | GAMA AirOps</title>
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
        <DialogTitle>{"Create a new Aircraft Model"}</DialogTitle>
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
                  value={modelData.modelName}
                  onChange={(event) => {
                    handleInputChange("modelName", event.target.value);
                  }}
                  error={Boolean(validationErrors.modelName)}
                  helperText={validationErrors.modelName}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={5}>
              <FormControl component="fieldset">
      <FormLabel component="legend">Engine Type</FormLabel>
      <FormGroup aria-label="position" row>
                  <FormControlLabel
                    control={<Checkbox checked={modelData.singleEngine} onChange={(e)=>{handleInputChange('singleEngine',!modelData.singleEngine)}}/>}
                    label="Single Engine"
                  />
                </FormGroup>
                </FormControl>
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
                    value={modelData.wingType}
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
          <SubmitButton color="success" variant="contained" onClick={handleSubmitAircraftModel}>
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
