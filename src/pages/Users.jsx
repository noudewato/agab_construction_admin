import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../store/slices/usersApiSlice";
import Layout from "./Layout";
import { FaRegEdit, FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { toast } from "react-toastify";

const Users = () => {
  const { data: users, isLoading, error } = useAllUsersQuery();

  const [deleteProduct, { isLoading: loadingDelete, refetch }] =
    useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("etes vous sure de supprimer cet utilisateur")) {
      try {
        await deleteProduct(id);
        toast.success("utilisateur supprime avec success");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [loadPage, setLoadPage] = useState(true);

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
      width: 100,
      renderCell: (params) => {
        return (
          <div className="p-[1px] text-gray-900 text-lg">
            <Avatar
              src={params.row.image}
              alt={params.row.firstname}
            />
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Image</div>
      ),
    },
    {
      field: "firstname",
      width: 300,
      renderCell: (params) => {
        return (
          <div>
            <p className="p-[1px] text-gray-900 text-lg">
              {params.row.firstname} <span> {params.row.lastname}</span>
            </p>
            <p>{params.row.email}</p>
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Utilisateur</div>
      ),
    },
    {
      field: "phone",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="p-[1px} text-slate-500 text-lg">
            {params.row.phone}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Contact</div>
      ),
    },
    {
      field: "isAdmin",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="text-center">
            {params.row.isAdmin === true ? (
              <span className="bg-green-400 text-green-400 text-2xl">
                {" "}
                <FaCheck />
              </span>
            ) : (
              <span className="text-secondary">No</span>
            )}
          </div>
        );
      },
      renderHeader: () => (
        <div className="text-xl text-dark font-bold">Admin</div>
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
        <div className="text-xl text-dark font-bold">Rejoignez le</div>
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
              to={`modifier-cet-utilisateur/${params.row._id}`}
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
              Utilisateurs
            </Typography>
            <Link
              to="/agab-utilisateur/ajouter-un-utilisateur"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<FiPlus />}
                sx={{ borderRadius: "20px" }}
              >
                Ajouter un utilisateur
              </Button>
            </Link>
          </Box>

          <Box sx={{ height: "auto", width: "auto", bgcolor: "white" }}>
            <DataGrid
              columns={columns.concat(actionColumn)}
              rows={users}
              getRowId={(row) => row._id}
              disableColumnFilter
              disableDensitySelector
              rowHeight={100}
              rowSelection={false}
              slots={{ toolbar: GridToolbar }}
              filterModel={filterModel}
              autoSizeOptions={autosizeOptions}
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

export default Users;
