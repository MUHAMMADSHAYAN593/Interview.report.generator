import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "../../../components/Loading";
import ErrorPage from "../../../components/Error";

import React from 'react'

const Protected = ({children}) => {

    const { loading, user, error, clearError, fetchCurrentUser } = useAuth();


    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <ErrorPage
          message={error.message}
          code={error.code}
          onRetry={() => {
            clearError();
            fetchCurrentUser();
          }}
          onGoBack={() => {
            clearError();
            window.history.back();
          }}
        />
      );
    }

    if (!user) {
        return <Navigate to={"/login"} />;
    }

  return children;
}

export default Protected
