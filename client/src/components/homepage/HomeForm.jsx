import logo from "../../assets/img/logo.png";
import ModalButton from "../UI/ModalButton";
import CForm from "../customers/CForm";
import OrForm from "../orders/OrForm";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import { materialDateInput } from "../../utils/time-functions.js";
import { useState } from "react";
import { useAddOrderMutation } from "../../redux/apis/orderApi.js";
import { useAddCustomerMutation } from "../../redux/apis/customerApi";
import {
  Box,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Button,
  Stack,
} from "@mui/material";

const HomeForm = () => {
  const [openCAddModal, setOpenCAddModal] = useState(false);
  const [openOrAddModal, setOpenOrAddModal] = useState(false);
  const [addOrder] = useAddOrderMutation();
  const [addCustomer] = useAddCustomerMutation();
  const navigate = useNavigate();

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: { xs: 200, sm: 250, lg: 300 } }}
        image={logo}
        alt="Logo"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ flex: "1 0 auto", color: "primary.main", pl: { xs: 4, sm: 2 } }}
        >
          <Typography component="div" variant="h5">
            Pasta Tasarımcısı
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Sena Altan
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: { xs: 4, sm: 2 },
            pr: { md: 2 },
            pb: 4,
          }}
        >
          <Stack spacing={1}>
            <ModalButton
              title="Yeni Müşteri"
              height={{ md: "40vh" }}
              width="150%"
              modalOpen={openCAddModal}
              setModalOpen={setOpenCAddModal}
              size="large"
              buttonTitle="YENİ MÜŞTERİ"
              minW={{
                xs: "10vh",
                sm: "20vh",
                md: "25vh",
              }}
              icon={<PersonAddAlt1Icon />}
            >
              <CForm
                setOpenModel={setOpenCAddModal}
                initialValues={{
                  name: "",
                  surname: "",
                  phonenumber: "",
                  description: "",
                }}
                submitFunction={addCustomer}
              />
            </ModalButton>
            <ModalButton
              title="Yeni Sipariş"
              height={{ md: "60%" }}
              icon={<BorderColorIcon />}
              width="150%"
              modalOpen={openOrAddModal}
              setModalOpen={setOpenOrAddModal}
              size="large"
              buttonTitle="YENİ SİPARİŞ"
              minW={{
                xs: "10vh",
                sm: "20vh",
                md: "25vh",
              }}
            >
              <OrForm
                setOpenModel={setOpenOrAddModal}
                initialValues={{
                  date: materialDateInput,
                  description: "",
                  model: "",
                  type: "",
                  price: 0,
                  cost: 0,
                  customer: null,
                  product: null,
                }}
                submitFunction={addOrder}
              />
            </ModalButton>
            <Button
              color="primary"
              sx={{ minWidth: { xs: "10vh", sm: "20vh", md: "25vh" } }}
              variant="outlined"
              size="large"
              onClick={() => {
                navigate("/istatistikler");
              }}
              endIcon={<AssessmentIcon />}
              startIcon={<AssessmentIcon />}
            >
              İSTATİSTİKLER
            </Button>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default HomeForm;
