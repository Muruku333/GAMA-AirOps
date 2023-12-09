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
  TextField,
  Autocomplete,
  styled,
  Grid,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// @mui-icons ------------------------------------------------
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import Scrollbar from "../../../../components/scrollbar";

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

export default function CreateGroup(props) {
  const { handleTabChange, userData } = props;

  const [crewList, setCrewList] = useState(["crew 1", "crew 2"]);
  const [onDutyAsList, setOnDutyAsList] = useState(["duty 1", "duty 2"]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickAlert = () => {
    setOpenAlert(!openAlert);
  };

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmitGroup = (event) => {
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
      Group
    </Typography>,
    <Typography key="4" color="text.disabled">
      New Group
    </Typography>,
  ];

  return (
    <>
      <Helmet>
        <title> Group Create | GAMA AirOps </title>
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
              Create&nbsp;a&nbsp;new&nbsp;group
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
          <Box sx={{ p: 3, flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Group Details :
            </Typography>
            <Grid container spacing={3} columns={{ xs: 4, sm: 12, md: 12 }}>
              <Grid item xs={4} sm={6} md={6}>
                <TextField
                  id="group_name"
                  size="small"
                  fullWidth
                  required
                  label="Group Name"
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
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box sx={{ p: 3, flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Group Members :
            </Typography>
            <Grid container spacing={3} columns={{ xs: 4, sm: 12, md: 12 }}>
              <Grid item xs={4} sm={5} md={5}>
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
                  id="group_crew"
                  options={crewList}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Crew"
                      // error={Boolean(validationErrors.model)}
                      // helperText={validationErrors.model}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} sm={5} md={5}>
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
                  id="group_on_duty_as"
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
              <Grid item xs={4} sm={2} md={2}>
                <Button
                  fullWidth
                  // onClick={handleAddFiles}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Add Crew
                </Button>
              </Grid>
              <Grid item xs={4} sm={12} md={12}>
                <Scrollbar sx={{ mt: 1 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table" size="small">
                      <TableHead>
                        <TableCell></TableCell>
                        <TableCell align="center">Crew Members</TableCell>
                        <TableCell></TableCell>
                      </TableHead>
                      <TableBody>
                        {!(groupMembers.length > 0) && (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <Stack spacing={1}>
                                <Box
                                  component="img"
                                  src="/assets/icons/ic_content.svg"
                                  sx={{ height: 80, mx: "auto" }}
                                />{" "}
                                <Typography
                                  textAlign={"center"}
                                  variant="body2"
                                  color={"text.secondary"}
                                  component={"span"}
                                >
                                  No Crew members added to this Group
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
              </Grid>
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
                  onClick={handleSubmitGroup}
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
                        Created data and Changes you where made can't be save..!
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
