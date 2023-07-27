import PageConnectionWait from "../UI/PageConnectionWait";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import StatisticsTable from "./StatisticsTable";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useMemo } from "react";
import { useGetOrdersQuery } from "../../redux/apis/orderApi.js";
import { useGetProductsQuery } from "../../redux/apis/productApi.js";
import {
  generateArrayOfYears,
  thisMonth,
  thisYear,
} from "../../utils/time-functions";
import {
  Paper,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Box,
  Button,
  Stack,
} from "@mui/material";

const monthsTranslate = [
  { value: 1, label: "Ocak" },
  { value: 2, label: "Şubat" },
  { value: 3, label: "Mart" },
  { value: 4, label: "Nisan" },
  { value: 5, label: "Mayıs" },
  { value: 6, label: "Haziran" },
  { value: 7, label: "Temmuz" },
  { value: 8, label: "Ağustos" },
  { value: 9, label: "Eylül" },
  { value: 10, label: "Ekim" },
  { value: 11, label: "Kasım" },
  { value: 12, label: "Aralık" },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const StatisticsMain = () => {
  const yearsList = useMemo(() => generateArrayOfYears(2022), []);
  const monthsList = useMemo(() => monthsTranslate, []);
  const theme = useTheme();
  const [years, setYears] = useState([thisYear]);
  const [months, setMonths] = useState([thisMonth]);
  const [filteredOrderData, setFilteredOrderData] = useState([]);

  const {
    data: orders,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
  } = useGetOrdersQuery(0);

  const {
    data: products,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetProductsQuery(0);

  useEffect(() => {
    if (!ordersLoading && !ordersFetching) {
      setFilteredOrderData(
        orders
          .filter((item) => +item.date.split("-")[0] === thisYear)
          .filter((item) => +item.date.split("-")[1] === thisMonth)
      );
    }
  }, [ordersLoading, ordersFetching, orders]);

  if (ordersLoading && ordersFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!orders)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  if (productsLoading && productsFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!products)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  const monthNumber = months.length * years.length;

  function handleMonthChange(event) {
    const {
      target: { value },
    } = event;
    setMonths(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }

  function handleYearChange(event) {
    const {
      target: { value },
    } = event;
    setYears(
      typeof value === "string" ? value.split(",") : value
    );
  }

  function handleQuery() {
    if (months.length === 0) {
      const filtData = orders.filter((item) =>
        years.includes(+item.date.split("-")[0])
      );
      setFilteredOrderData(filtData);
    } else {
      const filtData = orders
        .filter((item) => years.includes(+item.date.split("-")[0]))
        .filter((item) => months.includes(+item.date.split("-")[1]));
      setFilteredOrderData(filtData);
    }
  }

  return (
    <Stack spacing={1}>
      <Paper>
        <Grid container sx={{ p: 2 }} alignItems={"center"} spacing={1}>
          <Grid>
            <InputLabel id="year">Yıl</InputLabel>
            <Select
              labelId="year"
              id="years"
              multiple
              size="small"
              sx={{ minWidth: "30ch", p: 1, borderColor: "primary.main" }}
              value={years}
              label="Yıl"
              onChange={handleYearChange}
              input={<OutlinedInput label="Years" />}
              MenuProps={MenuProps}
            >
              {yearsList.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  style={getStyles(item, years, theme)}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <Stack
              spacing={1}
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ ml: 1, mr: 1 }}
            >
              <FormHelperText>Çoklu Seçilebilir</FormHelperText>

              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setYears(yearsList);
                }}
              >
                Tüm Yıllar
              </Button>
              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setYears([thisYear]);
                }}
              >
                Sıfırla
              </Button>
            </Stack>
          </Grid>
          <Grid>
            <InputLabel id="ay">Ay</InputLabel>
            <Select
              labelId="ay"
              id="demo-multiple-name"
              disabled={years.length === 0 && true}
              multiple
              size="small"
              sx={{ minWidth: "30ch", p: 1, borderColor: "primary.main" }}
              value={months}
              label="Ay"
              onChange={handleMonthChange}
              input={<OutlinedInput label="Month" />}
              MenuProps={MenuProps}
            >
              {monthsList.map(({ label, value }) => (
                <MenuItem
                  key={value}
                  value={value}
                  style={getStyles(value, months, theme)}
                >
                  {label}
                </MenuItem>
              ))}
            </Select>
            <Stack
              spacing={1}
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ ml: 1, mr: 1 }}
            >
              <FormHelperText>Çoklu Seçilebilir</FormHelperText>

              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setMonths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                }}
              >
                Tüm Aylar
              </Button>
              <Button
                sx={{ fontSize: "0.6rem" }}
                onClick={() => {
                  setMonths([thisMonth]);
                }}
              >
                Sıfırla
              </Button>
            </Stack>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              sx={{ p: 1.8, minWidth: "20ch" }}
              size="large"
              onClick={handleQuery}
              color="secondary"
            >
              Sorgula
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Box sx={{ p: 2 }}>
          <StatisticsTable
            data={filteredOrderData}
            monthNumber={monthNumber}
            productData={products}
          />
        </Box>
      </Paper>
    </Stack>
  );
};

export default StatisticsMain;
