import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingFn, isPending: isDeletingBooking } = useMutation(
    {
      mutationFn: deleteBooking,

      onSuccess: () => {
        toast.success("Booking successfully deleted");
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },

      onError: () => {
        toast.error("Booking could not be deleted");
      },
    },
  );

  return { deleteBookingFn, isDeletingBooking };
}
