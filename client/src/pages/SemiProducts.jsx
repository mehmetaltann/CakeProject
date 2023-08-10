import SpDataTable from "../features/semiproducts/SpDataTable";
import SpForm from "../features/semiproducts/SpForm";
import PageFormContainer from "../components/page/PageFormContainer";
import { useAddSemiProductMutation } from "../store/api/semiProductApi";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";
import { useState } from "react";

const SemiProducts = () => {
  const [openSpAddModal, setOpenSpAddModal] = useState(false);
  const [addSemiProduct] = useAddSemiProductMutation();

  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <PageFormContainer
          modalOpen={openSpAddModal}
          setModalOpen={setOpenSpAddModal}
          title="Yeni Tarif"
          modalHeight="30vh"
        >
          <SpForm
            setOpenModel={setOpenSpAddModal}
            initialValues={{
              name: "",
              description: "",
            }}
            submitFunction={addSemiProduct}
          />
        </PageFormContainer>
        <SpDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default SemiProducts;
