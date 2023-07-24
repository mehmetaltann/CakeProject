import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import SemiProductDataForm from "../UI/dataForms/SemiProductDataForm";
import MaterialDataForm from "../UI/dataForms/MaterialDataForm";
import ModalButton from "../UI/ModalButton";
import ModalIconButton from "../UI/ModalIconButton";
import PForm from "./PForm";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddMaterialToProductMutation,
  useDeleteMaterialFromProductMutation,
  useAddSemiProductToProductMutation,
  useDeleteSemiProductFromProductMutation,
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

const PTableRow = ({ data, pIndex }) => {
  const { pId, name, size, description, materials, semiProducts, totalCost } =
    data;
  const [open, setOpen] = useState(false);
  const [openAddMtToPModal, setOpenAddMtToPModal] = useState(false);
  const [openAddSpToPModal, setOpenAddSpToPModal] = useState(false);
  const [openEditPModal, setOpenEditPModal] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addMaterialToProduct] = useAddMaterialToProductMutation();
  const [deleteMaterialFromProduct] = useDeleteMaterialFromProductMutation();
  const [addSemiProductToProduct] = useAddSemiProductToProductMutation();
  const [deleteSemiProductFromProduct] =
    useDeleteSemiProductFromProductMutation();

  const dispatch = useDispatch();

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" width="2%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="secondary"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" width="2%">
          {pIndex + 1}
        </TableCell>
        <TableCell align="left" width="20%">
          {name}
        </TableCell>
        <TableCell align="left" width="15%">
          {size}
        </TableCell>
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >
          {`${totalCost.toFixed(2)} TL`}
        </TableCell>
        <TableCell align="left" width="20%">
          {description}
        </TableCell>
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
            title="Ürün Güncelle"
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
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
                        <TableCell component="th" scope="row" width="1%">
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
                                const res = await deleteSemiProductFromProduct({
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
                        height="30vh"
                        color="primary"
                        endIconLogo="add"
                        buttonTitle="Yeni Tarif Ekle"
                        minW="20vh"
                        title="Ürün Tarifi Ekle"
                        modalOpen={openAddSpToPModal}
                        setModalOpen={setOpenAddSpToPModal}
                      >
                        <SemiProductDataForm
                          setOpenModel={setOpenAddSpToPModal}
                          submitFunction={addSemiProductToProduct}
                          ObjId={pId}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
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
                                const res = await deleteMaterialFromProduct({
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
                        height="30vh"
                        color="primary"
                        endIconLogo="add"
                        buttonTitle="Yeni Malzeme Ekle"
                        minW="20vh"
                        title="Ürün Malzemesi Ekle"
                        modalOpen={openAddMtToPModal}
                        setModalOpen={setOpenAddMtToPModal}
                      >
                        <MaterialDataForm
                          setOpenModel={setOpenAddMtToPModal}
                          submitFunction={addMaterialToProduct}
                          ObjId={pId}
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
