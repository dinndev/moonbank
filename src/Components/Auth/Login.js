import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Arrow from "../Svg/Arrow";
import { useTransactionContext } from "../../States/TransactionContext";
import { useAlert } from "react-alert";
import { message } from "card-number-generator/src/validator";
import { useNavigate, useLocation } from "react-router";

const Login = () => {
  const [{ accounts, user, isLoggedIn }, dispatch] = useTransactionContext();
  const alert = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname
    ? `${location.state?.from?.pathname}`
    : "/moonbank/account";
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const getAccountInfo = (data) => {
    const { email, password } = data;
    const userFromInput = {
      email,
      password,
    };
    if (verifyEmail(userFromInput) && verifyPassword(userFromInput)) {
      const currentUser = accounts.filter(
        ({ email }) => email === userFromInput.email
      );
      dispatch({
        type: "TOGGLE_LOGIN",
        isLoggedIn: true,
      });
      dispatch({
        type: "SET_USER",
        user: currentUser[0],
      });
      navigate(from);
    } else if (!verifyPassword(userFromInput) && verifyEmail(userFromInput)) {
      setError("email", {
        type: "manual",
        message: "Incorrect email or password",
      });
    } else {
      setError("email", {
        type: "manual",
        message: "User doesn't exist",
      });
    }
  };

  const verifyEmail = (user) => {
    return accounts.some(({ email }) => email === user.email);
  };
  const verifyPassword = (user) => {
    return accounts.some(({ password }) => password === user.password);
  };

  return (
    <div className="w-full  flex flex-col items-center m-10 h-full">
      <div className="flex justify-center items-start h-1/5 mt-10">
        <h1 className="text-4xl font-robotoSemiBold text-gray-600">Login</h1>
      </div>
      {errors.email?.message === "true" ? (
        clearErrors("email")
      ) : (
        <p className="mb-10 text-red-400 text-sm font-robotoSemiBold">
          {errors.email?.message}
        </p>
      )}
      <form
        action=""
        className="w-2/4 flex flex-col items-center h-3/4 "
        onSubmit={handleSubmit(getAccountInfo)}
      >
        <div className="flex w-full flex-col items-center   ">
          <div className="flex  h-20 w-2/4 mb-12 flex-col">
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
          <div className="flex h-20 w-2/4 flex-col">
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
        </div>
        <div className=" w-2/4">
          <button className="bg-primary mt-16 rounded-lg p-5" type="submit">
            <Arrow />
          </button>
          <p className="mt-6 text-xs text-gray-500">
            Don't have an account?{" "}
            <span>
              <Link to="/moonbank/signup" className="text-xs text-secondary">
                Signup
              </Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
