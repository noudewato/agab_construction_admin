import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useGetAllPropertiesQuery } from "../../../store/slices/propertySlice";
// import { useGetLandPropertiesQuery } from "../../../store/slices/landPropertySlice";

const TopCountries = () => {
  const {
    data: properties,
    isLoading: loadProperties,
    error: propertyError,
  } = useGetAllPropertiesQuery();

  const uniqueCitiesSet = [
    ...new Set(properties?.map((property) => property.city)),
  ];

  const uniqueCities = [...uniqueCitiesSet]

    const cityCount = properties?.reduce((acc, property) => {
    acc[property.city] = (acc[property.city] || 0) + 1;
    return acc;
  }, {});
  return (
    <Box sx={{ padding: "15px" }}>
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        <span className="text-primary">Villes</span>/
        <span className="text-secondary">Villages</span>
      </Typography>
      <Typography sx={{ fontSize: "16px", opacity: 0.7, fontWeight: "600" }}>
        Nos proprietes dans differentes villes
      </Typography>
      {loadProperties ? (
        <>...Loading</>
      ) : propertyError ? (
        <Box>{propertyError?.data?.message || propertyError?.error}</Box>
      ) : (
        <Box sx={{ my: 2 }}>
          {uniqueCities?.map((city, index) => (
            <Stack
              direction={"row"}
              alignItems="center"
              justifyContent={"space-between"}
              spacing={2}
              key={index}
              sx={{ my: 3 }}
            >
              <Stack direction={"row"} alignItems="center" spacing={1}>
                {/* <Avatar src={flag} sx={{ width: 30, height: 30 }} /> */}
                <Typography sx={{ fontSize: "22px", color: "black" }}>
                  {city}
                </Typography>
              </Stack>
              <Typography
                sx={{ fontSize: "16px", fontWeight: "bold", color: "black" }}
              >
                {cityCount[city]}
              </Typography>
            </Stack>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TopCountries;
