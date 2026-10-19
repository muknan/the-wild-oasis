import { useQuery } from "@tanstack/react-query";
import { getCurUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
