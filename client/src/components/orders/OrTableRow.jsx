import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { dateFormat } from "../../utils/help-functions";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../redux/slices/generalSlice";
import {
  useDeleteOrderMutation,
  useAddProductToOrderMutation,
  useDeleteProductFromOrderMutation,
} from "../../redux/apis/orderApi";
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
  const [deleteProductFromOrder] = useDeleteProductFromOrderMutation();
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
          {dateFormat(orDate)}
        </TableCell>
        <TableCell align="left">{orType}</TableCell>
        <TableCell align="left">{orModel}</TableCell>
        <TableCell align="left">{`${orPrice.toFixed(2)} TL`}</TableCell>
        <TableCell align="left">{`${orCost.toFixed(2)} TL`}</TableCell>
        <TableCell align="left">{`${(orPrice - orCost).toFixed(
          2
        )} TL`}</TableCell>
        <TableCell align="left">{`${(
          ((orPrice - orCost) / orCost) *
          100
        ).toFixed(2)}`}</TableCell>
        <TableCell align="left">{`${orCustomerName} ${orCustomerSurname}`}</TableCell>
        <TableCell align="left">{orDescription}</TableCell>
        <TableCell align="left">
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
                      key={prId}
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
                                orId,
                                prId,
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
