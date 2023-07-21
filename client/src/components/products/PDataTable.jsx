import PageConnectionWait from "../UI/PageConnectionWait";
import PTableRow from "./PTableRow";
import TablePaginationActions from "../UI/table/TablePaginationActions";
import { Fragment, useState } from "react";
import { getComparator, sortedFilteredData } from "../../utils/sort-functions";
import { useGetProductsQuery } from "../../redux/apis/productApi";
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

const PDataTable = () => {
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { data: products, isLoading, isFetching } = useGetProductsQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData = products.map((item) => {
    return {
      name: item.name,
      size: item.size,
      description: item.description,
      pId: item.id,
      totalCost: item.totalCost,
      materials: item.materials?.map((material) => {
        return {
          mtId: material.id,
          mtName: material.name,
          mtCost: material.cost,
          mtUnit: material.unit,
          mtAmount: material.mtNumber,
        };
      }),
      semiProducts: item.semiproducts?.map((semiproduct) => {
        return {
          spId: semiproduct.id,
          spName: semiproduct.name,
          spAmount: semiproduct.spNumber,
          spCost: semiproduct.materialcost,
        };
      }),
    };
  });

  const tableData = sortedFilteredData(
    filteredData,
    getComparator(orderDirection, valueToOrderBy)
  );

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
              <TableCell align="left" key="size">
                <TableSortLabel
                  active={valueToOrderBy === "size"}
                  direction={valueToOrderBy === "size" ? orderDirection : "asc"}
                  onClick={createSortHandler("size")}
                >
                  Boyut
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Maliyet</TableCell>
              <TableCell align="left">Notlar</TableCell>
              <TableCell align="left">Sil / Güncelle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            ).map((item) => (
              <PTableRow data={item} key={item.cId} />
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

export default PDataTable;
