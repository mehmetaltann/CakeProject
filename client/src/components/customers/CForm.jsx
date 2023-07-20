import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../UI/form/FormTextField";
import * as Yup from "yup";
import { Stack, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";

const CForm = ({ setOpenModel, initialValues, submitFunction, objId }) => {
  const dispatch = useDispatch();

  async function submitHandler(values) {
    const newRecord = {
      name: values.name,
      surname: values.surname,
      phonenumber: values.phonenumber,
      description: values.description,
      id: objId,
    };
    try {
      console.log(newRecord)
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
    surname: Yup.string().required("Gerekli").min(2, "En az 2 Karakter"),
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
            <FormTextField
              sx={{ width: "100%" }}
              name="surname"
              label="Soyisim"
              size="small"
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="phonenumber"
              label="Telefon"
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
  );
};

export default CForm;
