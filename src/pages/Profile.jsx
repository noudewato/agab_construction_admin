import { Box, Button, Grid, Paper, Typography, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./images.css";
import { useUpdateUserProfileMutation } from "../store/slices/usersApiSlice";
import * as Yup from "yup";
import Layout from "./Layout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const [userProfile, { isLoading }] = useUpdateUserProfileMutation();

  const [image, setImage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setImage(userInfo.image);
    }
  }, [userInfo]);

  const initialValues = {
    firstname: userInfo?.firstname || "",
    lastname: userInfo?.lastname || "",
    email: userInfo?.email || "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().min(3).required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    email: Yup.string().required("email is required"),
    password: Yup.string().required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  const [uploading, setUploading] = useState("");

  const perset_key = "myPreset";
  const cloud_name = "dz88wbaks";

  const uploadingHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("upload_preset", perset_key);
    formData.append("file", file);
    formData.append("upload_preset", perset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            setUploading(Math.round((100 * e.loaded) / e.total));
          },
        }
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err));
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await userProfile({
        _id: userInfo._id,
        ...values,
        image: image,
      }).unwrap();
      // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
        toast.success("profile d'utilisateur modifie");
        dispatch(setCredentials(res))
      navigate("/agab-utilisateur");
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
      {loadPage ? (
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
      ) : (
        <Box sx={{ pt: "80px", pb: "20px" }}>
          <Typography variant="h6" sx={{ marginBottom: "14px" }}>
            Update Profile
          </Typography>
          <Paper
            sx={{
              boxShadow: "none !important",
              borderRadius: "12px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
              p: "20px",
              margin: "0 auto",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={5} lg={5}>
                    <Box
                      sx={{
                        width: 300,
                        height: 300,
                        margin: "auto",
                        position: "relative",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={image}
                        sx={{
                          width: 300,
                          height: 300,
                          margin: "auto",
                          position: "relative",
                        }}
                      />
                      <label
                        htmlFor="image"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "auto",
                          textAlign: "center",
                          position: "absolute",
                          backgroundColor: "rgba(0, 0, 0, 0.0)",
                          borderRadius: "50%",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                      >
                        <input
                          style={{ display: "none" }}
                          id="image"
                          name="image"
                          onChange={uploadingHandler}
                          type="file"
                        />

                        <Button variant="contained" component="span">
                          {uploading && <>.......</>} upload
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={7} lg={7}>
                   
                    <Box>
                      <div className="mb-4">
                        <label
                          htmlFor="firstname"
                          className="block text-black font-semibold mb-1-"
                        >
                          FirstName*
                        </label>
                        <Field
                          type="text"
                          id="firstname"
                          name="firstname"
                          className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="firstname"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </Box>

                    <Box>
                      <div className="mb-4">
                        <label
                          htmlFor="lastname"
                          className="block text-black font-semibold mb-1-"
                        >
                          LastName*
                        </label>
                        <Field
                          type="text"
                          id="lastname"
                          name="lastname"
                          className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </Box>

                    <Box>
                      <div className="mb-4">
                        <label
                          htmlFor="email"
                          className="block text-black font-semibold mb-1-"
                        >
                          Email*
                        </label>
                        <Field
                          type="text"
                          id="email"
                          name="email"
                          className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </Box>

                    <Box>
                      <div className="mb-4">
                        <label
                          htmlFor="password"
                          className="block text-black font-semibold mb-1-"
                        >
                          Password*
                        </label>
                        <Field
                          type="text"
                          id="password"
                          name="password"
                          className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </Box>

                    <Box>
                      <div className="mb-4">
                        <label
                          htmlFor="confirmPassword"
                          className="block text-black font-semibold mb-1-"
                        >
                          Confirm new Password*
                        </label>
                        <Field
                          type="text"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                          autoComplete="off"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: "30px",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ borderRadius: "20px", width: "100%" }}
                      >
                        Save{isLoading && <>...</>}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Paper>
        </Box>
      )}
    </Layout>
  );
};

export default Profile;
