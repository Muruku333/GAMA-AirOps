import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import DoneIcon from "@mui/icons-material/Done";
import { Autocomplete, Box, Container, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Popper from "@mui/material/Popper";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
// import ResponsiveAppBar from "../../components/Header";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateField } from "@mui/x-date-pickers/DateField";
import Divider from "@mui/material/Divider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Table from "@mui/material/Table";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { getDistance } from "geolib";
import { Template, generate } from "@pdfme/generator";
import { saveAs } from "file-saver";

import enIN from "date-fns/locale/en-IN";
import MapWithMarkers from "./MapWithMarkers";
import MapComponent from "./MapComponent";
import { Helmet } from "react-helmet-async";
import { categories, paxDetails,getCoordinatesFromNominatim, removeCommas, formatCurrency } from "./Utils";

const googleMapsApiKey = ""; // google API Key

const MAX_CATEGORY=700000;
const MIN_CATEGORY=(categories[2].value/100) * 75;

const flightKM = 720.5;
const flightKnots = 448;
const flightMiles = 515.55;
const takeoffLandingTime = 30; // in minutes

export default function EditQuotation({ handleTabChange, customerIdToEdit, DB_URL, loggedInUserId}) {
  const navigate=useNavigate();

  function handleBreadCrumbsClick(event,path) {
    event.preventDefault();
    // console.info("You clicked a breadcrumb.");
    // console.log(event);
    // navigate(`/${event.target.innerText}`.toLocaleLowerCase().replace(" ","_"));
    // window.open(event.target.href, "_self");
    navigate(path);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1F78E9",
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
      backgroundColor: "#00000018",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const columns = [
    { id: "row_num", label: "S.No" },
    // { id: "id", label: "Quotation ID" },
    { id: "quotation_no", label: "Quotation No" },
    { id: "customer_name", label: "Customer Name" },
    { id: "label", label: "Aircraft Type" },
    { id: "Date", label: "Quotation Date" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [aircrafts, setAircrafts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categoriesPricing, setCategoriesPricing] = useState({
    category_id: 1,
    duration: "",
    amount_1: 0.0,
    amount_2: 0.0,
    amount_3: 0.0,
    subTotal_1: 0.0,
    subTotal_2: 0.0,
    subTotal_3: 0.0,
    gst_1: 0.0,
    gst_2: 0.0,
    gst_3: 0.0,
    grandTotal_1: 0.0,
    grandTotal_2: 0.0,
    grandTotal_3: 0.0,
    customer_id: 0,
  });
  const [users, setUsers] = useState([]);
  const [assignedTo,setAssignedTo]=useState(null);
  const [quotationId, setQuotationId]=useState(0);
  const [quotationNo, setQuotationNo] = useState("");
  const [quotationDate,setQuotationDate]=useState('2023-01-01');
  const [totalMinutes, setTotalMinutes] = React.useState(0);
  const [durationValue, setDurationValue] = React.useState("0 hr 0 min");
  const [price, setPrice] = React.useState(0);
  const subTotal = 0;
  const gst = 18;
  const total = 0;

  const [aircraft, setAircraft] = useState("");
  const [customerId, setCustomerId] = useState(0);
  // const [tripId,setTripId]=useState(0);
  const [customerName, setCustomerName] = useState("");
  const [aircraftId, setAircraftId] = useState(0);
  const [aircraftValue, setAircraftValue] = useState(0);

  const [selectedCategory, setSelectedCategory] = React.useState(
    categories[1].value
  );
  const [cusVal, setCusVal] = React.useState(0);
  const [cusValConf, setCusValConf] = React.useState(0);
  const [discount, setDiscount] = useState(0);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [validationErrors, setValidationErrors] = useState({});
  // ***************** Start of Line items *******************

  const [containers, setContainers] = useState([]);
  // {
  //   departure: "",
  //   arrival: "",
  //   pax: "",
  //   dateTime: null,
  //   totalMin: 0,
  //   amount: 0,
  // },

  const addContainer = () => {
    // const newContainerId = containers.length + 1;
    setContainers((prevContainers) => [
      ...prevContainers,
      {
        departure: containers[containers.length - 1].arrival,
        arrival: "",
        pax: "",
        dateTime: null,
        totalMin: 0,
        amount: "0.00",
      },
    ]);
  };

  const deleteContainer = (index) => {
    setContainers((prevContainers) =>
      prevContainers.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (index, field, value) => {
    const updatedContainers = [...containers];
    if (index !== containers.length - 1 && field === "arrival") {
      updatedContainers[index + 1]["departure"] = value;
    }
    // console.log(value);
    if (field==="totalMin"){
      updatedContainers[index]["amount"]= formatCurrency((Math.ceil(value / 15) * (selectedCategory/4)).toFixed(2));
    }

    updatedContainers[index][field] = value;

    setContainers(updatedContainers);
    setValidationErrors({});

    if (field === "departure" || field === "arrival") {
      calculateValues(index);
      // console.log(containers);
    }
  };

  // ***************** End of Line items *******************

  // ***************** Start of Charge boxes *******************

  const [chargeBoxes, setChargeBoxes] = useState([]);
  // {
  //   title: "Airport Handling Charges",
  //   value: 0,
  // }

  const addChargeBoxes = () => {
    setChargeBoxes((prevBoxes) => [
      ...prevBoxes,
      {
        title: titleValue,
        value: 0,
      },
    ]);
    setTitleValue("");
    setOpen(false);
    setAnchorEl(null);
  };

  const deleteChargeBoxes = (index) => {
    setChargeBoxes((prevBoxes) => prevBoxes.filter((_, i) => i !== index));
  };

  const changeTitle=(index,newTitle)=>{
    const updatedBoxes = [...chargeBoxes];
    updatedBoxes[index]["title"]=newTitle;
    setChargeBoxes(updatedBoxes);
  }

  const handleInputChangeForBoxes = (event, index, field) => {
    const updatedBoxes = [...chargeBoxes];
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    updatedBoxes[index][field] = Number(value);
    setChargeBoxes(updatedBoxes);
  };

  // ***************** End of Charge boxes *******************

  const [titleValue, setTitleValue] = useState("");

  const handleTitleValueChange = (event) => {
    let value = event.target.value;
    setTitleValue(value);
  };

  useEffect(() => {
    const updatedContainers=[...containers];
    for (let i = 0; i < containers.length; i++) {
      // calculateValues(i);
      // handleInputChange(i,"totalMin",containers[i]["totalMin"]);
      updatedContainers[i]["amount"] = formatCurrency(((Math.ceil(updatedContainers[i]["totalMin"]/15) * (selectedCategory/4))).toFixed(2));
    }
    setContainers(updatedContainers);
  }, [selectedCategory]);

  const calculateValues = async (index) => {
    const container = containers[index];
    const { departure, arrival } = container;
    if (index === null || departure === null || arrival === null) {
      return;
    }

    if (departure && arrival) {
      if (departure === arrival) {
        let errors = {};
        errors["departure" + index] = "Departure and Arrival can't be same.";
        errors["arrival" + index] = "Departure and Arrival can't be same.";
        setValidationErrors(errors);
        return;
      }
      // const geocoder = new window.google.maps.Geocoder();

      // geocoder.geocode(
      //   { address: departure.name },
      //   (sourceResults, sourceStatus) => {
      //     if (sourceStatus === "OK") {
      //       const sourceLatLng = sourceResults[0].geometry.location;

      //       geocoder.geocode(
      //         { address: arrival.name },
      //         (destinationResults, destinationStatus) => {
      //           if (destinationStatus === "OK") {
      //             const destinationLatLng =
      //               destinationResults[0].geometry.location;

      //             const distance =
      //               window.google.maps.geometry.spherical.computeDistanceBetween(
      //                 sourceLatLng,
      //                 destinationLatLng
      //               ) / 1000; // Convert meters to kilometers

      //             const speed = flightKM; // Speed in kilometers per hour

      //             const timeInHours = distance / speed;
      //             const takeoffLandingTime = 0.5; // Takeoff and landing time in hours
      //             const totalTimeInHours = timeInHours + takeoffLandingTime;

      //             const hours = Math.floor(totalTimeInHours);
      //             const minutes = Math.round((totalTimeInHours - hours) * 60);

      //             // const chargePerMinute = categories[1].valuePerMin; // Charge per minute in rupees
      //             const chargePerQuarter = categories[1].valuePerQua; // Charge per quarter of an hour in rupees
      //             const totalMinutes = hours * 60 + minutes; // Total minutes
      //             // const totalCharge = totalMinutes * chargePerMinute; // Total charge in rupees
      //             const totalCharge =
      //               Math.ceil(totalMinutes / 15) * chargePerQuarter; // Total charge in rupees

      //             setContainers((prevContainers) => {
      //               const updatedContainer = {
      //                 ...prevContainers[index],
      //                 totalMin: totalMinutes,
      //                 amount: formatCurrency(totalCharge.toFixed(2)),
      //               };
      //               return Object.assign([], prevContainers, {
      //                 [index]: updatedContainer,
      //               });
      //             });

      //             // const updatedRoutes = [...routes];
      //             // updatedRoutes[index].distance = distance.toFixed(2) + ' km';
      //             // updatedRoutes[index].timeTaken = timeString;
      //             // updatedRoutes[index].chargePerMinute = chargePerMinute;
      //             // updatedRoutes[index].totalCharge = totalCharge.toFixed(2) + ' rupees';
      //             // setRoutes(updatedRoutes);
      //           } else {
      //             alert("Error: " + destinationStatus);
      //           }
      //         }
      //       );
      //     } else {
      //       alert("Error: " + sourceStatus);
      //     }
      //   }
      // );
      try {
        const coordinates1 = await getCoordinatesFromNominatim(departure.name);
        const coordinates2 = await getCoordinatesFromNominatim(arrival.name);
        // console.log(coordinates1);
        // console.log(coordinates2);
        const calculatedDistance = getDistance(coordinates1, coordinates2);
        // console.log(calculatedDistance);
        const distance = calculatedDistance / 1000; // Convert to kilometers

        const speed = flightKM; // Speed in kilometers per hour

        const timeInHours = distance / speed;
        const takeoffLandingTime = 0.5; // Takeoff and landing time in hours
        const totalTimeInHours = timeInHours + takeoffLandingTime;

        const hours = Math.floor(totalTimeInHours);
        const minutes = Math.round((totalTimeInHours - hours) * 60);

        // const chargePerMinute = categories[1].valuePerMin; // Charge per minute in rupees
        const chargePerQuarter = selectedCategory / 4; //categories[1].valuePerQua; // Charge per quarter of an hour in rupees
        const totalMinutes = hours * 60 + minutes; // Total minutes
        // const totalCharge = totalMinutes * chargePerMinute; // Total charge in rupees
        const totalCharge = Math.ceil(totalMinutes / 15) * chargePerQuarter; // Total charge in rupees

        setContainers((prevContainers) => {
          const updatedContainer = {
            ...prevContainers[index],
            totalMin: totalMinutes,
            amount: formatCurrency(totalCharge.toFixed(2)),
          };
          return Object.assign([], prevContainers, {
            [index]: updatedContainer,
          });
        });
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${DB_URL}/api/aircrafts`)
        .then((data) => setAircrafts(data.data))
        .catch((error) => console.log(error));

      await axios
        .get(`${DB_URL}/api/locations`)
        .then((data) => setLocations(data.data))
        .catch((error) => console.log(error));

      let calCulVal = 0;
      await axios
        .get(`${DB_URL}/api/quotations/${customerIdToEdit}`)
        .then((data) => {
          const quotesDetails = data.data[0];

          setQuotationId(quotesDetails.id);
          setQuotationNo(`${quotesDetails.quotation_no}`);
          setQuotationDate(`${quotesDetails.created_at}`);
          setAssignedTo({user_id:quotesDetails.user_id,label:quotesDetails.email});
          setTabValue(`${quotesDetails.trip_type}`);
          setCustomerName(quotesDetails.customer_name);
          setAircraft({
            id: quotesDetails.aircraft_id,
            label: quotesDetails.label,
            value: quotesDetails.value,
          });
          setAircraftId(quotesDetails.aircraft_id);
          setAircraftValue(quotesDetails.value);
          setDiscount(quotesDetails.discount);
          if (
            quotesDetails.category_type < 1 ||
            quotesDetails.category_type > 3
          ) {
            setCusVal(quotesDetails.category_value);
            setCusValConf(quotesDetails.category_value);
          }
          setSelectedCategory(quotesDetails.category_value);
          calCulVal = quotesDetails.category_value;
        })
        .catch((error) => console.log(error));

      await axios
        .get(`${DB_URL}/api/trip_details/${customerIdToEdit}`)
        .then((data) => {
          let dataArray = [];
          let temp = [];
          dataArray = data.data;
          dataArray.map((dataArr) => {
            temp = [
              ...temp,
              ...[
                {
                  departure: {
                    location_id: dataArr.departure_location_id,
                    label: dataArr.departure_label,
                    name: dataArr.departure_name,
                  },
                  arrival: {
                    location_id: dataArr.arrival_location_id,
                    label: dataArr.arrival_label,
                    name: dataArr.arrival_name,
                  },
                  pax: dataArr.pax,
                  dateTime: new Date(dataArr.date_time),
                  totalMin: dataArr.duration_minutes,
                  amount: formatCurrency(`${dataArr.price}`),
                  // amount: formatCurrency(`${((Math.ceil(dataArr.duration_minutes/15))*(calCulVal/4)).toFixed(2)}`),
                },
              ],
            ];
          });
          setContainers(temp);
        })
        .catch((error) => console.log(error));

      await axios
        .get(`${DB_URL}/api/charges/${customerIdToEdit}`)
        .then((data) => {
          let dataArray = [];
          let temp = [];
          dataArray = data.data;
          dataArray.map((dataArr) => {
            temp = [
              ...temp,
              ...[
                {
                  title: dataArr.title,
                  value: dataArr.value,
                },
              ],
            ];
          });
          setChargeBoxes(temp);
        })
        .catch((error) => console.log(error));

      await axios
        .get(`${DB_URL}/api/users`)
        .then((data) => {
          setUsers(data.data);
        })
        .catch((error) => console.log(error));
    };
    fetchData();
    // if (!window.google) {
    //   const script = document.createElement("script");
    //   script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=geometry`;
    //   script.defer = true;
    //   script.async = true;
    //   document.head.appendChild(script);
    // }
  }, []);

  const clearAllContainers = () => {
    setContainers([
      {
        departure: "",
        arrival: "",
        pax: "",
        dateTime: null,
        totalMin: 0,
        amount: "0.00",
      },
      {
        departure: "",
        arrival: "",
        pax: "",
        dateTime: null,
        totalMin: 0,
        amount: "0.00",
      },
    ]);
    setAirportCharges(0);
    setCrewCharges(0);
    sethaltCharges(0);
    setCalACAmount(0);
    setCalCCAmount(0);
    setCalHCAmount(0);
  };

  const [airportCharges, setAirportCharges] = useState(0);
  const [crewCharges, setCrewCharges] = useState(0);
  const [haltCharges, sethaltCharges] = useState(0);
  const [calACAmount, setCalACAmount] = useState(0);
  const [calCCAmount, setCalCCAmount] = useState(0);
  const [calHCAmount, setCalHCAmount] = useState(0);

  const [chargesTotal, setChargesTotal] = useState(0);

  const [showValues, setShowValues] = useState(false);

  const [mapShow, setMapShow] = useState(false);
  const [mapImgData, setMapImgData] = useState("");
  const [mapLatLng, setMapLatLng] = useState([{}]);
  const [mapLngLat, setMapLngLat] = useState([{}]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const [tabValue, setTabValue] = React.useState("1");

  const handleTripTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function covertToTimeString(totalMinutes) {
    // Separating Total minutes into hours and minutes.
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let timeString = "";
    if (hours > 1) {
      timeString += hours + " hrs ";
    } else if (hours > 0) {
      timeString += hours + " hr ";
    }

    if (minutes > 1) {
      timeString += minutes + " mins";
    } else if (minutes > 0) {
      timeString += minutes + " min";
    }

    return timeString;
  }

  function covertToTimeDuration(totalMinutes) {
    // Separating Total minutes into hours and minutes.
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours + ":" + minutes;
  }

  function createData(pricing, cat_1, cat_2, cat_3, cat_4) {
    return { pricing, cat_1, cat_2, cat_3, cat_4 };
  }

  function calCatAmount(catAmount) {
    let total = 0;
    containers.map((container) => {
      total += Math.ceil(container.totalMin / 15) * catAmount;
    });
    return total;
  }

  const [rows, setRows] = useState([]);

  const handleCalculatePricing = async () => {
    try {
      const totalMin = containers.reduce((accumulator, obj) => {
        return accumulator + obj.totalMin;
      }, 0);
      setTotalMinutes(totalMin);
      const durationVal = covertToTimeString(totalMin);
      setDurationValue(durationVal);

      const amount_1 = calCatAmount(categories[1].valuePerQua);
      const amount_2 = calCatAmount(categories[2].valuePerQua);
      const amount_3 = calCatAmount(categories[3].valuePerQua);
      const amount_4 = calCatAmount(cusValConf / 4);

      const subTotal_1 = amount_1 + chargesTotal;
      const subTotal_2 = amount_2 + chargesTotal;
      const subTotal_3 = amount_3 + chargesTotal;
      const subTotal_4 = amount_4 + chargesTotal;

      const st_after_discount_1 = subTotal_1 - discount;
      const st_after_discount_2 = subTotal_2 - discount;
      const st_after_discount_3 = subTotal_3 - discount;
      const st_after_discount_4 = subTotal_4 - discount;

      const gst_1 = st_after_discount_1 * 0.18;
      const gst_2 = st_after_discount_2 * 0.18;
      const gst_3 = st_after_discount_3 * 0.18;
      const gst_4 = st_after_discount_4 * 0.18;

      const grandTotal_1 = st_after_discount_1 + gst_1;
      const grandTotal_2 = st_after_discount_2 + gst_2;
      const grandTotal_3 = st_after_discount_3 + gst_3;
      const grandTotal_4 = st_after_discount_4 + gst_4;

      const rowsValue = [
        createData(
          "Flight Cost for (" + durationVal + ")",
          formatCurrency("" + Number(amount_1).toFixed(2)),
          formatCurrency("" + Number(amount_2).toFixed(2)),
          formatCurrency("" + Number(amount_3).toFixed(2)),
          formatCurrency("" + Number(amount_4).toFixed(2))
        ),
        // createData("Sub Total", formatCurrency(""+subTotal_1), formatCurrency(""+subTotal_2), formatCurrency(""+subTotal_3)),
        // createData("GST (18%)", gst_1, gst_2, gst_3),
        // createData("Grand Total", grandTotal_1, grandTotal_2, grandTotal_3),
      ];

      chargeBoxes.map((charge) => {
        let value = formatCurrency("" + Number(charge.value).toFixed(2));
        rowsValue.push(createData(charge.title, value, value, value, value));
      });

      rowsValue.push(
        createData(
          "Sub Total",
          formatCurrency("" + Number(subTotal_1).toFixed(2)),
          formatCurrency("" + Number(subTotal_2).toFixed(2)),
          formatCurrency("" + Number(subTotal_3).toFixed(2)),
          formatCurrency("" + Number(subTotal_4).toFixed(2))
        )
      );
      rowsValue.push(
        createData(
          "Discount",
          formatCurrency("" + discount.toFixed(2)),
          formatCurrency("" + discount.toFixed(2)),
          formatCurrency("" + discount.toFixed(2)),
          formatCurrency("" + discount.toFixed(2))
        )
      );
      rowsValue.push(
        createData(
          "Sub Total (After Discount)",
          formatCurrency("" + st_after_discount_1.toFixed(2)),
          formatCurrency("" + st_after_discount_2.toFixed(2)),
          formatCurrency("" + st_after_discount_3.toFixed(2)),
          formatCurrency("" + st_after_discount_4.toFixed(2))
        )
      );
      rowsValue.push(
        createData(
          "GST (18%)",
          formatCurrency("" + Number(gst_1).toFixed(2)),
          formatCurrency("" + Number(gst_2).toFixed(2)),
          formatCurrency("" + Number(gst_3).toFixed(2)),
          formatCurrency("" + Number(gst_4).toFixed(2))
        )
      );
      rowsValue.push(
        createData(
          "Grand Total",
          formatCurrency("" + Number(grandTotal_1).toFixed(2)),
          formatCurrency("" + Number(grandTotal_2).toFixed(2)),
          formatCurrency("" + Number(grandTotal_3).toFixed(2)),
          formatCurrency("" + Number(grandTotal_4).toFixed(2))
        )
      );

      setRows(rowsValue);
    } catch (error) {
      console.error(error);
    }
  };

  const setTheMap = async () => {
    let mapLatLng = [];
    let mapLngLat = [];

    // containers.map(async (container, index) => {
    //   if(container.departure!==null && container.arrival!==null){
    //   let ObjLatLng = await getCoordinatesFromNominatim(
    //     container.departure.name
    //   );
    //   //  let tempObj={
    //   //   lat:ObjLatLng.latitude,
    //   //   lng:ObjLatLng.longitude,
    //   //  }
    //   mapLatLng = [
    //     ...mapLatLng,
    //     ...[{ lat: ObjLatLng.latitude, lng: ObjLatLng.longitude }],
    //   ];
    //   if (index === containers.length - 1) {
    //     ObjLatLng = await getCoordinatesFromNominatim(
    //       container.arrival.name
    //     );
    //     mapLatLng = [
    //       ...mapLatLng,
    //       ...[{ lat: ObjLatLng.latitude, lng: ObjLatLng.longitude }],
    //     ];
    //     console.log(mapLatLng);
    //     setMapLatLng(mapLatLng);
    //   }
    // }
    // return;
    // });

    containers.map(async (container, index) => {
      if (container.departure !== null && container.arrival !== null) {
        let ObjLatLng = await getCoordinatesFromNominatim(
          container.departure.name
        );
        //  let tempObj={
        //   lat:ObjLatLng.latitude,
        //   lng:ObjLatLng.longitude,
        //  }
        mapLngLat = [
          ...mapLngLat,
          ...[
            {
              name: container.departure.name,
              coordinates: [ObjLatLng.longitude, ObjLatLng.latitude],
            },
          ],
        ];
        if (index === containers.length - 1) {
          ObjLatLng = await getCoordinatesFromNominatim(container.arrival.name);
          mapLngLat = [
            ...mapLngLat,
            ...[
              {
                name: container.arrival.name,
                coordinates: [ObjLatLng.longitude, ObjLatLng.latitude],
              },
            ],
          ];
          console.log(mapLngLat);
          setMapLngLat(mapLngLat);
          setMapShow(true);
        }
      }
      return;
    });
  };

  const handleViewPricing = async () => {
    const validationErrors = { ...validateNameAircraft(), ...validateTrips() };

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      setShowValues(false);
      return;
    }
    await handleCalculatePricing();
    await setTheMap();
    setShowValues(true);
    setTimeout(() => {
      const element = document.getElementById("end-of-first-card");
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

  useEffect(() => {
    setMapShow(false);
    handleCalculatePricing();
    setTheMap();
  }, [containers]);

  useEffect(() => {
    handleCalculatePricing();
  }, [chargeBoxes, cusValConf]);

  const validateNameAircraft = () => {
    let errors = {};

    if (!customerName) {
      errors.customerName = "Customer name is required.";
    }
    if (!aircraft) {
      errors.aircraft = "Aircraft is required.";
    }

    return errors;
  };

  const validateTrips = () => {
    let errors = {};

    containers.map((container, index) => {
      if (container.departure === container.arrival) {
        errors["departure" + index] = "Departure and Arrival can't be same.";
        errors["arrival" + index] = "Departure and Arrival can't be same.";
      }
      if (!container.departure) {
        errors["departure" + index] = "Departure is required.";
      }
      if (!container.arrival) {
        errors["arrival" + index] = "Arrival is required.";
      }
      // if (!container.pax) {
      //   errors["pax" + index] = "Required.";
      // }
      if (container.dateTime === null) {
        errors["dateTime" + index] = "Date & Time is required.";
      }
    });
    console.log(errors);
    return errors;
  };

  const validateCategory = (cusCat) => {

    if(cusCat >= MIN_CATEGORY && cusCat <= MAX_CATEGORY){
      setCusValConf(cusCat);
    }
    else{
      setCusVal(0);
      setValidationErrors({category:`Amount should be ₹ ${formatCurrency(""+MAX_CATEGORY)} to ₹ ${formatCurrency(""+MIN_CATEGORY)}`});
    }
  }

  const handleSubmit = async (catType) => {
    console.log(selectedCategory);

    const validationErrors = { ...validateNameAircraft(), ...validateTrips() };

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      // let category_value=cusValConf;
      // if(category_value===0){
      //   category_value=categories[catType].value;
      // }
      let category_value = cusValConf;
      if (catType !== 4) {
        category_value = categories[catType].value;
      }

      const postTripChargeDetails = () => {
        setTimeout(() => {
          containers.map(async (container) => {
            // const parsedDatetime = new Date(container.dateTime);
            // const formattedDatetime = parsedDatetime
            //   .toISOString()
            //   .slice(0, 19)
            //   .replace("T", " ");

            const tripData = {
              customer_id: customerIdToEdit,
              departure_location_id: container.departure.location_id,
              arrival_location_id: container.arrival.location_id,
              pax: container.pax,
              date_time: new Date(container.dateTime).toLocaleString('sv-SE'),
              duration_minutes: container.totalMin,
              price: (
                Math.ceil(container.totalMin / 15) *
                (category_value / 4)
              ).toFixed(2),
              // price: Number(removeCommas("" + container.amount)),
            };

            await axios
              .post(`${DB_URL}/api/trip_details`, tripData)
              .then((response) => {});
          });
        }, 500);

        setTimeout(async () => {
          const chargesData={customer_id:customerIdToEdit, chargeBoxes:chargeBoxes}
          await axios.post(`${DB_URL}/api/charge_boxes`, chargesData).then((res)=>{});
          // chargeBoxes.map(async (charge) => {
          //   const chargeData = {
          //     title: charge.title,
          //     value: charge.value,
          //     customer_id: customerIdToEdit,
          //   };

          //   await axios
          //     .post(`${DB_URL}/api/charge_boxes`, chargeData)
          //     .then((response) => {});
          // });
        }, 500);
      };

      const data = {
        customer_name: customerName,
        trip_type: tabValue,
        aircraft_id: aircraftId,
      };

      const postData = async () => {
        console.log(data);
        await axios
          .put(`${DB_URL}/api/customers/${customerIdToEdit}`, data)
          .then(async (response) => {
            if (response.status === 200) {
              await axios.delete(
                `${DB_URL}/api/trip_charge_edit/${customerIdToEdit}`
              );
              await postTripChargeDetails();
            }
          });
      };
      await postData();

      // const amount_1 = totalMinutes * categories[1].valuePerMin;
      // const amount_2 = totalMinutes * categories[2].valuePerMin;
      // const amount_3 = totalMinutes * categories[3].valuePerMin;

      const amount_1 = calCatAmount(categories[1].valuePerQua);
      const amount_2 = calCatAmount(categories[2].valuePerQua);
      const amount_3 = calCatAmount(categories[3].valuePerQua);
      const amount_4 = calCatAmount(cusValConf / 4);

      const subTotal_1 = amount_1 + chargesTotal;
      const subTotal_2 = amount_2 + chargesTotal;
      const subTotal_3 = amount_3 + chargesTotal;
      const subTotal_4 = amount_4 + chargesTotal;

      const st_after_discount_1 = subTotal_1 - discount;
      const st_after_discount_2 = subTotal_2 - discount;
      const st_after_discount_3 = subTotal_3 - discount;
      const st_after_discount_4 = subTotal_4 - discount;

      const gst_1 = st_after_discount_1 * 0.18;
      const gst_2 = st_after_discount_2 * 0.18;
      const gst_3 = st_after_discount_3 * 0.18;
      const gst_4 = st_after_discount_4 * 0.18;

      const grandTotal_1 = st_after_discount_1 + gst_1;
      const grandTotal_2 = st_after_discount_2 + gst_2;
      const grandTotal_3 = st_after_discount_3 + gst_3;
      const grandTotal_4 = st_after_discount_4 + gst_4;

      const categoriesPrice = {
        category_type: catType,
        category_value: category_value,
        duration: durationValue,
        discount: discount,
        amount_1: amount_1,
        amount_2: amount_2,
        amount_3: amount_3,
        amount_4: amount_4,
        subTotal_1: subTotal_1,
        subTotal_2: subTotal_2,
        subTotal_3: subTotal_3,
        subTotal_4: subTotal_4,
        st_after_discount_1: st_after_discount_1,
        st_after_discount_2: st_after_discount_2,
        st_after_discount_3: st_after_discount_3,
        st_after_discount_4: st_after_discount_4,
        gst_1: gst_1,
        gst_2: gst_2,
        gst_3: gst_3,
        gst_4: gst_4,
        grandTotal_1: grandTotal_1,
        grandTotal_2: grandTotal_2,
        grandTotal_3: grandTotal_3,
        grandTotal_4: grandTotal_4,
      };

      const quotesUpdates={
        quotation_no: quotationNo,
        assigned_to: assignedTo.user_id,
        modified_by: loggedInUserId,
      }

      setTimeout(async () => {

        await axios.put(`${DB_URL}/api/quotations/${quotationId}`, quotesUpdates).then(async (response)=>{ await axios
          .put(`${DB_URL}/api/categories/${customerIdToEdit}`, categoriesPrice)
          .then((response) => {
            getPDF(customerIdToEdit);
          });})

      }, 500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    let total = 0;
    chargeBoxes.map((charge) => {
      total += charge.value;
    });
    setChargesTotal(total);
  }, [chargeBoxes]);

  const getPDF = (customerId) => {
    console.log(customerId);
    let tripDetails = [{}];
    let quotesDetails = {};
    let categoriesCharges = {};
    let chargeBoxes = [{}];
    let data;
    try {
      setTimeout(async () => {
        console.log(customerId);

        await axios
          .get(`${DB_URL}/api/trip_details/${customerId}`)
          .then((data) => {
            tripDetails = data.data;
          })
          .catch((error) => console.log(error));

        console.log(tripDetails);

        await axios
          .get(`${DB_URL}/api/quotations/${customerId}`)
          .then((data) => {
            quotesDetails = data.data[0];
          })
          .catch((error) => console.log(error));

        // console.log(quotesDetails);

        await axios
          .get(`${DB_URL}/api/customer-pricing/${customerId}`)
          .then((data) => {
            categoriesCharges = data.data[0];
          })
          .catch((error) => console.log(error));

        // console.log(categoriesCharges);

        await axios
          .get(`${DB_URL}/api/charges/${customerId}`)
          .then((data) => {
            chargeBoxes = data.data;
          })
          .catch((error) => console.log(error));

        // console.log(chargeBoxes);

        if (tripDetails.length <= 6 && tripDetails.length !== 1) {
          // Code here is for selecting template based on no.of transit for customers
          data =
            await require(`./PDFTemplates/${quotesDetails["label"]}_${tripDetails.length}.json`);
        } else {
          data = await require(`./PDFTemplates/${quotesDetails["label"]}_6.json`);
        }

        const catType = quotesDetails["category_type"];

          const template: Template = data;

          const data_1 = {
            Header: `Thank you ${quotesDetails["customer_name"]}, Here is your brief snippet.`,
            Aircraft: `${quotesDetails["label"]}`,
            QuotationNO: `${quotesDetails["quotation_no"]}`,
            main_date: `${new Date(quotesDetails["created_at"]).toLocaleDateString(
              "en-IN"
            )}`,
            specification_text: `The ${quotesDetails["label"]} is a Mid-size twinjet corporate aircraft. It is a development of 
            the British Aerospace BAe 125, and was assembled by Hawker Beechcraft.`,
            "total-flight-time": categoriesCharges.duration,
            "flying-cost":
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`amount_${catType}`]).toFixed(2)
              ),
            "airport-handling":
              "₹ " +
              formatCurrency("" + Number(chargeBoxes[0]["value"]).toFixed(2)),
            "crew-accomodation":
              "₹ " +
              formatCurrency("" + Number(chargeBoxes[1]["value"]).toFixed(2)),
            "ground-handling":
              "₹ " +
              formatCurrency("" + Number(chargeBoxes[2]["value"]).toFixed(2)),
            "halt-charge":
              "₹ " +
              formatCurrency("" + Number(chargeBoxes[3]["value"]).toFixed(2)),
            "other-charges":
              "₹ " +
              formatCurrency("" + Number(chargeBoxes[4]["value"]).toFixed(2)),
            "sub-total":
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`subTotal_${catType}`]).toFixed(2)
              ),
            discount:
              "- ₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`discount`]).toFixed(2)
              ),
            Sub_Total_Discount:
              "₹ " +
              formatCurrency(
                "" +
                  Number(
                    categoriesCharges[`st_after_discount_${catType}`]
                  ).toFixed(2)
              ),
            gst:
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`gst_${catType}`]).toFixed(2)
              ),
            "grand-total":
              "₹ " +
              formatCurrency(
                "" +
                  Number(categoriesCharges[`grandTotal_${catType}`]).toFixed(2)
              ),
            Total:
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`amount_${catType}`]).toFixed(2)
              ),
            Map: mapImgData,
          };

          let data_2 = {};

          tripDetails.map((value, index) => {
            data_2 = {
              ...data_2,
              ...{
                [`Date-${index + 1}`]: `${new Date(
                  value["date_time"]
                ).toLocaleDateString("en-GB")}`,
                [`first-Dep-${index + 1}`]: `${value["departure_label"]}`,
                [`first-Arri-${index + 1}`]: `${value["arrival_label"]}`,
                [`first-Flytime-${index + 1}`]: `${covertToTimeString(
                  value["duration_minutes"]
                )}`,
                [`ETD-${index + 1}`]: `${new Date(
                  value["date_time"]
                ).toLocaleTimeString("en-GB")}`,
                [`2-Date-${index + 1}`]: `${new Date(
                  value["date_time"]
                ).toLocaleDateString("en-GB")}`,
                [`2-Dep-${index + 1}`]: `${value["departure_name"]}`,
                [`2-Arri-${index + 1}`]: `${value["arrival_name"]}`,
                [`2-Flytime-${index + 1}`]: `${covertToTimeString(
                  value["duration_minutes"]
                )}`,
                [`Cost-${index + 1}`]: `₹ ${formatCurrency(
                  `${(
                    Math.ceil(value["duration_minutes"] / 15) *
                    (quotesDetails["category_value"] / 4)
                  ).toFixed(2)}`
                )}`, //Math.ceil(totalMinutes / 15) * (categories[catType].valuePerQua);
                [`Pax-${index + 1}`]: `${value["pax"]}`,
              },
            };
          });

          let data_3={};
          chargeBoxes.map((charge,index)=>{
            data_3={
              ...data_3,
              ...{
                [`filed_title_${index+1}`]:`${charge["title"]}`,
                [`filed_value_${index+1}`]:`₹ ${formatCurrency(""+Number(charge["value"]).toFixed(2))}`,
              }
            }
          });

          const inputs = [{ ...data_1, ...data_2, ...data_3 }];

          generate({ template, inputs }).then((pdf) => {
            // console.log(pdf);

            const blob = new Blob([pdf.buffer], { type: "application/pdf" });
            // window.open(URL.createObjectURL(blob));
            let today = new Date();
            let date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            let time = `${today.getHours()}.${today.getMinutes()}.${today.getSeconds()}`;
            let dateTime = date + "_" + time;
            saveAs(blob, `Quotation_${dateTime}.pdf`); // Use the saveAs function to save the file with the specified filename

            //   // Node.js
            //   // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
          });
      }, 500);
      handleTabChange("1");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSaveDownload = async (catType) => {
    await handleSubmit(catType);
  };

  const handleCaptureMap = (imageBase64) => {
    setMapImgData(imageBase64);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
    Quotation
  </Typography>,
    <Typography key="4" color="text.disabled">
      {quotationNo}
    </Typography>,
  ];

  return (
    <>
        <Helmet>
        <title>Quotation Edit | GAMA AirOps </title>
      </Helmet>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
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
      
        <Card sx={{overflow:"visible",pt:1}}>
          {/* <Box
            width={"85%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"left"}
            bgcolor={"#1F78E9"}
            mx={2.1}
            mt={-2}
            py={1}
            px={2}
            borderRadius={5}
            position={"absolute"}
          >
            <Typography variant="h7" color="white">
              <b>Trip details</b>
            </Typography>
          </Box> */}
              <TabContext value={tabValue}>
                <Box mt={2} mx={{xs:1,md:2}} sx={{ flexGrow: 1 }}>
                <Grid
                container
                direction={{xs:"column-reverse",md:"row"}}
                spacing={1}
                columns={{ xs: 4, sm: 12, md: 12 }}
              >
                <Grid item xs={4} sm={6} md={6}>
                <TabList
                    onChange={handleTripTabChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="One Way" value="1" />
                    <Tab label="Round Trip" value="2" />
                    <Tab label="Multi City" value="3" />
                  </TabList>
                </Grid>
                <Grid item xs={4} sm={6} md={6}>
                <Grid container spacing={1} columns={{xs:4,sm:6,md:6}}>
                  <Grid item xs={2.5} sm={3} md={3}>
                        <Box>
                          <TextField
                            disabled
                            fullWidth
                            size="small"
                            id="quotation-number"
                            label="Quotation Number"
                            value={quotationNo}
                          />
                        </Box>
                  </Grid>
                  <Grid item xs={1.5} sm={3} md={3}>
                        <Box display={{xs:"none",md:"block"}}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                              sx={{ mt: -1 }}
                              components={["DateField"]}
                            >
                              <DateField
                                disabled
                                fullWidth
                                size="small"
                                id="quotes-date-created"
                                label="Date Created"
                                value ={dayjs(quotationDate)}
                                format="DD / MM / YYYY"
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>
                        <Box display={{xs:"block",md:"none"}}>
                            <TextField
                              disabled
                              fullWidth
                              size="small"
                              id="pi-date-created"
                              label="Date Created"
                              value={new Date(quotationDate).toLocaleDateString('en-IN')}
                            />
                        </Box>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
                </Box>
                <Divider sx={{ borderStyle: "dashed" }} />
                <Box mx={{xs:1,md:2}} mt={2}>
                <Grid
                container
                rowSpacing={2}
                columnSpacing={1}
              >
                    <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <TextField
                        fullWidth
                        required
                        id="customer-name-basic"
                        label="Customer Name"
                        variant="outlined"
                        autoComplete="off"
                        type="text"
                        size="small"
                        value={customerName}
                        error={Boolean(validationErrors.customerName)}
                        helperText={validationErrors.customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          setValidationErrors({});
                        }}
                      />
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <Autocomplete
                       fullWidth
                        size="small"
                        disablePortal
                        id="combo-box-aircraft"
                        isOptionEqualToValue={(option, value) =>
                          value === { id: 0, label: "", value: 0 } ||
                          value === undefined ||
                          value === "" ||
                          option.id === value.id
                        }
                        value={aircraft}
                        onChange={(e, newValue) => {
                          if (newValue === null) {
                            setAircraft({ id: 0, label: "", value: 0 });
                            setAircraftId(0);
                            setAircraftValue(0);
                          } else {
                            setAircraft(newValue);
                            setAircraftId(newValue.id);
                            setAircraftValue(newValue.value);
                          }
                          setValidationErrors({});
                        }}
                        options={aircrafts}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Aircraft"
                            error={Boolean(validationErrors.aircraft)}
                            helperText={validationErrors.aircraft}
                          />
                        )}
                      />
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedCategory}
                          label="Category"
                          onChange={handleCategoryChange}
                          onClose={()=>{setValidationErrors({});setCusVal(cusValConf);}}
                        >
                          <MenuItem value={categories[1].value}>
                            C1 - (₹ {formatCurrency("" + categories[1].value)} /
                            hour)
                          </MenuItem>
                          <MenuItem value={categories[2].value}>
                            C2 - (₹ {formatCurrency("" + categories[2].value)} /
                            hour)
                          </MenuItem>
                          <MenuItem value={categories[3].value}>
                            C3 - (₹ {formatCurrency("" + categories[3].value)} /
                            hour)
                          </MenuItem>
                          {cusValConf !== 0 ? (
                            <MenuItem value={cusValConf}>
                              C4 - (₹ {formatCurrency("" + cusValConf)} / hour)
                            </MenuItem>
                          ) : null}
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              id="outlined-basic"
                              label="Custom Category"
                              variant="outlined"
                              value={formatCurrency("" + cusVal)}
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(e) => {
                                setValidationErrors({});
                                setCusVal(Number(removeCommas(e.target.value)));
                              }}
                              error={Boolean(validationErrors.category)}
                              helperText={validationErrors.category}
                            />
                            <IconButton
                              aria-label="done"
                              size="small"
                              color="success"
                              onClick={()=>{validateCategory(cusVal)}}
                            >
                              <DoneIcon />
                            </IconButton>
                          </Box>
                        </Select>
                      </FormControl>
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box>
                        <Autocomplete
                          value={assignedTo}
                          onChange={(event,newValue) => {
                            setAssignedTo(newValue);
                          }}
                          disablePortal
                          id={"combo-box-assigned-to"}
                          isOptionEqualToValue={(option, value) =>
                            option.user_id === value.user_id
                          }
                          size="small"
                          options={users}
                          renderInput={(params) => (
                            <TextField
                              required
                              {...params}
                              label="Assigned To"
                              // error={Boolean(
                              //   validationErrors["departure" + index]
                              // )}
                              // helperText={validationErrors["departure" + index]}
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <TabPanel value="1" sx={{py:4,px:1}}>
                  {/*Tap 1 for One way trip   */}
                  <Box sx={{ flexGrow: 1 }}>
                {containers.map((container, index) => (
                      <Grid
                        key={index}
                        container
                        rowSpacing={2}
                        columnSpacing={1}
                        pt={{xs:4}}
                        p={{md:1}}
                      >
                        <Grid item xs={12} md={2.5}>
                          <Box>
                            <Autocomplete
                              value={container.departure}
                              onChange={(event, newValue) => {
                                handleInputChange(index, "departure", newValue);
                              }}
                              size="small"
                              disablePortal
                              id={"combo-box-departure-" + index}
                              isOptionEqualToValue={(option, value) =>
                                option.location_id === value.location_id
                              }
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Departure"
                                  error={Boolean(
                                    validationErrors["departure" + index]
                                  )}
                                  helperText={
                                    validationErrors["departure" + index]
                                  }
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2.5}>
                          <Box>
                            <Autocomplete
                              value={container.arrival}
                              onChange={(event, newValue) =>
                                handleInputChange(index, "arrival", newValue)
                              }
                              size="small"
                              disablePortal
                              id={"combo-box-arrival-" + index}
                              isOptionEqualToValue={(option, value) =>
                                option.location_id === value.location_id
                              }
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Arrival"
                                  error={Boolean(
                                    validationErrors["arrival" + index]
                                  )}
                                  helperText={
                                    validationErrors["arrival" + index]
                                  }
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={1}>
                          <Box>
                            <Autocomplete
                              value={container.pax}
                              onChange={(event, newValue) =>
                                handleInputChange(index, "pax", newValue)
                              }
                              size="small"
                              disablePortal
                              id={"combo-box-pax-" + index}
                              options={paxDetails}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Pax"
                                  error={Boolean(
                                    validationErrors["pax" + index]
                                  )}
                                  helperText={validationErrors["pax" + index]}
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={2.2}>
                          <Box mt={-1}>
                            <LocalizationProvider
                              dateAdapter={AdapterDateFns}
                              adapterLocale={enIN}
                            >
                              <DemoContainer
                                components={["MobileDateTimePicker"]}
                              >
                                <DemoItem>
                                <DateTimePicker
                                  ampm={false}
                                  value={container.dateTime}
                                  onChange={(newValue) => {
                                    handleInputChange(
                                      index,
                                      "dateTime",
                                      newValue
                                    );
                                  }}
                                  minDateTime={
                                    index === 0
                                      ? new Date()
                                      : containers[index - 1].dateTime
                                  }
                                  // onChange={(newValue) => {
                                  //   dataTimeChange(index, newValue);
                                  // }}
                                  label="Departure Date & Time"
                                  slotProps={{
                                    textField: {
                                      required: true,
                                      size: "small",
                                      error: Boolean(
                                        validationErrors["dateTime" + index]
                                      ),
                                      helperText:
                                        validationErrors["dateTime" + index],
                                    },
                                  }}
                                  viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                  }}
                                />
                                  {/* <MobileDateTimePicker
                                    value={container.dateTime}
                                    onChange={(newValue) => {
                                      handleInputChange(
                                        index,
                                        "dateTime",
                                        newValue
                                      );
                                    }}
                                    minDateTime={
                                      index === 0
                                        ? new Date()
                                        : containers[index - 1].dateTime
                                    }
                                    // onChange={(newValue) => {
                                    //   dataTimeChange(index, newValue);
                                    // }}
                                    label="Departure Date & Time"
                                    slotProps={{
                                      textField: {
                                        required: true,
                                        size: "small",
                                        error: Boolean(
                                          validationErrors["dateTime" + index]
                                        ),
                                        helperText:
                                          validationErrors["dateTime" + index],
                                      },
                                    }}/> */}
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={[
                                  "DateTimePicker",
                                  "MobileDateTimePicker",
                                  "DesktopDateTimePicker",
                                  "StaticDateTimePicker",
                                ]}
                              >
                                  <DateTimePicker
                                  value={container.dateTime}
                                  onChange={(newValue) => {
                                    dataTimeChange(index, newValue);
                                  }}
                                  label="Departure Date & Time"
                                  sx={{
                                    "& > :not(style)": { width: "200px" },
                                  }}
                                  slotProps={{
                                    textField: { size: "small", error:Boolean(validationErrors["dateTime"+index]), helperText:validationErrors["dateTime"+index]},
                                  }}
                                  />
                              </DemoContainer>
                            </LocalizationProvider> */}
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={1.8}>
                          <Box mt={-1}>
                            {/* <TextField
                                  value={covertToTimeString(container.totalMin)}
                                  size="small"
                                  label="Actual Flying Hours"
                                  id="outlined-size-small"
                                  InputProps={{ readOnly: true }}
                                /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["TimePicker"]}>
                                <DemoItem>
                                  <TimePicker
                                    id={`actual-flying-hours-${index}`}
                                    slotProps={{
                                      textField: { size: "small" },
                                    }}
                                    value={dayjs(
                                      `2000-01-01T${covertToTimeDuration(
                                        container.totalMin
                                      )}`
                                    )}
                                    onChange={(e) => {
                                      // console.log(e.$H * 60 + e.$m);
                                      handleInputChange(
                                        index,
                                        "totalMin",
                                        e.$H * 60 + e.$m
                                      );
                                    }}
                                    views={["hours", "minutes"]}
                                    label="Actual flying hours (hh:mm)"
                                    ampm={false}
                                    format="HH     :     mm"
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                          </Box>
                        </Grid>
                        <Grid item xs={4.5} md={1.5}>
                          <Box component="form" noValidate autoComplete="off">
                            <TextField
                              value={container.amount}
                              size="small"
                              id="outlined-basic"
                              label="Amount"
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Grid>
                        {index === 0 ? (
                          <Grid item xs={1.5} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box>
                              <Tooltip title="Remove all" placement="right">
                                <IconButton
                                  aria-label="remove all"
                                  size="small"
                                  color="error"
                                  onClick={clearAllContainers}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Grid>
                        ) : (
                          <Grid item xs={1.5} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box>
                              {index === 1 ? null : (
                                <Tooltip title="Remove" placement="right">
                                  <IconButton
                                    aria-label="remove"
                                    size="small"
                                    color="error"
                                    onClick={() => deleteContainer(index)}
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                ))}
                  </Box>
                </TabPanel>
                <TabPanel value="2" sx={{py:4,px:1}}>
                  {/* <h6>Tap 2 for round trip </h6> */}
                  <Box sx={{ flexGrow: 1 }}>
                {containers.map((container, index) => (
                      <Grid
                        key={index}
                        container
                        rowSpacing={2}
                        columnSpacing={1}
                        pt={{xs:4}}
                        p={{md:1}}
                      >
                        <Grid item xs={12} md={2.5}>
                          <Box>
                            <Autocomplete
                              value={container.departure}
                              onChange={(event, newValue) => {
                                handleInputChange(index, "departure", newValue);
                              }}
                              size="small"
                              disablePortal
                              id={"combo-box-departure-" + index}
                              isOptionEqualToValue={(option, value) =>
                                option.location_id === value.location_id
                              }
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Departure"
                                  error={Boolean(
                                    validationErrors["departure" + index]
                                  )}
                                  helperText={
                                    validationErrors["departure" + index]
                                  }
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2.5}>
                          <Box>
                            <Autocomplete
                              value={container.arrival}
                              onChange={(event, newValue) =>
                                handleInputChange(index, "arrival", newValue)
                              }
                              size="small"
                              disablePortal
                              id={"combo-box-arrival-" + index}
                              isOptionEqualToValue={(option, value) =>
                                option.location_id === value.location_id
                              }
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Arrival"
                                  error={Boolean(
                                    validationErrors["arrival" + index]
                                  )}
                                  helperText={
                                    validationErrors["arrival" + index]
                                  }
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={1}>
                          <Box>
                            <Autocomplete
                              value={container.pax}
                              onChange={(event, newValue) =>
                                handleInputChange(index, "pax", newValue)
                              }
                              size="small"
                              disablePortal
                              id={"combo-box-pax-" + index}
                              options={paxDetails}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Pax"
                                  error={Boolean(
                                    validationErrors["pax" + index]
                                  )}
                                  helperText={validationErrors["pax" + index]}
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={2.2}>
                          <Box mt={-1}>
                            <LocalizationProvider
                              dateAdapter={AdapterDateFns}
                              adapterLocale={enIN}
                            >
                              <DemoContainer
                                components={["MobileDateTimePicker"]}
                              >
                                <DemoItem>
                                <DateTimePicker
                                  ampm={false}
                                  value={container.dateTime}
                                  onChange={(newValue) => {
                                    handleInputChange(
                                      index,
                                      "dateTime",
                                      newValue
                                    );
                                  }}
                                  minDateTime={
                                    index === 0
                                      ? new Date()
                                      : containers[index - 1].dateTime
                                  }
                                  // onChange={(newValue) => {
                                  //   dataTimeChange(index, newValue);
                                  // }}
                                  label="Departure Date & Time"
                                  slotProps={{
                                    textField: {
                                      required: true,
                                      size: "small",
                                      error: Boolean(
                                        validationErrors["dateTime" + index]
                                      ),
                                      helperText:
                                        validationErrors["dateTime" + index],
                                    },
                                  }}
                                  viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                  }}
                                />
                                  {/* <MobileDateTimePicker
                                    value={container.dateTime}
                                    onChange={(newValue) => {
                                      handleInputChange(
                                        index,
                                        "dateTime",
                                        newValue
                                      );
                                    }}
                                    minDateTime={
                                      index === 0
                                        ? new Date()
                                        : containers[index - 1].dateTime
                                    }
                                    // onChange={(newValue) => {
                                    //   dataTimeChange(index, newValue);
                                    // }}
                                    label="Departure Date & Time"
                                    slotProps={{
                                      textField: {
                                        required: true,
                                        size: "small",
                                        error: Boolean(
                                          validationErrors["dateTime" + index]
                                        ),
                                        helperText:
                                          validationErrors["dateTime" + index],
                                      },
                                    }}/> */}
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={[
                                  "DateTimePicker",
                                  "MobileDateTimePicker",
                                  "DesktopDateTimePicker",
                                  "StaticDateTimePicker",
                                ]}
                              >
                                  <DateTimePicker
                                  value={container.dateTime}
                                  onChange={(newValue) => {
                                    dataTimeChange(index, newValue);
                                  }}
                                  label="Departure Date & Time"
                                  sx={{
                                    "& > :not(style)": { width: "200px" },
                                  }}
                                  slotProps={{
                                    textField: { size: "small", error:Boolean(validationErrors["dateTime"+index]), helperText:validationErrors["dateTime"+index]},
                                  }}
                                  />
                              </DemoContainer>
                            </LocalizationProvider> */}
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={1.8}>
                          <Box mt={-1}>
                            {/* <TextField
                                  value={covertToTimeString(container.totalMin)}
                                  size="small"
                                  label="Actual Flying Hours"
                                  id="outlined-size-small"
                                  InputProps={{ readOnly: true }}
                                /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["TimePicker"]}>
                                <DemoItem>
                                  <TimePicker
                                    id={`actual-flying-hours-${index}`}
                                    slotProps={{
                                      textField: { size: "small" },
                                    }}
                                    value={dayjs(
                                      `2000-01-01T${covertToTimeDuration(
                                        container.totalMin
                                      )}`
                                    )}
                                    onChange={(e) => {
                                      // console.log(e.$H * 60 + e.$m);
                                      handleInputChange(
                                        index,
                                        "totalMin",
                                        e.$H * 60 + e.$m
                                      );
                                    }}
                                    views={["hours", "minutes"]}
                                    label="Actual flying hours (hh:mm)"
                                    ampm={false}
                                    format="HH     :     mm"
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                          </Box>
                        </Grid>
                        <Grid item xs={4.5} md={1.5}>
                          <Box component="form" noValidate autoComplete="off">
                            <TextField
                              value={container.amount}
                              size="small"
                              id="outlined-basic"
                              label="Amount"
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Grid>
                        {index === 0 ? (
                          <Grid item xs={1.5} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box>
                              <Tooltip title="Remove all" placement="right">
                                <IconButton
                                  aria-label="remove all"
                                  size="small"
                                  color="error"
                                  onClick={clearAllContainers}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Grid>
                        ) : (
                          <Grid item xs={1.5} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box>
                              {index === 1 ? null : (
                                <Tooltip title="Remove" placement="right">
                                  <IconButton
                                    aria-label="remove"
                                    size="small"
                                    color="error"
                                    onClick={() => deleteContainer(index)}
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                ))}
                  </Box>
                </TabPanel>
                <TabPanel value="3" sx={{py:4,px:1}}>
                  {/* <h6>Tap 3 for multi city trip </h6> */}
                  <Box sx={{ flexGrow: 1 }}>
                {containers.map((container, index) => (
                      <Grid
                        key={index}
                        container
                        rowSpacing={2}
                        columnSpacing={1}
                        pt={{xs:4}}
                        p={{md:1}}
                      >
                        <Grid item xs={12} md={2.5}>
                          <Box>
                            <Autocomplete
                              value={container.departure}
                              onChange={(event, newValue) => {
                                handleInputChange(index, "departure", newValue);
                              }}
                              size="small"
                              disablePortal
                              id={"combo-box-departure-" + index}
                              isOptionEqualToValue={(option, value) =>
                                option.location_id === value.location_id
                              }
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Departure"
                                  error={Boolean(
                                    validationErrors["departure" + index]
                                  )}
                                  helperText={
                                    validationErrors["departure" + index]
                                  }
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2.5}>
                          <Box>
                            <Autocomplete
                              value={container.arrival}
                              onChange={(event, newValue) =>
                                handleInputChange(index, "arrival", newValue)
                              }
                              size="small"
                              disablePortal
                              id={"combo-box-arrival-" + index}
                              isOptionEqualToValue={(option, value) =>
                                option.location_id === value.location_id
                              }
                              options={locations}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  {...params}
                                  label="Arrival"
                                  error={Boolean(
                                    validationErrors["arrival" + index]
                                  )}
                                  helperText={
                                    validationErrors["arrival" + index]
                                  }
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={1}>
                          <Box>
                            <Autocomplete
                              value={container.pax}
                              onChange={(event, newValue) =>
                                handleInputChange(index, "pax", newValue)
                              }
                              size="small"
                              disablePortal
                              id={"combo-box-pax-" + index}
                              options={paxDetails}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Pax"
                                  error={Boolean(
                                    validationErrors["pax" + index]
                                  )}
                                  helperText={validationErrors["pax" + index]}
                                />
                              )}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={2.2}>
                          <Box mt={-1}>
                            <LocalizationProvider
                              dateAdapter={AdapterDateFns}
                              adapterLocale={enIN}
                            >
                              <DemoContainer
                                components={["MobileDateTimePicker"]}
                              >
                                <DemoItem>
                                <DateTimePicker
                                  ampm={false}
                                  value={container.dateTime}
                                  onChange={(newValue) => {
                                    handleInputChange(
                                      index,
                                      "dateTime",
                                      newValue
                                    );
                                  }}
                                  minDateTime={
                                    index === 0
                                      ? new Date()
                                      : containers[index - 1].dateTime
                                  }
                                  // onChange={(newValue) => {
                                  //   dataTimeChange(index, newValue);
                                  // }}
                                  label="Departure Date & Time"
                                  slotProps={{
                                    textField: {
                                      required: true,
                                      size: "small",
                                      error: Boolean(
                                        validationErrors["dateTime" + index]
                                      ),
                                      helperText:
                                        validationErrors["dateTime" + index],
                                    },
                                  }}
                                  viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                  }}
                                />
                                  {/* <MobileDateTimePicker
                                    value={container.dateTime}
                                    onChange={(newValue) => {
                                      handleInputChange(
                                        index,
                                        "dateTime",
                                        newValue
                                      );
                                    }}
                                    minDateTime={
                                      index === 0
                                        ? new Date()
                                        : containers[index - 1].dateTime
                                    }
                                    // onChange={(newValue) => {
                                    //   dataTimeChange(index, newValue);
                                    // }}
                                    label="Departure Date & Time"
                                    slotProps={{
                                      textField: {
                                        required: true,
                                        size: "small",
                                        error: Boolean(
                                          validationErrors["dateTime" + index]
                                        ),
                                        helperText:
                                          validationErrors["dateTime" + index],
                                      },
                                    }}/> */}
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer
                                components={[
                                  "DateTimePicker",
                                  "MobileDateTimePicker",
                                  "DesktopDateTimePicker",
                                  "StaticDateTimePicker",
                                ]}
                              >
                                  <DateTimePicker
                                  value={container.dateTime}
                                  onChange={(newValue) => {
                                    dataTimeChange(index, newValue);
                                  }}
                                  label="Departure Date & Time"
                                  sx={{
                                    "& > :not(style)": { width: "200px" },
                                  }}
                                  slotProps={{
                                    textField: { size: "small", error:Boolean(validationErrors["dateTime"+index]), helperText:validationErrors["dateTime"+index]},
                                  }}
                                  />
                              </DemoContainer>
                            </LocalizationProvider> */}
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={1.8}>
                          <Box mt={-1}>
                            {/* <TextField
                                  value={covertToTimeString(container.totalMin)}
                                  size="small"
                                  label="Actual Flying Hours"
                                  id="outlined-size-small"
                                  InputProps={{ readOnly: true }}
                                /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["TimePicker"]}>
                                <DemoItem>
                                  <TimePicker
                                    id={`actual-flying-hours-${index}`}
                                    slotProps={{
                                      textField: { size: "small" },
                                    }}
                                    value={dayjs(
                                      `2000-01-01T${covertToTimeDuration(
                                        container.totalMin
                                      )}`
                                    )}
                                    onChange={(e) => {
                                      // console.log(e.$H * 60 + e.$m);
                                      handleInputChange(
                                        index,
                                        "totalMin",
                                        e.$H * 60 + e.$m
                                      );
                                    }}
                                    views={["hours", "minutes"]}
                                    label="Actual flying hours (hh:mm)"
                                    ampm={false}
                                    format="HH     :     mm"
                                  />
                                </DemoItem>
                              </DemoContainer>
                            </LocalizationProvider>
                          </Box>
                        </Grid>
                        <Grid item xs={4.5} md={1.5}>
                          <Box component="form" noValidate autoComplete="off">
                            <TextField
                              value={container.amount}
                              size="small"
                              id="outlined-basic"
                              label="Amount"
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₹
                                  </InputAdornment>
                                ),
                                readOnly: true,
                              }}
                            />
                          </Box>
                        </Grid>
                        {index === 0 ? (
                          <Grid item xs={1.5} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box>
                              <Tooltip title="Remove all" placement="right">
                                <IconButton
                                  aria-label="remove all"
                                  size="small"
                                  color="error"
                                  onClick={clearAllContainers}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Grid>
                        ) : (
                          <Grid item xs={1.5} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box>
                              {index === 1 ? null : (
                                <Tooltip title="Remove" placement="right">
                                  <IconButton
                                    aria-label="remove"
                                    size="small"
                                    color="error"
                                    onClick={() => deleteContainer(index)}
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                ))}
                  </Box>
                </TabPanel>
                <Box px={1} display={{xs:"block",md:"none"}}>
                    <Typography variant="h7" gutterBottom>
                      <Button
                        fullWidth
                        variant="contained"
                        color="info"
                        style={{ textTransform: "none" }}
                        startIcon={<AddIcon fontSize="large" />}
                        onClick={addContainer}
                      >
                        <b>Add&nbsp;Trip</b>
                      </Button>
                  </Typography>
            </Box>
                <Box
              px={{xs:1,md:2}}
              pt={{xs:5,md:0}}
              pb={{xs:2,md:2}}
              flexGrow={1}
                >
                  <Grid
                container
                spacing={1}
                  >
                    {chargeBoxes.map((chargeBox, index) => (
                      <Grid item xs={12} sm={5.9} md={2.3}key={index}>
                        <TextField
                          fullWidth
                          label={chargeBox.title}
                          name={chargeBox.title}
                          value={formatCurrency("" + chargeBox.value)}
                          onChange={(event) =>
                            handleInputChangeForBoxes(event, index, "value")
                          }
                          id="filled-basic"
                          variant="filled"
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                ₹
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12} sm={1} md={0.5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Box>
                          <Tooltip title="Change Title" placement="right">
                            <IconButton
                              aria-label="Change Title"
                              color="info"
                              onClick={(event)=>{handlePopperClick(event);setTitleValue(chargeBoxes[4]["title"])}}
                            >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Popper
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          transition
                        >
                          {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={250}>
                              <Paper sx={{ p: 2 }} >
                                <Typography sx={{ pb: 2 }}>
                                  Change title for the charge :
                                </Typography>
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Title"
                                  size="small"
                                  value={titleValue}
                                  onChange={handleTitleValueChange}
                                />
                                <IconButton
                                  sx={{ml:0.6}}
                                  aria-label="add charges"
                                  size="small"
                                  color="success"
                                  onClick={()=>{changeTitle(4,titleValue);setOpen(false);}}
                                >
                                  <DoneIcon />
                                </IconButton>
                                <IconButton
                                  sx={{ml:0.6}}
                                  aria-label="add charges"
                                  size="small"
                                  color="error"
                                  onClick={() => {
                                    setOpen(false);
                                    setAnchorEl(null);
                                    setTitleValue("");
                                  }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={2.3} mt={{xs:3,md:0}}>
                      <TextField
                        fullWidth
                        label="Discount"
                        name="Discount"
                        focused
                        color="error"
                        value={formatCurrency("" + discount)}
                        onChange={(event) => {
                          setDiscount(Number(removeCommas(event.target.value)));
                        }}
                        id="filled-basic"
                        variant="filled"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">-₹</InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}  md={4.6}></Grid>
                    
                    <Grid item xs={12}  md={2.3}>
                      <Box py={1}>
                        <Typography variant="h6">
                          <Button
                            fullWidth
                            variant="contained" 
                            style={{ textTransform: "none" }}
                            startIcon={<VisibilityIcon fontSize="large" />}
                            onClick={handleViewPricing}
                            // onClick={handleSubmit}
                          >
                            <b>Preview</b>
                          </Button>
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item md={2.3} display={{xs:"none",md:"block"}}>
                      <Box py={1}>
                        <Typography variant="h7" gutterBottom>
                          <Button
                            fullWidth
                            variant="contained"
                            style={{ textTransform: "none" }}
                            startIcon={<AddIcon fontSize="large" />}
                            onClick={addContainer}
                          >
                            <b>Add&nbsp;Trip</b>
                          </Button>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </TabContext>
              <Box id="end-of-first-card"></Box>
        </Card>

      {showValues && (
          <Card
            sx={{
              mt:'4%',
              width: "100%"
            }}
          >
              <Box>
                <TableContainer sx={{ maxWidth: "auto"}}>
                  <Table
                    sx={{ minWidth: 700 }}
                    aria-label="customized table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Pricing breakup</StyledTableCell>
                        <StyledTableCell align="right">
                          Category 1 ({categories[1].label})
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Category 2 ({categories[2].label})
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Category 3 ({categories[3].label})
                        </StyledTableCell>
                        {cusValConf !== 0 ? (
                          <StyledTableCell align="right">
                            Category 4 (₹ {formatCurrency("" + cusValConf)} /
                            Hr)
                          </StyledTableCell>
                        ) : null}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row.pricing}>
                          <StyledTableCell component="th" scope="row">
                            {row.pricing}
                          </StyledTableCell>
                          <StyledTableCell align="right">{`₹ ${row.cat_1}`}</StyledTableCell>
                          <StyledTableCell align="right">{`₹ ${row.cat_2}`}</StyledTableCell>
                          <StyledTableCell align="right">{`₹ ${row.cat_3}`}</StyledTableCell>
                          {cusValConf !== 0 ? (
                            <StyledTableCell align="right">{`₹ ${row.cat_4}`}</StyledTableCell>
                          ) : null}
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <StyledTableRow>
                        <StyledTableCell>
                          * Save and Download a Quotation PDF
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Typography variant="h7" gutterBottom>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                handleClickSaveDownload(1);
                              }}
                              style={{ textTransform: "none" }}
                            >
                              <DownloadDoneIcon />
                              &nbsp;<b>Save&nbsp;&&nbsp;Download</b>
                            </Button>
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Typography variant="h7" gutterBottom>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                handleClickSaveDownload(2);
                              }}
                              style={{ textTransform: "none" }}
                            >
                              <DownloadDoneIcon />
                              &nbsp;<b>Save&nbsp;&&nbsp;Download</b>
                            </Button>
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Typography variant="h7" gutterBottom>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                handleClickSaveDownload(3);
                              }}
                              style={{ textTransform: "none" }}
                            >
                              <DownloadDoneIcon />
                              &nbsp;<b>Save&nbsp;&&nbsp;Download</b>
                            </Button>
                          </Typography>
                        </StyledTableCell>
                        {cusValConf !== 0 ? (
                          <StyledTableCell align="right">
                            <Typography variant="h7" gutterBottom>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                  handleClickSaveDownload(4);
                                }}
                                style={{ textTransform: "none" }}
                              >
                                <DownloadDoneIcon />
                                &nbsp;<b>Save&nbsp;&&nbsp;Download</b>
                              </Button>
                            </Typography>
                          </StyledTableCell>
                        ) : null}
                      </StyledTableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>


            {mapShow ? (
              <Box px={2} pt={5} pb={2} sx={{ borderRadius: "20px" }}>
                {/* <MapWithMarkers
                onCaptureMap={handleCaptureMap}
                mapLatLng={mapLatLng}
              /> */}
                {/* {
                mapLngLat.length!==1?(<MapComponent
                  onCaptureMap={handleCaptureMap}
                  mapLngLat={mapLngLat}
                />):null
              } */}
                <MapComponent
                  onCaptureMap={handleCaptureMap}
                  mapLngLat={mapLngLat}
                />
              </Box>
            ) : null}
          </Card>
      )}
    </>
  );
}
