import PageConnectionWait from "../page/PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../forms/FormTextField";
import * as Yup from "yup";
import { useGetMaterialsQuery } from "../../store/api/materialApi";
import { setSnackbar } from "../../store/slices/generalSlice";
import { Stack, Button, TextField } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { Autocomplete } from "formik-mui";
import { useDispatch } from "react-redux";

const MaterialDataForm = ({ setOpenModel, submitFunction, ObjId }) => {
  const { data: materials, isLoading, isFetching } = useGetMaterialsQuery();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!materials)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const validateSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  async function submitHandler(values) {
    const newRecord = {
      objId: ObjId,
      id: values.title.id,
      number: values.amount,
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

  return (
    <Formik
      initialValues={{
        title: null,
        amount: 0,
      }}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ setFieldValue, touched, errors }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <Field
              name="title"
              component={Autocomplete}
              options={materials}
              getOptionLabel={(option) => option.name || ""}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e, value) => setFieldValue("title", value || null)}
                  name="title"
                  error={touched["title"] && !!errors["title"]}
                  helperText={errors["title"]}
                  label="Malzeme Seç"
                  variant="outlined"
                />
              )}
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="amount"
              label="Miktar"
              type="number"
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

export default MaterialDataForm;
