import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useTransactionContext } from "/Users/aladinpenagunda/Desktop/Activities/moonbank/src/States/TransactionContext";

export default function PrivateRoute({ children }) {
  const [{ isLoggedIn, user, expenceList }] = useTransactionContext();
  const useAuth = () => {
    return user && isLoggedIn;
  };
  const location = useLocation();
  const auth = useAuth();
  return user.card ? (
    children
  ) : (
    <Navigate to="login" replace state={{ from: location }} />
  );
}
