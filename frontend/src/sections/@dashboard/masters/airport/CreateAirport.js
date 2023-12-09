import { useState, useEffect, forwardRef, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui ------------------------------------------------------
import {
  Link,
  Typography,
  Stack,
  Button,
  Box,
  Breadcrumbs,
  Container,
  Card,
  Grid,
  TextField,
  Autocomplete,
  Switch,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  styled,
  Tooltip,
  Divider,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Popover,
  MenuItem
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import { Helmet } from "react-helmet-async";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enIN from "date-fns/locale/en-IN";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FilesUpload from "./FilesUpload";
import Scrollbar from "../../../../components/scrollbar";
import { fData } from "../../../../utils/formatNumber";
import Iconify from "../../../../components/iconify";

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

export default function CreateAirport(props) {
  const { handleTabChange, userData } = props;
  const [tabValue, setTabValue] = useState("1");
  const [cities, setCities] = useState(["city 1", "city 2"]);
  const [airportData, setAirportData] = useState({
    airport_name: null,
    iata_code: null,
    iaco_code: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileRows, setFileRows] = useState([]);
  const [open, setOpen] = useState(null);
  const [fileIndex, setFileIndex] = useState(null);

  const handleOpenMenu = (event,index) => {
    console.log(event);
    console.log(index);
    setFileIndex(index);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickAlert = () => {
    setOpenAlert(!openAlert);
  };

  const handleTripTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    const updatedAirportData = { ...airportData };
    updatedAirportData[field] = value;
    setAirportData(updatedAirportData);
    setValidationErrors({});
  };

  const validate = () => {
    let errors = {};

    return errors;
  };

  const handleSubmitAircraft = (event) => {
    // console.log('It worked');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  };

  function createData(file, size) {
    return { file, size };
  }

  const handleAddFiles = (event) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    setFiles([]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    handleCloseMenu();
  };

  useEffect(() => {
    let rows = [];
    selectedFiles.map((file) => {
      rows = [...rows, createData(file.name, fData(file.size))];
    });
    setFileRows(rows);
  }, [selectedFiles]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/app/dashboard">
      Dashboard
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/app/masters">
      Masters
    </Link>,
    <Typography key="3" color="text.disabled">
      Airport
    </Typography>,
    <Typography key="4" color="text.disabled">
      New Airport
    </Typography>,
  ];

  return (
    <>
      <Helmet>
        <title>Airport Create | GAMA AirOps </title>
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
              Create&nbsp;a&nbsp;new&nbsp;airport
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
          <TabContext value={tabValue}>
            <TabList
              onChange={handleTripTabChange}
              aria-label="lab API tabs example"
              sx={{ borderRadius: "10px 10px 0px 0px" }}
            >
              <Tab label="Airport Details" value="1" />
              <Tab label="Attachment" value="2" />
              <Tab label="Watch Hrs./Available slot" value="3" />
            </TabList>
            <Divider sx={{ borderStyle: "dashed" }} />
            <TabPanel value="1">
              {/*Tap 1 for Ariport Details  */}
              <Box flexGrow={1}>
                <Grid container columnSpacing={3}>
                  <Grid item xs={12} md={7}>
                    <Grid
                      container
                      spacing={{ xs: 1, md: 3 }}
                      columns={{ xs: 12, md: 7 }}
                    >
                      <Grid item xs={12} md={7}>
                        <TextField
                          id="airport_name"
                          size="small"
                          fullWidth
                          required
                          label="Airport Name"
                          onChange={(event) => {
                            handleInputChange(
                              "airport_name",
                              event.target.value
                            );
                          }}
                          error={Boolean(validationErrors.airport_name)}
                          helperText={validationErrors.airport_name}
                        />
                      </Grid>
                      <Grid item xs={6} md={3.5}>
                        <TextField
                          id="iata_code"
                          size="small"
                          fullWidth
                          required
                          label="IATA Code"
                          onChange={(event) => {
                            handleInputChange("iata_code", event.target.value);
                          }}
                          error={Boolean(validationErrors.iata_code)}
                          helperText={validationErrors.iata_code}
                        />
                      </Grid>
                      <Grid item xs={6} md={3.5}>
                        <TextField
                          id="iaco_code"
                          size="small"
                          fullWidth
                          required
                          label="IACO Code"
                          onChange={(event) => {
                            handleInputChange("iaco_code", event.target.value);
                          }}
                          error={Boolean(validationErrors.iaco_code)}
                          helperText={validationErrors.iaco_code}
                        />
                      </Grid>
                      <Grid item xs={12} md={3.5}>
                        <Grid
                          container
                          spacing={1}
                          columns={{ xs: 12, md: 3.5 }}
                        >
                          <Grid item xs={10} md={2.7}>
                            <Autocomplete
                              value={airportData.city}
                              onChange={(event, newValue) => {
                                handleInputChange("city", newValue);
                              }}
                              disablePortal
                              id={"combo-box-city"}
                              isOptionEqualToValue={(option, value) =>
                                option.id === value.id
                              }
                              size="small"
                              options={cities}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="City"
                                  // error={Boolean(
                                  //   validationErrors["departure" + index]
                                  // )}
                                  // helperText={validationErrors["departure" + index]}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={2} md={0.5}>
                            <Tooltip title="New City">
                              <Button
                                to={"/app/masters/city"}
                                variant="contained"
                                color="info"
                                component={RouterLink}
                              >
                                <AddIcon />
                              </Button>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={3.5}>
                        <TextField
                          disabled
                          value={"India"}
                          id="iaco_code"
                          size="small"
                          fullWidth
                          label="Country"
                        />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <Grid
                          container
                          spacing={1.5}
                          columns={{ xs: 12, md: 7 }}
                        >
                          <Grid item xs={12} md={7}>
                            <Typography
                              variant="subtitle2"
                              color={"text.secondary"}
                            >
                              Note: Latitude / Longitude should be in decimal format
                              only. (Ex: 23.022505)
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={3.5}>
                            <TextField
                              id="latitude"
                              size="small"
                              label="Latitude"
                              onChange={(event) => {
                                handleInputChange(
                                  "latitude",
                                  event.target.value
                                );
                              }}
                              error={Boolean(validationErrors.latitude)}
                              helperText={validationErrors.latitude}
                            />
                          </Grid>
                          <Grid item xs={6} md={3.5}>
                            <TextField
                              id="longitude"
                              size="small"
                              label="Longitude"
                              onChange={(event) => {
                                handleInputChange(
                                  "longitude",
                                  event.target.value
                                );
                              }}
                              error={Boolean(validationErrors.longitude)}
                              helperText={validationErrors.longitude}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          id="remarks"
                          label="Remarks"
                          placeholder="Some remarks"
                          multiline
                          rows={2}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">
                            Airport Type :
                          </FormLabel>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value="top"
                              control={<Checkbox />}
                              label="Critical Airport"
                            />
                            <FormControlLabel
                              value="start"
                              control={<Checkbox />}
                              label="Alertable Airport"
                            />
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box height={200}></Box>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              {/*Tap 2 for Attachment  */}
              <Box width={"100%"} minHeight={200} position={"relative"}>
                <FilesUpload files={files} setFiles={setFiles} />

                {files.length > 0 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Stack
                        spacing={2}
                        alignItems="center"
                        justifyContent={"center"}
                        direction={"row"}
                      >
                        <Button
                          onClick={handleAddFiles}
                          variant="contained"
                          startIcon={<AddIcon />}
                        >
                          Add
                        </Button>
                        {/* <Button color='error' variant="contained" startIcon={<AddIcon />}>
                Clear All
                </Button> */}
                      </Stack>
                    </Grid>
                  </Grid>
                )}
                <Scrollbar sx={{ mt: 3 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table" size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No:</TableCell>
                          <TableCell>File</TableCell>
                          <TableCell>Size</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!(fileRows.length > 0) && (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <Stack spacing={1}>
                                <Box
                                  component="img"
                                  src="/assets/icons/ic_content.svg"
                                  sx={{ height: 120, mx: "auto" }}
                                />{" "}
                                <Typography
                                  textAlign={"center"}
                                  variant="h6"
                                  color={"text.secondary"}
                                  component={"span"}
                                >
                                  No Data
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                        {fileRows.map((row, index) => (
                          <TableRow
                            hover
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.file}</TableCell>
                            <TableCell>{row.size}</TableCell>
                            <TableCell align="right">
                            
                          <IconButton
                            size="small"
                            color="inherit"
                            onClick={(event)=>{handleOpenMenu(event,index)}}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
                <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          View
        </MenuItem>

        <MenuItem onClick={()=>{handleRemoveFile(fileIndex)}} sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Remove
        </MenuItem>
                </Popover>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              {/*Tap 3 for Watch Hrs./Available slot */}
              <Box flexGrow={1} minHeight={200}>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                  <Typography
                              variant="subtitle2"
                              color={"text.secondary"}
                            >
                              Note: To Time must be greater than From Time and Select atleast one day.
                            </Typography>
                  </Grid>
                  <Grid item xs={12} md={2.5}>
                  <TextField
                  id="ariport_from_time"
                  size="small"
                  fullWidth
                  label="From Time (HH:MM)"
                  // value={aircraftData.block_opening_hrs}
                  // onChange={(event) => {
                  //   handleInputChange("block_opening_hrs", event.target.value);
                  // }}
                />
                    </Grid>
                    <Grid item xs={12} md={2.5}>
                    <TextField
                  id="ariport_to_time"
                  size="small"
                  fullWidth
                  label="To Time (HH:MM)"
                  // value={aircraftData.block_opening_hrs}
                  // onChange={(event) => {
                  //   handleInputChange("block_opening_hrs", event.target.value);
                  // }}
                />
                    </Grid>
                    <Grid item xs={12} md={6.1}>
                    <FormGroup aria-label="position" row>
        <FormControlLabel
          value="Mon"
          control={<Checkbox />}
          label="Mon"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Tue"
          control={<Checkbox />}
          label="Tue"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Wed"
          control={<Checkbox />}
          label="Wed"
          labelPlacement="end"
        />
        <FormControlLabel
          value="Thu"
          control={<Checkbox />}
          label="Thu"
          labelPlacement="end"
        />
                <FormControlLabel
          value="Fri"
          control={<Checkbox />}
          label="Fri"
          labelPlacement="end"
        />
                <FormControlLabel
          value="Sat"
          control={<Checkbox />}
          label="Sat"
          labelPlacement="end"
        />
                <FormControlLabel
          value="Sun"
          control={<Checkbox />}
          label="Sun"
          labelPlacement="end"
        />
      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={0.9}>
                    <Button
                          fullWidth
                          // onClick={handleAddFiles}
                          variant="contained"
                          startIcon={<AddIcon />}
                        >
                          Add
                        </Button>
                    </Grid>
              </Grid>
              <Scrollbar sx={{ mt: 3 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table" size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No:</TableCell>
                          <TableCell>From Time</TableCell>
                          <TableCell>To Time</TableCell>
                          <TableCell>Days</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {!(fileRows.length > 0) && (
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Stack spacing={1}>
                                <Box
                                  component="img"
                                  src="/assets/icons/ic_content.svg"
                                  sx={{ height: 120, mx: "auto" }}
                                />{" "}
                                <Typography
                                  textAlign={"center"}
                                  variant="h6"
                                  color={"text.secondary"}
                                  component={"span"}
                                >
                                  No Data
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                        {fileRows.map((row, index) => (
                          <TableRow
                            hover
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.file}</TableCell>
                            <TableCell>{row.size}</TableCell>
                            <TableCell align="right">
                            
                          <IconButton
                            size="small"
                            color="inherit"
                            onClick={(event)=>{handleOpenMenu(event,index)}}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>
                <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          View
        </MenuItem>

        <MenuItem onClick={()=>{handleRemoveFile(fileIndex)}} sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Remove
        </MenuItem>
                </Popover>
              </Box>
            </TabPanel>
            <Divider sx={{ borderStyle: "dashed" }} />
            <Box flexGrow={1} p={2}>
              <Grid container columnSpacing={3}>
                <Grid item xs={6} md={8}></Grid>
                <Grid item xs={3} md={2}>
                  <SubmitButton
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={handleSubmitAircraft}
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
                          Created data and Changes you where made can't be
                          save..!
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
          </TabContext>
        </Card>


      </Container>
    </>
  );
}
