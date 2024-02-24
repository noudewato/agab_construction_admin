import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useGetAllPropertiesQuery } from "../../../../store/slices/propertySlice";
import ListItemText from "@mui/material/ListItemText";

const BarChart = () => {
  const { data: properties, isLoading, error } = useGetAllPropertiesQuery();

  const [loadPage, setLoadPage] = useState(true);

  let myCurrency = new Intl.NumberFormat("en-US");

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (loadPage) {
        setLoadPage(false);
      }
    }, 5000);

    return () => clearTimeout(setTimer);
  }, [loadPage]);

  return (
    <Paper
      sx={{
        boxShadow: "none !important",
        borderRadius: "12px",
        padding: "15px",
        height: { xs: "100%", md: "100%" },
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "divider",
      }}
    >
      <Typography variant="h5">Proprietes Recentes</Typography>
      {loadPage || isLoading ? (
        <>...Loading</>
      ) : error ? (
        <Box>{error?.data?.message || error?.error}</Box>
      ) : (
        <>
          {properties?.slice(0, 5).map((propriete) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box sx={{ width: "40%", margin: ".5rem" }}>
                <img
                  src={propriete.images[0]}
                  className="rounded-xl w-full h-[100px] object-cover"
                  alt={propriete.propertyTitle}
                />
              </Box>
              <Box sx={{ width: "60%", margin: "0 .5rem .5rem 0" }}>
                <ListItemText
                  primary={propriete.propertyLocation}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {propriete.propertyTitle}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography component="span" variant="body2">
                    {propriete.propertyStatus === "A Vendre" ? (
                      <span className="border-2 p-1 rounded-lg font-semibold text-primary text-sm border-primary">
                        A louer
                      </span>
                    ) : (
                      <span className="border-2 p-1 rounded-lg font-semibold text-secondary text-sm border-secondary">
                        A vendre
                      </span>
                    )}
                  </Typography>
                  <Typography component="span" variant="body2" sx={{fontWeight:"bold"}}>
                    {myCurrency.format(propriete.propertyPrice)} FCFA
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Paper>
  );
};

export default BarChart;
