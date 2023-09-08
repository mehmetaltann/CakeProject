import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../components/forms/FormTextField";
import FormSelect from "../../components/forms/FormSelect";
import PageConnectionWait from "../../components/page/PageConnectionWait"
import * as Yup from "yup";
import { Stack, Button, MenuItem } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/slices/generalSlice";
import { useGetParametersQuery } from "../../store/api/parameterApi.js";

const PForm = ({ setOpenModel, initialValues, submitFunction, objId }) => {
  const {
    data: parameters,
    isLoading: parametersLoading,
    isFetching: parametersFetching,
  } = useGetParametersQuery();

  const dispatch = useDispatch();

  if (parametersLoading && parametersFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
    size: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
  });

  async function submitHandler(values) {
    const newRecord = {
      name: values.name,
      description: values.description,
      size: values.size,
      id: objId,
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
            <Field name="size" component={FormSelect} label="Boyut">
              {parameters
                .filter((item) => item.variant === "Pasta Boyutu")[0]
                .content?.map(({ title, id }, index) => (
                  <MenuItem value={title} key={index}>
                    {title}
                  </MenuItem>
                ))}
            </Field>
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
  );
};

export default PForm;
