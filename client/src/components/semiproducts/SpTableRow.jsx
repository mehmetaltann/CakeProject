import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ModalButton from "../UI/ModalButton";
import ModalIconButton from "../UI/ModalIconButton";
import SpForm from "./SpForm";
import FormTextField from "../UI/form/FormTextField";
import FormSelect from "../UI/form/FormSelect";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDeleteSemiProductMutation,
  useAddMaterialToSemiProductMutation,
  useDeleteMaterialToSemiProductMutation,
  useUpdateSemiProductMutation,
} from "../../redux/apis/semiProductApi";
import { setSnackbar } from "../../redux/slices/generalSlice";
import {
  Table,
  IconButton,
  TableBody,
  Box,
  TableHead,
  TableRow,
  MenuItem,
  TableCell,
  Button,
  Collapse,
  Stack,
} from "@mui/material";

const SpTableRow = ({ data, allMaterials }) => {
  const { spId, name, description, materials } = data;
  const [open, setOpen] = useState(false);
  const [openAddMyToSpModal, setOpenAddMyToSpModal] = useState(false);
  const [openEditSpModal, setOpenEditSpModal] = useState(false);
  const [updateSemiProduct] = useUpdateSemiProductMutation();
  const [deleteSemiProduct] = useDeleteSemiProductMutation();
  const [addMaterialToSemiProduct] = useAddMaterialToSemiProductMutation();
  const [deleteMaterialToSemiProduct] =
    useDeleteMaterialToSemiProductMutation();

  const dispatch = useDispatch();

  const spTotalCost = materials
    .reduce((n, { mtCost }) => n + mtCost, 0)
    .toFixed(2);

  const validateSchema = Yup.object().shape({
    mtNumber: Yup.number()
      .required("Gerekli")
      .moreThan(0, "Sıfırdan Büyük Olmalıdır"),
  });

  const initialSelectValueId = allMaterials?.find((item) => item.name === "Un");

  async function submitHandler(values) {
    const newRecord = {
      spId: spId,
      mtId: values.mtName,
      mtNumber: values.mtNumber,
    };
    try {
      const res = await addMaterialToSemiProduct(newRecord).unwrap();
      setOpenAddMyToSpModal(false);
      dispatch(
        setSnackbar({
          children: res.message,
          severity: "success",
        })
      );
    } catch (error) {
      setOpenAddMyToSpModal(false);
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
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} colSpan={4}>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="secondary"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >{`${spTotalCost} TL`}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          <IconButton
            size="small"
            color="secondary"
            onClick={async () => {
              try {
                const res = await deleteSemiProduct(spId).unwrap();
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
            }}
          >
            <DeleteIcon />
          </IconButton>
          <ModalIconButton
            height={{ md: "25vh" }}
            modalOpen={openEditSpModal}
            setModalOpen={setOpenEditSpModal}
            title="Tarif Güncelle"
          >
            <SpForm
              setOpenModel={setOpenEditSpModal}
              initialValues={{
                name: name,
                description: description,
              }}
              submitFunction={updateSemiProduct}
              objId={spId}
            />
          </ModalIconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="materials" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">İsim</TableCell>
                    <TableCell align="left">Miktar</TableCell>
                    <TableCell align="left">Birim</TableCell>
                    <TableCell align="left">Maliyet</TableCell>
                    <TableCell align="left">Malzeme Sil</TableCell>
                    <TableCell align="right">
                      <ModalButton
                        height={{ md: "25vh" }}
                        color="primary"
                        endIconLogo="add"
                        buttonTitle="Yeni Malzeme Ekle"
                        minW="20vh"
                        title="Yeni Tarif Malzemesi"
                        modalOpen={openAddMyToSpModal}
                        setModalOpen={setOpenAddMyToSpModal}
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
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials?.map(
                    ({ mtId, mtName, mtCost, mtUnit, mtAmount }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {mtName}
                        </TableCell>
                        <TableCell>{mtAmount}</TableCell>
                        <TableCell>{mtUnit}</TableCell>
                        <TableCell
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                        >{`${mtCost.toFixed(2)} TL`}</TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={async () => {
                              try {
                                const res = await deleteMaterialToSemiProduct({
                                  mtId,
                                  spId,
                                }).unwrap();
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
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default SpTableRow;
