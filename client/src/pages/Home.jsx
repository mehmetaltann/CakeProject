import HomeCalendar from "../components/homepage/HomeCalendar";
import { PageWrapper } from "../layouts/Wrappers";
import { Paper } from "@mui/material";

const Home = () => {
  return (
    <PageWrapper>
      <Paper>
        <HomeCalendar />
      </Paper>
    </PageWrapper>
  );
};

export default Home;
