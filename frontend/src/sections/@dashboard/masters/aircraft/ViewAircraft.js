import { useNavigate } from "react-router-dom";
// @mui ------------------------------------------------------
import {Link,Typography, Stack, Button, Box, Breadcrumbs} from "@mui/material";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";

export default function ViewAircraft(props){
    const {handleTabChange, handleViewClick, handleEditClick, DB_URL, loggedInUserId}=props;
    const navigate=useNavigate();
   
    function handleBreadCrumbsClick(event,path) {
      event.preventDefault();
      navigate(path);
    }
   
    const breadcrumbs = [
       <Link
         underline="hover"
         key="1"
         color="inherit"
         href="/app/dashboard"
         onClick={(event)=>{handleBreadCrumbsClick(event,"/app/dashboard")}}
       >
         Dashboard
       </Link>,
       <Link
       underline="hover"
       key="2"
       color="inherit"
       href="/app/masters"
       onClick={(event)=>{handleBreadCrumbsClick(event,"/app/masters")}}
     >
       Masters
     </Link>,
     <Typography key="3" color='text.disabled'>
         Aircraft
         </Typography>,
       <Typography key="4" color='text.disabled'>
         {}
       </Typography>,
     ];
   
       return (
           <>
         <Helmet>
           <title>Aircraft View | GAMA AirOps </title>
         </Helmet>
   
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
             <Box>
               <Typography variant="h4" gutterBottom>
                 {}
               </Typography>
               <Breadcrumbs
                 separator={<NavigateNextIcon fontSize="small" />}
                 aria-label="breadcrumb"
                 sx={{ color: 'text.primary',display:{xs:"none",sm:"block"} }}
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
           </>
       );
   }