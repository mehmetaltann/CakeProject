import ModalButton from "../UI/ModalButton";
import SpForm from "./SpForm";
import { useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useAddSemiProductMutation } from "../../redux/apis/semiProductApi";

import React from "react";

const SpFormContainer = () => {
  const [openSpAddModal, setOpenSpAddModal] = useState(false);
  const [addSemiProduct] = useAddSemiProductMutation();

  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        sx={{ p: 2, pl: 3 }}
      >
        <Typography color={"secondary"}>Yeni Tarif</Typography>
        <ModalButton
          title="Yeni Tarif"
          height={{ md: "25vh" }}
          modalOpen={openSpAddModal}
          setModalOpen={setOpenSpAddModal}
        >
          <SpForm
            setOpenModel={setOpenSpAddModal}
            initialValues={{
              name: "",
              description: "",
            }}
            submitFunction={addSemiProduct}
          />
        </ModalButton>
      </Stack>
    </Paper>
  );
};

export default SpFormContainer;
