import PageConnectionWait from "../UI/PageConnectionWait";
import CTableRow from "./CTableRow";
import TablePaginationActions from "../UI/table/TablePaginationActions";
import { useGetCustomersQuery } from "../../redux/apis/customerApi";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
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
  TableSortLabel,
  TablePagination,
} from "@mui/material";

const CDataTable = () => {
  //for filter
  const { searchQuery } = useSelector((state) => state.general);
  //for sorting
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  //for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { data: customers, isLoading, isFetching } = useGetCustomersQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!customers)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (customers.length < 1)
    return <PageConnectionWait title="Müşteri Bulunamadı" />;

  const filteredData = customers.map((item) => {
    return {
      name: item.name,
      surname: item.surname,
      description: item.description,
      phonenumber: item.phonenumber,
      cId: item.id,
      orders: item.orders?.map((or) => {
        return {
          orId: or.id,
          orDate: or.date,
          orType: or.type,
          orModel: or.model,
          orPrice: or.price,
          orCost: or.cost,
          orProducts: or.products,
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

  const createSortHandler = (property) => (event) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

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
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left" key="name">
                <TableSortLabel
                  active={valueToOrderBy === "name"}
                  direction={valueToOrderBy === "name" ? orderDirection : "asc"}
                  onClick={createSortHandler("name")}
                >
                  İsim
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" key="surname">
                <TableSortLabel
                  active={valueToOrderBy === "surname"}
                  direction={
                    valueToOrderBy === "surname" ? orderDirection : "asc"
                  }
                  onClick={createSortHandler("surname")}
                >
                  Soyisim
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Telefon</TableCell>
              <TableCell align="left">Notlar</TableCell>
              <TableCell align="left">Sil / Güncelle</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? lastFilteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : lastFilteredData
            ).map((item) => (
              <CTableRow data={item} key={item.cId} />
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
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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

export default CDataTable;
