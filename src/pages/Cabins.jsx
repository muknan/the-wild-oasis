import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabins from "../features/cabins/AddCabins";
import { useCabins } from "../features/cabins/useCabins";
import Spinner from "../ui/Spinner";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  const { isLoading } = useCabins();

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      {isLoading ? (
        <Spinner />
      ) : (
        <Row>
          <CabinTable />
          <AddCabins />
        </Row>
      )}
    </>
  );
}

export default Cabins;
