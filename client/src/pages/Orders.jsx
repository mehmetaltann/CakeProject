import PageFormContainer from "../components/UI/PageFormContainer";
import OrForm from "../components/orders/OrForm";
import OrDataTable from "../components/orders/OrDataTable";
import { materialDateInput } from "../utils/time-functions";
import { useAddOrderMutation } from "../redux/apis/orderApi";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";
import { useState } from "react";

const Orders = () => {
  const [openOrAddModal, setOpenOrAddModal] = useState(false);
  const [addOrder] = useAddOrderMutation();

  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <PageFormContainer
          modalOpen={openOrAddModal}
          setModalOpen={setOpenOrAddModal}
          title="Yeni Sipariş"
          modalHeight="40vh"
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
