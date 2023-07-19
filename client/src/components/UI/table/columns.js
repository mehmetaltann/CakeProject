import { dateFormat } from "../../../utils/help-functions";

export const dateColumn = (
  fieldName,
  headerName,
  minWidth,
  width,
  maxWidth,
  rest
) => {
  return {
    field: fieldName,
    headerName: headerName,
    minWidth: minWidth,
    width: width,
    maxWidth: maxWidth,
    headerClassName: "header",
    type: "date",
    headerAlign: "left",
    align: "left",
    valueFormatter: (params) => dateFormat(params.value),
    ...rest,
  };
};

export const stringColumn = (
  fieldName,
  headerName,
  minWidth,
  width,
  maxWidth,
  rest
) => {
  return {
    field: fieldName,
    headerName: headerName,
    minWidth,
    width,
    maxWidth,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    ...rest,
  };
};

export const priceColumn = (
  fieldName,
  headerName,
  minWidth,
  width,
  maxWidth,
  rest
) => {
  return {
    field: fieldName,
    headerName: headerName,
    minWidth,
    width,
    maxWidth,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    type: "number",
    valueFormatter: (params) => `${params.value.toFixed(2)} TL`,
    ...rest,
  };
};

export const numberColumn = (
  fieldName,
  headerName,
  minWidth,
  width,
  maxWidth,
  rest
) => {
  return {
    field: fieldName,
    headerName: headerName,
    minWidth,
    width,
    maxWidth,
    headerClassName: "header",
    headerAlign: "left",
    align: "left",
    type: "number",
    filterable: false,
    valueFormatter: ({ value }) => `${value.toFixed()}`,
    ...rest,
  };
};

export const actionColumn = (rest) => {
  return {
    field: "action",
    headerName: "Ok",
    width: 60,
    headerClassName: "header",
    headerAlign: "center",
    align: "right",
    filterable: false,
    sortable: false,
    ...rest,
  };
};
