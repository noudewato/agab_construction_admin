import { Routes, Route } from "react-router-dom";
// import {
//   Services,
//   Alouer,
//   Contact,
//   Portifolio,
//   PortifolioTwo,
//   PageNotFound,
//   Home,
//   Avendre,
//   Parcelle,
//   Quincallerie,
//   QuincallerieItemPage,
// } from "./pages";
// import Realisation from "./pages/Realisation";
// import PropertyForSellDetails from "./pages/PropertyForSellDetails";
// import PropertyForRentDetails from "./pages/PropertyForRentDetails";
// import LandForSellDetails from "./pages/LandForSellDetails";
import {
  AddLandProperty,
  EditLandProperty,
  LandProperties,
  LandPropertyDetails,
  Dashboard,
  Products,
  EditProduct,
  ProductCategories,
  SignIn,
  AddNewProduct,
  ProductDetails,
  Property,
  AddProperty,
  PropertyDetails,
  EditProperty,
  Users,
  AddNewUser,
  EditUser,
  Profile,
  TestPage,
} from "./pages";
import TestApp from "./TestApp";

const App = () => {
  return (
    <Routes>
      <Route path="/testapp" element={<TestApp />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/testpage" element={<TestPage/>} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* LAND PROPERTIES ROUTE  */}
      <Route path="/landproperties" element={<LandProperties />} />
      <Route
        path="/landproperties/new-landproperty"
        element={<AddLandProperty />}
      />
      <Route
        path="/landproperties/edit-landproperty/:id"
        element={<EditLandProperty />}
      />
      <Route
        path="/landproperties/landproperty-details/:id"
        element={<LandPropertyDetails />}
      />
      {/* LAND PROPERTIES ROUTE  */}

      {/* PRODUCTS ROUTE  */}
      <Route path="/items" element={<Products />} />
      <Route
        path="/items/new-item"
        element={<AddNewProduct />}
      />
      <Route
        path="/items/edit-item/:id"
        element={<EditProduct />}
      />

      <Route
        path="/items/item-details/:id"
        element={<ProductDetails />}
      />
      {/* PRODUCTS ROUTE  */}

      {/* PROPERTIES ROUTE  */}
      <Route path="/properties" element={<Property />} />
      <Route
        path="/properties/new-property"
        element={<AddProperty />}
      />
      <Route
        path="/properties/edit-property/:id"
        element={<EditProperty />}
      />

      <Route
        path="/properties/property-details/:id"
        element={<PropertyDetails />}
      />
      {/* PROPERTIES ROUTE  */}

      {/* USERS ROUTE  */}
      <Route path="/users" element={<Users />} />
      <Route
        path="/users/add-user"
        element={<AddNewUser />}
      />
      <Route
        path="/users/edit-user/:id"
        element={<EditUser />}
      />
      {/* USERS ROUTE  */}

      {/* PROFILE ROUTE  */}
      <Route path="/profile" element={<Profile />} />
      {/* PROFILE ROUTE  */}
      <Route path="/products/categories" element={<ProductCategories />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default App;
