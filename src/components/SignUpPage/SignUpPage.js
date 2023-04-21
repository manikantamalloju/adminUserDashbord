import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { v4 } from "uuid";
// import axios from "axios";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // const naviagte = useNavigate();
  const formik = useFormik({
    initialValues: {
      id: v4(),
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userName: "",
      action: true,
    },
    // validation
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Username should be at least 3 characters long.")
        .matches(
          "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{4,}))",
          "needed one (upperCase,lowercase,symbol)"
        )
        .required("Required*"),
      password: Yup.string()
        .min(8, "password should be at least 8 characters long.")
        .matches(
          "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))",
          "needed one (upperCase,lowercase,symbol)"
        )
        .required("Required*"),
      firstName: Yup.string()
        .min(3, "Fullname Should be at least 5 charactes")
        .required("Required*"),
      lastName: Yup.string()
        .min(3, "Fullname Should be at least 5 charactes")
        .required("Required*"),
      email: Yup.string()
        .email("invalid email id")
        .matches(
          "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
          "Invalid Email"
        )
        .required("Required*"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  //console.log(formik.values);
  return (
    <div className="SignUp">
      <div className="login-container">
        <h1>SignUp</h1>

        <form onSubmit={formik.handleSubmit}>
          {/* firstName */}
          <div className="form-control">
            <label htmlFor="firstName">FirstName</label>
            <input
              type="text"
              {...formik.getFieldProps("firstName")}
              placeholder="Enter FirstName"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error">{formik.errors.firstName}</div>
            ) : null}
          </div>
          {/* lastName */}
          <div className="form-control">
            <label htmlFor="lastName">LastName</label>
            <input
              type="text"
              {...formik.getFieldProps("lastName")}
              placeholder="Enter LastName"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error">{formik.errors.lastName}</div>
            ) : null}
          </div>
          {/* username */}
          <div className="form-control">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              id="userName"
              {...formik.getFieldProps("userName")}
              placeholder="Enter UserName"
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="error">{formik.errors.userName}</div>
            ) : null}
          </div>
          {/* Email Div */}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...formik.getFieldProps("email")}
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          {/* PasswordDiv */}
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <div className="password-row">
              <input
              className="password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                {...formik.getFieldProps("password")}
                placeholder="Enter password"
              />
              <div
                className="icon-container"
                onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit">SignUp</button>
        </form>
        <Link to="/login">
          <div className="signIn-routing-button">
            <p>LogIn</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;