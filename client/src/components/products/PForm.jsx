import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../UI/form/FormTextField";
import FormSelect from "../UI/form/FormSelect";
import * as Yup from "yup";
import { Stack, Button, MenuItem } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";

const PForm = ({ setOpenModel, initialValues, submitFunction, objId }) => {
  const dispatch = useDispatch();

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
              <MenuItem value="4-8 Kişilik">4-8 Kişilik</MenuItem>
              <MenuItem value="8-12 Kişilik">8-12 Kişilik</MenuItem>
              <MenuItem value="12-16 Kişilik">12-16 Kişilik</MenuItem>
              <MenuItem value="16-20 Kişilik">16-20 Kişilik</MenuItem>
              <MenuItem value="20-25 Kişilik">20-25 Kişilik</MenuItem>
              <MenuItem value="25-30 Kişilik">25-30 Kişilik</MenuItem>
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
