import { Rotalar } from "./Routes";
import { ThemeProvider } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "./redux/slices/generalSlice";

function App() {
  const { snackbar } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Rotalar />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => dispatch(setSnackbar(null))}
          autoHideDuration={2000}
        >
          <Alert {...snackbar} onClose={() => dispatch(setSnackbar(null))} />
        </Snackbar>
      )}
    </ThemeProvider>
  );
}

export default App;