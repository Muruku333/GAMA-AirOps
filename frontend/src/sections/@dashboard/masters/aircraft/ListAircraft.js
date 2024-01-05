import { useEffect, useState } from "react";
// @mui ------------------------------------------------------
import {Link,Typography, Stack, Button, Box,Checkbox,IconButton,Paper,Popover,MenuItem, Breadcrumbs, Container, Card, TableContainer, Table, TableBody, TableRow,TableCell, TablePagination} from "@mui/material";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
// Components -----------------------------------------------
import ListToolBar from "./ListToolBar";
import ListHead from "./ListHead";
import Iconify from "../../../../components/iconify/Iconify";
import Scrollbar from "../../../../components/scrollbar";
import { filter } from "lodash";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Label from "../../../../components/label";

const API_URL = process.env.REACT_APP_API_URL;

const TABLE_HEAD = [
  { id: "reg_no", label: "Reg.No.", alignRight: false },
  { id: "model_name", label: "Model", alignRight: false },
  { id: "min_cabin_crew", label: "Cabin Crew", alignRight: false },
  { id: "min_flight_crew", label: "Flight Crew", alignRight: false },
  { id: "no_of_captain", label: "Captain(s)", alignRight: false },
  { id: "no_of_fo", label: "FO(s)", alignRight: false },
  { id: "c_cls_capacity", label: "cCls Capacity", alignRight: false },
  { id: "y_cls_capacity", label: "yCls Capacity", alignRight: false },
  { id: "seating_capacity", label: "Sitting Capacity", alignRight: false },
  { id: "not_in_service", label: "In Service", alignRight: false },
  { id: "not_in_service_from", label: "Not In Service From", alignRight: false },
  { id: "last_arrival", label: "Last Arrival", alignRight: false },
  { id: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_aircraft) => _aircraft.reg_no.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListAircraft(props){
    
 const { handleTabChange, handleClickEdit, handleClickDelete, refresh, setStatus, loggedUser}=props;   // handleViewClick,

 const [aircraftsRows, setAircraftsRows]=useState([]);

 const [aircraftId, setAircraftId]=useState(null);

 const [open, setOpen] = useState(null);

 const [page, setPage] = useState(0);

 const [order, setOrder] = useState("asc");

 const [selected, setSelected] = useState([]);

 const [orderBy, setOrderBy] = useState("row_num");

 const [filterName, setFilterName] = useState("");

 const [rowsPerPage, setRowsPerPage] = useState(5);

 useEffect(()=>{
  const fetchData= async()=>{
    
    try {
      await axios.get(`${API_URL}/api/aircrafts`).then((response)=> {
        if(response.data.status){
          setAircraftsRows(response.data.results);
          // console.log(response.data.results);
        }
      }).catch((error)=> {
        setAircraftsRows([]);
        setStatus({
          open:true,
          type:'error',
          message:error.response.data.message,
        });
      });
    } catch (error) {
      setAircraftsRows([]);
      setStatus({
        open:true,
        type:'error',
        message:"Network Connection Error",
      });
    }
  }
  fetchData();
 },[refresh]);

 const handleOpenMenu = (event, id) => {
  setAircraftId(id);
  setOpen(event.currentTarget);
};

const handleCloseMenu = () => {
  setOpen(null);
};

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = aircraftsRows.map((n) => n.aircraft_id);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }
  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setPage(0);
  setRowsPerPage(parseInt(event.target.value, 10));
};

const handleFilterByName = (event) => {
  setPage(0);
  setFilterName(event.target.value);
};

const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - aircraftsRows.length) : 0;

const filteredAircrafts = applySortFilter(
  aircraftsRows,
  getComparator(order, orderBy),
  filterName
);

const isNotFound = !filteredAircrafts.length && !!filterName;


 const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/app/dashboard"
    >
      Dashboard
    </Link>,
    <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/app/masters"
  >
    Masters
  </Link>,
  <Typography key="3" color='text.disabled'>
      Aircraft
      </Typography>,
    <Typography key="4" color='text.disabled'>
      List
    </Typography>,
  ];

    return (
        <>
      <Helmet>
        <title> Aircraft List | GAMA AirOps </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" gutterBottom>
             Aircraft&nbsp;List
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
            startIcon={<AddIcon fontSize="large" />}
            onClick={() => {
              handleTabChange("2");
            }}
          >
            New&nbsp;Aircraft
          </Button>
        </Stack>

        <Card>
        <ListToolBar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
          <Scrollbar>
            
          <TableContainer sx={{ maxHeight:450, minWidth: 800 }}>
            <Table
              stickyHeader aria-label="sticky table" size="small"
            >
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={aircraftsRows.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

<TableBody>
{!(filteredAircrafts.length > 0) && !(isNotFound) && (
                          <TableRow sx={{height:300}}>
                            <TableCell colSpan={13}>
                              <Stack spacing={1}>
                                <Box
                                  component="img"
                                  src="/assets/icons/ic_content.svg"
                                  sx={{ height: 120, mx: "auto" }}
                                />{" "}
                                <Typography
                                  textAlign={"center"}
                                  variant="subtitle1"
                                  color={"text.secondary"}
                                  component={"span"}
                                >
                                  No Data
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                {filteredAircrafts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      aircraft_id,
                      reg_no,
                      min_cabin_crew,
                      min_flight_crew,
                      no_of_captain,
                      no_of_fo,
                      no_of_fe,
                      c_cls_capacity,
                      y_cls_capacity,
                      seating_capacity,
                      time_format,
                      local_time,
                      utc_time,
                      block_opening_hrs,
                      time_in_air_opening_hrs,
                      not_in_service,
                      not_in_service_from,
                      freight_capacity,
                      unit,
                      last_arrival,
                      operator,
                      aircraft_model,
                    } = row;
                    const selectedAircraft = selected.indexOf(aircraft_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={aircraft_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedAircraft}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedAircraft}
                            onChange={(event) =>
                              handleClick(event, aircraft_id)
                            }
                          />
                        </TableCell> */}

                        <TableCell align="left">
                          <Typography variant="subtitle2" noWrap>
                            {reg_no}
                          </Typography>
                        </TableCell>

                        <TableCell align="left">{aircraft_model.model_name}</TableCell>

                        <TableCell align="left">{min_cabin_crew}</TableCell>

                        <TableCell align="left">{min_flight_crew}</TableCell>

                        <TableCell align="left">{no_of_captain}</TableCell>

                        <TableCell align="left">{no_of_fo}</TableCell>

                        <TableCell align="left">{c_cls_capacity}</TableCell>

                        <TableCell align="left">{y_cls_capacity}</TableCell>

                        <TableCell align="left">{seating_capacity}</TableCell>

                        <TableCell align="left">
                          <Label color={not_in_service?'error':'success'}>{not_in_service?"No":"Yes"}</Label>
                          </TableCell>

                        <TableCell align="left">
                          {not_in_service?<Label color='error'>{`${new Date(not_in_service_from).toLocaleDateString("en-GB",{
           day: '2-digit',
           month: 'short',
           year: 'numeric',
       })}`}</Label>:null}
                        </TableCell>

                        <TableCell align="left">{last_arrival}</TableCell>

                        <TableCell align="right">
                          <IconButton
                            // size="large"
                            color="inherit"
                            onClick={(e)=>{handleOpenMenu(e,aircraft_id)}}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={13} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={13} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
      </Table>
</TableContainer>
</Scrollbar>
<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={aircraftsRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Card>

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
        <MenuItem onClick={()=>{handleClickEdit(aircraftId);handleCloseMenu();}}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={()=>{handleClickDelete(aircraftId);handleCloseMenu();}}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
        </>
    );
}