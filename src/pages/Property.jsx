import { Box, Button, Typography } from "@mui/material";
import "./striped.css";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiBed } from "react-icons/bi";
import {
  useGetAllPropertiesQuery,
  useDeletePropertyMutation,
} from "../store/slices/propertySlice";
import Layout from "./Layout";
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { toast } from "react-toastify";

const Property = () => {
  const { data: properties, isLoading, error } = useGetAllPropertiesQuery();

  const [deleteProperty, { isLoading: loadingDelete, refetch }] =
    useDeletePropertyMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("etes vous sure de supprimer cette propriete")) {
      try {
        await deleteProperty(id);
        toast.success("parcelle supprimee avec success");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [loadPage, setLoadPage] = useState(true);

  let myCurrency = new Intl.NumberFormat("en-US");

  useEffect(() => {
    const setTimer = setTimeout(() => {
      if (isLoading || loadPage) {
        setLoadPage(false);
      }
    }, 5000);

    return () => clearTimeout(setTimer);
  }, [isLoading, loadPage]);

  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: ["1"],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({});

  const columns = [
    {
      field: "images",
      width: 200,
      renderCell: (params) => {
        return (
          <img
            src={params.row.images[0]}
            className="rounded-xl w-full h-[100px] object-cover"
            alt={params.row.propertyTitle}
          />
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Images</div>
      ),
    },
    {
      field: "propertyTitle",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            {params.row.propertyTitle}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Propriete</div>
      ),
    },
    {
      field: "beds",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="p-[1px} flex justify-center align-middle text-lg font-semibold">
            <span className="p-[1px}  text-lg font-semibold">
              {myCurrency.format(params.row.beds)}
            </span>
            <div className="icon-box ml-2 !w-7 !h-7 bg-primary/20 hover:!bg-primary/40 text-primary">
              <BiBed />
            </div>
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Chambres</div>
      ),
    },
    {
      field: "propertyPrice",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="p-[1px} text-lg font-semibold">
            {params.row.propertyStatus === "A Vendre" ? (
              <span className="p-[1px} text-primary text-lg font-semibold">
                {myCurrency.format(params.row.propertyPrice)}
                <span className="p-[1px} text-secondary text-lg font-semibold">
                  FCFA
                </span>
              </span>
            ) : (
              <span className="p-[1px} text-primary text-lg font-semibold">
                {myCurrency.format(params.row.propertyPrice)}
                <span className="p-[1px} text-secondary text-lg font-semibold">
                  FCFA
                </span>
                <span className="text-slate-900">/mois</span>
                <br />
                {params.row.nightPrice === 0 ? (
                  <span className="p-[1px} text-primary hidden text-lg font-semibold">
                    0
                  </span>
                ) : (
                  <span className="p-[1px} text-primary text-lg font-semibold">
                    {myCurrency.format(params.row.nightPrice)}
                    <span className="p-[1px} text-secondary text-lg font-semibold">
                      FCFA
                    </span>
                    <span className="text-slate-900">/nuit</span>
                  </span>
                )}
              </span>
            )}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Prix Achat/Location</div>
      ),
    },
    {
      field: "city",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">{params.row.city}</div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Ville/Village</div>
      ),
    },
    {
      field: "propertyLocation",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            {params.row.propertyLocation}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Address</div>
      ),
    },
    {
      field: "propertyStatus",
      width: 150,
      renderCell: (params) => {
        return (
          <div className=" flex p-[1px] text-center text-white text-sm text-semibold">
            {params.row.propertyStatus === "A Vendre" ? (
              <div className="p-[4px]  bg-secondary rounded-md">A Vendre</div>
            ) : (
              <div className="p-[4px] bg-primary rounded-md">A Louer</div>
            )}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Vendre/Louer</div>
      ),
    },
    {
      field: "propertyType",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            {params.row.propertyType}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Type de propriete</div>
      ),
    },
    {
      field: "updatedAt",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            {moment(params.row.updatedAt).format("Do MMM YYYY")}
            <br />
            {moment(params.row.updatedAt).format("h:mm:ss")}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Cree le</div>
      ),
    },
  ];

  const actionColumn = [
    {
      field: "action",
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Link
              to={`detail-du-propriete/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <Box sx={{ color: "blue", fontSize: "1.5rem" }}>
                <FaEye />
              </Box>
            </Link>
            <Link
              to={`modifier-cette-propriete/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <Box sx={{ color: "green", fontSize: "1.5rem" }}>
                <FaRegEdit />
              </Box>
            </Link>
            <div
              className="cursor-pointer"
              onClick={() => deleteHandler(params.row._id)}
            >
              <Box sx={{ color: "red", fontSize: "1.5rem" }}>
                <FaRegTrashAlt />
              </Box>
            </div>
          </Box>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Actions</div>
      ),
    },
  ];

  const autosizeOptions = {
    includeOutliers: true,
  };

  return (
    <Layout>
      {isLoading || loadPage || loadingDelete ? (
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
            margin: "2rem auto 0",
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
            minHeight: "200vh",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            margin: "0 auto",
          }}
        >
          {error?.data?.message || error?.error}
        </Box>
      ) : (
        <Box sx={{ pt: "80px", pb: "20px", margin: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "600", color: "black" }}>
              Nos Proprites
            </Typography>
            <Link
              to="/agab-proprietes/ajouter-une-propriete"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FiPlus />}
                sx={{ borderRadius: "20px" }}
              >
                Ajouter une propriete
              </Button>
            </Link>
          </Box>

          <Box sx={{ height: "auto", width: "100%", bgcolor: "white" }}>
            <DataGrid
              columns={columns.concat(actionColumn)}
              rows={properties}
              getRowId={(row) => row._id}
              disableColumnFilter
              disableDensitySelector
              rowHeight={100}
              rowSelection={false}
              slots={{ toolbar: GridToolbar }}
              filterModel={filterModel}
              autoSizeOptions={autosizeOptions}
              getRowHeight={() => "auto"}
              rowClassName={(params) =>
                params.index % 2 === 0 ? "even-row" : "odd-row"
              }
              sx={{
                [`& .${gridClasses.cell}`]: {
                  py: 1,
                },
              }}
              onFilterModelChange={(newModel) => setFilterModel(newModel)}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
            />
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default Property;
