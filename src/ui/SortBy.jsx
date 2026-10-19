import Select from "./Select";
import { useUrl } from "../hooks/useUrl";

function SortBy({ options }) {
  const { readUrl, updateUrl } = useUrl("sortBy");
  const sortBy = readUrl || "";

  function handleChange(e) {
    updateUrl(e.target.value);
  }

  return (
    <Select
      options={options}
      $type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
