import statisticsCalc from "./calculations";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatisticsTableRowIncome from "./StatisticsTableRowIncome";
import StatisticsTableRowOutcome from "./StatisticsTableRowOutcome";
import StatisticsCostingChart from "./StatisticsCostingChart";
import StatisticsIncomeChart from "./StatisticsIncomeChart";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  Typography,
  Box,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

const StatisticsTable = ({ data, monthNumber, productData }) => {
  const {
    allUsedMaterials,
    cakeTypeCount,
    totalCakeCount,
    totalIncome,
    averageIncome,
    totalCost,
    averageCost,
    totalProfit,
    averageProfit,
  } = statisticsCalc(data, monthNumber, productData);

  return (
    <Stack spacing={1}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderBottom: "none" }}
          aria-label="simple table"
          size="small"
        >
          <TableBody>
            <StatisticsTableRowIncome
              data={cakeTypeCount}
              totalIncome={totalIncome}
              averageIncome={averageIncome}
              totalCakeCount={totalCakeCount}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, borderBottom: "none" }}
          aria-label="simple table"
          size="small"
        >
          <TableBody>
            <StatisticsTableRowOutcome
              data={allUsedMaterials}
              totalCost={totalCost}
              averageCost={averageCost}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <Paper>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ p: 2 }}
        >
          <Typography
            sx={{ pl: 6 }}
            variant="h6"
            gutterBottom
            color="info.main"
          >
            Kar / Zarar
          </Typography>
          {totalProfit < 0 ? (
            <Stack sx={{ pr: 1 }}>
              <Typography variant="h6" gutterBottom color="success.main">
                {`${totalProfit.toFixed(2)} TL`}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                color="error.main"
                fontSize="8"
              >
                {`Aylık  ${averageProfit.toFixed(2)} TL`}
              </Typography>
            </Stack>
          ) : (
            <Stack sx={{ pr: 1 }}>
              <Typography variant="h6" gutterBottom color="success.main">
                {`+ ${totalProfit.toFixed(2)} TL`}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                color="success.main"
                fontSize="8"
              >
                {`Aylık  ${averageProfit.toFixed(2)} TL`}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Paper>

      <Paper>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{ pl: 6 }}
              variant="h6"
              gutterBottom
              color="warning.main"
            >
              Grafikler
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              spacing={2}
              direction={{ md: "row" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box>
                <StatisticsCostingChart data={allUsedMaterials} />
              </Box>
              <Box>
                <StatisticsIncomeChart data={cakeTypeCount} />
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Stack>
  );
};

export default StatisticsTable;
