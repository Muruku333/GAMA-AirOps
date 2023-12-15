import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const API_URL = process.env.REACT_APP_API_URL;

const TABLE_HEAD = [
  { id: "country_name", label: "Country Name", alignRight: false },
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
      (_country) =>_country.country_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ListCountry(props){
    
 const {handleClickCreate, handleClickEdit, handleClickDelete, setStatus, refreshed, loggedUser}=props; 

 const [countryRows, setCountryRows]=useState([]);

 const [open, setOpen] = useState(null);

 const [page, setPage] = useState(0);

 const [order, setOrder] = useState("asc");

 const [selected, setSelected] = useState([]);

 const [orderBy, setOrderBy] = useState("row_num");

 const [filterName, setFilterName] = useState("");

 const [rowsPerPage, setRowsPerPage] = useState(5);

 const [countryId, setCountryId]= useState(null);

 useEffect(()=>{
  const fetchData= async()=>{
    
    try {
      await axios.get(`${API_URL}/api/countries`).then((response)=> {
        if(response.data.status){
          setCountryRows(response.data.results);
          // console.log(response.data.results);
        }
      }).catch((error)=> {
        setCountryRows([]);
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
        message:"Network Connection Error",
      });
    }
  }
  fetchData();
 },[refreshed]);

 const handleOpenMenu = (event, id) => {
  setCountryId(id);
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
    const newSelecteds = countryRows.map((n) => n.country_id);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

// const handleClick = (event, name) => {
//   const selectedIndex = selected.indexOf(name);
//   let newSelected = [];
//   if (selectedIndex === -1) {
//     newSelected = newSelected.concat(selected, name);
//   } else if (selectedIndex === 0) {
//     newSelected = newSelected.concat(selected.slice(1));
//   } else if (selectedIndex === selected.length - 1) {
//     newSelected = newSelected.concat(selected.slice(0, -1));
//   } else if (selectedIndex > 0) {
//     newSelected = newSelected.concat(
//       selected.slice(0, selectedIndex),
//       selected.slice(selectedIndex + 1)
//     );
//   }
//   setSelected(newSelected);
// };

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
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countryRows.length) : 0;

const filteredCountries = applySortFilter(
  countryRows,
  getComparator(order, orderBy),
  filterName
);

const isNotFound = !filteredCountries.length && !!filterName;

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
      Country
      </Typography>,
    <Typography key="4" color='text.disabled'>
      List
    </Typography>,
  ];

    return (
        <>
      <Helmet>
        <title> Country List | GAMA AirOps </title>
      </Helmet>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Box>
            <Typography variant="h4" gutterBottom>
             Country&nbsp;List
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
            onClick={handleClickCreate}
          >
            New&nbsp;Country
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
                rowCount={countryRows.length}
                numSelected={selected.length}y
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />

<TableBody>
{!(filteredCountries.length > 0) && !(isNotFound) && (
                          <TableRow sx={{height:300}}>
                            <TableCell colSpan={5}>
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
                {filteredCountries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      country_id,
                      country_name,
                    } = row;
                    const selectedCountry = selected.indexOf(country_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={country_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedCountry}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedCountry}
                            onChange={(event) =>
                              handleClick(event, country_id)
                            }
                          />
                        </TableCell> */}

<TableCell align="left">
                          <Typography variant="subtitle2" noWrap>
                            {country_name}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            // size="large"
                            color="inherit"
                            onClick={(e)=>{handleOpenMenu(e,country_id)}}
                          >
                            <Iconify icon={"eva:more-vertical-fill"} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
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
          count={countryRows.length}
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
        <MenuItem onClick={()=>{handleClickEdit(countryId);handleCloseMenu();}}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={()=>{handleClickDelete(countryId);handleCloseMenu();}}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
        </>
    );
}