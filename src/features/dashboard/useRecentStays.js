import { subDays } from "date-fns";
import { useUrl } from "../../hooks/useUrl";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const { readUrl } = useUrl("last");
  const numDays = +readUrl || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (s) => s.status === "checked-in" || s.status === "checked-out",
  );

  return { isLoading, stays, confirmedStays, numDays };
}
