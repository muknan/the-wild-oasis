import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useUrl } from "../../hooks/useUrl";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  // Filter
  const { readUrl: readStatus } = useUrl("status");
  const filterValue = readStatus;
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: 'totalPrice', value: 5000, method: 'gte' };

  // Sort
  const { readUrl: readSort } = useUrl("sortBy");
  const sortByRaw = readSort || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  // Pagination

  const { readUrl: readPage } = useUrl("page");
  const page = +readPage || 1;

  // Query
  const {
    isLoading,
    data: bookingResponse,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = bookingResponse?.data ?? [];
  const count = bookingResponse?.count ?? 0;

  // Pre-fetching
  if (page * PAGE_SIZE < count)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
