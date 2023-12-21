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

export default function CreateHotel(props) {
  const { optionState, handleClickCreate, setRefresh, setStatus, loggedUser } = props;

  const [cities, setCities]= useState([]);
  const [hotelData, setHotelData] = useState({
    hotelName:"",
    address:"",
    cityId:null,
    phoneNo:"",
    email:""
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect( ()=>{
    const fetchCities = async()=>{
      try {
        await axios.get(`${API_URL}/api/city_list`).then((response)=>{
          // console.log(response.data);
          setCities(response.data.results);
        });
      } catch (error) {
        setCities([]);
      }
    }
    // const fetchOperators = async()=>{
    //   setOperators([]);
    // }
    // fetchOperators();
    fetchCities();
  },[]);

  const handleInputChange = (field, value) => {
    setHotelData((pre) => {
      return { ...pre, ...{ [field]: value } };
    });
    setValidationErrors({});
  };

  const handleClose = (event, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    handleClickCreate();
  };

  const validate = () => {
    let errors = {};
      if(!Boolean(hotelData.hotelName))
        errors.hotelName = "Hotel Name is required";
        if(!Boolean(hotelData.address))
        errors.address = "Address is required";
        if(!Boolean(hotelData.cityId))
        errors.cityId = "City is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      await axios.post(`${API_URL}/api/hotels`,{...hotelData,createdBy:loggedUser.user_id}).then((response)=>{
        // console.log(response);
        setStatus({
          open:true,
          type:'success',
          message:response.data.message
        });
        setRefresh((prev)=>prev+1);
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
    handleClickCreate();
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
                  onChange={(event) => {
                    handleInputChange("hotelName", event.target.value);
                  }}
                  error={Boolean(validationErrors.hotelName)}
                  helperText={validationErrors.hotelName}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
          id="hotel_address"
          label="Address"
          placeholder="Address"
          fullWidth
          required
          multiline
          rows={3}
          onChange={(event) => {
            handleInputChange("address", event.target.value);
          }}
          error={Boolean(validationErrors.address)}
          helperText={validationErrors.address}
        />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <Autocomplete
                  fullWidth
                  size="small"
                  // value={aircraftData.model}
                  onChange={(event, newValue) => {
                    if(newValue){
                      handleInputChange("cityId", newValue.city_id);
                    }else{
                      handleInputChange("cityId", null);
                    }
                  }}
                  id="hotel_city"
                  options={cities}
                  getOptionLabel={(option)=>option.city_name}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      required
                      label="City"
                      error={Boolean(validationErrors.cityId)}
                      helperText={validationErrors.cityId}
                       />
                       )}
                       />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="hotel_phone_no"
                  size="small"
                  fullWidth
                  label="Phone No."
                  // value={aircraftData.reg_no}
                  onChange={(event) => {
                    handleInputChange("phoneNo", event.target.value);
                  }}
                  error={Boolean(validationErrors.phoneNo)}
                  helperText={validationErrors.phoneNo}
                />
              </Grid>
              <Grid item xs={4} sm={6} md={6}>
              <TextField
                  id="hotel_email"
                  size="small"
                  fullWidth
                  label="Email"
                  // value={aircraftData.reg_no}
                  onChange={(event) => {
                    handleInputChange("email", event.target.value);
                  }}
                  error={Boolean(validationErrors.email)}
                  helperText={validationErrors.email}
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
