import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import statisticsCalc from "./calculations";
import { useState, Fragment } from "react";
import {
  Paper,
  TableContainer,
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

const StatisticsTable = ({ data, monthNumber, productData }) => {
  const {
    allUsedMaterials,
    cakeTypeCount,
    totalIncome,
    averageIncome,
    totalCost,
    averageCost,
    totalProfit,
    averageProfit,
  } = statisticsCalc(data, monthNumber, productData);

  return <div>dfdfv</div>;
};

export default StatisticsTable;
