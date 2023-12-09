import { Box, Breadcrumbs, Card, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

export default function EditProformaInvoice( {handleTabChange, DB_URL}) {
    const navigate = useNavigate();

    function handleBreadCrumbsClick(event) {
      event.preventDefault();
      // console.info("You clicked a breadcrumb.");
      // console.log(event);
      navigate(
        `/${event.target.innerText}`.toLocaleLowerCase().replace(" ", "_")
      );
      // window.open(event.target.href, "_self");
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
    href="/app/sales_management"
    onClick={(event)=>{handleBreadCrumbsClick(event,"/app/sales_management")}}
  >
    Sales&nbsp;Management
  </Link>,
      <Typography key="3" color="text.disabled">
        Proforma&nbsp;Invoice
      </Typography>,
      <Typography key="4" color="text.disabled">
        New&nbsp;Proforma&nbsp;Invoice
      </Typography>,
    ];

  return (
    <>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Box>
            <Typography variant="h4" gutterBottom>Edit</Typography>
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

    </>
  );
}
