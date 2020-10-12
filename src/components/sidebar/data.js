import React from 'react';
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import CategoryIcon from "@material-ui/icons/Category";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import StorageIcon from "@material-ui/icons/Storage";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";

export const options = [
  {
    id: "Products",
    icon: <ShoppingBasketOutlinedIcon />,
    path: "/products",
    paths: ["/products", "/products/detail", "/products/new"],
    options: [
      { name: "Product Detail", path: "/products/detail" },
      { name: "New Product", path: "/products/new" },
    ],
  },
  {
    id: "Orders",
    path: "/orders",
    paths: ["/orders", "/orders/details"],
    icon: <AddShoppingCartIcon />,
    options: [{ name: "Orders Detail", path: "/orders/details" }],
  },
  {
    id: "Categories",
    icon: <CategoryIcon />,
    path: "/categories",
    paths: ["/categories", "/categories/add/subcategory"],
    options: [
      // { name: "Add Categories", path: "/categories" },
      // { name: "Add Sub Categories", path: "/categories/add/subcategory" },
    ],
  },
  {
    id: "Items",
    icon: <StorageIcon />,
    path: "/items",
    paths: ["/items"],
    options: [],
  },
  {
    id: "Games",
    icon: <SportsEsportsIcon />,
    path: "/games",
    paths: ["/games"],
    options: [],
  },
  {
    id: "Notifications",
    icon: <NotificationsNoneIcon />,
    path: "/notifications",
    paths: ["/notifications", "/notifications/new"],
    options: [
      {
        name: "All notifications",
        path: "/notifications",
      },
      {
        name: "Add New Notification",
        path: "/notifications/new",
      },
    ],
  },
  {
    id: "Users",
    icon: <PeopleIcon />,
    path: "/users",
    paths: ["/users"],
    options: [
      {
        name: "All users",
        path: "/users",
      },
    ],
  },
  {
    id: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    paths: ["/settings"],
    options: [
      {
        name: "Labels",
        path: "/settings",
      },
    ],
  },
];