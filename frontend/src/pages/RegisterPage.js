import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Helmet } from "react-helmet-async";
import RegisterForm from "../sections/auth/register/RegisterForm";

export default function RegisterPage() {

  const defaultTheme = createTheme();

  return (
    <>
    <Helmet>
    <title> Register | GAMA AirOps </title>
    </Helmet>
    
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={8}
          md={8.1}
          sx={{
            backgroundImage:
              " linear-gradient(90deg, rgba(40, 121, 182, 0.55) 25%, rgba(125, 194, 68, 0.55) 50%, rgb(238, 106, 49,0.55) 100%), url('https://sparzana.com/images/home/bg-1.jpg')", //url(https://source.unsplash.com/random?wallpapers)
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      <CssBaseline />
        <Grid item xs={12} sm={4} md={3.9} component={Paper} elevation={6} square>
          <RegisterForm/>
        </Grid>
        </Grid>
    </ThemeProvider>

    </>
  );
}
