import React, { useEffect, useRef, useState } from "react";
// import { BiBed, BiMap, BiMapAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
// import { FaPhoneAlt, FaWhatsapp, FaBath } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import Layout from "./Layout";
import { useGetSinglePropertyQuery } from "../store/slices/propertySlice";
import { Box, Typography } from "@mui/material";

const PropertyDetails = () => {
  const { id: landPropertyId } = useParams();

  const {
    data: propertyDetails,
    isLoading: getPropertyDetailsLoader,
    error,
  } = useGetSinglePropertyQuery(landPropertyId);

  let myCurrency = new Intl.NumberFormat("en-US");

  const images = propertyDetails?.images.map((image) => ({
    original: `${image}`,
    thumbnail: `${image}`,
  }));

  const [loadPage, setLoadPage] = useState(true);

  useEffect(() => {
    const setTimmer = setTimeout(() => {
      if (loadPage) {
        setLoadPage(false);
      }
    }, 3000);

    return () => clearTimeout(setTimmer);
  }, [loadPage]);

  return (
    <Layout>
      {loadPage || getPropertyDetailsLoader ? (
        <Box
          sx={{
            pt: "80px",
            pb: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            minHeight: "100vh",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            margin: "3rem auto 0",
          }}
        >
          Loading......
        </Box>
      ) : (
        <div className="px-[1%] md:px-[1%] pt-[3rem] mt-[3rem] bg-slate-100 min-h-[100vh] pb-[.5rem]">
          <Typography variant="h4" sx={{ marginBottom: "06px" }}>
            Detail du Propriete
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-4">
              <div className="bg-white shadow-2xl rounded-lg">
                <ImageGallery
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={false}
                />
              </div>

              <div className="my-[1rem] p-[1rem] bg-white shadow-2xl rounded-lg">
                <h2 className="text-xl font-semibold">
                  {propertyDetails.propertyTitle}
                </h2>
                <div>
                  <h3 className="py-[.5rem] text-xl font-semibold">
                    <span className="text-secondary">Ville/Village:</span>{" "}
                    <span className="text-primary">
                      {propertyDetails?.city}
                    </span>{" "}
                  </h3>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="pt-[.5rem] text-xl font-semibold">
                      <span className="text-secondary">Address:</span>{" "}
                      <span className="text-primary">
                        {propertyDetails?.propertyLocation}
                      </span>{" "}
                    </h3>
                  </div>
                  <div>
                    <h3 className="py-[.5rem] text-xl font-semibold">
                      <span className="text-secondary">Prix:</span>{" "}
                      <span className="text-primary">
                        {myCurrency.format(propertyDetails?.propertyPrice)} FCFA
                      </span>{" "}
                    </h3>
                  </div>

                  <div>
                    <h3 className="pt-[.5rem] text-xl font-semibold">
                      <span className="text-secondary">A Vendre/A Louer:</span>{" "}
                      <span className="text-primary">
                        {propertyDetails?.propertyStatus}
                      </span>{" "}
                    </h3>
                  </div>
                  <div>
                    <h3 className="py-[.5rem] text-xl font-semibold">
                      <span className="text-secondary">Type de propriete:</span>{" "}
                      <span className="text-primary">
                        {propertyDetails?.propertyType}
                      </span>{" "}
                    </h3>
                  </div>
                </div>
                <hr className="h-[10px]" />
                <h1 className="text-xl font-bold py-[1rem]">Details</h1>
                <div>
                  <div
                    className="text-lg text-slate-900 py-[1rem]"
                    dangerouslySetInnerHTML={{
                      __html: propertyDetails.propertyDetails,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div className="md:col-span-1 px-[.5rem] bg-white shadow-2xl rounded-lg h-[200px]"> */}
            {/* <h1 className="text-2xl md:text-xl font-bold mb-[1rem] pt-[1rem]">
                {myCurrency.format(propertyDetails?.prix)} FCFA
                <br />
                {propertyDetails?.options ? (
                  <span>
                    {myCurrency.format(propertyDetails?.options?.price)}{" "}
                    FCFA/
                  </span>
                ) : (
                  ""
                )}
                </h1> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PropertyDetails;
