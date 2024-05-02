import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../store/slices/productsSlice";
import Layout from "./Layout";
import { FaEye, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { toast } from "react-toastify";

const Products = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // const shortText = (n) => {
  //   if (text.length > n) {
  //     const shortedText = text
  //   }
  // }

  const [deleteProduct, { isLoading: loadingDelete, refetch }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you wish to delete this item")) {
      try {
        await deleteProduct(id);
        toast.success("Item deleted successfully");
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
    }, 2500);

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
      field: "Image",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            <img
              src={params.row.images[0]}
              alt={params.row.productName}
              className="w-[300px] h-[150px] rounded-2xl"
            />
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Image</div>
      ),
    },
    {
      field: "productName",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            {params.row.productName}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Item</div>
      ),
    },
    {
      field: "productCategory",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            {params.row.productCategory}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Category</div>
      ),
    },
    {
      field: "productPrice",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="p-[1px} text-secondary text-lg font-semibold">
            <span className="p-[1px} text-primary text-lg font-semibold">
             GH {myCurrency.format(params.row.productPrice)}
            </span>
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Price</div>
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
        <div className="text-xl text-dark font-bold">Created At</div>
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
              to={`item-details/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <Box sx={{ color: "blue", fontSize: "1.5rem" }}>
                <FaEye />
              </Box>
            </Link>
            <Link
              to={`edit-item/${params.row._id}`}
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
            margin: "3rem auto",
          }}
        >
          {error.message}
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
              Items
            </Typography>
            <Link
              to="/items/new-item"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FiPlus />}
                sx={{ borderRadius: "20px" }}
              >
                Add Item
              </Button>
            </Link>
          </Box>

          <Box sx={{ height: "auto", width: "auto", bgcolor: "white" }}>
            <DataGrid
              columns={columns.concat(actionColumn)}
              rows={products}
              getRowId={(row) => row._id}
              disableColumnFilter
              disableDensitySelector
              rowHeight={100}
              rowSelection={false}
              slots={{ toolbar: GridToolbar }}
              filterModel={filterModel}
              autoSizeOptions={autosizeOptions}
              getRowHeight={() => "auto"}
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

export default Products;
