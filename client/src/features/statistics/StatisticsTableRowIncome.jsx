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

const StatisticsTableRowIncome = ({
  data,
  totalIncome,
  averageIncome,
  totalCakeCount,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell width={"1%"}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color="success"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ p: 2, pb: 0 }}
          >
            <Typography variant="h6" gutterBottom color="success.main">
              Gelir
            </Typography>
            <Stack>
              <Typography variant="h6" gutterBottom color="success.main">
                {`${totalIncome.toFixed(2)} TL`}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                color="success.main"
                fontSize="8"
              >
                {`Aylık  ${averageIncome.toFixed(2)} TL`}
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
                      Pasta Türü
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Büyüklük
                    </TableCell>
                    <TableCell align="left" width="12%">
                      Yapılma Sayısı
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    ?.sort((a, b) => {
                      return b.count - a.count;
                    })
                    .map(({ id, name, size, count }, index) => (
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
                        <TableCell component="th" scope="row" width="15%">
                          {size}
                        </TableCell>
                        <TableCell
                          sx={{ color: "secondary.main", fontWeight: 500 }}
                          width="10%"
                        >
                          {count}
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      width="15%"
                      colSpan={3}
                    >
                      Toplam
                    </TableCell>
                    <TableCell
                      sx={{ color: "secondary.main", fontWeight: 500 }}
                      width="10%"
                    >
                      {`${totalCakeCount} adet`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default StatisticsTableRowIncome;
