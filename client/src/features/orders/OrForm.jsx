import SendIcon from "@mui/icons-material/Send";
import FormTextField from "../../components/forms/FormTextField";
import FormSelect from "../../components/forms/FormSelect";
import FormDatePicker from "../../components/forms/FormDatePicker";
import PageConnectionWait from "../../components/page/PageConnectionWait";
import * as Yup from "yup";
import { Autocomplete } from "formik-mui";
import { Stack, MenuItem, Button, TextField } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../store/slices/generalSlice";
import { useGetCustomersQuery } from "../../store/api/customerApi";
import { useGetProductsQuery } from "../../store/api/productApi";
import { useGetParametersQuery } from "../../store/api/parameterApi.js";

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

  const {
    data: parameters,
    isLoading: parametersLoading,
    isFetching: parametersFetching,
  } = useGetParametersQuery();

  const dispatch = useDispatch();

  if (customerLoading && customerFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!customers)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (productFetching && productLoading)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (parametersLoading && parametersFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!parameters)
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
      desription: values.description,
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
              {parameters
                .filter((item) => item.variant === "Pasta Türü")[0]
                .content?.map(({ title, id }, index) => (
                  <MenuItem value={title} key={index}>
                    {title}
                  </MenuItem>
                ))}
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
