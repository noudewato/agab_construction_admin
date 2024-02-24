import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./images.css";
import {
  useUpdateProductMutation,
  useGetSingleProductQuery,
} from "../store/slices/productsSlice";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import Layout from "./Layout";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const EditProduct = () => {
  const navigate = useNavigate();

  const { id: productID } = useParams();

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    data: details,
    isLoading: productDetailsLoading,
    error,
  } = useGetSingleProductQuery(productID);

  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  const imageNames = images.map((image) => image.name);
  console.log(imageNames);
  console.log(images);
  useEffect(() => {
    if (details) {
      setImages(details?.images);
      setProductDetails(details?.productDetails);
    }
  }, [details]);

  const initialValues = {
    productName: details?.productName || "",
    productPrice: details?.productPrice || "",
    productCategory: details?.productCategory || "",
  };

  const validationSchema = Yup.object({
    productName: Yup.string().min(3).required("productName is required"),
    productPrice: Yup.string().required("productPrice is required"),
    productCategory: Yup.string().required("productCategory is required"),
  });

  const categories = [
    { key: "Choisir une option", value: "" },
    { key: "Broyeurs", value: "Broyeurs" },
    { key: "Fer", value: "Fer" },
    { key: "Marteaux", value: "Marteaux" },
    { key: "Outils Manuels", value: "Outils Manuels" },
    { key: "Perceuses", value: "Perceuses" },
    { key: "Pinceau", value: "Pinceau" },
    { key: "Scies", value: "Scies" },
    { key: "Autres", value: "Autres" },
  ];

  const perset_key = "myPreset";
  const cloud_name = "dz88wbaks";

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();

    acceptedFiles.map((file) => {
      formData.append("file", file);
      formData.append("upload_preset", perset_key);
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
      await updateProduct({
        productID,
        ...values,
        productDetails,
        images
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success("produit modifie avec success");
      navigate("/agab-boutique");
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
          <Typography variant="h6" sx={{ marginBottom: "14px" }}>
            Nouveau Product
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
                    htmlFor="productName"
                    className="block text-black font-semibold mb-1-"
                  >
                    Nom du product*
                  </label>
                  <Field
                    type="text"
                    id="productName"
                    name="productName"
                    className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                    autoComplete="off"
                    placeholder="Brosse"
                  />
                  <ErrorMessage
                    name="productName"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productCategory"
                    className="block text-black font-semibold mb-1-"
                  >
                    Category du produit*
                  </label>
                  <Field
                    type="text"
                    as="select"
                    id="productCategory"
                    name="productCategory"
                    className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                    autoComplete="off"
                    placeholder="Brosse"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.key}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="productCategory"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="productPrice"
                    className="block text-black font-semibold mb-1-"
                  >
                    Prix*
                  </label>
                  <Field
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    className="w-full my-2 border-2 border-slate-300  rounded-md py-2 px-3 focus:outline-blue-500 focus:border-blue-500"
                    autoComplete="off"
                    placeholder="0"
                  />
                  <ErrorMessage
                    name="productPrice"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <Box>
                  <label
                    htmlFor="productDetails"
                    className="block text-black font-semibold mb-2"
                  >
                    Details du produit*
                  </label>
                  <div
                    style={{ height: "250px" }}
                    className="border-2 border-gray-300 rounded-md overflow-hidden mb-4"
                  >
                    <div>
                      <ReactQuill
                        style={{ height: "200px" }}
                        className="bg-white p-4 focus:outline-none focus:border-blue-500"
                        value={productDetails}
                        onChange={setProductDetails}
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
                    name="productDetails"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </Box>

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

                {/* <ImageUploader/> */}

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
                    Modifier{isLoading && <>...</>}
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

export default EditProduct;
