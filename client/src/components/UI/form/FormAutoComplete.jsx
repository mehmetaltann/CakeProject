import { Fragment } from "react";
import { getIn } from "formik";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";

const FormAutoComplete = ({
  textFieldProps,
  field,
  form,
  label,
  options,
  isLoading,
  setFieldValue,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  const valueInit = [
    {
      value: 0,
      label: "",
    },
  ];

  return (
    <Autocomplete
      {...props}
      {...field}
      options={[...valueInit, ...options]}
      getOptionLabel={(option) => (option ? option.label : "")}
      getOptionSelected={(option, value) => option.value === value?.value}
      loading={isLoading}
      value={field.value}
      onChange={(e, value) => {
        form.setFieldValue(field.name, value);
        if (setFieldValue) {
          setFieldValue(value);
        }
      }}
      renderInput={(props) => (
        <>
          <TextField
            {...props}
            {...textFieldProps}
            label={label}
            helperText={errorText?.value || errorText}
            error={!!errorText}
            InputProps={{
              ...props.InputProps,
              endAdornment: (
                <Fragment>
                  {isLoading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null}
                  {props.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        </>
      )}
    />
  );
};

export default FormAutoComplete;
