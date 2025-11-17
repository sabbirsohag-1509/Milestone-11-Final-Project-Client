import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerInfo, signInGoogle, updateUserProfileInfo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerBtnHandler = async (data) => {
    // console.log("FILE:", data.photoURL);
    // console.log("FIRST FILE:", data.photoURL && data.photoURL[0]);
    try {
       await registerInfo(data.email, data.password);
      

      const formData = new FormData();
      formData.append("image", data.photoURL[0]);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      console.log("iamge res", imgRes);
      const uploadedImageURL = imgRes.data.data.display_url;

      updateUserProfileInfo({
        displayName: data.name,
        photoURL: uploadedImageURL,
      })
        .then(() => {
          navigate(location.state || "/");
          console.log("Profile updated!");
        })
        .catch((err) => {
          console.error(err);
        });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to zapShift!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: error.message || "Something went wrong!",
      });
    }
  };

  // Google SIgnIn Handler
  const googleSignInHandler = () => {
    signInGoogle()
      .then((res) => {
        navigate(location.state || "/");
        Swal.fire({
          icon: "success",
          title: "Google Sign-In Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        console.log(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed!",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-3xl mt-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account for zapShift
        </h1>

        <form onSubmit={handleSubmit(registerBtnHandler)} className="space-y-4">
          <fieldset className="fieldset space-y-3">
            <div>
              <label className="label font-semibold">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 pt-1">Your Name is Required.</p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Photo URL</label>
              <input
                type="file"
                {...register("photoURL", { required: true })}
                className=" file-input w-full"
                placeholder="Photo URL"
              />
            </div>

            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 pt-1">Must Need Your Valid Email</p>
              )}
            </div>

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
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 pt-1">
                  {errors.password?.type === "required" &&
                    "Password is required."}
                  {errors.password?.type === "minLength" &&
                    "Minimum 6 characters required."}
                  {errors.password?.type === "pattern" &&
                    "Password must have Uppercase Lowercase & One Special Character and Number letters."}
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

            <button className="btn bg-[#CAEB66] w-full mt-3">Register</button>

            <div className="divider text-gray-400">OR</div>

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
            Already have an Account?{" "}
            <Link to="/login" state={location.state} className="text-blue-500">
              login
            </Link>{" "}
            here.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
