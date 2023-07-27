import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  IconButton,
  Collapse,
  Box,
  Stack,
} from "@mui/material";

const StatisticsTableRowOutcome = ({ data, totalCost, averageCost }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={"1%"}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="error"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" width={"99%"}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ p: 2, pb: 0 }}
          >
            <Typography variant="h6" gutterBottom color="error">
              Gider
            </Typography>
            <Stack>
              <Typography variant="h6" gutterBottom color="error.main">
                {`${totalCost.toFixed(2)} TL`}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                color="error.main"
                fontSize="8"
              >
                {`Aylık  ${averageCost.toFixed(2)} TL`}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="materials">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="1%">
                      No
                    </TableCell>
                    <TableCell align="left" width="6%">
                      Malzeme İsmi
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Harcanan Miktar
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Birim
                    </TableCell>
                    <TableCell align="left">Maliyet</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    ?.sort((a, b) => {
                      return b.cost - a.cost;
                    })
                    .map(({ id, name, unit, cost, number }, index) => (
                      <TableRow
                        key={id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" width="1%">
                          {index + 1}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          width="15%"
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                        >
                          {name}
                        </TableCell>

                        {unit === "Gram" && (
                          <>
                            <TableCell width="7%">
                              {`${(number / 1000).toFixed()}`}
                            </TableCell>
                            <TableCell width="5%">Kg</TableCell>
                          </>
                        )}
                        {unit === "MiliLitre" && (
                          <>
                            <TableCell width="7%">
                              {`${(number / 1000).toFixed()}`}
                            </TableCell>
                            <TableCell width="5%">Litre</TableCell>
                          </>
                        )}
                        {unit === "Dakika" && (
                          <>
                            <TableCell width="7%">
                              {`${(number / 60).toFixed()}`}
                            </TableCell>
                            <TableCell width="5%">Saat</TableCell>
                          </>
                        )}
                        {unit !== "Dakika" &&
                          unit !== "MiliLitre" &&
                          unit !== "Gram" && (
                            <>
                              <TableCell width="7%">
                                {`${number.toFixed()}`}
                              </TableCell>
                              <TableCell width="5%">{unit}</TableCell>
                            </>
                          )}
                        <TableCell
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                          width="10%"
                        >
                          {`${cost.toFixed(2)} TL`}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default StatisticsTableRowOutcome;
