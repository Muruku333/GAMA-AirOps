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

export default function CreateDelayExplanation(props) {

  const { optionState, handleClickCreate, userData } = props;

  const [delayCategories, setDelayCategories] = useState(['category 1', 'category 2'])
  const [validationErrors, setValidationErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
      handleClickCreate();
  };

  const validate=()=>{
    let errors={};

    return errors;
  }

  const handleSubmit =(event)=> {
    // console.log('It worked');
    const errors=validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

}

  return (
    <>
      <Helmet>
        <title>Delay Explanation Create | GAMA AirOps</title>
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
        <DialogTitle>{"Create a new delay explanation"}</DialogTitle>
        <DialogContent>
          <Box mt={1} sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={3}
              columns={{ xs: 4, sm: 12, md: 12 }}
            >
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="delay_explanation_name"
                  size="small"
                  fullWidth
                  required
                  label="Explanation Name"
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
                  id="delay_explanation_delay_category"
                  options={delayCategories}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="Delay Category"
                      // error={Boolean(validationErrors.model)}
                      // helperText={validationErrors.model}
                       />
                       )}
                       />
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
