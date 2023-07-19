import PageConnectionWait from "../PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../form/FormTextField";
import FormSelect from "../form/FormSelect";
import * as Yup from "yup";
import { useGetSemiProductsQuery } from "../../../redux/apis/semiProductApi";
import { Stack, Button, MenuItem } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/slices/generalSlice";

const SemiProductDataForm = ({ setOpenModel, submitFunction, ObjId }) => {
  const {
    data: semiProducts,
    isLoading,
    isFetching,
  } = useGetSemiProductsQuery();

  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!semiProducts)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const initialSelectValueSm = semiProducts?.find(
    (item) => item.name === "Pastacı Kreması"
  );

  const validateSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  async function submitHandler(values) {
    const newRecord = {
      objId: ObjId,
      id: values.title,
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
        title: initialSelectValueSm.id,
        amount: 0,
      }}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ values }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <Field
              name="title"
              component={FormSelect}
              label="İsim"
              defaultValue="64afad9eda7e337a51b304c8"
            >
              {semiProducts.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Field>
            <FormTextField
              sx={{ width: "100%" }}
              name="amount"
              label="Ölçü"
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

export default SemiProductDataForm;
