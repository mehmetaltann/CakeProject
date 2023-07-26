import PageConnectionWait from "../UI/PageConnectionWait";
import SpTableRow from "./SpTableRow";
import TablePaginationActions from "../UI/table/TablePaginationActions";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useGetSemiProductsQuery } from "../../redux/apis/semiProductApi";
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
  TableSortLabel,
} from "@mui/material";

export default function SpDataTable() {
  //for filter
  const { searchQuery } = useSelector((state) => state.general);
  //for sorting
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  //for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const {
    data: semiProducts,
    isLoading,
    isFetching,
  } = useGetSemiProductsQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!semiProducts)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (semiProducts.length < 1)
    return <PageConnectionWait title="Tarif Bulunamadı" />;

  const filteredData = semiProducts.map((item) => {
    return {
      name: item.name,
      description: item.description,
      spId: item.id,
      totalCost: item.totalCost,
      materials: item.materials?.map((mat) => {
        return {
          mtId: mat.id,
          mtName: mat.name,
          mtCost: mat.cost,
          mtUnit: mat.unit,
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
              <TableCell align="left">No</TableCell>
              <TableCell align="left" key="name">
                <TableSortLabel
                  active={valueToOrderBy === "name"}
                  direction={valueToOrderBy === "name" ? orderDirection : "asc"}
                  onClick={createSortHandler("name")}
                >
                  İsim
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" key="totalCost">
                <TableSortLabel
                  active={valueToOrderBy === "totalCost"}
                  direction={
                    valueToOrderBy === "totalCost" ? orderDirection : "asc"
                  }
                  onClick={createSortHandler("totalCost")}
                >
                  Maliyet
                </TableSortLabel>
              </TableCell>
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
            ).map((item, index) => (
              <SpTableRow data={item} key={index} spIndex={index} />
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
}
