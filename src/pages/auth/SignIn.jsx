import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../store/slices/usersApiSlice";
import { setCredentials } from "../../store/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().min(5).required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/dashbord");

      setSubmitting(false);
    } catch (error) {
      setErrors({ password: "Invalid credentials" });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="/agab.jpeg"
          alt="agabimage"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-[7rem] md:p-50 sm:20 p-6 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Se Connecter</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Mots de Passe
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autocomplete="off"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Se Connecter {isLoading && <>...</>}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useLoginMutation } from "../../store/slices/usersApiSlice";
// import { setCredentials } from "../../store/slices/authSlice";
// import { toast } from "react-toastify";

// const SignIn = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const initialValues = { email: "", password: "" };

//   const validationSchema = Yup.object({
//     email: Yup.string().email("invalid email").required("email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const onSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       const res = await login({
//         email: values.email,
//         password: values.password,
//       }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       navigate("/dashboard");

//       setSubmitting(false);
//     } catch (error) {
//       setErrors({ password: "Invalid credentials" });
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={onSubmit}
//     >
//       <Form>
//         <div>
//           <label htmlFor="email">Username:</label>
//           <Field type="text" id="email" name="email" />
//           <ErrorMessage name="email" component="div" />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <Field type="password" id="password" name="password" />
//           <ErrorMessage name="password" component="div" />
//         </div>
//         <button type="submit">Login</button>
//       </Form>
//     </Formik>
//   );
// };

// export default SignIn;
