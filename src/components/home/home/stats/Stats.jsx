import styled from "@emotion/styled";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { FiHome, FiShoppingBag, FiShoppingCart, FiUsers } from "react-icons/fi";
import { useGetAllPropertiesQuery } from "../../../../store/slices/propertySlice";
import { useGetLandPropertiesQuery } from "../../../../store/slices/landPropertySlice";
import { useGetProductsQuery } from "../../../../store/slices/productsSlice";
import { useAllUsersQuery } from "../../../../store/slices/usersApiSlice";

const Stats = () => {
  const {
    data: properties,
    isLoading: loadProperties,
    error: propertyError,
  } = useGetAllPropertiesQuery();
  const {
    data: landProperties,
    isLoading: loadLandProperties,
    error: landPropertiesError,
  } = useGetLandPropertiesQuery();
  const {
    data: products,
    isLoading: loadProduct,
    error: productError,
  } = useGetProductsQuery();

  const {
    data: users,
    isLoading: loadUser,
    error: userError,
  } = useAllUsersQuery();

  const Item = styled(Paper)({
    padding: "5px 10px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });
  const forRent = properties?.map((sale) => sale?.propertyStatus === "A Louer");
  console.log(forRent?.length);

  const uniquePropertiesSet = [
    ...new Set(properties?.map((property) => property.propertyStatus)),
  ];

  const uniqueProperties = [...uniquePropertiesSet];

  const propertyCount = properties?.reduce((acc, property) => {
    acc[property.propertyStatus] = (acc[property.propertyStatus] || 0) + 1;
    return acc;
  }, {});

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} lg={3} md={3}>
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          {loadLandProperties ? (
            <>...</>
          ) : landPropertiesError ? (
            <Box>
              {landPropertiesError?.data?.message || landPropertiesError?.error}
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                <IconButton color="primary">
                  <FiShoppingBag />
                </IconButton>
                Parcelles
              </Typography>
              <Typography
                sx={{
                  opacity: 0.7,
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "black",
                  ml: "1rem",
                }}
              >
                {landProperties?.length ? landProperties?.length : "0"}
              </Typography>
            </Box>
          )}
        </Item>
      </Grid>

      {/*  */}

      <Grid item xs={12} sm={12} lg={3} md={3}>
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          {loadProperties ? (
            <>...</>
          ) : propertyError ? (
            <Box>{propertyError?.data?.message || propertyError?.error}</Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                <IconButton color="error">
                  <FiHome />
                </IconButton>
                Proprietes
              </Typography>
              <Typography
                sx={{
                  opacity: 0.7,
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "black",
                  ml: "1rem",
                }}
              >
                {properties?.length}

                {uniqueProperties.map((property, index) => (
                  <Typography key={index} sx={{ float: "right" }}>
                    {property === "A Louer" ? (
                      <span className="border p-1 rounded-lg font-semibold text-primary text-sm border-primary">
                        A louer {propertyCount[property]}
                      </span>
                    ) : (
                      <span>
                        <br />
                        <span className="border p-1 rounded-lg font-semibold text-secondary text-sm border-secondary">
                          A vendre {propertyCount[property]}
                        </span>
                      </span>
                    )}
                  </Typography>
                ))}
              </Typography>
            </Box>
          )}
        </Item>
      </Grid>

      {/*  */}

      <Grid item xs={12} sm={12} lg={3} md={3}>
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          {loadProduct ? (
            <>...</>
          ) : productError ? (
            <Box>{productError?.data?.message || productError?.error}</Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                <IconButton color="secondary">
                  <FiShoppingCart />
                </IconButton>
                Produits
              </Typography>
              <Typography
                sx={{
                  opacity: 0.7,
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "black",
                  ml: "1rem",
                }}
              >
                {products?.length}
              </Typography>
            </Box>
          )}
        </Item>
      </Grid>

      {/*  */}

      <Grid item xs={12} sm={12} lg={3} md={3}>
        <Item
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          {loadUser ? (
            <>...</>
          ) : userError ? (
            <Box>{userError?.data?.message || userError?.error}</Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                <IconButton color="warning">
                  <FiUsers />
                </IconButton>
                Utilisateurs
              </Typography>
              <Typography
                sx={{
                  opacity: 0.7,
                  fontWeight: "600",
                  fontSize: "2rem",
                  color: "black",
                  ml: "1rem",
                }}
              >
                {users?.length}
              </Typography>
            </Box>
          )}
        </Item>
      </Grid>
    </Grid>
  );
};

export default Stats;
