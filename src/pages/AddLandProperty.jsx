import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./images.css";
import { useCreateLandPropertyMutation } from "../store/slices/landPropertySlice";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import Layout from "./Layout";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const AddLandProperty = () => {
  const navigate = useNavigate();

  const [createLandProperty, { isLoading }] = useCreateLandPropertyMutation();

  const [images, setImages] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState("");

  const imageNames = images.map((image) => image.name);
  console.log(imageNames);
  console.log(images);

  const statusOption = [
    { key: "Choisir une option", value: "" },
    { key: "A vendre", value: "A vendre" },
    { key: "A louer", value: "A louer" },
  ];

  const typeOption = [
    { key: "Choisir une option", value: "" },
    { key: "Terrain Commercial", value: "Terrain Commercial" },
    { key: "Terrain Industriel", value: "Terrain Industriel" },
    { key: "Terrain Residentiel", value: "Terrain Residentiel" },
    { key: "Terrain Agricole", value: "Terrain Agricole" },
    { key: "Terrain Simple", value: "Terrain Simple" },
  ];

  const towns = [
    { key: "Choisissez une ville", value: "" },
    { key: "Cotonou", value: "Cotonou" },
    { key: "Porto-novo", value: "Porto-novo" },
    { key: "Abomey-calavi", value: "Terrain Residentiel" },
    { key: "Parakou", value: "Parakou" },
    { key: "Djougou", value: "Djougou" },
    { key: "Bohicon", value: "Bohicon" },
    { key: "Kandi", value: "Kandi" },
    { key: "Lokossa", value: "Lokossa" },
    { key: "Ouidah", value: "Ouidah" },
    { key: "Malanville", value: "Malanville" },
  ];

  const initialValues = {
    propertyTitle: "",
    city: "",
    propertyType: "",
    propertyStatus: "",
    propertyPrice: "",
    propertyLocation: "",
  };

  const validationSchema = Yup.object({
    propertyTitle: Yup.string().min(10).required("propertyTitle is required"),
    city: Yup.string().required("city is required"),
    propertyType: Yup.string().required("propertyType is required"),
    propertyStatus: Yup.string().required("propertyStatus is required"),
    propertyPrice: Yup.string().required("propertyPrice is required"),
    propertyLocation: Yup.string().required("propertyLocation is required"),
  });

  const preset_key = "myPreset";
  const cloud_name = "dz88wbaks";

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
  
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
      formData.append("upload_preset", preset_key); // Corrected typo here
    });
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Update state with uploaded image URLs from Cloudinary
      setImages((prevImages) => [...prevImages, response.data.secure_url]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  }, []);
  

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await createLandProperty({
      ...values,
      propertyDetails,
        images: images,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("Nouvelle parcelle ajoutee");
      navigate("/parcelles");
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
    }, 2500);

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
            Nouvelle Parcelle
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
                <div className="mb-4">
                  <label
                    htmlFor="propertyTitle"
                    className="block text-black font-semibold mb-1-"
                  >
                    Nom du parcelle*
                  </label>
                  <Field
                    type="text"
                    id="propertyTitle"
                    name="propertyTitle"
                    className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                    autoComplete="off"
                    placeholder="Disponible une parcelle de 2000m a kpota..."
                  />
                  <ErrorMessage
                    name="propertyTitle"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-black font-semibold mb-1-"
                  >
                    Ville/Village*
                  </label>
                  <Field
                    as="select"
                    type="text"
                    id="city"
                    name="city"
                    className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                    autoComplete="off"
                    placeholder="A vendre"
                  >
                    {towns.map((town) => (
                      <option key={town.value} value={town.value}>
                        {town.key}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="mb-4">
                      <label
                        htmlFor="propertyType"
                        className="block text-black font-semibold mb-1-"
                      >
                        Type de parcelle*
                      </label>
                      <Field
                        as="select"
                        type="text"
                        id="propertyType"
                        name="propertyType"
                        className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                        autoComplete="off"
                        placeholder="A vendre"
                      >
                        {typeOption.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.key}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="propertyType"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="mb-4">
                      <label
                        htmlFor="propertyStatus"
                        className="block text-black font-semibold mb-1-"
                      >
                        Status du parcelle*
                      </label>
                      <Field
                        as="select"
                        type="text"
                        id="propertyStatus"
                        name="propertyStatus"
                        className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                        autoComplete="off"
                      >
                        {statusOption.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.key}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="propertyStatus"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="mb-4">
                      <label
                        htmlFor="propertyPrice"
                        className="block text-black font-semibold mb-1-"
                      >
                        Prix*
                      </label>
                      <Field
                        type="number"
                        id="propertyPrice"
                        name="propertyPrice"
                        className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                        autoComplete="off"
                        placeholder="0.0"
                      />
                      <ErrorMessage
                        name="propertyPrice"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="mb-4">
                      <label
                        htmlFor="propertyLocation"
                        className="block text-black font-semibold mb-1-"
                      >
                        Addresse*
                      </label>
                      <Field
                        type="text"
                        id="propertyLocation"
                        name="propertyLocation"
                        className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                        autoComplete="off"
                        placeholder="address du terrain"
                      />
                      <ErrorMessage
                        name="propertyLocation"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </Grid>
                </Grid>

                <Box>
                  <label
                    htmlFor="propertyDetails"
                    className="block text-black font-semibold mb-2"
                  >
                    Details du parcelle*
                  </label>
                  <div
                    style={{ height: "250px" }}
                    className="border-2 border-gray-300 rounded-md overflow-hidden mb-4"
                  >
                    <div>
                      <ReactQuill
                        style={{ height: "200px" }}
                        className="bg-white p-4 focus:outline-none focus:border-blue-500"
                        value={propertyDetails}
                        onChange={setPropertyDetails}
                        modules={{
                          toolbar: [
                            [
                              "bold",
                              "italic",
                              "underline",
                              "strike",
                              "blockquote",
                            ],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
                        formats={[
                          "header",
                          "font",
                          "size",
                          "bold",
                          "italic",
                          "underline",
                          "strike",
                          "blockquote",
                          "list",
                          "bullet",
                          "link",
                          "image",
                        ]}
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="propertyDetails"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </Box>

                <Box>
                  <label
                    htmlFor="images"
                    className="block text-black font-semibold mb-2"
                  >
                    Images*
                  </label>
                  <div
                    {...getRootProps()}
                    className="flex justify-center items-center p-[20px] rounded-xl h-[200px] border-2 border-slate-300"
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <BiImageAdd
                        style={{ fontSize: "50px", color: "#027edd" }}
                      />
                      <input {...getInputProps()} />
                      <Typography>
                        Drop your image here or{" "}
                        <span style={{ color: "#027edd", cursor: "pointer" }}>
                          browse
                        </span>
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        JPG, PNG and GIF images are allowed
                      </Typography>
                    </Box>
                  </div>
                  <div className="image-preview-container">
                    {images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image} alt={`preview-${index}`} />
                        <button onClick={() => handleDelete(index)}>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </Box>

                {/* <ImageUploader/> */}
                {/* <Editor /> */}
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
                    sx={{ borderRadius: "20px" }}
                  >
                    Ajouter{isLoading && <>...</>}
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Paper>
        </Box>
      )}
    </Layout>
  );
};

export default AddLandProperty;
