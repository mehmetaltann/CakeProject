import SpDataTable from "../components/semiproducts/SpDataTable";
import SpForm from "../components/semiproducts/SpForm";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";

const SemiProducts = () => {
  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <SpForm />
        <SpDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default SemiProducts;
