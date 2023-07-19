import PageConnectionWait from "../UI/PageConnectionWait";
import PTableRow from "./PTableRow";
import { useGetProductsQuery } from "../../redux/apis/productApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PDataTable = () => {
  const { data: products, isLoading, isFetching } = useGetProductsQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredProductData = products.map((item) => {
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="left">İsim</TableCell>
            <TableCell align="left">Boyut</TableCell>
            <TableCell align="left">Maliyet</TableCell>
            <TableCell align="left">Notlar</TableCell>
            <TableCell align="left">Sil / Güncelle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProductData.map((item) => (
            <PTableRow data={item} key={item.pId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PDataTable;
