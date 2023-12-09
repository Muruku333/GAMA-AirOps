// component
import SvgColor from "../../../components/svg-color";
import Iconify from "../../../components/iconify";
import DescriptionIcon from "@mui/icons-material/Description";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: "inherit", height: "inherit" }}
  />
);

const navConfig = [
  {
    title: "overview",
    content: [
      // Overview
      {
        title: "dashboard",
        path: "/app/dashboard",
        icon: icon("ic_dashboard"),
      },
      {
        title: "sales management",
        path: "/app/sales_management",
        icon:<Iconify icon={"solar:tag-bold-duotone"} width={24} />,
        children: [
          // {
          //   title: 'customer contacts',
          //   path: '/app/sales_management/customer_contacts',
          //   icon: icon('ic_user'),
          // },
          {
            title: "quotation",
            path: "/app/sales_management/quotation",
            icon: <Iconify icon={"solar:file-text-bold-duotone"} width={24} />, //  icon('ad_file-text-filled')
          },
          // {
          //   title: 'lead',
          //   path: '/app/sales_management/lead',
          //   icon: icon('ic_cart'),
          // },
          {
            title: "proforma invoice",
            path: "/app/sales_management/proforma_invoice",
            icon: <Iconify icon={"solar:bill-check-bold-duotone"} width={24} />,
          },
          // {
          //   title: 'tax invoice',
          //   path: '/app/sales_management/tax_invoice',
          //   icon: icon('ic_cart'),
          // }
        ],
      },
      // {
      //   title: "trip management",
      //   path: "/app/trip_management",
      //   icon: icon("ic_flight"),
      //   children: [
      //     {
      //       title: "crew rostering",
      //       path: "/app/trip_management/crew_rostering",
      //       icon: icon("ic_user"),
      //     },
      //     {
      //       title: "calendar",
      //       path: "/app/trip_management/calendar",
      //       icon: icon("ic_cart"),
      //     },
      //     {
      //       title: "notam clearance",
      //       path: "/app/trip_management/notam_clearance",
      //       icon: icon("ic_cart"),
      //     },
      //     {
      //       title: "aircraft availability",
      //       path: "/app/trip_management/aircraft_availability",
      //       icon: icon("ic_cart"),
      //     },
      //     {
      //       title: "FDTL",
      //       path: "/app/trip_management/fdtl",
      //       icon: icon("ic_cart"),
      //     },
      //     {
      //       title: "watch dog",
      //       path: "/app/trip_management/watch_dog",
      //       icon: icon("ic_cart"),
      //     },
      //   ],
      // },
      // {
      //   title: "maintenance",
      //   path: "/app/maintenance",
      //   icon: icon("ic_build"),
      //   children: [
      //     {
      //       title: "CAMO",
      //       path: "/app/maintenance/camo",
      //       icon: icon("ic_user"),
      //     },
      //     {
      //       title: "purchase order",
      //       path: "/app/maintenance/purchase_order",
      //       icon: icon("ic_cart"),
      //     },
      //     {
      //       title: "work order",
      //       path: "/app/maintenance/work_order",
      //       icon: icon("ic_cart"),
      //     },
      //     {
      //       title: "spare parts",
      //       path: "/app/maintenance/spare_parts",
      //       icon: icon("ic_cart"),
      //     },
      //   ],
      // },
      // {
      //   title: "user",
      //   path: "/dashboard/user",
      //   icon: icon("ic_user"),
      // },
      // {
      //   title: "product",
      //   path: "/dashboard/products",
      //   icon: icon("ic_cart"),
      // },
      // {
      //   title: "blog",
      //   path: "/dashboard/blog",
      //   icon: icon("ic_blog"),
      // },
      // {
      //   title: "login",
      //   path: "/login",
      //   icon: icon("ic_lock"),
      // },
      // {
      //   title: "Not found",
      //   path: "/404",
      //   icon: icon("ic_disabled"),
      // },
    ],
  },
  {
    title: "trip management",
    content: [
      {
        title: "masters",
        path: "/app/masters",
        icon: <Iconify icon={"solar:database-bold-duotone"} width={24} />,
        children: [
          {
            title: "aircraft model",
            path: "/app/masters/aircraft_model",
            icon: <Iconify icon={"entypo:aircraft"} width={24} />,
          },
          {
            title: "aircraft",
            path: "/app/masters/aircraft",
            icon: <Iconify icon={"entypo:aircraft"} width={24} />,
          },
          {
            title: "country",
            path: "/app/masters/country",
            icon: <Iconify icon={"subway:world-1"} />,
          },
          {
            title: "city",
            path: "/app/masters/city",
            icon: <Iconify icon={"solar:city-bold-duotone"} width={24} />,
          },
          {
            title: "airport",
            path: "/app/masters/airport",
            icon: <Iconify icon={"mdi:airport"} width={24} />,
          },
          {
            title: "duty status detail",
            path: "/app/masters/duty_status_detail",
            icon: (
              <Iconify
                icon={"solar:watch-square-minimalistic-bold-duotone"}
                width={24}
              />
            ),
          },
          {
            title: "crew",
            path: "/app/masters/crew",
            icon: <Iconify icon={"mdi:account-pilot"} width={24} />,
          },
          {
            title: "group",
            path: "/app/masters/group",
            icon: (
              <Iconify
                icon={"solar:users-group-two-rounded-bold-duotone"}
                width={24}
              />
            ),
          },
          {
            title: "delay category",
            path: "/app/masters/delay_category",
            icon: (
              <Iconify icon={"solar:alarm-sleep-bold-duotone"} width={24} />
            ),
          },
          {
            title: "delay explanation",
            path: "/app/masters/delay_explanation",
            icon: (
              <Iconify
                icon={"material-symbols-light:assignment-late"}
                width={24}
              />
            ),
          },
          {
            title: "Crew Training/Document Master",
            path: "/app/masters/crew_training/document_master",
            icon: <Iconify icon={"fluent:chart-person-20-filled"} width={24} />,
          },
          {
            title: "hotel",
            path: "/app/masters/hotel",
            icon: <Iconify icon={"solar:sleeping-bold-duotone"} width={24} />,
          },
        ],
      },
      // {
      //   title: "entry",
      //   path: "/app/entry",
      //   icon: <Iconify icon={"fluent:form-new-24-filled"} width={24} />,
      //   children: [
      //     {
      //       title: "crew roaster",
      //       path: "/app/entry/crew_roaster",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "flight scheduler",
      //       path: "/app/entry/flight_scheduler",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "crew allocation",
      //       path: "/app/entry/crew_allocation",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew Training/Document",
      //       path: "/app/entry/crew_training/document",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Message Board",
      //       path: "/app/entry/message_board",
      //       icon: icon("ic_sell"),
      //     },
      //   ],
      // },
      // {
      //   title: "reports",
      //   path: "/app/reports",
      //   icon: <Iconify icon={"solar:chart-bold-duotone"} width={24} />,
      //   children: [
      //     {
      //       title: "Crew Training Document Report",
      //       path: "/app/reports/crew_training_document_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew Monthy Report",
      //       path: "/app/reports/crew_monthy_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew FD/FT Status List Report",
      //       path: "/app/reports/crew_fd/ft_status_list_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew duty status report",
      //       path: "/app/reports/crew_duty_status_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Graphical Report",
      //       path: "/app/reports/graphical_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew FDT Status Report",
      //       path: "/app/reports/crew_fdt_status_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Monthy Schedule Report",
      //       path: "/app/reports/monthy_schedule_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew Schedule Advisory Report",
      //       path: "/app/reports/crew_schedule_advisory_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Delay Breakdown report",
      //       path: "/app/reports/delay_breakdown_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Station Report ",
      //       path: "/app/reports/station_report ",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Violation Report",
      //       path: "/app/reports/violation_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Daily Occ Report",
      //       path: "/app/reports/daily_occ_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Crew Duty Log report",
      //       path: "/app/reports/crew_duty_log_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Flight Detail Report",
      //       path: "/app/reports/flight_detail_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Recency Report",
      //       path: "/app/reports/recency_report",
      //       icon: icon("ic_sell"),
      //     },
      //     {
      //       title: "Aircraft Monthly Flying Report",
      //       path: "/app/reports/aircraft_monthly_flying_report",
      //       icon: icon("ic_sell"),
      //     },
      //   ],
      // },
      // {
      //   title: "utility",
      //   path: "/app/utility",
      //   icon: <Iconify icon={"solar:monitor-bold-duotone"} width={24} />,
      //   children: [
      //     {
      //       title: "Import Crew Roaster",
      //       path: "/app/utility/import_crew_roaster",
      //       icon: <Iconify />,
      //     },
      //     {
      //       title: "Emil/SMS Configuration",
      //       path: "/app/utility/emil/sms_configuration",
      //       icon: <Iconify />,
      //     },
      //     {
      //       title: "Import Allocation",
      //       path: "/app/utility/import_allocation",
      //       icon: <Iconify />,
      //     },
      //   ],
      // },
    ],
  },
];

export default navConfig;
