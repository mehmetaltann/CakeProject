import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalButton from "../UI/ModalButton";
import ModalIconButton from "../UI/ModalIconButton";
import SpForm from "./SpForm";
import DataForm from "../UI/DataForm";
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
  TableCell,
  Collapse,
} from "@mui/material";

const SpTableRow = ({ data, allMaterials }) => {
  const { spId, name, description, materials } = data;
  const [open, setOpen] = useState(false);
  const [openAddMtToSpModal, setOpenAddMtToSpModal] = useState(false);
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

  const initialSelectValueId = allMaterials?.find((item) => item.name === "Un");

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" width="5%">
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="materials">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="1%">
                      No
                    </TableCell>
                    <TableCell align="left" width="18%">
                      İsim
                    </TableCell>
                    <TableCell align="left">Miktar</TableCell>
                    <TableCell align="left">Birim</TableCell>
                    <TableCell align="left">Maliyet</TableCell>
                    <TableCell align="left" width="15%">
                      Malzeme Sil
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
                        <TableCell component="th" scope="row" width="1%">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row" width="18%">
                          {mtName}
                        </TableCell>
                        <TableCell width="3%">{mtAmount}</TableCell>
                        <TableCell width="3%">{mtUnit}</TableCell>
                        <TableCell
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                          width="6%"
                        >{`${mtCost.toFixed(2)} TL`}</TableCell>
                        <TableCell align="left" width="5%">
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
                  <TableRow>
                    <TableCell align="right" colSpan={6}>
                      <ModalButton
                        height={{ md: "25vh" }}
                        color="primary"
                        endIconLogo="add"
                        buttonTitle="Yeni Malzeme Ekle"
                        minW="20vh"
                        title="Yeni Tarif Malzemesi"
                        modalOpen={openAddMtToSpModal}
                        setModalOpen={setOpenAddMtToSpModal}
                      >
                        <DataForm
                          setOpenModel={setOpenAddMtToSpModal}
                          initialValues={{
                            title: initialSelectValueId.id,
                            amount: 0,
                          }}
                          submitFunction={addMaterialToSemiProduct}
                          selectOptions={allMaterials}
                          ObjId={spId}
                          defV="64a7c881616d29bc3389a65a"
                        />
                      </ModalButton>
                    </TableCell>
                  </TableRow>
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
