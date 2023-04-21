import React, { useState } from "react";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../config";

const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    // validation
    validationSchema: Yup.object({
      userName: Yup.string()
        // .min(3, "Username should be at least 3 characters long.")

        .required("Required*"),
      password: Yup.string().required("Required*"),
    }),
    onSubmit: async (values) => {
      console.log("hey", values);
      await axios.post(url.API + "login", formik.values);
      console.log("mani", values);
    },
  });
  //console.log(formik.values);
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-control">
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              id="userName"
              // value ={formik.values.userName}
              // onChange=[formik]
              {...formik.getFieldProps("userName")}
              placeholder="Enter userName"
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className="error">{formik.errors.userName}</div>
            ) : null}
          </div>
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
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit">Login</button>
        </form>
        {/* {formik.values && <p>Login successful!</p>} */}
        <Link to="/signUp">
          <div className="signIn-routing-button">
            <p>signUp</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
