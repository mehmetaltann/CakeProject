import PageFormContainer from "../components/page/PageFormContainer";
import OrForm from "../features/orders/OrForm";
import OrDataTable from "../features/orders/OrDataTable";
import { materialDateInput } from "../utils/time-functions";
import { useAddOrderMutation } from "../store/api/orderApi";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";
import { useState } from "react";

const Orders = () => {
  const [openOrAddModal, setOpenOrAddModal] = useState(false);
  const [addOrder] = useAddOrderMutation();

  return (
    <PageWrapper maxWidth="xl">
      <Stack spacing={2}>
        <PageFormContainer
          modalOpen={openOrAddModal}
          setModalOpen={setOpenOrAddModal}
          title="Yeni Sipariş"
          modalHeight="50vh"
        >
          <OrForm
            setOpenModel={setOpenOrAddModal}
            initialValues={{
              date: materialDateInput,
              description: "",
              model: "",
              type: "",
              price: 0,
              cost: 0,
              customer: null,
              product: null,
            }}
            submitFunction={addOrder}
          />
        </PageFormContainer>
        <OrDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default Orders;
