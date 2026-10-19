import { useSearchParams } from "react-router-dom";

export function useUrl(field) {
  const [searchParams, setSearchParams] = useSearchParams();

  const readUrl = searchParams.get(field);

  const updateUrl = (value) => {
    searchParams.set(field, value);

    if (field !== "page") {
      searchParams.delete("page");
    }

    setSearchParams(searchParams);
  };

  return { readUrl, updateUrl };
}
