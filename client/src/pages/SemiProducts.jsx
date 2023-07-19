import SpDataTable from "../components/semiproducts/SpDataTable";
import PageFormContainer from "../components/UI/PageFormContainer";
import SpForm from "../components/semiproducts/SpForm";
import { useAddSemiProductMutation } from "../redux/apis/semiProductApi";
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
