import OrTableRow from "./OrTableRow";
import PageConnectionWait from "../../components/page/PageConnectionWait";
import TablePaginationActions from "../../components/table/TablePaginationActions";
import OrDataTableHeader from "./OrDataTableHeader";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../store/api/orderApi";
import {
  getComparator,
  sortedFilteredData,
  filterData,
} from "../../utils/sort-functions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const OrDataTable = () => {
  //for filter
  const { searchQuery } = useSelector((state) => state.general);
  //for sorting
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  //for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  //for data
  const { data: orders, isLoading, isFetching } = useGetOrdersQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!orders)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (orders.length < 1)
    return <PageConnectionWait title="Sipariş Bulunamadı" />;

  const filteredData = orders?.map((item) => {
    return {
      orId: item.id,
      orDate: item.date,
      orModel: item.model,
      orType: item.type,
      orPrice: item.price,
      orCost: item.cost,
      orDescription: item.description,
      orCustomerName: item.customerName,
      orCustomerId: item.customerId,
      orCustomerSurname: item.customerSurname,
      orProducts: item.products?.map((pr) => {
        return {
          prId: pr.id,
          prName: pr.name,
          prSize: pr.size,
        };
      }),
    };
  });

  const tableData = sortedFilteredData(
    filteredData,
    getComparator(orderDirection, valueToOrderBy)
  );

  const keys = Object.keys(tableData[0]);
  keys.pop();

  const lastFilteredData = filterData(tableData, keys, searchQuery);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <OrDataTableHeader
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              setValueToOrderBy={setValueToOrderBy}
              setOrderDirection={setOrderDirection}
            />
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? lastFilteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : lastFilteredData
            ).map((item) => (
              <OrTableRow data={item} key={item.orId} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[12, 25, 50, { label: "All", value: -1 }]}
        colSpan={3}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        component="div"
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Fragment>
  );
};

export default OrDataTable;
