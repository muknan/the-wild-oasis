import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import ConfirmCheckout from "../../ui/ConfirmCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { deleteBookingFn, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId, guests } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row $type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!(status === "checked-out") && (
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <ConfirmCheckout bookingId={bookingId} name={guests.fullName} />
          )}
          <Modal>
            <Modal.Open opens="deleteBooking">
              <Button $variation="danger">Delete booking</Button>
            </Modal.Open>
            <Modal.Window name="deleteBooking">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeletingBooking}
                onConfirm={
                  () =>
                    deleteBookingFn(bookingId, {
                      onSettled: () => navigate(-1),
                    })
                  // navigate("/bookings");
                }
              />
            </Modal.Window>
          </Modal>
          <Button $variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      )}
    </>
  );
}

export default BookingDetail;
