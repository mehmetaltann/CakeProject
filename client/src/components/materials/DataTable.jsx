import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../UI/table/DataTableFrame";
import PageConnectionWait from "../UI/PageConnectionWait";
import { setSnackbar } from "../../redux/slices/generalSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
} from "../../redux/apis/materialApi";
import {
  stringColumn,
  dateColumn,
  priceColumn,
  numberColumn,
  actionColumn,
} from "../../components/UI/table/columns";

const DataTable = () => {
  const [deleteMaterial] = useDeleteMaterialMutation();
  const { data: materials, isLoading, isFetching } = useGetMaterialsQuery();
  const dispatch = useDispatch();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!materials)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const columns = [
    stringColumn("name", "İsim", 215, { cellClassName: "boldandcolorcell" }),
    numberColumn("amount", "Miktar", 100),
    stringColumn("unit", "Birim", 100),
    priceColumn("price", "Fiyat", 120, {
      cellClassName: "boldandcolorcell",
    }),
    stringColumn("brand", "Marka", 120),
    stringColumn("type", "Tür", 100),
    dateColumn("purchaseDate", "Alış Tarihi"),
    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="error"
            onClick={async () => {
              try {
                const res = await deleteMaterial(params.row.id).unwrap();
                dispatch(
                  setSnackbar({
                    children: res.message,
                    severity: "success",
                  })
                );
              } catch (error) {
                dispatch(
                  setSnackbar({
                    children: error,
                    severity: "error",
                  })
                );
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    }),
  ];

  return <DataTableFrame columns={columns} rows={materials} />;
};

export default DataTable;
