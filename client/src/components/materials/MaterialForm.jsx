import ModalButton from "../UI/ModalButton";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../UI/form/FormTextField";
import FormSelect from "../UI/form/FormSelect";
import FormDatePicker from "../UI/form/FormDatePicker";
import * as Yup from "yup";
import { Paper, Stack, Typography, MenuItem, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { materialDateInput } from "../../utils/help-functions";
import { useDispatch } from "react-redux";
import { useAddMaterialMutation } from "../../redux/apis/materialApi";
import { setSnackbar, setModalOpen } from "../../redux/slices/generalSlice";

const MaterialForm = () => {
  const [addMaterial] = useAddMaterialMutation();
  const dispatch = useDispatch();

  async function submitHandler(values) {
    const newRecord = {
      name: values.name,
      type: values.type,
      unit: values.unit,
      amount: values.amount,
      price: values.price,
      description: values.description,
      brand: values.brand,
      date: values.date,
    };
    try {
      const res = await addMaterial(newRecord).unwrap();
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

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
    type: Yup.string().required("Boş Olamaz"),
    unit: Yup.string().required("Boş Olamaz"),
    amount: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
    price: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        sx={{ p: 2, pl: 3 }}
      >
        <Typography color={"secondary"}>Yeni Malzeme</Typography>
        <ModalButton title="Yeni Malzeme">
          <Formik
            initialValues={{
              name: "",
              type: "Gıda",
              unit: "gr",
              amount: 0,
              price: 0,
              description: "",
              brand: "",
              date: materialDateInput,
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
                  <Field name="type" component={FormSelect} label="Tür">
                    <MenuItem value="Gıda">Gıda</MenuItem>
                    <MenuItem value="Ambalaj">Ambalaj</MenuItem>
                  </Field>
                  <FormTextField
                    sx={{ width: "100%" }}
                    name="amount"
                    label="Miktar"
                    type="number"
                    size="small"
                  />
                  <Field name="unit" component={FormSelect} label="Birim">
                    <MenuItem value="Gram">Gram</MenuItem>
                    <MenuItem value="Adet">Adet</MenuItem>
                    <MenuItem value="MiliLitre">MiliLitre</MenuItem>
                    <MenuItem value="Dakika">Dakika</MenuItem>
                    <MenuItem value="Metre">Metre</MenuItem>
                  </Field>
                  <FormTextField
                    sx={{ width: "100%" }}
                    name="price"
                    label="Fiyat"
                    type="number"
                    size="small"
                  />
                  <FormTextField
                    sx={{ width: "100%" }}
                    name="brand"
                    label="Marka"
                    size="small"
                  />
                  <FormTextField
                    sx={{ width: "100%" }}
                    name="description"
                    label="Not"
                    size="small"
                  />
                  <FormDatePicker
                    name="date"
                    label="Fiyat Alınma Tarihi"
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

export default MaterialForm;
