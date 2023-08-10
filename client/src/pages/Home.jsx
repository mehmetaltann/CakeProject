import HomeCalendar from "../features/homepage/HomeCalendar";
import HomeForm from "../features/homepage/HomeForm";
import HomeStatictics from "../features/homepage/HomeStatictics";
import PageConnectionWait from "../components/page/PageConnectionWait";
import Grid from "@mui/material/Unstable_Grid2";
import { useGetOrdersQuery } from "../store/api/orderApi";
import { PageWrapper } from "../layouts/Wrappers";
import { Box, Paper } from "@mui/material";

const Home = () => {
  const { data: orders, isLoading, isFetching } = useGetOrdersQuery();

  if (isLoading && isFetching)
    return <PageConnectionWait title="Veriler Bekleniyor" />;

  if (!orders)
    return <PageConnectionWait title="Server Bağlantısı Kurulamadı" />;

  return (
    <PageWrapper>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid xs={12} md={6}>
          <HomeForm />
        </Grid>
        <Grid xs={12} md={6}>
          <Paper>
            <HomeStatictics orders={orders} />
          </Paper>
        </Grid>
        <Grid>
          <Paper>
            <Box sx={{ p: 2 }}>
              <HomeCalendar orders={orders} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default Home;
