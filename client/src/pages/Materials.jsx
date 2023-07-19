import MDataTable from "../components/materials/MDataTable";
import MForm from "../components/materials/MForm";
import PageFormContainer from "../components/UI/PageFormContainer";
import { DataTableWrapper } from "../layouts/Wrappers";
import { Stack, Paper } from "@mui/material";
import { materialDateInput } from "../utils/help-functions";
import { PageWrapper } from "../layouts/Wrappers";
import { useAddMaterialMutation } from "../redux/apis/materialApi";
import { useState } from "react";

const Materials = () => {
  const [openMaterialAddModal, setOpenMaterialAddModal] = useState(false);
  const [addMaterial] = useAddMaterialMutation();

  return (
    <PageWrapper>
      <Stack spacing={2}>
        <PageFormContainer
          modalOpen={openMaterialAddModal}
          setModalOpen={setOpenMaterialAddModal}
          title="Yeni Malzeme"
          modalHeight="60vh"
        >
          <MForm
            setOpenModel={setOpenMaterialAddModal}
            initialValues={{
              name: "",
              type: "Gıda",
              unit: "Gram",
              amount: 0,
              price: 0,
              description: "",
              brand: "",
              date: materialDateInput,
            }}
            submitFunction={addMaterial}
          />
        </PageFormContainer>
        <Paper>
          <DataTableWrapper
            tableHeight={"78vh"}
            sxProps={{ p: { xs: 1, md: 2 } }}
          >
            <MDataTable />
          </DataTableWrapper>
        </Paper>
      </Stack>
    </PageWrapper>
  );
};

export default Materials;
