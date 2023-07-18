import PageConnectionWait from "../UI/PageConnectionWait";
import PTableRow from "./PTableRow";
import { useGetSemiProductsQuery } from "../../redux/apis/semiProductApi";
import { useGetMaterialsQuery } from "../../redux/apis/materialApi";
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

  const {
    data: allSemiProducts,
    isLoading: SpLoading,
    isFetching: SpFetching,
  } = useGetSemiProductsQuery();

  const {
    data: allMaterials,
    isLoading: MtLoading,
    isFetching: MtFetching,
  } = useGetMaterialsQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (SpLoading && SpFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!allSemiProducts)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (MtLoading && MtFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!allMaterials)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  console.log(products);

  const filteredProductData = products.map((item) => {
    return {
      name: item.name,
      size: item.size,
      description: item.description,
      pId: item.id,
      materials: item.materials?.map((material) => {
        return {
          mtId: material._id,
          mtName: material.name,
          mtCost: material.cost,
          mtUnit: material.unit,
          mtAmount: material.mtNumber,
        };
      }),
      semiProducts: item.semiproducts?.map((semiproduct) => {
        return {
          spId: semiproduct._id,
          spName: semiproduct.name,
          spAmount: semiproduct.spNumber,
          spCost: 100,
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
            <PTableRow
              data={item}
              allMaterials={allMaterials}
              allSemiProducts={allSemiProducts}
              key={item.pId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PDataTable;
