import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// @mui-------------------------------------------------------
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {
  Link,
  Typography,
  Box,
  Button,
  Stack,
  Breadcrumbs,
  Card,
  IconButton,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
// @mui-icons ------------------------------------------------
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// components ------------------------------------------------
import Iconify from "../../../components/iconify/Iconify";
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
import { Helmet } from "react-helmet-async";
import MapComponent from "./MapComponent";
import { Template, generate } from "@pdfme/generator";
import { saveAs } from "file-saver";
import { categories, formatCurrency, removeCommas, covertToTimeString, getCoordinatesFromNominatim } from "./Utils";

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

function createData(pricing, cat_1) {
  return { pricing, cat_1,};
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewQuotation({
  handleTabChange,
  customerIdToView,
  DB_URL,
  loggedInUserId,
}) {
  const navigate = useNavigate();
  const [quotationNo, setQuotationNo] = useState("");
  const [showValues, setShowValues] = useState(false);
  const [mapShow, setMapShow]=useState(false);
  const [mapImgData, setMapImgData] = useState(null);
  const [mapLatLng, setMapLatLng] = useState([{}]);
  const [mapLngLat, setMapLngLat] = useState([{}]);
  const [catType,setCatType]=useState(0);
  const [catValue, setCatValue]=useState(0);
  const [rows, setRows] = useState([]);
  const [blob, setBlob] = useState(null);
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {

      let categoriesCharges = [];
      let chargeBoxes = [];
      let tripDetails = [];
      let mapLatLng = [];
      let mapLngLat=[];

        try {
          setTimeout(async () => {

            await axios
            .get(`${DB_URL}/api/quotations/${customerIdToView}`)
            .then((data) => {
              const quotesDetails = data.data[0];
    
              setQuotationNo(`${quotesDetails.quotation_no}`);
            });

            await axios
              .get(`${DB_URL}/api/customer-pricing/${customerIdToView}`)
              .then((data) => {
                categoriesCharges = data.data[0];
              })
              .catch((error) => console.log(error));
    
            //  console.log(categoriesCharges);
    
            await axios
              .get(`${DB_URL}/api/charges/${customerIdToView}`)
              .then((data) => {
                chargeBoxes = data.data;
              })
              .catch((error) => console.log(error));
    
            await axios
              .get(`${DB_URL}/api/trip_details/${customerIdToView}`)
              .then((data) => {
                tripDetails = data.data;
                // console.log(tripDetails);
              })
              .catch((error) => console.log(error));
    
            // console.log(chargeBoxes);
    
            const rowsValue = [
              createData(
                "Flight Cost for (" + categoriesCharges.duration + ")",
                formatCurrency("" + Number(categoriesCharges[`amount_${categoriesCharges.category_type}`]).toFixed(2))
              ),
              // createData("Sub Total", formatCurrency(""+subTotal_1), formatCurrency(""+subTotal_2), formatCurrency(""+subTotal_3)),
              // createData("GST (18%)", gst_1, gst_2, gst_3),
              // createData("Grand Total", grandTotal_1, grandTotal_2, grandTotal_3),
            ];
    
            chargeBoxes.map((charge) => {
              let value = formatCurrency("" + Number(charge.value).toFixed(2));
              rowsValue.push(createData(charge.title, value));
            });
    
            rowsValue.push(
              createData(
                "Sub Total",
                formatCurrency(
                  "" + Number(categoriesCharges[`subTotal_${categoriesCharges.category_type}`]).toFixed(2)
                )
              )
            );
            rowsValue.push(
              createData(
                "Discount",
                formatCurrency(
                  "" + Number(categoriesCharges[`discount`]).toFixed(2)
                )
              )
            );
            rowsValue.push(
              createData(
                "Sub Total (After Discount)",
                formatCurrency(
                  "" + Number(categoriesCharges[`st_after_discount_${categoriesCharges.category_type}`]).toFixed(2)
                )
              )
            );
            rowsValue.push(
              createData(
                "GST (18%)",
                formatCurrency("" + Number(categoriesCharges[`gst_${categoriesCharges.category_type}`]).toFixed(2))
              )
            );
            rowsValue.push(
              createData(
                "Grand Total",
                formatCurrency(
                  "" + Number(categoriesCharges[`grandTotal_${categoriesCharges.category_type}`]).toFixed(2)
                )
                )
            );
    
            // await tripDetails.map(async (tripDetail, index) => {
            //   let ObjLatLng = await getCoordinatesFromNominatim(
            //     tripDetail["departure_name"]
            //   );
            //   //  let tempObj={
            //   //   lat:ObjLatLng.latitude,
            //   //   lng:ObjLatLng.longitude,
            //   //  }
            //   mapLatLng = [
            //     ...mapLatLng,
            //     ...[{ lat: ObjLatLng.latitude, lng: ObjLatLng.longitude }],
            //   ];
            //   if (index === tripDetails.length - 1) {
            //     ObjLatLng = await getCoordinatesFromNominatim(
            //       tripDetail["arrival_name"]
            //     );
            //     mapLatLng = [
            //       ...mapLatLng,
            //       ...[{ lat: ObjLatLng.latitude, lng: ObjLatLng.longitude }],
            //     ];
            //     console.log(mapLatLng);
            //     setMapLatLng(mapLatLng);
            //   }
            // });
    
            await tripDetails.map(async (tripDetail, index) => {
              let ObjLatLng = await getCoordinatesFromNominatim(
                tripDetail["departure_name"]
              );
              //  let tempObj={
              //   lat:ObjLatLng.latitude,
              //   lng:ObjLatLng.longitude,
              //  }
              mapLngLat = [
                ...mapLngLat,
                ...[{ name:tripDetail["departure_name"], coordinates:[ObjLatLng.longitude,ObjLatLng.latitude]}],
              ];
              if (index === tripDetails.length - 1) {
                ObjLatLng = await getCoordinatesFromNominatim(
                  tripDetail["arrival_name"]
                );
                mapLngLat = [
                  ...mapLngLat,
                  ...[{ name:tripDetail["arrival_name"], coordinates:[ObjLatLng.longitude,ObjLatLng.latitude]}],
                ];
                setMapLngLat(mapLngLat);
                setMapShow(true);
              }
            });
    
            setCatType(categoriesCharges.category_type);
            setCatValue(categoriesCharges.category_value);
            setRows(rowsValue);
            setShowValues(true);
            // getPDF(categoriesCharges.category_type);
            // setTimeout(() => {
            //   const element = document.getElementById("end-of-first-card");
            //   if (element) {
            //     // 👇 Will scroll smoothly to the top of the next section
            //     element.scrollIntoView({ behavior: "smooth" });
            //   }
            // }, 500);
          }, 500);
        } catch (error) {
          console.error(error);
        }
      
    };
    fetchData();
  },[]);

  const handleCaptureMap = (imageBase64) => {
    setMapImgData(imageBase64);
  };

  useEffect(()=>{
      if(mapImgData!=null && catType!=0){
        getPDF(catType);
      }
  },[mapImgData]);

  const getPDF = (catType) => {
    let tripDetails = [{}];
    let quotesDetails = {};
    let categoriesCharges = {};
    let chargeBoxes = [{}];
    let data;
    try {
      setTimeout(async () => {

        await axios
          .get(`${DB_URL}/api/trip_details/${customerIdToView}`)
          .then((data) => {
            tripDetails = data.data;
          })
          .catch((error) => console.log(error));

        await axios
          .get(`${DB_URL}/api/quotations/${customerIdToView}`)
          .then((data) => {
            quotesDetails = data.data[0];
          })
          .catch((error) => console.log(error));

        // console.log(quotesDetails);

        await axios
          .get(`${DB_URL}/api/customer-pricing/${customerIdToView}`)
          .then((data) => {
            categoriesCharges = data.data[0];
          })
          .catch((error) => console.log(error));

        // console.log(categoriesCharges);

        await axios
          .get(`${DB_URL}/api/charges/${customerIdToView}`)
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

          const template: Template = data;

          const data_1 = {
            Header: `Thank you ${quotesDetails["customer_name"]}, Here is your brief snippet.`,
            Aircraft: `${quotesDetails["label"]}`,
            QuotationNO: `${quotesDetails["quotation_no"]}`,
            main_date: `${new Date(quotesDetails["created_at"]).toLocaleDateString(
              "en-GB"
            )}`,
            "total-flight-time": categoriesCharges.duration,
            "flying-cost":
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`amount_${catType}`]).toFixed(2)
              ),
            "sub-total":
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`subTotal_${catType}`]).toFixed(2)
              ),
            "discount":
              "- ₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`discount`]).toFixed(2)
              ),
            "Sub_Total_Discount":
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`st_after_discount_${catType}`]).toFixed(2)
              ),
            "gst":
              "₹ " +
              formatCurrency("" + Number(categoriesCharges[`gst_${catType}`]).toFixed(2)),
            "grand-total":
              "₹ " +
              formatCurrency(
                "" +
                  Number(categoriesCharges[`grandTotal_${catType}`]).toFixed(2)
              ),
            "terms-condition": "(Terms and Conditions need to be update.....)",
            Total:
              "₹ " +
              formatCurrency(
                "" + Number(categoriesCharges[`amount_${catType}`]).toFixed(2)
              ),
            Map: mapImgData,
            // specification: specImgData,
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
                    Math.ceil(value["duration_minutes"] / 15) * (categoriesCharges['category_value'] / 4)
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
            setBlob(blob);
            // let today = new Date();
            // let date =
            //   today.getFullYear() +
            //   "-" +
            //   (today.getMonth() + 1) +
            //   "-" +
            //   today.getDate();
            // let time = `${today.getHours()}.${today.getMinutes()}.${today.getSeconds()}`;
            // let dateTime = date + "_" + time;
            // saveAs(blob, `Quotation_${dateTime}.pdf`); // Use the saveAs function to save the file with the specified filename

            //   // Node.js
            //   // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
          });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewOpen =()=>{
    setOpenView(true);
  }

  const handleViewClose = ()=>{
    setOpenView(false);
  }

  const handleDownload=()=>{
    saveAs(blob, `${quotationNo}.pdf`);
  };

  const handlePrint =()=>{
    const blobURL = URL.createObjectURL(blob);

    const iframe =  document.createElement('iframe'); //load content in an iframe to print later
    document.body.appendChild(iframe);

    iframe.style.display = 'none';
    iframe.src = blobURL;
    iframe.onload = function() {
      setTimeout(function() {
        iframe.focus();
        iframe.contentWindow.print();
      }, 1);
    };
  
  }

  const options=[
    {
      title:'Edit',
      icon:'solar:pen-bold',
      onClick:()=>{handleTabChange("3");},
    },
    {
      title:'View PDF',
      icon:'solar:eye-bold',
      onClick: handleViewOpen,
    },
    {
      title:'Download PDF',
      icon:'eva:cloud-download-fill',
      onClick: handleDownload,
    },
    {
      title:'Print PDF',
      icon:'solar:printer-minimalistic-bold',
      onClick: handlePrint,
    },
    {
      title:'Send',
      icon:'iconamoon:send-fill',
      onClick:null,
    },
    {
      title:'Share',
      icon:'solar:share-bold',
      onClick:null,
    }
  ]

  const handleBreadCrumbsClick=(event, path)=> {
    event.preventDefault();
    // console.info("You clicked a breadcrumb.");
    // console.log(event);
    // navigate(`/${event.target.innerText}`.toLocaleLowerCase().replace(" ","_"));
    // window.open(event.target.href, "_self");
    navigate(path);
  }

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/app/dashboard"
      onClick={(event) => {
        handleBreadCrumbsClick(event, "/app/dashboard");
      }}
    >
      Dashboard
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/app/sales_management"
      onClick={(event) => {
        handleBreadCrumbsClick(event, "/app/sales_management");
      }}
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
        <title>Quotation View | GAMA AirOps </title>
      </Helmet>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {quotationNo}
          </Typography>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: "text.primary", display: { xs: "none", sm: "block" } }}
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

      <Stack
        direction="row"
        alignItems="center"
        gap={'24px'}
        mb={4}
      >
        <Stack
          gap={'8px'}
          direction="row"
          alignItems="center"
         width={'100%'}
        >
          { options.map((option)=>(
              <Tooltip key={option.title} title={option.title}>
                  <IconButton onClick={option.onClick}>
                      <Iconify icon={option.icon} />
                  </IconButton>
              </Tooltip>
          ))}
        </Stack>
        {/* <Button
          variant="contained"
          color="error"
          startIcon={<ArrowBackIcon fontSize="large" />}
          onClick={() => {
            handleTabChange("1");
          }}
        >
          Back&nbsp;to&nbsp;list
        </Button> */}
      </Stack>

      {showValues && (
          <Card>
            
            <Box px={2} pt={5} pb={2} borderRadius={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <TableContainer sx={{ maxWidth: 'auto', borderRadius:2}}>
                  <Table
                    sx={{ minWidth: 500 }}
                    aria-label="customized table"
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Pricing breakup</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell align="right">
                          Category {`${catType}`} ({`₹ ${formatCurrency(""+catValue)}`}/ hour) 
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row.pricing}>
                          <StyledTableCell component="th" scope="row">
                            {row.pricing}
                          </StyledTableCell>
                          <StyledTableCell></StyledTableCell>
                          <StyledTableCell align="right">{`₹ ${row.cat_1}`}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    {/* <TableFooter>
                      <StyledTableRow>
                        <StyledTableCell>
                        * Download a Quotation PDF
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h7" gutterBottom>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => {
                                getPDF(3);
                              }}
                              style={{ textTransform: "none" }}
                            >
                              <PictureAsPdfIcon />
                              &nbsp;<b>Download</b>
                            </Button>
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </StyledTableRow>
                    </TableFooter> */}
                  </Table>
                </TableContainer>
            </Box>

           {mapShow ? ( <Box px={2} pt={5} pb={2} sx={{ borderRadius: "20px" }}>
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
           ): null}
          </Card>
      )}
         {openView && (<Dialog
        fullScreen
        open={openView}
        onClose={handleViewClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {quotationNo}
            </Typography>
            <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon fontSize="large" />}
            onClick={handleViewClose}
          >
            Close
          </Button>
          </Toolbar>
        </AppBar>
        <iframe
        title="pdf"
    src={URL.createObjectURL(blob)}
    frameBorder="0"
    scrolling="auto"
    height="100%"
    width="100%"
></iframe>
            </Dialog>
         )}
    </>
  );
}
