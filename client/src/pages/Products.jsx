import PDataTable from "../features/products/PDataTable";
import PForm from "../features/products/PForm";
import PageFormContainer from "../components/page/PageFormContainer";
import { useAddProductMutation } from "../store/api/productApi";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";
import { useState } from "react";

const Products = () => {
  const [openPAddModal, setOpenPAddModal] = useState(false);
  const [addProduct] = useAddProductMutation();

  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <PageFormContainer
          modalOpen={openPAddModal}
          setModalOpen={setOpenPAddModal}
          title="Yeni Ürün"
          modalHeight="45vh"
        >
          <PForm
            setOpenModel={setOpenPAddModal}
            initialValues={{
              name: "",
              size: "8-12 Kişilik",
              description: "",
            }}
            submitFunction={addProduct}
          />
        </PageFormContainer>
        <PDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default Products;
