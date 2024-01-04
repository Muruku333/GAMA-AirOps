import { useEffect, useState } from "react";
// @mui ------------------------------------------------------
import {Link,Typography, Stack, Button, Box,Checkbox,IconButton,Paper,Popover,MenuItem, ListItemText, Breadcrumbs, Container, Card, TableContainer, Table, TableBody, TableRow,TableCell, TablePagination, Avatar} from "@mui/material";
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

// function blobToUrl(blob) {
//   console.log(blob);
//   // console.log( URL.createObjectURL(blob));
//   if (!(blob instanceof Blob)) {
//     // console.error('Invalid argument: Expected a Blob');
//     return null;
//   }

//   return URL.createObjectURL(blob);
// }

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "code", label: "Code", alignRight: false },
  { id: "city", label: "City", alignRight: false },
  { id: "designation", label: "Designation", alignRight: false },
  { id: "date_of_birth", label: "Date Of Birth", alignRight: false },
  { id: "not_in_Service", label: "In Service", alignRight: false },
  { id: "not_in_service_from", label: "Not In Service From", alignRight: false },
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
      (_crew) => _crew.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListCrew(props){
    
  const { handleTabChange, handleClickEdit, handleClickDelete, refresh, setStatus, loggedUser}=props;   // handleViewClick,

 const [crewRows, setCrewRows]=useState([]);

 const [crewId, setCrewId]= useState(null);

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
      await axios.get(`${API_URL}/api/crews`).then((response)=> {
        if(response.data.status){
          setCrewRows(response.data.results);
          // console.log(response.data.results);
        }
      }).catch((error)=> {
        setCrewRows([]);
        setStatus({
          open:true,
          type:'error',
          message:error.response.data.message,
        });
      });
    } catch (error) {
      setCrewRows([]);
      setStatus({
        open:true,
        type:'error',
        message:"Network Connection Error",
      });
    }
  }
  fetchData();
 },[refresh]);

 function getAvatarImage(buffer){
  if(!buffer){
    return null;
  }
  console.log(buffer.data);
  console.log(buffer);
  const blob = new Blob([buffer],{ type: 'image/jpeg' });
  // console.log(blob);
  const url = URL.createObjectURL(blob);
  console.log(url);
  return url;
}

 const handleOpenMenu = (event, id) => {
  setCrewId(id);
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
    const newSelecteds = crewRows.map((n) => n.crew_id);
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
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - crewRows.length) : 0;

const filteredCrews = applySortFilter(
  crewRows,
  getComparator(order, orderBy),
  filterName
);

const isNotFound = !filteredCrews.length && !!filterName;

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
      Crew
      </Typography>,
    <Typography key="4" color='text.disabled'>
      List
    </Typography>,
  ];

    return (
        <>
      <Helmet>
        <title> Crew List | GAMA AirOps </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" gutterBottom>
            Crew&nbsp;List
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
            New&nbsp;Crew
          </Button>
        </Stack>

        <Card>
        <ListToolBar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
          <Scrollbar>
            
          <TableContainer sx={{ minWidth: 800 }}>
            <Table
              stickyHeader aria-label="sticky table"
            >
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={crewRows.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

<TableBody>
{!(filteredCrews.length > 0) && !(isNotFound) && (
                          <TableRow sx={{height:300}}>
                            <TableCell colSpan={8}>
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
                {filteredCrews
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      crew_id,
                      photo,
                      name,
                      code,
                      nationality,
                      city,
                      designation,
                      on_duty_as,
                      date_of_birth,
                      email,
                      not_in_service,
                      not_in_service_from,
                      created_by,
                      created_at,
                    } = row;
                    const selectedCrew = selected.indexOf(crew_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={crew_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedCrew}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedCrew}
                            onChange={(event) =>
                              handleClick(event, crew_id)
                            }
                          />
                        </TableCell> */}

                        <TableCell align="left">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Box component='img' alt={name} src={avatarUrl} /> */}
                            <Avatar alt={name} src={photo} sx={{ width: 56, height: 56 }} />
                            {/* <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography> */}
                            <ListItemText primary={<Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>} secondary={email} />
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{code}</TableCell>

                        <TableCell align="left">{city}</TableCell>

                        <TableCell align="left">{designation}</TableCell>

                        <TableCell align="left">{`${new Date(date_of_birth).toLocaleDateString("en-GB",{
           day: '2-digit',
           month: 'short',
           year: 'numeric',
       })}`}</TableCell>

<TableCell align="left">
                          <Label color={not_in_service?'error':'success'}>{not_in_service?"No":"Yes"}</Label>
                          </TableCell>

                        <TableCell align="left">
                          {not_in_service?<Label color='error'>{`${new Date(not_in_service_from).toLocaleDateString("en-GB")}`}</Label>:null}
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpenMenu}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
          count={crewRows.length}
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
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
        </>
    );
}