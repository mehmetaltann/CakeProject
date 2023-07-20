import CDataTable from "../components/customers/CDataTable";
import PageFormContainer from "../components/UI/PageFormContainer";
import CForm from "../components/customers/CForm";
import { useAddCustomerMutation } from "../redux/apis/customerApi";
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
          modalHeight="30vh"
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
