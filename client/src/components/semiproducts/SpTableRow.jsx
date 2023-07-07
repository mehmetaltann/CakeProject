import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModalButton from "../UI/ModalButton";
import FormTextField from "../UI/form/FormTextField";
import FormSelect from "../UI/form/FormSelect";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { useGetMaterialsQuery } from "../../redux/apis/materialApi";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Formik, Field } from "formik";
import { useAddMaterialToSemiProductMutation } from "../../redux/apis/semiProductApi";
import { setSnackbar, setModalOpen } from "../../redux/slices/generalSlice";
import {
  Table,
  IconButton,
  TableBody,
  TableHead,
  TableRow,
  MenuItem,
  TableCell,
  Button,
  Collapse,
  Stack,
} from "@mui/material";

const SpTableRow = ({ item }) => {
  const { id, name, description, materials } = item;
  const [open, setOpen] = useState(false);
  const { data: allMaterials, isLoading, isFetching } = useGetMaterialsQuery();
  const [addMaterialToSemiProduct] = useAddMaterialToSemiProductMutation();
  const dispatch = useDispatch();

  const validateSchema = Yup.object().shape({
    mtNumber: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  const initialSelectValueId =
    !isLoading &&
    !isFetching &&
    allMaterials?.find((item) => item.name === "Un");

  async function submitHandler(values) {
    const newRecord = {
      id: id,
      mtObj: values.mtName,
      mtNumber: values.mtNumber,
    };
    console.log(newRecord)
    try {
      const res = await addMaterialToSemiProduct(newRecord).unwrap();
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

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} colSpan={5}>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">1250 TL</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1}>
            <Button variant="outlined">Tarifi Sil</Button>
            <ModalButton
              height={{ md: "40vh", xs: "60%" }}
              color="primary"
              endIconLogo="add"
              buttonTitle="Malzeme Ekle"
              minW="20vh"
              title="Yeni Tarif Malzemesi"
            >
              <Formik
                initialValues={{
                  mtName: initialSelectValueId.id,
                  mtNumber: 0,
                }}
                onSubmit={submitHandler}
                validationSchema={validateSchema}
              >
                {({ values }) => (
                  <Form>
                    <Stack spacing={2} sx={{ pl: 1 }}>
                      <Field
                        name="mtName"
                        component={FormSelect}
                        label="Malzeme"
                        defaultValue="64a7c881616d29bc3389a65a"
                      >
                        {allMaterials.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormTextField
                        sx={{ width: "100%" }}
                        name="mtNumber"
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
            </ModalButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((item, index) => (
                <TableRow key={index}></TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableRow>
    </Fragment>
  );
};

export default SpTableRow;
