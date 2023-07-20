import PageConnectionWait from "../UI/PageConnectionWait";
import OrTableRow from "./OrTableRow";
import { useGetOrdersQuery } from "../../redux/apis/orderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const OrDataTable = () => {
  const { data: orders, isLoading, isFetching } = useGetOrdersQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!orders)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredOrderData = orders?.map((item) => {
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">Tarih</TableCell>
            <TableCell align="left">Model</TableCell>
            <TableCell align="left">Tip</TableCell>
            <TableCell align="left">Fiyat</TableCell>
            <TableCell align="left">Maliyet</TableCell>
            <TableCell align="left">Kar</TableCell>
            <TableCell align="left">Müşteri</TableCell>
            <TableCell align="left">Notlar</TableCell>
            <TableCell align="left">Sil / Güncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrderData.map((item) => (
            <OrTableRow data={item} key={item.orId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrDataTable;
