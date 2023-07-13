import SpDataTable from "../components/semiproducts/SpDataTable";
import SpFormContainer from "../components/semiproducts/SpFormContainer"
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";

const SemiProducts = () => {
  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <SpFormContainer />
        <SpDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default SemiProducts;
