import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const MaterialForm = () => {
  return (
    <Paper>
      <Stack
        direction="row"
        spacing={2}
        alignItems={"center"}
        sx={{ p: 2, pl: 3 }}
      >
        <Typography color={"secondary"}>Yeni Malzeme</Typography>
        <Button
          alignItems={"center"}
          color={"secondary"}
          variant="outlined"
          sx={{ minWidth: "25vh" }}
        >
          Ekle
        </Button>
      </Stack>
    </Paper>
  );
};

export default MaterialForm;
