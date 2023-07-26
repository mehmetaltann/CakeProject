import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../redux/slices/generalSlice";
import { useAddUserMutation } from "../redux/apis/userApi";
import {
  Avatar,
  Button,
  Typography,
  TextField,
  Link,
  Box,
  Container,
} from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Mehmet ALTAN
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    try {
      const res = await addUser(userData).unwrap();
      dispatch(
        setSnackbar({
          children: res.message,
          severity: "success",
        })
      );
      navigate("/");
    } catch (error) {
      dispatch(
        setSnackbar({
          children: error.data.message,
          severity: "error",
        })
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kullanıcı Kayıt
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Kayıt Ol
          </Button>
          <Link variant="body2" component={RouterLink} to="/login">
            {"Giriş Sayfası"}
          </Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default UserRegister;
