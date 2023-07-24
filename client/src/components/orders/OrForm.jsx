import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../UI/form/FormTextField";
import FormSelect from "../UI/form/FormSelect";
import FormDatePicker from "../UI/form/FormDatePicker";
import PageConnectionWait from "../UI/PageConnectionWait";
import * as Yup from "yup";
import { Autocomplete } from "formik-mui";
import { Stack, MenuItem, Button, TextField } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";
import { useGetCustomersQuery } from "../../redux/apis/customerApi";
import { useGetProductsQuery } from "../../redux/apis/productApi";

const OrForm = ({ setOpenModel, initialValues, submitFunction, objId }) => {
  const {
    data: customers,
    isLoading: customerLoading,
    isFetching: customerFetching,
  } = useGetCustomersQuery();

  const {
    data: products,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useGetProductsQuery();

  const dispatch = useDispatch();

  if (customerLoading && customerFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!customers)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (productFetching && productLoading)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  async function submitHandler(values) {
    const pickedProduct = products.find(
      (item) => item.id === values.product.id
    );
    const newRecord = {
      customerId: values.customer.id,
      date: values.date,
      products: [{ _id: pickedProduct.id, name: pickedProduct.name }],
      type: values.type,
      model: values.model,
      price: values.price,
      desription: values.desription,
      cost: pickedProduct.totalCost,
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
      {({ values, setFieldValue, touched, errors }) => (
        <Form>
          <Stack spacing={2} sx={{ pl: 1 }}>
            <Field
              name="customer"
              component={Autocomplete}
              options={customers}
              getOptionLabel={(option) =>
                `${option.name} ${option.surname}` || ""
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e, value) => setFieldValue("title", value || null)}
                  name="customer"
                  error={touched["title"] && !!errors["title"]}
                  helperText={errors["title"]}
                  label="Müşteri Seç"
                  variant="outlined"
                />
              )}
            />
            <FormDatePicker name="date" label="Sipariş Tarihi" size="small" />
            <Field
              name="product"
              component={Autocomplete}
              options={products}
              getOptionLabel={(option) =>
                `${option.name} / ${option.size}` || ""
              }
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e, value) => setFieldValue("title", value || null)}
                  name="product"
                  error={touched["title"] && !!errors["title"]}
                  helperText={errors["title"]}
                  label="Ürün Seç"
                  variant="outlined"
                />
              )}
            />
            <Field name="type" component={FormSelect} label="Pasta türü">
              <MenuItem value="Yazılı Pasta">Yazılı Pasta</MenuItem>
              <MenuItem value="Krema Sanatı">Krema Sanatı</MenuItem>
              <MenuItem value="Konsept Pasta">Konsept Pasta</MenuItem>
              <MenuItem value="Harf Pasta">Harf Pasta</MenuItem>
              <MenuItem value="Cupcake">Cupcake</MenuItem>
              <MenuItem value="Hediye Kutusu">Hediye Kutusu</MenuItem>
            </Field>
            <FormTextField
              sx={{ width: "100%" }}
              name="model"
              label="Model"
              size="small"
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="price"
              label="Fiyat"
              type="number"
              size="small"
            />
            <FormTextField
              sx={{ width: "100%" }}
              name="description"
              label="Notlar"
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

export default OrForm;
