import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          element={
            isAuthenticated ? (
              isAdmin && user.role !== "admin" ? (
                <Navigate to="/login" />
              ) : (
                <Element />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
