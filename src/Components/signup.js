import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Arrow from "./Svg/Arrow";

const Signup = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const getAccountInfo = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-full">
      <div className="flex justify-start items-start h-1/5 mt-10">
        <h1 className="text-4xl font-robotoSemiBold text-gray-600">
          Create Account
        </h1>
      </div>
      <form
        action=""
        className="w-2/4 h-3/4 "
        onSubmit={handleSubmit(getAccountInfo)}
      >
        <div className="flex w-full h-1/5 ">
          <div className="flex h-20 w-2/4 mr-10  flex-col">
            <input
              className="border h-2/3 outline-none p-5 rounded-lg bg-inputColor"
              type="email"
              name="email"
              {...register("email", { required: "true" })}
            />
            <label
              htmlFor="email"
              className="font-montserratBold  text-secondary mt-3 text-sm"
            >
              Email
            </label>
          </div>
          <div className="flex h-20 w-2/4 mr-2 flex-col">
            <input
              className="border p-5 outline-none h-2/3 rounded-lg bg-inputColor"
              type="text"
              name="userName"
              {...register("userName", { required: "true" })}
            />
            <label
              htmlFor="userName"
              className="text-secondary font-montserratBold mt-3 text-sm"
            >
              User Name
            </label>
          </div>
        </div>
        <div className="flex h-20 w-full  mr-2 flex-col">
          <input
            className="border p-5 outline-none h-2/3 rounded-lg bg-inputColor"
            type="password"
            name="password"
            {...register("password", { required: "true" })}
            autoComplete={"confirm password"}
          />
          <label
            htmlFor="password "
            className="text-secondary font-montserratBold mt-3 text-sm"
          >
            Password
          </label>
        </div>
        <button className="bg-primary mt-16 rounded-lg p-5" type="submit">
          <Arrow />
        </button>

        <p className="mt-6 text-xs text-gray-500">
          Already hanve an account ?
          <span>
            <Link to="login" className="text-xs text-secondary">
              Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
