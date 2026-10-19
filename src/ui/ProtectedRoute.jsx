import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const FullSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  // useEffect(() => {
  //   if (!isAuthenticated && !isLoading) navigate("/login");
  // }, [navigate, isAuthenticated, isLoading]);

  // 3 or 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );

  // 3)
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // if (isAuthenticated)
  // 4. If there is a user, render the app
  return children;
}

export default ProtectedRoute;
