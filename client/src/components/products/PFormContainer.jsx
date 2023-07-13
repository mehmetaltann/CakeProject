import ModalButton from "../UI/ModalButton";
import PForm from "./PForm";
import { useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useAddProductMutation } from "../../redux/apis/productApi";

const PFormContainer = () => {
  const [openPAddModal, setOpenPAddModal] = useState(false);
  const [addProduct] = useAddProductMutation();

  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        sx={{ p: 2, pl: 3 }}
      >
        <Typography color={"secondary"}>Yeni Ürün</Typography>
        <ModalButton
          title="Yeni Ürün"
          height={{ md: "35vh" }}
          modalOpen={openPAddModal}
          setModalOpen={setOpenPAddModal}
          size="normal"
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
        </ModalButton>
      </Stack>
    </Paper>
  );
};

export default PFormContainer;
