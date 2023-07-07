import PageConnectionWait from "../UI/PageConnectionWait";
import SpTableRow from "./SpTableRow";
import { useGetSemiProductsQuery } from "../../redux/apis/semiProductApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function SpDataTable() {
  const {
    data: semiProducts,
    isLoading,
    isFetching,
  } = useGetSemiProductsQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!semiProducts)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">İsim</TableCell>
            <TableCell align="left">Maliyet&nbsp;(TL)</TableCell>
            <TableCell align="left">Notlar</TableCell>
            <TableCell align="center">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {semiProducts.map((item) => (
            <SpTableRow item={item} key={item.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
