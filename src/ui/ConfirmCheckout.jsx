import { useCheckout } from "../features/check-in-out/useCheckout";
import Button from "./Button";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";

function ConfirmCheckout({ bookingId, name }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Modal>
      <Modal.Open opens="checkout">
        <Button $size="small">Check out</Button>
      </Modal.Open>

      <Modal.Window name="checkout">
        <ConfirmDelete
          resourceName={`booking #${bookingId} for ${name?.split(" ")?.at(0)}`}
          disabled={isCheckingOut}
          onConfirm={() => checkout(bookingId)}
          operation="check-out"
        />
      </Modal.Window>
    </Modal>
  );
}

export default ConfirmCheckout;
