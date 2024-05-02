import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../store/slices/productsSlice";
import Layout from "./Layout";

const ProductDetails = () => {
  const { id: productID } = useParams();

  const myCurrency = new Intl.NumberFormat("en-US");

  const {
    data: productDetails,
    isLoading: productDetailsLoading,
    error,
  } = useGetSingleProductQuery(productID);

  const [loadPage, setLoadPage] = useState(true);

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (loadPage) {
        setLoadPage(false);
      }
    }, 3000);

    return () => clearTimeout(setTimer);
  }, [loadPage]);

  return (
    <Layout>
      {loadPage || productDetailsLoading ? (
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
            margin: "0 auto",
          }}
        >
          Loading......
        </Box>
      ) : error ? (
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
            margin: "3rem auto",
          }}
        >
          {error.message}
        </Box>
      ) : (
        <Box sx={{ pt: "80px", pb: "20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography
              variant="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link to="/items">
                <Typography
                  variant="div"
                  sx={{
                    border: "1px solid blue",
                    p: ".5rem",
                    mr:"4px",
                    borderRadius: "10px",
                    backgroundColor: "blue",
                    color: "white",
                    ":hover": {
                      backgroundColor: "red",
                      border: "1px solid red",
                      color: "black",
                    },
                  }}
                >
                  Go Back
                </Typography>{" "}
              </Link>{" "}
              <Typography
                variant="div"
                sx={{ fontWeight: "600", color: "black", fontSize: "30px" }}
              >
                Item Details
              </Typography>
            </Typography>
          </Box>
          <div className="grid md:grid-cols-4 gap-4 mt-5">
            <div className="md:col-span-2 md:mt-0 h-fit md:sticky top-0">
              <img
                src={productDetails.images[0]}
                alt={productDetails.productName}
                className="w-full rounded-xl h-[400px] object-cover"
              />
            </div>
            <div className="md:col-span-2 p-[1rem] row-start-3 md:row-start-auto h-fit md:sticky top-0">
              <h1 className="text-2xl md:text-5xl text-slate-600 font-bold mb-[1rem]">
                {productDetails.productName}
              </h1>
              <hr className="w-full " />
              <h1 className="text-2xl md:text-4xl font-bold mt-[1rem] mb-[1rem]">
                {myCurrency.format(productDetails.productPrice)} FCFA
              </h1>
              <hr className="w-full" />
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetails.productDetails,
                }}
                className="my-[1rem]"
              ></div>
              <hr className="w-full" />
            </div>
          </div>
        </Box>
      )}
    </Layout>
  );
};

export default ProductDetails;
