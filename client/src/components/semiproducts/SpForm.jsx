import ModalButton from "../UI/ModalButton";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../UI/form/FormTextField";
import * as Yup from "yup";
import { Paper, Stack, Typography, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useAddSemiProductMutation } from "../../redux/apis/semiProductApi";
import { setSnackbar, setModalOpen } from "../../redux/slices/generalSlice";

import React from "react";

const SpForm = () => {
  const [addSemiProduct] = useAddSemiProductMutation();
  const dispatch = useDispatch();

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
  });

  async function submitHandler(values) {
    const newRecord = {
      name: values.name,
      description: values.description,
    };
    try {
      const res = await addSemiProduct(newRecord).unwrap();
      dispatch(setModalOpen(false));
      dispatch(
        setSnackbar({
          children: res.message,
          severity: "success",
        })
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          children: error,
          severity: "error",
        })
      );
    }
  }

  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        sx={{ p: 2, pl: 3 }}
      >
        <Typography color={"secondary"}>Yeni Tarif</Typography>
        <ModalButton title="Yeni Tarif" height={{ md: "40vh", xs: "60%" }}>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={submitHandler}
            validationSchema={validateSchema}
          >
            {({ values }) => (
              <Form>
                <Stack spacing={2} sx={{ pl: 1 }}>
                  <FormTextField
                    sx={{ width: "100%" }}
                    name="name"
                    label="İsim"
                    size="small"
                  />
                  <FormTextField
                    sx={{ width: "100%" }}
                    name="description"
                    label="Not"
                    size="small"
                  />
                  <Button
                    type="submit"
                    sx={{ width: "100%" }}
                    variant="contained"
                    color="secondary"
                    endIcon={<SendIcon />}
                  >
                    Ekle
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalButton>
      </Stack>
    </Paper>
  );
};

export default SpForm;
