import DeleteIcon from "@mui/icons-material/Delete";
import DataTableFrame from "../UI/table/DataTableFrame";
import PageConnectionWait from "../UI/PageConnectionWait";
import { dateFormatNormal } from "../../utils/help-functions";
import { setSnackbar } from "../../redux/slices/generalSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
  useUpdateMaterialMutation,
} from "../../redux/apis/materialApi";
import { useCallback } from "react";
import {
  stringColumn,
  dateColumn,
  priceColumn,
  numberColumn,
  actionColumn,
} from "../UI/table/columns";

const useFakeMutation = () => {
  return useCallback(
    (item) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (item.name?.trim() === "") {
            reject(new Error("İsim Boş Olamaz"));
          } else {
            resolve({ ...item, name: item.name });
          }
        }, 200);
      }),
    []
  );
};

const MDataTable = () => {
  const [deleteMaterial] = useDeleteMaterialMutation();
  const [updateMaterial] = useUpdateMaterialMutation();
  const { data: materials, isLoading, isFetching } = useGetMaterialsQuery();
  const dispatch = useDispatch();
  const mutateRow = useFakeMutation();

  const processRowUpdate = useCallback(
    async (newRow) => {
      newRow.date = dateFormatNormal(newRow.date);
      try {
        const res = await updateMaterial(newRow).unwrap();
        const response = await mutateRow(newRow);
        dispatch(
          setSnackbar({
            children: res.message,
            severity: "success",
          })
        );

        return response;
      } catch (error) {
        dispatch(
          setSnackbar({
            children: error,
            severity: "error",
          })
        );
      }
    },
    [mutateRow, dispatch, updateMaterial]
  );

  const handleProcessRowUpdateError = useCallback(
    (error) => {
      dispatch(setSnackbar({ children: error.message, severity: "error" }));
    },
    [dispatch]
  );

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!materials)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const columns = [
    stringColumn("name", "İsim", 200, 250, 280, {
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    numberColumn("amount", "Miktar", 80, 100, 150),
    stringColumn("unit", "Birim", 80, 100, 150),
    priceColumn("price", "Fiyat", 120, 150, 180, {
      cellClassName: "boldandcolorcell",
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    stringColumn("brand", "Marka", 140, 160, 180, {
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 2;
        return { ...params.props, error: hasError };
      },
    }),
    stringColumn("type", "Tür", 100, 120, 150),
    dateColumn("date", "Alış Tarihi", 125, 150, 200, {
      editable: true,
    }),
    actionColumn({
      renderCell: (params, index) => {
        return (
          <IconButton
            key={index}
            size="small"
            color="secondary"
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

  return (
    <DataTableFrame
      columns={columns}
      rows={materials}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      disableColumnFilter
      disableDensitySelector
      disableExport
    />
  );
};

export default MDataTable;
