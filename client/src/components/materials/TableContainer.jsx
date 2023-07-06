import DataTable from "./DataTable";
import AltanSelect from "../UI/AltanSelect";
import { DataTableWrapper } from "../../layouts/Wrappers";
import { Paper } from "@mui/material";

const TableContainer = () => {
  return (
    <Paper>
      <DataTableWrapper tableHeight={"78vh"} sxProps={{ p: { xs: 1, md: 2 } }}>
        <DataTable />
      </DataTableWrapper>
    </Paper>
  );
};

export default TableContainer;
