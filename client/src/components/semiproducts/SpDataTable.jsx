import PageConnectionWait from "../UI/PageConnectionWait";
import SpTableRow from "./SpTableRow";
import { useGetSemiProductsQuery } from "../../redux/apis/semiProductApi";
import { useGetMaterialsQuery } from "../../redux/apis/materialApi";
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

  const {
    data: allMaterials,
    isLoading: MtLoading,
    isFetching: MtFetching,
  } = useGetMaterialsQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!semiProducts)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (MtLoading && MtFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!allMaterials)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredSemiProductData = semiProducts.map((item) => {
    return {
      name: item.name,
      description: item.description,
      spId: item.id,
      materials: item.materials.map((spmt) => {
        const foundMt = allMaterials.find((mt) => mt.id === spmt.mtId);
        return {
          mtId: foundMt.id,
          mtName: foundMt.name,
          mtCost: ((foundMt.price * spmt.mtNumber) / foundMt.amount),
          mtUnit: foundMt.unit,
          mtAmount: spmt.mtNumber,
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
            <SpTableRow
              data={item}
              allMaterials={allMaterials}
              key={item.spId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
