import { TableCell, TableRow, TableSortLabel } from "@mui/material";

const OrDataTableHeader = ({
  valueToOrderBy,
  orderDirection,
  setValueToOrderBy,
  setOrderDirection,
}) => {
  const createSortHandler = (property) => (event) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  return (
    <TableRow>
      <TableCell align="left"></TableCell>
      <TableCell align="left" key="orCustomerName">
        <TableSortLabel
          active={valueToOrderBy === "orCustomerName"}
          direction={
            valueToOrderBy === "orCustomerName" ? orderDirection : "asc"
          }
          onClick={createSortHandler("orCustomerName")}
        >
          Müşteri
        </TableSortLabel>
      </TableCell>
      <TableCell align="left" key="orDate">
        <TableSortLabel
          active={valueToOrderBy === "orDate"}
          direction={valueToOrderBy === "orDate" ? orderDirection : "asc"}
          onClick={createSortHandler("orDate")}
        >
          Tarih
        </TableSortLabel>
      </TableCell>
      <TableCell align="left" key="orType">
        <TableSortLabel
          active={valueToOrderBy === "orType"}
          direction={valueToOrderBy === "orType" ? orderDirection : "asc"}
          onClick={createSortHandler("orType")}
        >
          Tip
        </TableSortLabel>
      </TableCell>
      <TableCell align="left" key="orModel">
        <TableSortLabel
          active={valueToOrderBy === "orModel"}
          direction={valueToOrderBy === "orModel" ? orderDirection : "asc"}
          onClick={createSortHandler("orModel")}
        >
          Model
        </TableSortLabel>
      </TableCell>
      <TableCell align="left" key="orPrice">
        <TableSortLabel
          active={valueToOrderBy === "orPrice"}
          direction={valueToOrderBy === "orPrice" ? orderDirection : "asc"}
          onClick={createSortHandler("orPrice")}
        >
          Fiyat
        </TableSortLabel>
      </TableCell>
      <TableCell align="left" key="orCost">
        <TableSortLabel
          active={valueToOrderBy === "orCost"}
          direction={valueToOrderBy === "orCost" ? orderDirection : "asc"}
          onClick={createSortHandler("orCost")}
        >
          Maliyet
        </TableSortLabel>
      </TableCell>
      <TableCell align="left">Kar</TableCell>
      <TableCell align="left">Kar Oranı</TableCell>
      <TableCell align="left">Notlar</TableCell>
      <TableCell align="left">Sil</TableCell>
    </TableRow>
  );
};

export default OrDataTableHeader;
