import { PageWrapper } from "../layouts/Wrappers";
import TableContainer from "../components/materials/TableContainer";
import MaterialForm from "../components/materials/MaterialForm";
import { Stack } from "@mui/material";

const Materials = () => {
  return (
    <PageWrapper>
      <Stack spacing={2}>
        <MaterialForm />
        <TableContainer />
      </Stack>
    </PageWrapper>
  );
};

export default Materials;
