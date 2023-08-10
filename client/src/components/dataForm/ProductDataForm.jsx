import PageConnectionWait from "../page/PageConnectionWait";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { useGetProductsQuery } from "../../store/api/productApi";
import { setSnackbar } from "../../store/slices/generalSlice";
import { Autocomplete } from "formik-mui";
import { Stack, Button, TextField } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";

const ProductDataForm = ({ setOpenModel, submitFunction, ObjId }) => {
  const { data: products, isLoading, isFetching } = useGetProductsQuery();

  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const validateSchema = Yup.object().shape({
    title: Yup.object().required("Gerekli"),
  });

  async function submitHandler(values) {
    const newRecord = {
      orderId: ObjId,
      productId: values.title.id,
      productCost: values.title.totalCost,
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
      }}
      onSubmit={submitHandler}
      validationSchema={validateSchema}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <Field
              name="title"
              component={Autocomplete}
              options={products}
              getOptionLabel={(option) =>
                `${option.name} - ${option.size}` || ""
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e, value) => setFieldValue("title", value || null)}
                  name="title"
                  error={touched["title"] && !!errors["title"]}
                  helperText={errors["title"]}
                  label="Ürün Seç"
                  variant="outlined"
                />
              )}
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

export default ProductDataForm;
