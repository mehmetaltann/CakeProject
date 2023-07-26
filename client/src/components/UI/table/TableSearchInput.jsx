import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../redux/slices/generalSlice";

const TableSearchInput = () => {
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  function changeDelay(change) {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        dispatch(setSearchQuery(change));
      }, 400)
    );
  }

  return (
    <Fragment>
      <Stack direction="row" spacing={1} alignItems="center">
        <SearchIcon fontSize="large" color="secondary" />
        <TextField
          type="search"
          color="secondary"
          id="outlined-basic"
          label="Arama"
          variant="outlined"
          size="small"
          sx={{ minWidth: "25vh", maxWidth: "35vh" }}
          onChange={(e) => changeDelay(e.target.value)}
        />
      </Stack>
    </Fragment>
  );
};

export default TableSearchInput;
