import "./Login.css";
import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { authenticate, isAuth, login } from "../../actions/auth";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginWave from "./LoginWave.svg";

function Logins({ setIsLogin }) {
  const [loading, setLoading] = useState(0);

  let history = useHistory();

  // Form Values
  const [inputVals, setInputVals] = useState({
    email: "",
    password: "",
  });
  //mui
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setInputVals({
      ...inputVals,
      [prop]: event.target.value,
    });
    // setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Form Input Handler
  const inputHandler = (e) => {
    setInputVals({
      ...inputVals,
      [e.target.name]: e.target.value,
    });
  };

  // Form Submit
  const submit = async (e) => {
    setLoading(1);
    e.preventDefault();

    const { email, password } = inputVals;
    setInputVals({
      email: "",
      password: "",
      loading: "true",
      error: "",
      message: "",
    });

    const user = { email, password };

    // try {
    //   const response = await login(user);
    //   if (response) {
    //     console.log(response);
    //     return;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }

    login(user).then((data) => {
      console.log("hello");
      console.log(data);

      // return;
      if (data.error) {
        setLoading(0);

        setInputVals({
          ...inputVals,
          loading: "",
        });
      } else {
        authenticate(data, () => {
          if (isAuth()) {
            console.log(data);
            setLoading(0);
            history.push("/dashboard");
            window.location.reload();

            // route.push("/");
          } else {
            setLoading(0);
          }
        });
      }
    });
  };

  return (
    <div className="w-screen h-screen fixed top-0   bg-opacity-70 flex justify-center items-center z-30 ">
      <div className="first-box   ">
        {/* Exit Logo */}
        <div
          className="exitLogo absolute cursor-pointer z-30 "
          onClick={() => {
            window.scroll(10000, 10000);
            setIsLogin(0);
          }}
        >
          <box-icon
            name="exit"
            color="#5BBB60"
            size="md"
            className="  "
          ></box-icon>
        </div>

        {/* Logo + Title */}
        <div className="logo flex  justify-center items-center  text-2xl mt-3 absolute w-full ">
          <img src={Logo} width="76px" className="mr-2" />
          GEEKS FOR GEEKS | KIIT
        </div>

        {/* Form  */}
        <form
          className="flex flex-col  justify-center items-center h-full  "
          onSubmit={submit}
        >
          {/* <div className="flex flex-col w-60 mt-3">
            <label className=" font- font-medium ">Email</label>
            <input
              type="email"
              className="p-2 text-black  rounded-sm"
              placeholder="Email"
              name="email"
              value={inputVals.email}
              onChange={inputHandler}
              required
            />
          </div> */}
          {/* <div className="flex flex-col w-60 mt-3">
            <label className=" font- font-medium ">Password</label>
            <input
              type="password"
              className="p-2 rounded-sm"
              placeholder="Password"
              name="password"
              value={inputVals.password}
              onChange={inputHandler}
              required
            />
          </div> */}
          <div className="login-form-component">
            <TextField
              style={{ margin: ".5rem 0" }}
              sx={{ m: 0, width: "300px" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={inputVals.email}
              onChange={handleChange("email")}
            />
            <FormControl
              style={{ margin: ".5rem 0" }}
              sx={{ m: 0, width: "300px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={inputVals.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <div style={{ cursor: "pointer" }} className="forgot-password">
              Forgot password?
            </div>
          </div>
          {/* Login Button */}
          <button className=" loginBtn w-60 mt-5 p-2  text-lg text-white rounded-sm ">
            {loading ? "Logging in...." : "Login"}
          </button>
          {/* <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"></svg> */}
          <img className="loginSvg" src={LoginWave} alt="wave" />
        </form>
      </div>
    </div>
  );
}

export default Logins;
