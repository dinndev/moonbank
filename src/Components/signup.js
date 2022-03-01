import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Arrow from "./Svg/Arrow";
import { useTransactionContext } from "../States/TransactionContext";
import cardGen from "card-number-generator";
import { useAlert } from "react-alert";

const Signup = () => {
  const [{ accounts, totalFunds, totalExpence, expenceList }, dispatch] =
    useTransactionContext();
  const alert = useAlert();
  useEffect(() => {
    // sett the users to local storage when accounts array change
    localStorage.setItem("Users", JSON.stringify(accounts));
  }, [accounts]);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const getAccountInfo = (data) => {
    const { userName, email, password } = data;
    const randomCardNumber = cardGen({ issuer: "MasterCard" });
    const userInfo = {
      expenceList,
      userName,
      email,
      password,
      id: randomCardNumber,
      card: randomCardNumber,
      totalExpence,
      totalFunds,
    };
    // check if user exist
    if (!isUserExist(email)) {
      dispatch({
        type: "ADD_USER",
        account: userInfo,
      });
      alert.show(`${email} successfuly registered`, {
        type: "success",
      });
      // reset fields
      resetField("email");
      resetField("password");
      resetField("userName");
    } else {
      // show error if the user exist
      alert.show(`${email} already exist`, {
        type: "error",
      });
      return;
    }
  };
  const isUserExist = (signUpEmail) => {
    return accounts.some(({ email }) => email === signUpEmail);
  };

  // console.log(accounts);
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
          <div className="flex h-20 w-2/4 mr-10 flex-col">
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
          Already have an account ?{" "}
          <span>
            <Link to="/moonbank/login" className="text-xs text-secondary">
              Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
