import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductDataForm from "../../components/dataForm/ProductDataForm";
import ModalButton from "../../components/modal/ModalButton";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { dateFormat } from "../../utils/time-functions";
import { setSnackbar } from "../../store/slices/generalSlice";
import {
  useDeleteOrderMutation,
  useAddProductToOrderMutation,
  useDeleteProductFromOrderMutation,
} from "../../store/api/orderApi";
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

const OrTableRow = ({ data }) => {
  const {
    orId,
    orDate,
    orModel,
    orType,
    orPrice,
    orCost,
    orDescription,
    orCustomerId,
    orCustomerName,
    orCustomerSurname,
    orProducts,
  } = data;
  const [open, setOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();
  const [addProductToOrder] = useAddProductToOrderMutation();
  const [deleteProductFromOrder] = useDeleteProductFromOrderMutation();
  const [openAddPToOrModal, setOpenAddPToOrModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" width="1%">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="secondary"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          align="left"
          width="15%"
          sx={{ fontWeight: 500 }}
        >{`${orCustomerName} ${orCustomerSurname}`}</TableCell>
        <TableCell
          align="left"
          width="7%"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >
          {dateFormat(orDate)}
        </TableCell>
        <TableCell align="left" width="12%">
          {orType}
        </TableCell>
        <TableCell align="left" width="12%">
          {orModel}
        </TableCell>
        <TableCell
          align="left"
          width="10%"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >{`${orPrice.toFixed(2)} TL`}</TableCell>
        <TableCell align="left" width="10%">{`${orCost.toFixed(
          2
        )} TL`}</TableCell>
        <TableCell
          align="left"
          width="10%"
          sx={{ color: "success.main", fontWeight: 500 }}
        >
          {`${(orPrice - orCost).toFixed(2)} TL`}
        </TableCell>
        <TableCell
          align="left"
          width="10%"
          sx={{ color: "success.main", fontWeight: 600 }}
        >
          {`% ${(((orPrice - orCost) / orPrice) * 100).toFixed(2)}`}
        </TableCell>

        <TableCell align="left" width="10%">
          {orDescription}
        </TableCell>
        <TableCell align="left" width="2%">
          <IconButton
            size="small"
            color="secondary"
            onClick={async () => {
              try {
                const res = await deleteOrder({ orId, orCustomerId }).unwrap();
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

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="materials">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="1%">
                      No
                    </TableCell>
                    <TableCell align="left" width="12%">
                      İsim
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Boyut
                    </TableCell>
                    <TableCell align="left">Ürün Sil</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orProducts?.map(({ prId, prName, prSize }, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row" width="1%">
                        {index + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        width="12%"
                        sx={{ color: "secondary.main", fontWeight: 500 }}
                      >
                        {prName}
                      </TableCell>
                      <TableCell width="12%">{prSize}</TableCell>
                      <TableCell align="left" width="3%">
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={async () => {
                            try {
                              const res = await deleteProductFromOrder({
                                orderId: orId,
                                productId: prId,
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
                  ))}
                  <TableRow>
                    <TableCell
                      align="right"
                      colSpan={6}
                      style={{ borderBottom: "none" }}
                    >
                      <ModalButton
                        height="30vh"
                        color="primary"
                        endIconLogo="add"
                        buttonTitle="Yeni Ürün Ekle"
                        minW="20vh"
                        title="Yeni Sipariş Ürünü"
                        modalOpen={openAddPToOrModal}
                        setModalOpen={setOpenAddPToOrModal}
                      >
                        <ProductDataForm
                          setOpenModel={setOpenAddPToOrModal}
                          submitFunction={addProductToOrder}
                          ObjId={orId}
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

export default OrTableRow;
