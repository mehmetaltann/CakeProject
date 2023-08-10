import CDataTable from "../features/customers/CDataTable";
import CForm from "../features/customers/CForm";
import PageFormContainer from "../components/page/PageFormContainer";
import { useAddCustomerMutation } from "../store/api/customerApi";
import { PageWrapper } from "../layouts/Wrappers";
import { Stack } from "@mui/material";
import { useState } from "react";

const Customers = () => {
  const [openCAddModal, setOpenCAddModal] = useState(false);
  const [addCustomer] = useAddCustomerMutation();

  return (
    <PageWrapper maxWidth="lg">
      <Stack spacing={2}>
        <PageFormContainer
          modalOpen={openCAddModal}
          setModalOpen={setOpenCAddModal}
          title="Yeni Müşteri"
          modalHeight="40vh"
        >
          <CForm
            setOpenModel={setOpenCAddModal}
            initialValues={{
              name: "",
              surname: "",
              phonenumber: "",
              description: "",
            }}
            submitFunction={addCustomer}
          />
        </PageFormContainer>
        <CDataTable />
      </Stack>
    </PageWrapper>
  );
};

export default Customers;
