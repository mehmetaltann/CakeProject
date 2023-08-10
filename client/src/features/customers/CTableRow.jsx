import CForm from "./CForm";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalIconButton from "../../components/modal/ModalIconButton";
import { setSnackbar } from "../../store/slices/generalSlice";
import { dateFormat } from "../../utils/time-functions";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "../../store/api/customerApi";
import {
  Table,
  IconButton,
  TableBody,
  Box,
  TableHead,
  TableRow,
  TableCell,
  Collapse,
  Typography,
} from "@mui/material";

const CTableRow = ({ data }) => {
  const { name, surname, description, phonenumber, cId, orders, ordersCount } =
    data;
  const [open, setOpen] = useState(false);
  const [openEditCModal, setOpenEditCModal] = useState(false);
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const dispatch = useDispatch();
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
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >
          {name}
        </TableCell>
        <TableCell
          align="left"
          sx={{ color: "secondary.main", fontWeight: 500 }}
        >
          {surname}
        </TableCell>
        <TableCell align="left">{phonenumber}</TableCell>
        <TableCell align="left">{ordersCount}</TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          <IconButton
            size="small"
            color="secondary"
            onClick={async () => {
              try {
                const res = await deleteCustomer(cId).unwrap();
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
            height={{ md: "40vh" }}
            modalOpen={openEditCModal}
            setModalOpen={setOpenEditCModal}
            title="Müşteri Güncelle"
          >
            <CForm
              setOpenModel={setOpenEditCModal}
              initialValues={{
                name: name,
                surname: surname,
                phonenumber: phonenumber,
                description: description,
              }}
              submitFunction={updateCustomer}
              objId={cId}
            />
          </ModalIconButton>
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
                    <TableCell align="left" width="6%">
                      Tarih
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Tip
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Model
                    </TableCell>
                    <TableCell align="left">Fiyat</TableCell>
                    <TableCell align="left">Maliyet</TableCell>
                    <TableCell align="left">Kar</TableCell>
                    <TableCell align="left">Kar Oranı</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map(
                    (
                      {
                        orId,
                        orDate,
                        orType,
                        orModel,
                        orPrice,
                        orCost,
                        orProducts,
                      },
                      index
                    ) => (
                      <TableRow
                        key={orId}
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
                          width="6%"
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                        >
                          {dateFormat(orDate)}
                        </TableCell>
                        <TableCell width="12%">{orType}</TableCell>
                        <TableCell width="12%">{orModel}</TableCell>
                        <TableCell
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                          width="10%"
                        >
                          {`${orPrice.toFixed(2)} TL`}
                        </TableCell>
                        <TableCell width="10%">
                          {`${orCost.toFixed(2)} TL`}
                        </TableCell>
                        <TableCell width="10%">
                          {`${(orPrice - orCost).toFixed(2)} TL`}
                        </TableCell>
                        <TableCell width="10%" style={{ borderBottom: "none" }}>
                          <Typography
                            variant="body2"
                            color="success.main"
                            fontWeight="600"
                          >{`% ${(((orPrice - orCost) / orPrice) * 100).toFixed(
                            2
                          )}`}</Typography>
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

export default CTableRow;
