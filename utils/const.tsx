import CustomersIcon from "../components/CustomIcons/CustomersIcon";
import DashboardIcon from "../components/CustomIcons/DashboardIcon";
import Logout from "../components/CustomIcons/Logout";
import Orders from "../components/CustomIcons/Orders";
import PlanIcon from "../components/CustomIcons/PlanIcon";
import Support from "../components/CustomIcons/Support";
import Transaction from "../components/CustomIcons/TransactionsIcon";

export const sideNavData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    Icon: Orders,
  },
  {
    title: "Plan",
    url: "/dashboard/plan",
    Icon: PlanIcon,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    Icon: CustomersIcon,
  },
  {
    title: "Buyer",
    url: "/dashboard/buyer",
    Icon: CustomersIcon,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    Icon: Transaction,
  },
  {
    title: "Support",
    url: "/dashboard/supports",
    Icon: Support,
  },
  {
    title: "Logout",
    url: "/logout",
    Icon: Logout,
  },
];

export const orderFilter = [
  { value: "all", label: "All orders" },
  { value: "in progress", label: "In progress" },
  { value: "pending", label: "Pending order" },
  { value: "completed", label: "Completed order" },
  { value: "cancelled", label: "Cancelled order" },
];
export const transactionFilter = [
  { value: "all", label: "All transactions" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];
export const ticketFilter = [
  { value: "all", label: "All Ticket" },
  { value: "pending", label: "Pending Ticket" },
  { value: "replied", label: "Replied Ticket" },
  { value: "solved", label: "Solved Ticket" },
];

export const customerFilter = [
  { value: "all", label: "All users" },
  { value: "inactive", label: "Inactive users" },
  { value: "active", label: "Active users" },
  { value: "banned", label: "Banned users" },
];

export const dateFilterOptions = [
  { value: "month", label: "Last month" },
  { value: "hour", label: "Last hour" },
  { value: "day", label: "Yesterday" },
  { value: "week", label: "Last week" },
  { value: "year", label: "This year" },
];
export const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "in progress", label: "In Progress" },
  { value: "cancelled", label: "Cancelled" },
];
export const transactionStatus = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];
export const serviceTypeOptions = [
  { value: "upwork", label: "Upwork" },
  { value: "fiverr", label: "Fiverr" },
];
export const packageTypeOptions = [
  { value: "simple client", label: "Simple client" },
  { value: "active client", label: "Active client" },
  { value: "custom client", label: "Custom client" },
];
export const buyerTypeOptions = [
  { label: "Professional", value: "professional" },
  { label: "Active", value: "active" },
];

export const clientTypeOption = [
  { value: "professional", label: "Professional clients" },
  { value: "simple", label: "Simple clients" },
];

export const cardData = [
  {
    title: "Total Revenue",
    total: 1200,
  },
  {
    title: "Total Orders",
    total: "10",
  },
  {
    title: "Pending Orders",
    total: "5",
  },
  {
    title: "Total Purchaser",
    total: "100",
  },
];

export const fiverService = [
  {
    clientType: "Simple client",
    price: 15,
    services: [
      "Get 1 Review",
      "Get 1 Review",
      "24/7 Free Support",
      "5 Social Media Reviews",
      "Upgrade Options",
    ],
  },
  {
    clientType: "Custom client",
    price: 25,
    services: [
      "Get 1 Review",
      "Get 1 Review",
      "24/7 Free Support",
      "5 Social Media Reviews",
      "Upgrade Options",
    ],
  },
  {
    clientType: "Active client",
    price: 45,
    services: [
      "Get 1 Review",
      "Get 1 Review",
      "24/7 Free Support",
      "5 Social Media Reviews",
      "Upgrade Options",
    ],
  },
];

export const upworkService = [
  {
    clientType: "Simple client",
    price: 10,
    services: [
      "Get 1 Review",
      "Get 1 Review",
      "24/7 Free Support",
      "5 Social Media Reviews",
      "Upgrade Options",
    ],
  },
  {
    clientType: "Custom client",
    price: 15,
    services: [
      "Get 1 Review",
      "Get 1 Review",
      "24/7 Free Support",
      "5 Social Media Reviews",
      "Upgrade Options",
    ],
  },
  {
    clientType: "Active client",
    price: 35,
    services: [
      "Get 1 Review",
      "Get 1 Review",
      "24/7 Free Support",
      "5 Social Media Reviews",
      "Upgrade Options",
    ],
  },
];

export const orderLeftData = [
  {
    label: "Client name",
    value: "Rakib",
  },
  {
    label: "Package Type",
    value: "Custom client",
  },
  {
    label: "Buyer’s Type",
    value: "Professional",
  },
];

export const orderRightData = [
  {
    label: "Buyer’s Country",
    value: "Dhaka, Bangladesh",
  },
  {
    label: "Gig Price",
    value: 500,
  },
  {
    label: "Status",
    value: "Completed",
  },
];

export const serviceTab = [
  {
    title: "Fiverr",
    value: "fiverr",
  },
  {
    title: "Upwork",
    value: "upwork",
  },
];
