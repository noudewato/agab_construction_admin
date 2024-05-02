// import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import {
  FiHome,
  FiLayers,
  // FiMail,
  // FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  // FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/dashboard",
  },
  {
    name: "Land Properties",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "Land Properties",
        url: "/landproperties",
      },
      {
        name: "Add Land Property",
        url: "/landproperties/new-landproperty",
      },
      // {
      //   name: "Product Category",
      //   url: "/products/categories",
      // },
    ],
  },
  {
    name: "Properties",
    icon: <FiLayers />,
    // icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "Properties",
        url: "/properties",
      },
      {
        name: "Add Property",
        url: "/properties/new-property",
      },
      // {
      //   name: "Product Category",
      //   url: "/products/categories",
      // },
    ],
  },

  {
    name: "Items",
    icon: <FaHandshake />,
    subLinks: [
      {
        name: "Items",
        url: "/items",
      },
      {
        name: "Add Item",
        url: "/items/new-item",
      },
      // {
      //   name: "Product Category",
      //   url: "/products/categories",
      // },
    ],
  },

  {
    name: "Users",
    icon: <FiUsers />,
    subLinks: [
      {
        name: "Users",
        url: "/users",
      },
      {
        name: "Add User",
        url: "/users/add-user",
      },
    ],
  },

  // {
  //   name: "Utilisateurs",
  //   icon: <FaShare />,
  //   url: "/agab-utilisateur",
  // },
  // {
  //   name: "Sales",
  //   icon: <BsCurrencyDollar />,
  //   subLinks: [
  //     {
  //       name: "Sales Analytics",
  //       url: "/sales/analysis",
  //     },
  //     {
  //       name: "Product Sales",
  //       url: "/sales",
  //     },
  //   ],
  // },
  // {
  //   name: "Orders",
  //   icon: <FiShoppingCart />,
  //   subLinks: [
  //     {
  //       name: "All Orders",
  //       url: "/orders",
  //     },
  //     {
  //       name: "Order Template",
  //       url: "/orders/template",
  //     },
  //   ],
  // },
  // {
  //   name: "Suppliers",
  //   icon: <FaShare />,
  //   url: "/suppliers",
  // },
  // {
  //   name: "Transactions",
  //   icon: <FaHandshake />,
  //   url: "/transactions",
  // },
  // {
  //   name: "Brands",
  //   icon: <FiLayers />,
  //   url: "/brands",
  // },
  // {
  //   name: "Reviews",
  //   icon: <FiMessageCircle />,
  //   url: "/reviews",
  // },
  {
    name: "Settings",
    icon: <FiSettings />,
    subLinks: [
      {
        name: "Profile",
        url: "/profile",
      }
    ],
  },
  // {
  //   name: "Settings",
  //   icon: <FiSettings />,
  //   url: "/settings",
  // },
  // {
  //   name: "Inbox",
  //   icon: <FiMail />,
  //   url: "/inbox",
  // },
];
