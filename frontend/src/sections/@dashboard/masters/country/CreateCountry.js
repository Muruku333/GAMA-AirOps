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

export default function CreateCountry(props) {

  const { optionState, handleClickCreate, setRefreshed, setStatus, loggedUser } = props;

  const [countryData, setCountryData] = useState({
    countryName: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    setCountryData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
      handleClickCreate();
  };

  const validateCountryData=()=>{
    let errors={};

    if(!Boolean(countryData.countryName))
      errors.countryName="Country Name is required.";

    return errors;
  }
 
  const handleSubmitCountry = async(event)=> {
        // console.log('It worked');
        const errors=validateCountryData();
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          return;
        }
        // console.log(countryData);
        try {
        await axios.post(`${API_URL}/api/countries`,{...countryData,createdBy:loggedUser.user_id}).then((response)=>{
          // console.log(response);
          setStatus({
            open:true,
            type:'success',
            message:response.data.message
          });
          setRefreshed((prev)=>prev+1);
          handleClickCreate();
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
  }

  return (
    <>
      <Helmet>
        <title>Country Create | GAMA AirOps</title>
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
        <DialogTitle>{"Create a new country"}</DialogTitle>
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
                  id="country_name"
                  size="small"
                  fullWidth
                  required
                  label="Country Name"
                  value={countryData.countryName}
                  onChange={(event) => {
                    handleInputChange("countryName", event.target.value);
                  }}
                  error={Boolean(validationErrors.countryName)}
                  helperText={validationErrors.countryName}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <SubmitButton color="success" variant="contained" onClick={handleSubmitCountry}>
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
