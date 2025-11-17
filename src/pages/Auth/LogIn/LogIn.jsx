import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInInfo, signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginBtn = (data) => {
    signInInfo(data.email, data.password)
      .then((res) => {
        navigate(location.state || "/");
        Swal.fire({
          icon: "success",
          title: "Logged In Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: error.message,
        });
      });
  };

  const googleSignInHandler = () => {
    signInGoogle()
      .then((res) => {
        navigate(location.state || "/");
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed!",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <h2 className="text-xl text-center font-semibold">
          LogIn With zapShift
        </h2>
        <h4 className="text-sm font-semibold text-center">Please Login</h4>

        <form onSubmit={handleSubmit(handleLoginBtn)} className="space-y-4">
          <fieldset className="fieldset space-y-3">
            {/* Email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 pt-1">Must Need Your Valid Email</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="label font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                })}
                className="input input-bordered w-full pr-10"
                placeholder="Enter your password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password Need atleast 6 Character.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must have Uppercase Lowercase & One Special Character
                  and Number letters.
                </p>
              )}
              <span className="absolute top-8 right-3 cursor-pointer text-gray-600">
                {showPassword ? (
                  <BsFillEyeFill onClick={() => setShowPassword(false)} />
                ) : (
                  <BsFillEyeSlashFill onClick={() => setShowPassword(true)} />
                )}
              </span>
            </div>
            <p className="text-blue-500 text-sm">Forgot Your Password? <Link to="" className="text-blue-900 underline">Click</Link> here.</p>

            {/* Log In Button */}
            <button className="btn bg-[#CAEB66] w-full mt-3">Log In</button>

            {/* Divider */}
            <div className="divider text-gray-400">OR</div>

            {/* Google Login Button */}
            <button
              onClick={googleSignInHandler}
              type="button"
              className="btn bg-[#dee1e7] w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </fieldset>
          <p className="text-sm">
            New to zapShift?{" "}
            <Link to="/register" state={location.state} className="text-blue-500">
              Register
            </Link>{" "}
            here.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
