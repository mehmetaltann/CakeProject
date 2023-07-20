import PageConnectionWait from "../UI/PageConnectionWait";
import CTableRow from "./CTableRow";
import { useGetCustomersQuery } from "../../redux/apis/customerApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CDataTable = () => {
  const { data: customers, isLoading, isFetching } = useGetCustomersQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!customers)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredCustomerData = customers.map((item) => {
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


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">İsim</TableCell>
            <TableCell align="left">Soyisim</TableCell>
            <TableCell align="left">Telefon</TableCell>
            <TableCell align="left">Notlar</TableCell>
            <TableCell align="left">Sil / Güncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCustomerData.map((item) => (
            <CTableRow data={item} key={item.cId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CDataTable;
