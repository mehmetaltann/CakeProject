import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import DataForm from "../UI/DataForm";
import ModalButton from "../UI/ModalButton";
import ModalIconButton from "../UI/ModalIconButton";
import PForm from "./PForm";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddMaterialToProductMutation,
  useDeleteMaterialToProductMutation,
  useAddSemiProductToProductMutation,
  useDeleteSemiProductToProductMutation,
} from "../../redux/apis/productApi";
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

const PTableRow = ({ data, allMaterials, allSemiProducts }) => {
  const { pId, name, size, description, materials, semiProducts } = data;
  const [open, setOpen] = useState(false);
  const [openAddMtToPModal, setOpenAddMtToPModal] = useState(false);
  const [openAddSpToPModal, setOpenAddSpToPModal] = useState(false);
  const [openEditPModal, setOpenEditPModal] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addMaterialToProduct] = useAddMaterialToProductMutation();
  const [deleteMaterialToProduct] = useDeleteMaterialToProductMutation();
  const [addSemiProductToProduct] = useAddSemiProductToProductMutation();
  const [deleteSemiProductToProduct] = useDeleteSemiProductToProductMutation();

  const dispatch = useDispatch();

  const pTotalCost =
    materials.reduce((n, { mtCost }) => n + mtCost, 0) +
    semiProducts.reduce((n, { mtCost }) => n + mtCost, 0);

  const initialSelectValueMt = allMaterials?.find((item) => item.name === "Un");
  const initialSelectValueSm = allSemiProducts?.find(
    (item) => item.name === "Pastacı Kreması"
  );

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
        <TableCell align="left">{size}</TableCell>
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >
          {`${pTotalCost} TL`}
        </TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          <IconButton
            size="small"
            color="secondary"
            onClick={async () => {
              try {
                const res = await deleteProduct(pId).unwrap();
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
            height={{ md: "35vh" }}
            modalOpen={openEditPModal}
            setModalOpen={setOpenEditPModal}
            title="Tarif Güncelle"
          >
            <PForm
              setOpenModel={setOpenEditPModal}
              initialValues={{
                name: name,
                description: description,
                size: size,
              }}
              submitFunction={updateProduct}
              objId={pId}
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
                    <TableCell align="left" width="2%">
                      No
                    </TableCell>
                    <TableCell align="left" width="20%">
                      İsim
                    </TableCell>
                    <TableCell align="left" width="7%">
                      Miktar
                    </TableCell>
                    <TableCell align="left" width="7%">
                      Birim
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Maliyet
                    </TableCell>
                    <TableCell align="left" width="7%">
                      Tarif Sil
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {semiProducts?.map(
                    ({ spId, spName, spCost, spAmount }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" width="2%">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row" width="20%">
                          {spName}
                        </TableCell>
                        <TableCell width="7%">{spAmount}</TableCell>
                        <TableCell width="7%">Ölçü</TableCell>
                        <TableCell
                          width="12%"
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                        >{`${spCost.toFixed(2)} TL`}</TableCell>
                        <TableCell width="7%">
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={async () => {
                              try {
                                const res = await deleteSemiProductToProduct({
                                  spId,
                                  pId,
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
                        buttonTitle="Yeni Tarif Ekle"
                        minW="20vh"
                        title="Ürün Tarifi Ekle"
                        modalOpen={openAddSpToPModal}
                        setModalOpen={setOpenAddSpToPModal}
                      >
                        <DataForm
                          setOpenModel={setOpenAddSpToPModal}
                          initialValues={{
                            title: initialSelectValueSm.id,
                            amount: 0,
                          }}
                          submitFunction={addSemiProductToProduct}
                          selectOptions={allSemiProducts}
                          ObjId={pId}
                          defV="64afad9eda7e337a51b304c8"
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

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="materials">
                <TableBody>
                  {materials?.map(
                    ({ mtId, mtName, mtCost, mtUnit, mtAmount }, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" width="2%">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row" width="20%">
                          {mtName}
                        </TableCell>
                        <TableCell width="7%">{mtAmount}</TableCell>
                        <TableCell width="7%">{mtUnit}</TableCell>
                        <TableCell
                          width="12%"
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                        >{`${mtCost.toFixed(2)} TL`}</TableCell>
                        <TableCell width="7%">
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={async () => {
                              try {
                                const res = await deleteMaterialToProduct({
                                  mtId,
                                  pId,
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
                        title="Ürün Malzemesi Ekle"
                        modalOpen={openAddMtToPModal}
                        setModalOpen={setOpenAddMtToPModal}
                      >
                        <DataForm
                          setOpenModel={setOpenAddMtToPModal}
                          initialValues={{
                            title: initialSelectValueMt.id,
                            amount: 0,
                          }}
                          submitFunction={addMaterialToProduct}
                          selectOptions={allMaterials}
                          ObjId={pId}
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

export default PTableRow;
