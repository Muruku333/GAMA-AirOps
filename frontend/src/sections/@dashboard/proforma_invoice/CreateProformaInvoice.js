import { useState, useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Card,
  Link,
  Stack,
  Typography,
  Paper,
  TextField,
  Divider,
  Autocomplete,
  Container,
} from "@mui/material";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enIN from "date-fns/locale/en-IN";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { getDistance } from "geolib";
import { ToWords } from "to-words";
import { Helmet } from "react-helmet-async";

const paxDetails = ["Empty Leg", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const pi_status = [
  { id: 1, label: "Approved", value: "Approved" },
  { id: 2, label: "Pending", value: "Pending" },
  { id: 3, label: "Rejected", value: "Rejected" },
];

const categories = {
  1: {
    label: "₹ 3,60,000 / hour",
    value: 360000,
    valuePerQua: 90000,
    valuePerMin: 6000,
  },
  2: {
    label: "₹ 3,50,000 / hour",
    value: 350000,
    valuePerQua: 87500,
    valuePerMin: 5833.34,
  },
  3: {
    label: "₹ 3,40,000 / hour",
    value: 340000,
    valuePerQua: 85000,
    valuePerMin: 5666.67,
  },
};

const flightKM = 720.5;
const flightKnots = 448;
const flightMiles = 515.55;
const takeoffLandingTime = 30; // in minutes

const getCoordinatesFromNominatim = async (place) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`
    );

    if (response.data.length > 0) {
      const location = response.data[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    throw new Error("Error fetching location data");
  }
};

const toWords = new ToWords();

export default function CreateProformaInvoice({ handleTabChange, DB_URL }) {
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

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[1].value);
  const [validationErrors, setValidationErrors] = useState({});
  const [titleValue, setTitleValue] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [airportCharges, setAirportCharges] = useState(0);
  const [crewCharges, setCrewCharges] = useState(0);
  const [haltCharges, sethaltCharges] = useState(0);
  const [calACAmount, setCalACAmount] = useState(0);
  const [calCCAmount, setCalCCAmount] = useState(0);
  const [calHCAmount, setCalHCAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [durationValue, setDurationValue] = useState("0 hr 0 min");
  const [rows, setRows] = useState([]);
  const [cusVal, setCusVal] = useState(0);
  const [cusValConf, setCusValConf] = useState(0);
  const [chargesTotal, setChargesTotal] = useState(0);
  const [showValues, setShowValues] = useState(false);
  const [mapLngLat, setMapLngLat] = useState([{}]);
  const [mapShow, setMapShow] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [aircrafts, setAircrafts] = useState([]);
  const [aircraft, setAircraft] = useState("");
  const [aircraftId, setAircraftId] = useState(0);
  const [aircraftValue, setAircraftValue] = useState(0);
  const [tabValue, setTabValue] = useState("1");
  const [quotationNum, setQuotationNum] = useState("");
  const [PINum, setPINum] = useState("");

  const handlePopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ***************** Start of Line items *******************
  const [containers, setContainers] = useState([
    {
      departure: null,
      arrival: null,
      pax: "",
      dateTime: null,
      totalMin: 0,
      amount: "0.00",
    },
    {
      departure: null,
      arrival: null,
      pax: "",
      dateTime: null,
      totalMin: 0,
      amount: "0.00",
    },
  ]);

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
    if (field === "totalMin") {
      updatedContainers[index]["amount"] = formatCurrency(
        (Math.ceil(value / 15) * (selectedCategory / 4)).toFixed(2)
      );
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

  const [chargeBoxes, setChargeBoxes] = useState([
    {
      title: "Airport Handling Charges",
      value: 0,
    },
    {
      title: "Crew Accomodation Charges",
      value: 0,
    },
    {
      title: "Ground Handling Charges",
      value: 0,
    },
    {
      title: "Halt Charges",
      value: 0,
    },
    {
      title: "Other Charges",
      value: 0,
    },
  ]);

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

  const handleInputChangeForBoxes = (event, index, field) => {
    const updatedBoxes = [...chargeBoxes];
    let value = event.target.value;
    value = value.replace(/[^0-9]/g, "");
    updatedBoxes[index][field] = Number(value);
    setChargeBoxes(updatedBoxes);
  };

  // ***************** End of Charge boxes *******************

  const changeTitle=(index,newTitle)=>{
    const updatedBoxes = [...chargeBoxes];
    updatedBoxes[index]["title"]=newTitle;
    setChargeBoxes(updatedBoxes);
  }

  const handleTitleValueChange = (event) => {
    let value = event.target.value;
    setTitleValue(value);
  };

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

  const removeCommas = (value) => {
    return value.replace(/,/g, "");
  };

  const formatCurrency = (value) => {
    const numericValue = removeCommas(value);
    const formattedValue = numericValue.replace(
      /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
      ","
    );
    return formattedValue;
  };

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

  const handleViewPricing = async () => {
    const validationErrors = { ...validateNameAircraft(), ...validateTrips() };

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      setShowValues(false);
      return;
    }
    await handleCalculatePricing();
    setShowValues(true);
    setTimeout(() => {
      const element = document.getElementById("end-of-first-card");
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  };

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

  const handleSubmit = async (catType) => {
    console.log(selectedCategory);

    const validationErrors = { ...validateNameAircraft(), ...validateTrips() };

    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      return;
    }

    try {
      // const totalMin = containers.reduce((accumulator, obj) => {
      //   return accumulator + obj.totalMin;
      // }, 0);
      // setTotalMinutes(totalMin);
      // const durationVal = covertToTimeString(totalMin);
      // setDurationValue(durationVal);

      let cus_id = 0;
      // let category_value=cusValConf;
      // if(category_value===0){
      //   category_value=categories[catType].value;
      // }

      let category_value = cusValConf;
      if (catType !== 4) {
        category_value = categories[catType].value;
      }

      const data = {
        customer_name: customerName,
        trip_type: tabValue,
        aircraft_id: aircraftId,
      };
      const postData = async () => {
        await axios
          .post(`${DB_URL}/api/customers`, data)
          .then((response) => (cus_id = response.data.customer_id));
      };
      postData();
      setTimeout(() => {
        containers.map(async (container) => {
          const parsedDatetime = new Date(container.dateTime);
          const formattedDatetime = parsedDatetime
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          const tripData = {
            customer_id: cus_id,
            departure_location_id: container.departure.location_id,
            arrival_location_id: container.arrival.location_id,
            pax: container.pax,
            date_time: formattedDatetime,
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

      setTimeout(() => {
        chargeBoxes.map(async (charge) => {
          const chargeData = {
            title: charge.title,
            value: charge.value,
            customer_id: cus_id,
          };

          await axios
            .post(`${DB_URL}/api/charge_boxes`, chargeData)
            .then((response) => {});
        });
      }, 500);

      // const amount_1 = totalMinutes * categories[1].valuePerMin;
      // const amount_2 = totalMinutes * categories[2].valuePerMin;
      // const amount_3 = totalMinutes * categories[3].valuePerMin;
      // let category_value=cusValConf;
      // if(category_value===0){
      //   category_value=categories[catType].value;
      // }

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

      console.log(
        toWords.convert(grandTotal_1, { currency: true, ignoreDecimal: true })
      );

      setTimeout(async () => {
        await axios
          .post(`${DB_URL}/api/categories`, {
            ...categoriesPrice,
            ...{ customer_id: cus_id },
          })
          .then(async (response) => {
            //  console.log(response.data.id);
            let category_id = response.data.id;
            let today = new Date();
            //  let date = today.getFullYear() + "-" + (today.getMonth() + 1) +"-" +today.getDate();
            const quotation_no = "SAPT/QN" + today.getFullYear() + "/";
            const quotation = {
              quotation_no: quotation_no,
              category_id: category_id,
              // Date:date,
            };

            await axios.post(`${DB_URL}/api/quotations`, quotation).then();
          });
      }, 500);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickSaveDownload = async (catType) => {
    await handleSubmit(catType);
  };

  function handleBreadCrumbsClick(event,path) {
    event.preventDefault();
    navigate(path);
  }

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

      await axios
        .get(`${DB_URL}/api/next_id/quotes`)
        .then((data) => {
          let today = new Date();
          let id = 0;
          id = data.data["next_id"];
          const quotation_no =`QU-${today.getFullYear()}/SAPL/VT-VPA/${id.toString().padStart(4, "0")}`;
          setQuotationNum(quotation_no);
        })
        .catch((error) => console.log(error));

      await axios
        .get(`${DB_URL}/api/next_id/pi`)
        .then((data) => {
          let today = new Date();
          let id = 0;
          id = data.data["next_id"];
          const pi_no = `PI-${today.getFullYear()}/SAPL/VT-VPA/${id.toString().padStart(4, "0")}`;
          setPINum(pi_no);
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
  }, []);

  useEffect(() => {
    setMapShow(false);
    handleCalculatePricing();
  }, [containers]);

  useEffect(() => {
    const updatedContainers = [...containers];
    for (let i = 0; i < containers.length; i++) {
      // calculateValues(i);
      // handleInputChange(i,"totalMin",containers[i]["totalMin"]);
      updatedContainers[i]["amount"] = formatCurrency(
        (
          Math.ceil(updatedContainers[i]["totalMin"] / 15) *
          (selectedCategory / 4)
        ).toFixed(2)
      );
    }
    setContainers(updatedContainers);
  }, [selectedCategory]);

  useEffect(() => {
    handleCalculatePricing();
  }, [chargeBoxes, cusValConf, discount]);

  useEffect(() => {
    let total = 0;
    chargeBoxes.map((charge) => {
      total += charge.value;
    });
    setChargesTotal(total);
  }, [chargeBoxes]);

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
        <Helmet>
            <title> Create Proforma Invoice | GAMA AirOps </title>
        </Helmet>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Create&nbsp;a&nbsp;new&nbsp;proforma&nbsp;invoice
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

        <Card>
            <Stack divider={<Divider sx={{ borderStyle: "dashed" }} />}>
              <Box p={3}>
                <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 25 }}>
                  <Grid item xs={5}>
                    <Box>
                      <TextField
                        disabled
                        fullWidth
                        id="proforma-invoice-no"
                        label="Proforma Invoice Number"
                        value={PINum}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box>
                      <TextField
                        disabled
                        fullWidth
                        id="quotation-number"
                        label="Quotation Number"
                        value={quotationNum}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          sx={{ mt: -1 }}
                          components={["DateField"]}
                        >
                          <DateField
                            disabled
                            fullWidth
                            id="pi-date-created"
                            label="Date Create"
                            defaultValue={dayjs(new Date())}
                            format="DD / MM / YYYY"
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Grid>
                  <Grid item xs={5}>
                  <Box>
                      <Autocomplete
                        // value={container.departure}
                        // onChange={(event, newValue) => {
                        //   handleInputChange(index, "departure", newValue);
                        //   console.log(newValue);
                        // }}
                        disablePortal
                        id={"combo-box-assigned-to"}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
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
                  <Grid item xs={5}>
                    <Box>
                      <Autocomplete
                        // value={container.departure}
                        // onChange={(event, newValue) => {
                        //   handleInputChange(index, "departure", newValue);
                        //   console.log(newValue);
                        // }}
                        disablePortal
                        id={"combo-box-status"}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        options={pi_status}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Status"
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
              <Box p={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Customer Details :
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container columns={{ xs: 1, sm: 1, md: 15 }}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          required
                          fullWidth
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
                      <Box my={2}>
                        <TextField
                          required
                          fullWidth
                          id="customer-company-name"
                          label="Customer Company Name"
                          variant="outlined"
                          autoComplete="off"
                          type="text"
                          size="small"
                        />
                      </Box>
                      <Box>
                        <TextField
                          required
                          fullWidth
                          id="customer-gst-no"
                          label="Customer GST No"
                          variant="outlined"
                          autoComplete="off"
                          type="text"
                          size="small"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          required
                          fullWidth
                          multiline
                          rows={5.2}
                          id="customer-address"
                          label="Customer Address"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </Box>
              </Box>
              <Box p={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Trip Details :
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={2}
                    columns={{ xs: 1, sm: 1, md: 20 }}
                  >
                    <Grid item xs={5}>
                      <Box>
                        <TextField
                          required
                          fullWidth
                          size="small"
                          id="customer-address"
                          label="HSN/SAC"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Box>
                        <TextField
                          required
                          fullWidth
                          size="small"
                          id="customer-address"
                          label="Aircraft Region"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={5}>
                      <Box>
                        <Autocomplete
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
                          fullWidth
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
                    <Grid item xs={5}>
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
                          >
                            <MenuItem value={categories[1].value}>
                              C1 - (₹ {formatCurrency("" + categories[1].value)}{" "}
                              / hour)
                            </MenuItem>
                            <MenuItem value={categories[2].value}>
                              C2 - (₹ {formatCurrency("" + categories[2].value)}{" "}
                              / hour)
                            </MenuItem>
                            <MenuItem value={categories[3].value}>
                              C3 - (₹ {formatCurrency("" + categories[3].value)}{" "}
                              / hour)
                            </MenuItem>
                            {cusValConf !== 0 ? (
                              <MenuItem value={cusValConf}>
                                CC - (₹ {formatCurrency("" + cusValConf)} /
                                hour)
                              </MenuItem>
                            ) : null}
                            <Box
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
                                sx={{ width: "17ch" }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      ₹
                                    </InputAdornment>
                                  ),
                                }}
                                onChange={(e) => {
                                  setCusVal(
                                    Number(removeCommas(e.target.value))
                                  );
                                }}
                              />
                              <IconButton
                                aria-label="done"
                                size="small"
                                color="success"
                                onClick={() => {
                                  setCusValConf(cusVal);
                                }}
                              >
                                <DoneIcon />
                              </IconButton>
                            </Box>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2} sx={{ flexGrow: 1 }}>
                  {containers.map((container, index) => (
                    <Box key={index} justifyContent="space-between">
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        py={1}
                      >
                        <Grid
                          container
                          spacing={{ xs: 2, md: 1 }}
                          columns={{ xs: 1, sm: 1, md: 28 }}
                        >
                          <Grid item xs={1} sm={4} md={6}>
                            <Box>
                              <Autocomplete
                                value={container.departure}
                                onChange={(event, newValue) => {
                                  handleInputChange(
                                    index,
                                    "departure",
                                    newValue
                                  );
                                  console.log(newValue);
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
                          <Grid item xs={1} sm={4} md={6}>
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
                          <Grid item xs={1} sm={4} md={3}>
                            <Box>
                              <Autocomplete
                                isOptionEqualToValue={(option, value) =>
                                  option.id === value.id
                                }
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
                          <Grid item xs={1} sm={4} md={5}>
                            <Box mt={-1}>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                adapterLocale={enIN}
                              >
                                <DemoContainer
                                  components={["MobileDateTimePicker"]}
                                >
                                  <DemoItem>
                                    <MobileDateTimePicker
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
                                            validationErrors[
                                              "dateTime" + index
                                            ],
                                        },
                                      }}
                                    />
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
                          <Grid item xs={1} sm={4} md={4}>
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
                                        console.log(e.$H * 60 + e.$m);
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
                          <Grid item xs={1} sm={4} md={3}>
                            <Box noValidate autoComplete="off">
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
                            <Grid item xs={1} sm={4} md={1}>
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
                            <Grid item xs={1} sm={4} md={1}>
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
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box mt={2} display={"flex"} justifyContent={"space-between"}>
                <Grid
                    container
                    spacing={{ xs: 1, md: 1 }}
                    columns={{ xs: 1, sm: 1, md: 25 }}
                  >
                    {chargeBoxes.map((chargeBox, index) => (
                      <Grid item xs={1} sm={4} md={4.9} key={index}>
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

                    <Grid item xs={1} sm={4} md={0.5}>
                    <Box
                          sx={{
                            "& > :not(style)": {
                              width: "10px",
                              height: "10px",
                            },
                          }}
                        >
                          <Tooltip title="Change Title" placement="right">
                            <IconButton
                              aria-label="Change Title"
                              size="large"
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

                    <Grid item xs={1} sm={4} md={5}>
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

                    <Grid item xs={1} sm={4} md={5}></Grid>
                    <Grid item xs={1} sm={4} md={5}></Grid>
                    {/* <Grid item xs={1} sm={4} md={2}>
                      <Box
                        ml={1}
                        sx={{
                          "& > :not(style)": { width: "20px", height: "20px" },
                        }}
                        component="form"
                        autoComplete="off"
                      >
                        <Box
                          sx={{
                            "& > :not(style)": {
                              width: "10px",
                              height: "10px",
                            },
                          }}
                        >
                          <Tooltip title="Remove" placement="right">
                            <IconButton
                              aria-label="remove"
                              size="large"
                              color="error"
                              onClick={() => {
                                deleteChargeBoxes(chargeBoxes.length - 1);
                              }}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box
                          sx={{
                            "& > :not(style)": {
                              width: "10px",
                              height: "10px",
                            },
                          }}
                        >
                          <Tooltip title="Add Charges" placement="right">
                            <IconButton
                              aria-label="add charges"
                              size="large"
                              color="info"
                              onClick={handlePopperClick}
                            >
                              <AddIcon />
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
                              <Paper sx={{ p: 2 }}>
                                <Typography sx={{ p: 2 }}>
                                  Add title for the charge :
                                </Typography>
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Title"
                                  size="small"
                                  value={titleValue}
                                  onChange={handleTitleValueChange}
                                />
                                <IconButton
                                  aria-label="add charges"
                                  size="large"
                                  color="success"
                                  onClick={addChargeBoxes}
                                >
                                  <DoneIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="add charges"
                                  size="large"
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
                      </Box>
                    </Grid> */}
                    <Grid item xs={2} sm={2} md={5}>
                      <Box py={1}>
                        <Typography variant="h6">
                          <Button
                            fullWidth
                            variant="contained"
                            color="info"
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

                    <Grid item xs={1} sm={4} md={5}>
                      <Box py={1}>
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
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Stack>
        </Card>

      {showValues && (
            <Box
              id="end-of-first-card"
              display={"flex"}
              justifyContent={"center"}
              pt={"4%"}
            >
          <Card
                sx={{
                width: "95%",
                height: "auto",
                borderRadius: 5,
                bgcolor: "#ffffffb1",
              }}
          >
            <Box px={2} pt={5} pb={2} borderRadius={1}>
              <Box>
                <TableContainer sx={{ maxWidth: "auto", borderRadius: 4 }}>
                  <Table
                    sx={{ minWidth: 700 }}
                    aria-label="customized table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Pricing breakup</StyledTableCell>
                        <StyledTableCell>
                          Category 1 ({categories[1].label})
                        </StyledTableCell>
                        <StyledTableCell>
                          Category 2 ({categories[2].label})
                        </StyledTableCell>
                        <StyledTableCell>
                          Category 3 ({categories[3].label})
                        </StyledTableCell>
                        {cusValConf !== 0 ? (
                          <StyledTableCell>
                            C Category (₹ {formatCurrency("" + cusValConf)} /
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
                          * Save and Download a Proforma Invoice PDF
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
            </Box>
          </Card>
          </Box>
      )}
    </>
  );
}
