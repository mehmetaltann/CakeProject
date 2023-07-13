import PDataTable from "../components/products/PDataTable";
import PFormContainer from "../components/products/PFormContainer";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";

const Products = () => {
  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <PFormContainer />
        <PDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default Products;
