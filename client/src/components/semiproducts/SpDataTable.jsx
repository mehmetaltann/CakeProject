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

  const filteredSemiProductData = semiProducts.map((item) => {
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">İsim</TableCell>
            <TableCell align="left">Maliyet</TableCell>
            <TableCell align="left">Notlar</TableCell>
            <TableCell align="left">Sil / Güncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSemiProductData.map((item) => (
            <SpTableRow data={item} key={item.spId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
