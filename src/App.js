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
  Profile
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="/realisations" element={<Realisation />} />
      <Route path="/services" element={<Services />} />
      <Route path="/a-vendre" element={<Avendre />} />
      <Route path="/a-vendre/:id" element={<PropertyForSellDetails />} />
      <Route path="/a-louer" element={<Alouer />} />
      <Route path="/a-louer/:id" element={<PropertyForRentDetails />} />
      <Route path="/parcelle" element={<Parcelle />} />
      <Route path="/parcelle/:id" element={<LandForSellDetails />} />
      <Route path="/boutique" element={<Quincallerie />} />
      <Route path="/boutique/:id" element={<QuincallerieItemPage />} />
      <Route path="/a-louer/details/:id" element={<PropertyDetails />} /> */}
      {/* <Route path="/property-6" element={<PropertySix />} /> */}
      {/* <Route path="/contact" element={<Contact />} />
      <Route path="/portifolio" element={<Portifolio />} />
      <Route path="/portifolio-2" element={<PortifolioTwo />} /> */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* LAND PROPERTIES ROUTE  */}
      <Route path="/parcelles" element={<LandProperties />} />
      <Route
        path="/parcelles/ajouter-une-parcelle"
        element={<AddLandProperty />}
      />
      <Route
        path="/parcelles/modifier-une-parcelle/:id"
        element={<EditLandProperty />}
      />
      <Route path="/parcelles/detail-parcelle/:id" element={<LandPropertyDetails />} />
      {/* LAND PROPERTIES ROUTE  */}

      {/* PRODUCTS ROUTE  */}
      <Route path="/agab-boutique" element={<Products />} />
      <Route
        path="/agab-boutique/ajouter-un-produit"
        element={<AddNewProduct />}
      />
      <Route
        path="/agab-boutique/modifier-cet-produit/:id"
        element={<EditProduct />}
      />

      <Route
        path="/agab-boutique/detail-du-produit/:id"
        element={<ProductDetails />}
      />
      {/* PRODUCTS ROUTE  */}

      {/* PROPERTIES ROUTE  */}
      <Route path="/agab-proprietes" element={<Property />} />
      <Route
        path="/agab-proprietes/ajouter-une-propriete"
        element={<AddProperty />}
      />
      <Route
        path="/agab-proprietes/modifier-cette-propriete/:id"
        element={<EditProperty />}
      />

      <Route
        path="/agab-proprietes/detail-du-propriete/:id"
        element={<PropertyDetails />}
      />
      {/* PROPERTIES ROUTE  */}

      {/* USERS ROUTE  */}
      <Route path="/agab-utilisateur" element={<Users />} />
      <Route
        path="/agab-utilisateur/ajouter-un-utilisateur"
        element={<AddNewUser />}
      />
      <Route
        path="/agab-utilisateur/modifier-cet-utilisateur/:id"
        element={<EditUser />}
      />
      {/* USERS ROUTE  */}

      {/* PROFILE ROUTE  */}
      <Route
        path="/profile"
        element={<Profile />}
      />
      {/* PROFILE ROUTE  */}
      <Route path="/products/categories" element={<ProductCategories />} />
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
};

export default App;
