import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../UI/form/FormTextField";
import FormSelect from "../UI/form/FormSelect";
import FormDatePicker from "../UI/form/FormDatePicker";
import * as Yup from "yup";
import { Stack, MenuItem, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";

const MForm = ({ setOpenModel, initialValues, submitFunction, objId }) => {
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
      const res = await submitFunction(newRecord).unwrap();
      setOpenModel(false);
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
    <Formik
      initialValues={initialValues}
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
              <MenuItem value="Diğer">Diğer</MenuItem>
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
              <MenuItem value="Santimetre">Santimetre</MenuItem>
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
  );
};

export default MForm;
