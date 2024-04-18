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
    name: "Land",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "Nos Parcelles",
        url: "/parcelles",
      },
      {
        name: "Nouvelle Parcelle",
        url: "/parcelles/ajouter-une-parcelle",
      },
      // {
      //   name: "Product Category",
      //   url: "/products/categories",
      // },
    ],
  },
  {
    name: "Proprietes",
    icon: <FiLayers />,
    // icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "Nos Proprietes",
        url: "/agab-proprietes",
      },
      {
        name: "Nouvelle Propriete",
        url: "/agab-proprietes/ajouter-une-propriete",
      },
      // {
      //   name: "Product Category",
      //   url: "/products/categories",
      // },
    ],
  },

  {
    name: "La boutique",
    icon: <FaHandshake />,
    subLinks: [
      {
        name: "Nos Produits",
        url: "/agab-boutique",
      },
      {
        name: "Nouveau Produit",
        url: "/agab-boutique/ajouter-un-produit",
      },
      // {
      //   name: "Product Category",
      //   url: "/products/categories",
      // },
    ],
  },

  {
    name: "Utilisateurs",
    icon: <FiUsers />,
    subLinks: [
      {
        name: "Utilisateurs",
        url: "/agab-utilisateur",
      },
      {
        name: "Nouveau Utilisateur",
        url: "/agab-utilisateur/ajouter-un-utilisateur",
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
    name: "Paramettre",
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
