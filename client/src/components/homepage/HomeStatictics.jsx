import PageConnectionWait from "../UI/PageConnectionWait";
import statisticsCalc from "../statistics/calculations.js";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useState } from "react";
import { useGetProductsQuery } from "../../redux/apis/productApi";
import { thisMonth, thisYear } from "../../utils/time-functions";
import { Paper, Typography, Divider, IconButton } from "@mui/material";
import { Stack } from "@mui/system";

const monthsTransform = {
  1: "Ocak",
  2: "Şubat",
  3: "Mart",
  4: "Nisan",
  5: "Mayıs",
  6: "Haziran",
  7: "Temmuz",
  8: "Ağustos",
  9: "Eylül",
  10: "Ekim",
  11: "Kasım",
  12: "Aralık",
};

const HomeStatictics = ({ orders }) => {
  const [months, setMonths] = useState([thisMonth]);
  const [years, setYears] = useState([thisYear]);

  const {
    data: products,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetProductsQuery(0);

  if (productsLoading && productsFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const filteredData = orders
    .filter((item) => +item.date.split("-")[0] === years)
    .filter((item) => +item.date.split("-")[1] === months);

  const { totalCakeCount, totalIncome, totalCost, totalProfit } =
    statisticsCalc(filteredData, 1, products);

  const InfoBox = ({ title, color, info }) => {
    return (
      <Grid xs={6}>
        <Paper sx={{ p: 2 }}>
          <Typography
            variant="h6"
            color="text.secondary"
            component="div"
            textAlign={"center"}
            fontSize="1.1rem"
          >
            {title}
          </Typography>
          <Divider />
          <Typography
            variant="h6"
            color={color}
            component="div"
            textAlign={"center"}
          >
            {info}
          </Typography>
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2} sx={{ p: 1, height: "100%" }}>
      <Grid
        xs={12}
        display={"flex"}
        justifyContent={"space-between"}
        direction="row"
        alignItems={"center"}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          component="div"
        >{`${years}-${monthsTransform[months]} Ayı`}</Typography>
        <Stack alignItems={"center"} direction="row">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              if (months === 1) {
                setMonths(12);
                setYears(years - 1);
              } else {
                setMonths(months - 1);
              }
            }}
          >
            <ArrowCircleLeftIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              if (months === 12) {
                setMonths(1);
                setYears(years + 1);
              } else {
                setMonths(months + 1);
              }
            }}
          >
            <ArrowCircleRightIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Grid>
      <Divider />
      <InfoBox
        title="Toplam Gelir"
        color="success.main"
        info={`${totalIncome.toFixed(2)} TL`}
      />
      <InfoBox
        title="Toplam Gider"
        color="error.main"
        info={`${totalCost.toFixed(2)} TL`}
      />
      <InfoBox
        title="Toplam Kar"
        color="success.main"
        info={`${totalProfit.toFixed(2)} TL`}
      />
      <InfoBox
        title="Pasta Sayısı"
        color="info.main"
        info={`${totalCakeCount} adet`}
      />
    </Grid>
  );
};

export default HomeStatictics;
