import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  operation = "delete",
}) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        {operation[0].toUpperCase() + operation.slice(1)} {resourceName}
      </Heading>
      {operation === "delete" && (
        <p>
          Are you sure you want to delete this {resourceName} permanently? This
          action cannot be undone.
        </p>
      )}
      {operation === "check-out" && (
        <p>
          Are you sure you want to check-out this {resourceName} permanently?
          This action cannot be undone.
        </p>
      )}

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          {operation[0].toUpperCase() + operation.slice(1)}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
