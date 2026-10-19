import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";

const FullSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectLogin({ children }) {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading)
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectLogin;
